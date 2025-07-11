#!/bin/bash

# SynapMentor Local Development Startup Script
# This script helps you run the application locally without manual builds

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_PORT=8081
FRONTEND_PORT=3000

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

# Check if we're in the right directory
check_directory() {
    if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
        log_error "Please run this script from the project root directory"
        log_info "Expected structure:"
        log_info "  ├── backend/"
        log_info "  ├── frontend/"
        log_info "  └── start-local.sh"
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    # Check Go
    if ! command -v go &> /dev/null; then
        log_error "Go is not installed. Please install Go 1.21+"
        exit 1
    fi
    
    log_success "All prerequisites are installed"
    
    # Display versions
    echo "Node.js: $(node --version)"
    echo "npm: $(npm --version)"
    echo "Go: $(go version | cut -d' ' -f3)"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    
    # Backend dependencies
    log_info "Installing Go dependencies..."
    cd backend
    go mod tidy
    cd ..
    
    # Frontend dependencies
    log_info "Installing Node.js dependencies..."
    cd frontend
    if [ ! -d "node_modules" ]; then
        npm install
    else
        log_info "node_modules already exists, skipping npm install"
        log_warning "If you want to reinstall, delete node_modules and run again"
    fi
    cd ..
    
    log_success "Dependencies installed successfully"
}

# Build applications
build_applications() {
    log_info "Building applications..."
    
    # Build backend
    log_info "Building Go backend..."
    cd backend
    go build -o synapmentor-backend cmd/server/main.go
    cd ..
    
    # Build frontend
    log_info "Building React frontend..."
    cd frontend
    npm run build
    cd ..
    
    log_success "Applications built successfully"
}

# Start applications
start_applications() {
    log_info "Starting applications..."
    
    # Check if ports are available
    if lsof -Pi :$BACKEND_PORT -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Port $BACKEND_PORT is already in use"
        log_info "Killing existing process..."
        kill $(lsof -t -i:$BACKEND_PORT) || true
        sleep 2
    fi
    
    if lsof -Pi :$FRONTEND_PORT -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Port $FRONTEND_PORT is already in use"
        log_info "Killing existing process..."
        kill $(lsof -t -i:$FRONTEND_PORT) || true
        sleep 2
    fi
    
    log_info "Starting backend server on port $BACKEND_PORT..."
    cd backend
    ./synapmentor-backend &
    BACKEND_PID=$!
    cd ..
    
    # Wait a moment for backend to start
    sleep 3
    
    log_info "Starting frontend server on port $FRONTEND_PORT..."
    cd frontend
    npx serve dist -p $FRONTEND_PORT &
    FRONTEND_PID=$!
    cd ..
    
    # Wait a moment for frontend to start
    sleep 3
    
    log_success "Applications started successfully!"
    echo ""
    log_info "🚀 SynapMentor is now running:"
    echo "   Frontend: http://localhost:$FRONTEND_PORT"
    echo "   Backend:  http://localhost:$BACKEND_PORT"
    echo "   API:      http://localhost:$BACKEND_PORT/api/v1"
    echo ""
    log_info "Press Ctrl+C to stop both servers"
    
    # Set trap to kill both processes on script exit
    trap "log_info 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; exit" INT TERM EXIT
    
    # Wait for processes
    wait $BACKEND_PID $FRONTEND_PID
}

# Development mode (watch for changes)
start_development() {
    log_info "Starting in development mode..."
    
    # Check if ports are available
    if lsof -Pi :$BACKEND_PORT -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Port $BACKEND_PORT is already in use"
        log_info "Killing existing process..."
        kill $(lsof -t -i:$BACKEND_PORT) || true
        sleep 2
    fi
    
    if lsof -Pi :$FRONTEND_PORT -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Port $FRONTEND_PORT is already in use"
        log_info "Killing existing process..."
        kill $(lsof -t -i:$FRONTEND_PORT) || true
        sleep 2
    fi
    
    log_info "Starting backend in development mode..."
    cd backend
    go run cmd/server/main.go &
    BACKEND_PID=$!
    cd ..
    
    # Wait a moment for backend to start
    sleep 3
    
    log_info "Starting frontend in development mode..."
    cd frontend
    npm run dev -- --port $FRONTEND_PORT &
    FRONTEND_PID=$!
    cd ..
    
    # Wait a moment for frontend to start
    sleep 3
    
    log_success "Development servers started!"
    echo ""
    log_info "🚀 SynapMentor Development Mode:"
    echo "   Frontend: http://localhost:$FRONTEND_PORT (with hot reload)"
    echo "   Backend:  http://localhost:$BACKEND_PORT"
    echo "   API:      http://localhost:$BACKEND_PORT/api/v1"
    echo ""
    log_info "Press Ctrl+C to stop both servers"
    
    # Set trap to kill both processes on script exit
    trap "log_info 'Stopping development servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; exit" INT TERM EXIT
    
    # Wait for processes
    wait $BACKEND_PID $FRONTEND_PID
}

# Show help
show_help() {
    echo "SynapMentor Local Startup Script"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start     Build and start the application (default)"
    echo "  dev       Start in development mode (with hot reload)"
    echo "  build     Only build the applications"
    echo "  install   Only install dependencies"
    echo "  clean     Clean build artifacts and dependencies"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0              # Build and start"
    echo "  $0 dev          # Development mode"
    echo "  $0 build        # Just build"
    echo "  $0 clean        # Clean everything"
}

# Clean build artifacts
clean_build() {
    log_info "Cleaning build artifacts..."
    
    # Clean backend
    rm -f backend/synapmentor-backend
    
    # Clean frontend
    rm -rf frontend/dist
    rm -rf frontend/node_modules
    
    log_success "Build artifacts cleaned"
}

# Main function
main() {
    local command=${1:-start}
    
    case $command in
        "start")
            check_directory
            check_prerequisites
            install_dependencies
            build_applications
            start_applications
            ;;
        "dev")
            check_directory
            check_prerequisites
            install_dependencies
            start_development
            ;;
        "build")
            check_directory
            check_prerequisites
            install_dependencies
            build_applications
            ;;
        "install")
            check_directory
            check_prerequisites
            install_dependencies
            ;;
        "clean")
            check_directory
            clean_build
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            log_error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
