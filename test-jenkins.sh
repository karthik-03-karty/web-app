#!/bin/bash

# Jenkins Setup Test Script
# This script helps verify your Jenkins configuration

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
JENKINS_URL="http://localhost:9090"
JENKINS_USER="root"
JENKINS_PASS="root"
JOB_NAME="SynapMentor-Build"

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

# Test Jenkins connectivity
test_jenkins_connection() {
    log_info "Testing Jenkins connection..."
    
    # Test if Jenkins is running
    if curl -s "$JENKINS_URL" > /dev/null; then
        log_success "Jenkins is accessible at $JENKINS_URL"
    else
        log_error "Cannot connect to Jenkins at $JENKINS_URL"
        log_info "Please make sure Jenkins is running on port 9090"
        return 1
    fi
    
    # Test authentication
    if curl -s -u "$JENKINS_USER:$JENKINS_PASS" "$JENKINS_URL/api/json" > /dev/null; then
        log_success "Authentication successful with root:root"
    else
        log_error "Authentication failed with root:root"
        log_info "Please verify your Jenkins credentials"
        return 1
    fi
}

# Check if job exists
check_job_exists() {
    log_info "Checking if job '$JOB_NAME' exists..."
    
    local response=$(curl -s -u "$JENKINS_USER:$JENKINS_PASS" "$JENKINS_URL/job/$JOB_NAME/api/json" 2>/dev/null)
    
    if echo "$response" | grep -q '"name"'; then
        log_success "Job '$JOB_NAME' exists"
        return 0
    else
        log_warning "Job '$JOB_NAME' does not exist yet"
        log_info "You need to create the pipeline job first"
        return 1
    fi
}

# Trigger a build
trigger_build() {
    log_info "Triggering a build for '$JOB_NAME'..."
    
    local response=$(curl -s -w "%{http_code}" -u "$JENKINS_USER:$JENKINS_PASS" -X POST "$JENKINS_URL/job/$JOB_NAME/build")
    local http_code="${response: -3}"
    
    if [ "$http_code" = "201" ]; then
        log_success "Build triggered successfully!"
        log_info "Check Jenkins dashboard for build progress"
        return 0
    else
        log_error "Failed to trigger build (HTTP $http_code)"
        return 1
    fi
}

# Get build status
get_build_status() {
    log_info "Getting latest build status..."
    
    local response=$(curl -s -u "$JENKINS_USER:$JENKINS_PASS" "$JENKINS_URL/job/$JOB_NAME/lastBuild/api/json" 2>/dev/null)
    
    if echo "$response" | grep -q '"result"'; then
        local result=$(echo "$response" | grep -o '"result":"[^"]*"' | cut -d'"' -f4)
        local number=$(echo "$response" | grep -o '"number":[0-9]*' | cut -d':' -f2)
        
        case "$result" in
            "SUCCESS")
                log_success "Build #$number completed successfully!"
                ;;
            "FAILURE")
                log_error "Build #$number failed"
                ;;
            "UNSTABLE")
                log_warning "Build #$number completed with warnings"
                ;;
            *)
                log_info "Build #$number status: $result"
                ;;
        esac
    else
        log_info "No build information available yet"
    fi
}

# Check required tools
check_tools() {
    log_info "Checking if required tools are available..."
    
    # Check curl
    if command -v curl &> /dev/null; then
        log_success "curl is available"
    else
        log_error "curl is not installed (required for API calls)"
        return 1
    fi
    
    # Check if we can reach GitHub
    if curl -s https://github.com > /dev/null; then
        log_success "GitHub is accessible"
    else
        log_warning "Cannot reach GitHub (check internet connection)"
    fi
}

# Show Jenkins URLs
show_jenkins_info() {
    log_info "Jenkins Information:"
    echo ""
    echo "🔗 Jenkins Dashboard: $JENKINS_URL"
    echo "👤 Username: $JENKINS_USER"
    echo "🔑 Password: $JENKINS_PASS"
    echo "📋 Job Name: $JOB_NAME"
    echo ""
    echo "📱 Quick Links:"
    echo "   Dashboard: $JENKINS_URL"
    echo "   Job Page:  $JENKINS_URL/job/$JOB_NAME"
    echo "   Build Now: $JENKINS_URL/job/$JOB_NAME/build"
    echo "   Console:   $JENKINS_URL/job/$JOB_NAME/lastBuild/console"
    echo ""
}

# Main test function
run_tests() {
    log_info "Jenkins Setup Test for SynapMentor"
    echo "Testing Jenkins configuration..."
    echo ""
    
    local tests_passed=0
    local tests_failed=0
    
    # Run tests
    if check_tools; then
        ((tests_passed++))
    else
        ((tests_failed++))
    fi
    
    if test_jenkins_connection; then
        ((tests_passed++))
    else
        ((tests_failed++))
        return 1
    fi
    
    if check_job_exists; then
        ((tests_passed++))
        
        # If job exists, try to get build status
        get_build_status
    else
        ((tests_failed++))
    fi
    
    # Show results
    echo ""
    log_info "Test Results:"
    log_success "Tests Passed: $tests_passed"
    if [ $tests_failed -gt 0 ]; then
        log_error "Tests Failed: $tests_failed"
    else
        log_success "Tests Failed: $tests_failed"
    fi
    
    show_jenkins_info
    
    if [ $tests_failed -eq 0 ]; then
        log_success "Jenkins setup looks good! 🎉"
        echo ""
        log_info "Next steps:"
        echo "1. Create the pipeline job if not exists"
        echo "2. Trigger a test build"
        echo "3. Check build artifacts"
        return 0
    else
        log_error "Some tests failed. Please check the setup."
        return 1
    fi
}

# Handle script arguments
case "${1:-}" in
    "test")
        run_tests
        ;;
    "build")
        if check_job_exists; then
            trigger_build
        else
            log_error "Job does not exist. Create it first."
        fi
        ;;
    "status")
        get_build_status
        ;;
    "info")
        show_jenkins_info
        ;;
    *)
        echo "Jenkins Test Script for SynapMentor"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  test     Run all tests (default)"
        echo "  build    Trigger a build"
        echo "  status   Get build status"
        echo "  info     Show Jenkins information"
        echo ""
        echo "Examples:"
        echo "  $0           # Run all tests"
        echo "  $0 build     # Trigger a build"
        echo "  $0 status    # Check build status"
        echo ""
        run_tests
        ;;
esac
