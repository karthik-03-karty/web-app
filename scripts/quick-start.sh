#!/bin/bash

# SynapMentor Quick Start Script
# This script helps you quickly deploy and access the application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="synapmentor-staging"
REGISTRY="docker.io"
USERNAME=""
IMAGE_TAG="latest"

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
    
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed. Please install kubectl first."
        exit 1
    fi
    
    if ! command -v podman &> /dev/null && ! command -v docker &> /dev/null; then
        log_error "Neither podman nor docker is installed. Please install one of them."
        exit 1
    fi
    
    # Check if we have a Kubernetes cluster
    if ! kubectl cluster-info &> /dev/null; then
        log_error "Cannot connect to Kubernetes cluster. Please ensure kubectl is configured."
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Get user configuration
get_configuration() {
    log_info "Getting configuration..."
    
    echo -n "Enter your Docker Hub username (or press Enter to use local registry): "
    read USERNAME
    
    if [ -z "$USERNAME" ]; then
        REGISTRY="localhost:5000"
        log_info "Using local registry: $REGISTRY"
        
        # Start local registry if not running
        if ! curl -s http://localhost:5000/v2/ &> /dev/null; then
            log_info "Starting local registry..."
            if command -v podman &> /dev/null; then
                podman run -d -p 5000:5000 --name registry registry:2 || true
            else
                docker run -d -p 5000:5000 --name registry registry:2 || true
            fi
            sleep 5
        fi
    else
        REGISTRY="docker.io/$USERNAME"
        log_info "Using Docker Hub registry: $REGISTRY"
        
        # Login to Docker Hub
        log_info "Please login to Docker Hub..."
        if command -v podman &> /dev/null; then
            podman login docker.io
        else
            docker login docker.io
        fi
    fi
}

# Build images
build_images() {
    log_info "Building container images..."
    
    CONTAINER_CMD="podman"
    if ! command -v podman &> /dev/null; then
        CONTAINER_CMD="docker"
    fi
    
    # Build backend
    log_info "Building backend image..."
    cd backend
    $CONTAINER_CMD build -t ${REGISTRY}/synapmentor-backend:${IMAGE_TAG} .
    
    # Build frontend
    log_info "Building frontend image..."
    cd ../frontend
    $CONTAINER_CMD build -t ${REGISTRY}/synapmentor-frontend:${IMAGE_TAG} .
    
    cd ..
    log_success "Images built successfully"
}

# Push images
push_images() {
    log_info "Pushing images to registry..."
    
    CONTAINER_CMD="podman"
    if ! command -v podman &> /dev/null; then
        CONTAINER_CMD="docker"
    fi
    
    $CONTAINER_CMD push ${REGISTRY}/synapmentor-backend:${IMAGE_TAG}
    $CONTAINER_CMD push ${REGISTRY}/synapmentor-frontend:${IMAGE_TAG}
    
    log_success "Images pushed successfully"
}

# Update Kubernetes manifests
update_manifests() {
    log_info "Updating Kubernetes manifests..."
    
    # Create temporary manifests with updated image references
    mkdir -p temp-k8s
    
    # Update backend deployment
    sed "s|your-registry.com/synapmentor-backend:latest|${REGISTRY}/synapmentor-backend:${IMAGE_TAG}|g" k8s/backend-deployment.yaml > temp-k8s/backend-deployment.yaml
    
    # Update frontend deployment
    sed "s|your-registry.com/synapmentor-frontend:latest|${REGISTRY}/synapmentor-frontend:${IMAGE_TAG}|g" k8s/frontend-deployment.yaml > temp-k8s/frontend-deployment.yaml
    
    # Copy other manifests
    cp k8s/namespace.yaml temp-k8s/
    cp k8s/configmap.yaml temp-k8s/
    cp k8s/secrets.yaml temp-k8s/
    cp k8s/services.yaml temp-k8s/
    
    log_success "Manifests updated"
}

# Deploy to Kubernetes
deploy_to_k8s() {
    log_info "Deploying to Kubernetes..."
    
    # Apply manifests
    kubectl apply -f temp-k8s/namespace.yaml
    kubectl apply -f temp-k8s/configmap.yaml
    kubectl apply -f temp-k8s/secrets.yaml
    kubectl apply -f temp-k8s/backend-deployment.yaml
    kubectl apply -f temp-k8s/frontend-deployment.yaml
    kubectl apply -f temp-k8s/services.yaml
    
    # Wait for deployments to be ready
    log_info "Waiting for deployments to be ready..."
    kubectl rollout status deployment/synapmentor-backend -n $NAMESPACE --timeout=300s
    kubectl rollout status deployment/synapmentor-frontend -n $NAMESPACE --timeout=300s
    
    log_success "Deployment completed successfully"
}

# Setup access
setup_access() {
    log_info "Setting up access to the application..."
    
    # Get pod status
    kubectl get pods -n $NAMESPACE
    
    log_info "Setting up port forwarding..."
    log_info "You can access the application using the following methods:"
    echo ""
    echo "Method 1: Port Forwarding (Recommended for testing)"
    echo "Run these commands in separate terminals:"
    echo "  kubectl port-forward -n $NAMESPACE svc/synapmentor-frontend-service 8080:80"
    echo "  kubectl port-forward -n $NAMESPACE svc/synapmentor-backend-service 8081:8081"
    echo ""
    echo "Then access:"
    echo "  Frontend: http://localhost:8080"
    echo "  Backend API: http://localhost:8081/health"
    echo ""
    
    echo "Method 2: NodePort (Alternative)"
    echo "Run: kubectl patch svc synapmentor-frontend-service -n $NAMESPACE -p '{\"spec\":{\"type\":\"NodePort\"}}'"
    echo "Then: kubectl get svc -n $NAMESPACE"
    echo ""
    
    # Ask if user wants to start port forwarding
    echo -n "Do you want to start port forwarding now? (y/N): "
    read START_PORT_FORWARD
    
    if [ "$START_PORT_FORWARD" = "y" ] || [ "$START_PORT_FORWARD" = "Y" ]; then
        log_info "Starting port forwarding..."
        log_info "Frontend will be available at: http://localhost:8080"
        log_info "Backend API will be available at: http://localhost:8081"
        log_info "Press Ctrl+C to stop port forwarding"
        
        # Start port forwarding in background
        kubectl port-forward -n $NAMESPACE svc/synapmentor-frontend-service 8080:80 &
        FRONTEND_PID=$!
        kubectl port-forward -n $NAMESPACE svc/synapmentor-backend-service 8081:8081 &
        BACKEND_PID=$!
        
        # Wait for user to stop
        echo "Port forwarding started. Press Enter to stop..."
        read
        
        # Kill port forwarding processes
        kill $FRONTEND_PID $BACKEND_PID 2>/dev/null || true
        log_info "Port forwarding stopped"
    fi
}

# Cleanup function
cleanup() {
    log_info "Cleaning up temporary files..."
    rm -rf temp-k8s
}

# Show status
show_status() {
    log_info "Application Status:"
    echo ""
    echo "=== Pods ==="
    kubectl get pods -n $NAMESPACE
    echo ""
    echo "=== Services ==="
    kubectl get services -n $NAMESPACE
    echo ""
    echo "=== Deployments ==="
    kubectl get deployments -n $NAMESPACE
    echo ""
    
    log_info "Useful commands:"
    echo "  View logs: kubectl logs -l app=synapmentor-backend -n $NAMESPACE -f"
    echo "  Scale app: kubectl scale deployment/synapmentor-backend --replicas=3 -n $NAMESPACE"
    echo "  Delete app: kubectl delete namespace $NAMESPACE"
}

# Main function
main() {
    log_info "SynapMentor Quick Start Deployment"
    echo "This script will help you deploy SynapMentor to Kubernetes"
    echo ""
    
    # Set trap for cleanup
    trap cleanup EXIT
    
    check_prerequisites
    get_configuration
    build_images
    push_images
    update_manifests
    deploy_to_k8s
    show_status
    setup_access
    
    log_success "Deployment completed successfully!"
    log_info "Your SynapMentor application is now running on Kubernetes"
}

# Handle script arguments
case "${1:-}" in
    "status")
        show_status
        ;;
    "cleanup")
        kubectl delete namespace $NAMESPACE
        log_success "Application cleaned up"
        ;;
    "logs")
        kubectl logs -l app=synapmentor-${2:-backend} -n $NAMESPACE -f
        ;;
    "port-forward")
        log_info "Starting port forwarding..."
        kubectl port-forward -n $NAMESPACE svc/synapmentor-frontend-service 8080:80 &
        kubectl port-forward -n $NAMESPACE svc/synapmentor-backend-service 8081:8081 &
        echo "Frontend: http://localhost:8080"
        echo "Backend: http://localhost:8081"
        echo "Press Ctrl+C to stop"
        wait
        ;;
    *)
        main
        ;;
esac
