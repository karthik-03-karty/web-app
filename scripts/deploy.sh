#!/bin/bash

# SynapMentor Deployment Script
# Usage: ./deploy.sh [environment] [action]
# Environment: staging, production
# Action: deploy, rollback, status, logs

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
REGISTRY="your-registry.com"
IMAGE_TAG="${BUILD_TAG:-latest}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if kubectl is installed
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed"
        exit 1
    fi
    
    # Check if helm is installed
    if ! command -v helm &> /dev/null; then
        log_error "helm is not installed"
        exit 1
    fi
    
    # Check if podman is installed
    if ! command -v podman &> /dev/null; then
        log_error "podman is not installed"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Build images
build_images() {
    log_info "Building Docker images..."
    
    # Build backend image
    log_info "Building backend image..."
    cd "$PROJECT_ROOT/backend"
    podman build -t "${REGISTRY}/synapmentor-backend:${IMAGE_TAG}" .
    podman tag "${REGISTRY}/synapmentor-backend:${IMAGE_TAG}" "${REGISTRY}/synapmentor-backend:latest"
    
    # Build frontend image
    log_info "Building frontend image..."
    cd "$PROJECT_ROOT/frontend"
    podman build -t "${REGISTRY}/synapmentor-frontend:${IMAGE_TAG}" .
    podman tag "${REGISTRY}/synapmentor-frontend:${IMAGE_TAG}" "${REGISTRY}/synapmentor-frontend:latest"
    
    log_success "Images built successfully"
}

# Push images
push_images() {
    log_info "Pushing images to registry..."
    
    podman push "${REGISTRY}/synapmentor-backend:${IMAGE_TAG}"
    podman push "${REGISTRY}/synapmentor-backend:latest"
    podman push "${REGISTRY}/synapmentor-frontend:${IMAGE_TAG}"
    podman push "${REGISTRY}/synapmentor-frontend:latest"
    
    log_success "Images pushed successfully"
}

# Deploy to Kubernetes
deploy_k8s() {
    local environment=$1
    log_info "Deploying to Kubernetes ($environment)..."
    
    # Set namespace based on environment
    if [ "$environment" = "production" ]; then
        NAMESPACE="synapmentor"
    elif [ "$environment" = "staging" ]; then
        NAMESPACE="synapmentor-staging"
    else
        log_error "Invalid environment: $environment"
        exit 1
    fi
    
    # Create namespace if it doesn't exist
    kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
    
    # Apply configurations
    log_info "Applying Kubernetes manifests..."
    kubectl apply -f "$PROJECT_ROOT/k8s/namespace.yaml"
    kubectl apply -f "$PROJECT_ROOT/k8s/configmap.yaml"
    kubectl apply -f "$PROJECT_ROOT/k8s/secrets.yaml"
    kubectl apply -f "$PROJECT_ROOT/k8s/backend-deployment.yaml"
    kubectl apply -f "$PROJECT_ROOT/k8s/frontend-deployment.yaml"
    kubectl apply -f "$PROJECT_ROOT/k8s/services.yaml"
    kubectl apply -f "$PROJECT_ROOT/k8s/ingress.yaml"
    
    # Apply security policies
    kubectl apply -f "$PROJECT_ROOT/k8s/security/network-policies.yaml"
    
    # Wait for deployment to be ready
    log_info "Waiting for deployment to be ready..."
    kubectl rollout status deployment/synapmentor-backend -n "$NAMESPACE" --timeout=300s
    kubectl rollout status deployment/synapmentor-frontend -n "$NAMESPACE" --timeout=300s
    
    log_success "Deployment completed successfully"
}

# Deploy using Helm
deploy_helm() {
    local environment=$1
    log_info "Deploying using Helm ($environment)..."
    
    # Set values file based on environment
    if [ "$environment" = "production" ]; then
        VALUES_FILE="$PROJECT_ROOT/k8s/helm/values-production.yaml"
        RELEASE_NAME="synapmentor-prod"
        NAMESPACE="synapmentor"
    elif [ "$environment" = "staging" ]; then
        VALUES_FILE="$PROJECT_ROOT/k8s/helm/values-staging.yaml"
        RELEASE_NAME="synapmentor-staging"
        NAMESPACE="synapmentor-staging"
    else
        log_error "Invalid environment: $environment"
        exit 1
    fi
    
    # Create namespace if it doesn't exist
    kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
    
    # Deploy with Helm
    helm upgrade --install "$RELEASE_NAME" "$PROJECT_ROOT/k8s/helm" \
        --namespace "$NAMESPACE" \
        --values "$VALUES_FILE" \
        --set image.backend.tag="$IMAGE_TAG" \
        --set image.frontend.tag="$IMAGE_TAG" \
        --wait --timeout=600s
    
    log_success "Helm deployment completed successfully"
}

# Rollback deployment
rollback_deployment() {
    local environment=$1
    log_info "Rolling back deployment ($environment)..."
    
    if [ "$environment" = "production" ]; then
        NAMESPACE="synapmentor"
    elif [ "$environment" = "staging" ]; then
        NAMESPACE="synapmentor-staging"
    else
        log_error "Invalid environment: $environment"
        exit 1
    fi
    
    # Rollback deployments
    kubectl rollout undo deployment/synapmentor-backend -n "$NAMESPACE"
    kubectl rollout undo deployment/synapmentor-frontend -n "$NAMESPACE"
    
    # Wait for rollback to complete
    kubectl rollout status deployment/synapmentor-backend -n "$NAMESPACE" --timeout=300s
    kubectl rollout status deployment/synapmentor-frontend -n "$NAMESPACE" --timeout=300s
    
    log_success "Rollback completed successfully"
}

# Get deployment status
get_status() {
    local environment=$1
    log_info "Getting deployment status ($environment)..."
    
    if [ "$environment" = "production" ]; then
        NAMESPACE="synapmentor"
    elif [ "$environment" = "staging" ]; then
        NAMESPACE="synapmentor-staging"
    else
        log_error "Invalid environment: $environment"
        exit 1
    fi
    
    echo "=== Deployments ==="
    kubectl get deployments -n "$NAMESPACE"
    echo ""
    
    echo "=== Pods ==="
    kubectl get pods -n "$NAMESPACE"
    echo ""
    
    echo "=== Services ==="
    kubectl get services -n "$NAMESPACE"
    echo ""
    
    echo "=== Ingress ==="
    kubectl get ingress -n "$NAMESPACE"
}

# Get logs
get_logs() {
    local environment=$1
    local component=${2:-backend}
    
    if [ "$environment" = "production" ]; then
        NAMESPACE="synapmentor"
    elif [ "$environment" = "staging" ]; then
        NAMESPACE="synapmentor-staging"
    else
        log_error "Invalid environment: $environment"
        exit 1
    fi
    
    log_info "Getting logs for $component in $environment..."
    kubectl logs -l app=synapmentor-$component -n "$NAMESPACE" --tail=100 -f
}

# Main function
main() {
    local environment=${1:-staging}
    local action=${2:-deploy}
    
    log_info "SynapMentor Deployment Script"
    log_info "Environment: $environment"
    log_info "Action: $action"
    log_info "Image Tag: $IMAGE_TAG"
    
    check_prerequisites
    
    case $action in
        "deploy")
            build_images
            push_images
            deploy_k8s "$environment"
            ;;
        "helm-deploy")
            build_images
            push_images
            deploy_helm "$environment"
            ;;
        "rollback")
            rollback_deployment "$environment"
            ;;
        "status")
            get_status "$environment"
            ;;
        "logs")
            get_logs "$environment" "${3:-backend}"
            ;;
        *)
            log_error "Invalid action: $action"
            echo "Usage: $0 [environment] [action]"
            echo "Environment: staging, production"
            echo "Action: deploy, helm-deploy, rollback, status, logs"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
