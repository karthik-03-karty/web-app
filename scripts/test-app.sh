#!/bin/bash

# SynapMentor Application Test Script
# This script tests the deployed application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="synapmentor-staging"
FRONTEND_URL="http://localhost:8080"
BACKEND_URL="http://localhost:8081"

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

# Test Kubernetes deployment
test_k8s_deployment() {
    log_info "Testing Kubernetes deployment..."
    
    # Check if namespace exists
    if ! kubectl get namespace $NAMESPACE &> /dev/null; then
        log_error "Namespace $NAMESPACE does not exist"
        return 1
    fi
    
    # Check pods
    log_info "Checking pod status..."
    kubectl get pods -n $NAMESPACE
    
    # Check if pods are running
    BACKEND_READY=$(kubectl get pods -n $NAMESPACE -l app=synapmentor-backend -o jsonpath='{.items[0].status.containerStatuses[0].ready}' 2>/dev/null || echo "false")
    FRONTEND_READY=$(kubectl get pods -n $NAMESPACE -l app=synapmentor-frontend -o jsonpath='{.items[0].status.containerStatuses[0].ready}' 2>/dev/null || echo "false")
    
    if [ "$BACKEND_READY" = "true" ]; then
        log_success "Backend pod is ready"
    else
        log_error "Backend pod is not ready"
        kubectl describe pods -l app=synapmentor-backend -n $NAMESPACE
        return 1
    fi
    
    if [ "$FRONTEND_READY" = "true" ]; then
        log_success "Frontend pod is ready"
    else
        log_error "Frontend pod is not ready"
        kubectl describe pods -l app=synapmentor-frontend -n $NAMESPACE
        return 1
    fi
    
    # Check services
    log_info "Checking services..."
    kubectl get services -n $NAMESPACE
    
    log_success "Kubernetes deployment test passed"
}

# Test backend health
test_backend_health() {
    log_info "Testing backend health endpoint..."
    
    # Check if port forwarding is active or start it
    if ! curl -s $BACKEND_URL/health &> /dev/null; then
        log_warning "Backend not accessible at $BACKEND_URL"
        log_info "Starting port forwarding for backend..."
        kubectl port-forward -n $NAMESPACE svc/synapmentor-backend-service 8081:8081 &
        PORT_FORWARD_PID=$!
        sleep 5
        
        # Set trap to kill port forwarding on exit
        trap "kill $PORT_FORWARD_PID 2>/dev/null || true" EXIT
    fi
    
    # Test health endpoint
    HEALTH_RESPONSE=$(curl -s $BACKEND_URL/health || echo "")
    
    if [ -n "$HEALTH_RESPONSE" ]; then
        log_success "Backend health check passed"
        echo "Response: $HEALTH_RESPONSE"
    else
        log_error "Backend health check failed"
        return 1
    fi
}

# Test backend API endpoints
test_backend_api() {
    log_info "Testing backend API endpoints..."
    
    # Test registration endpoint
    log_info "Testing user registration..."
    REGISTER_RESPONSE=$(curl -s -X POST $BACKEND_URL/api/v1/register \
        -H "Content-Type: application/json" \
        -d '{
            "email": "test@example.com",
            "password": "password123",
            "confirm_password": "password123",
            "first_name": "Test",
            "last_name": "User",
            "role": "seeker",
            "accept_terms": true
        }' || echo "")
    
    if echo "$REGISTER_RESPONSE" | grep -q "token\|error"; then
        log_success "Registration endpoint is responding"
        echo "Response: $REGISTER_RESPONSE"
    else
        log_warning "Registration endpoint may have issues"
        echo "Response: $REGISTER_RESPONSE"
    fi
    
    # Test login endpoint
    log_info "Testing user login..."
    LOGIN_RESPONSE=$(curl -s -X POST $BACKEND_URL/api/v1/login \
        -H "Content-Type: application/json" \
        -d '{
            "email": "test@example.com",
            "password": "password123"
        }' || echo "")
    
    if echo "$LOGIN_RESPONSE" | grep -q "token\|error"; then
        log_success "Login endpoint is responding"
        echo "Response: $LOGIN_RESPONSE"
    else
        log_warning "Login endpoint may have issues"
        echo "Response: $LOGIN_RESPONSE"
    fi
}

# Test frontend accessibility
test_frontend() {
    log_info "Testing frontend accessibility..."
    
    # Check if port forwarding is active or start it
    if ! curl -s $FRONTEND_URL &> /dev/null; then
        log_warning "Frontend not accessible at $FRONTEND_URL"
        log_info "Starting port forwarding for frontend..."
        kubectl port-forward -n $NAMESPACE svc/synapmentor-frontend-service 8080:80 &
        FRONTEND_PORT_FORWARD_PID=$!
        sleep 5
        
        # Set trap to kill port forwarding on exit
        trap "kill $FRONTEND_PORT_FORWARD_PID 2>/dev/null || true; kill $PORT_FORWARD_PID 2>/dev/null || true" EXIT
    fi
    
    # Test frontend
    FRONTEND_RESPONSE=$(curl -s -I $FRONTEND_URL | head -n 1 || echo "")
    
    if echo "$FRONTEND_RESPONSE" | grep -q "200 OK"; then
        log_success "Frontend is accessible"
        echo "Response: $FRONTEND_RESPONSE"
    else
        log_error "Frontend accessibility test failed"
        echo "Response: $FRONTEND_RESPONSE"
        return 1
    fi
}

# Test database connectivity
test_database() {
    log_info "Testing database connectivity..."
    
    # Get backend pod name
    BACKEND_POD=$(kubectl get pods -n $NAMESPACE -l app=synapmentor-backend -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || echo "")
    
    if [ -z "$BACKEND_POD" ]; then
        log_error "No backend pod found"
        return 1
    fi
    
    # Test database file exists
    DB_EXISTS=$(kubectl exec -n $NAMESPACE $BACKEND_POD -- ls -la /root/data/synapmentor.db 2>/dev/null || echo "")
    
    if [ -n "$DB_EXISTS" ]; then
        log_success "Database file exists"
        echo "Database info: $DB_EXISTS"
        
        # Test database tables
        TABLES=$(kubectl exec -n $NAMESPACE $BACKEND_POD -- sqlite3 /root/data/synapmentor.db ".tables" 2>/dev/null || echo "")
        if [ -n "$TABLES" ]; then
            log_success "Database tables found"
            echo "Tables: $TABLES"
        else
            log_warning "No database tables found or database not accessible"
        fi
    else
        log_error "Database file not found"
        return 1
    fi
}

# Performance test
test_performance() {
    log_info "Running basic performance test..."
    
    # Simple load test with curl
    log_info "Testing backend response time..."
    for i in {1..5}; do
        START_TIME=$(date +%s%N)
        curl -s $BACKEND_URL/health > /dev/null
        END_TIME=$(date +%s%N)
        RESPONSE_TIME=$(( (END_TIME - START_TIME) / 1000000 ))
        echo "Request $i: ${RESPONSE_TIME}ms"
    done
    
    log_success "Performance test completed"
}

# Show application URLs
show_access_info() {
    log_info "Application Access Information:"
    echo ""
    echo "=== Access URLs ==="
    echo "Frontend: $FRONTEND_URL"
    echo "Backend API: $BACKEND_URL"
    echo "Backend Health: $BACKEND_URL/health"
    echo ""
    echo "=== API Endpoints ==="
    echo "Registration: POST $BACKEND_URL/api/v1/register"
    echo "Login: POST $BACKEND_URL/api/v1/login"
    echo "Profile: GET $BACKEND_URL/api/v1/profile (requires auth)"
    echo ""
    echo "=== Port Forwarding Commands ==="
    echo "Frontend: kubectl port-forward -n $NAMESPACE svc/synapmentor-frontend-service 8080:80"
    echo "Backend: kubectl port-forward -n $NAMESPACE svc/synapmentor-backend-service 8081:8081"
    echo ""
}

# Main test function
run_all_tests() {
    log_info "SynapMentor Application Test Suite"
    echo "Testing deployed application in namespace: $NAMESPACE"
    echo ""
    
    local TESTS_PASSED=0
    local TESTS_FAILED=0
    
    # Run tests
    if test_k8s_deployment; then
        ((TESTS_PASSED++))
    else
        ((TESTS_FAILED++))
    fi
    
    if test_backend_health; then
        ((TESTS_PASSED++))
    else
        ((TESTS_FAILED++))
    fi
    
    if test_backend_api; then
        ((TESTS_PASSED++))
    else
        ((TESTS_FAILED++))
    fi
    
    if test_frontend; then
        ((TESTS_PASSED++))
    else
        ((TESTS_FAILED++))
    fi
    
    if test_database; then
        ((TESTS_PASSED++))
    else
        ((TESTS_FAILED++))
    fi
    
    test_performance
    
    # Show results
    echo ""
    log_info "Test Results:"
    log_success "Tests Passed: $TESTS_PASSED"
    if [ $TESTS_FAILED -gt 0 ]; then
        log_error "Tests Failed: $TESTS_FAILED"
    else
        log_success "Tests Failed: $TESTS_FAILED"
    fi
    
    show_access_info
    
    if [ $TESTS_FAILED -eq 0 ]; then
        log_success "All tests passed! Your application is ready to use."
        return 0
    else
        log_error "Some tests failed. Please check the logs above."
        return 1
    fi
}

# Handle script arguments
case "${1:-}" in
    "health")
        test_backend_health
        ;;
    "api")
        test_backend_api
        ;;
    "frontend")
        test_frontend
        ;;
    "database")
        test_database
        ;;
    "k8s")
        test_k8s_deployment
        ;;
    "performance")
        test_performance
        ;;
    "info")
        show_access_info
        ;;
    *)
        run_all_tests
        ;;
esac
