# SynapMentor Makefile
# Usage: make [target]

.PHONY: help build test clean deploy-staging deploy-prod logs status

# Variables
REGISTRY ?= your-registry.com
IMAGE_TAG ?= latest
BACKEND_IMAGE = $(REGISTRY)/synapmentor-backend:$(IMAGE_TAG)
FRONTEND_IMAGE = $(REGISTRY)/synapmentor-frontend:$(IMAGE_TAG)

# Default target
help: ## Show this help message
	@echo "SynapMentor Development and Deployment Commands"
	@echo ""
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development targets
install: ## Install dependencies for both frontend and backend
	@echo "Installing backend dependencies..."
	cd backend && go mod tidy
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

dev-backend: ## Run backend in development mode
	cd backend && go run cmd/server/main.go

dev-frontend: ## Run frontend in development mode
	cd frontend && npm run dev

dev: ## Run both backend and frontend in development mode (requires tmux)
	tmux new-session -d -s synapmentor-dev
	tmux send-keys -t synapmentor-dev:0 'make dev-backend' Enter
	tmux split-window -t synapmentor-dev:0
	tmux send-keys -t synapmentor-dev:1 'make dev-frontend' Enter
	tmux attach-session -t synapmentor-dev

# Testing targets
test-backend: ## Run backend tests
	cd backend && go test -v ./...

test-frontend: ## Run frontend tests
	cd frontend && npm test

test-coverage: ## Run tests with coverage
	cd backend && go test -coverprofile=coverage.out ./...
	cd backend && go tool cover -html=coverage.out -o coverage.html
	cd frontend && npm run test:coverage

test: test-backend test-frontend ## Run all tests

lint-backend: ## Lint backend code
	cd backend && go vet ./...
	cd backend && golangci-lint run

lint-frontend: ## Lint frontend code
	cd frontend && npm run lint

lint: lint-backend lint-frontend ## Lint all code

# Container targets
build-backend: ## Build backend container image
	podman build -t $(BACKEND_IMAGE) ./backend
	podman tag $(BACKEND_IMAGE) $(REGISTRY)/synapmentor-backend:latest

build-frontend: ## Build frontend container image
	podman build -t $(FRONTEND_IMAGE) ./frontend
	podman tag $(FRONTEND_IMAGE) $(REGISTRY)/synapmentor-frontend:latest

build: build-backend build-frontend ## Build all container images

push-backend: ## Push backend image to registry
	podman push $(BACKEND_IMAGE)
	podman push $(REGISTRY)/synapmentor-backend:latest

push-frontend: ## Push frontend image to registry
	podman push $(FRONTEND_IMAGE)
	podman push $(REGISTRY)/synapmentor-frontend:latest

push: push-backend push-frontend ## Push all images to registry

# Local container development
compose-up: ## Start services with docker-compose
	docker-compose up --build -d

compose-down: ## Stop services with docker-compose
	docker-compose down

compose-logs: ## View docker-compose logs
	docker-compose logs -f

podman-up: ## Start services with podman-compose
	podman-compose -f podman-compose.yml up --build -d

podman-down: ## Stop services with podman-compose
	podman-compose -f podman-compose.yml down

podman-logs: ## View podman-compose logs
	podman-compose -f podman-compose.yml logs -f

# Kubernetes deployment targets
k8s-namespace: ## Create Kubernetes namespaces
	kubectl apply -f k8s/namespace.yaml

k8s-secrets: ## Apply Kubernetes secrets (update secrets.yaml first!)
	kubectl apply -f k8s/secrets.yaml

k8s-config: ## Apply Kubernetes configuration
	kubectl apply -f k8s/configmap.yaml

k8s-deploy-staging: ## Deploy to staging environment
	kubectl apply -f k8s/namespace.yaml
	kubectl apply -f k8s/configmap.yaml
	kubectl apply -f k8s/secrets.yaml
	kubectl apply -f k8s/backend-deployment.yaml
	kubectl apply -f k8s/frontend-deployment.yaml
	kubectl apply -f k8s/services.yaml
	kubectl apply -f k8s/ingress.yaml
	kubectl apply -f k8s/security/network-policies.yaml

k8s-deploy-prod: ## Deploy to production environment
	@echo "Deploying to production..."
	@read -p "Are you sure you want to deploy to production? [y/N] " confirm && [ "$$confirm" = "y" ]
	kubectl apply -f k8s/namespace.yaml
	kubectl apply -f k8s/configmap.yaml
	kubectl apply -f k8s/secrets.yaml
	kubectl apply -f k8s/backend-deployment.yaml
	kubectl apply -f k8s/frontend-deployment.yaml
	kubectl apply -f k8s/services.yaml
	kubectl apply -f k8s/ingress.yaml
	kubectl apply -f k8s/security/network-policies.yaml

# Helm deployment targets
helm-deploy-staging: ## Deploy to staging with Helm
	helm upgrade --install synapmentor-staging k8s/helm \
		--namespace synapmentor-staging \
		--create-namespace \
		--set environment=staging \
		--set image.backend.tag=$(IMAGE_TAG) \
		--set image.frontend.tag=$(IMAGE_TAG) \
		--wait --timeout=600s

helm-deploy-prod: ## Deploy to production with Helm
	@echo "Deploying to production with Helm..."
	@read -p "Are you sure you want to deploy to production? [y/N] " confirm && [ "$$confirm" = "y" ]
	helm upgrade --install synapmentor-prod k8s/helm \
		--namespace synapmentor \
		--create-namespace \
		--set environment=production \
		--set image.backend.tag=$(IMAGE_TAG) \
		--set image.frontend.tag=$(IMAGE_TAG) \
		--wait --timeout=600s

# Monitoring targets
monitoring-setup: ## Setup monitoring stack
	kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
	kubectl apply -f k8s/monitoring/prometheus.yaml
	kubectl apply -f k8s/monitoring/grafana.yaml

monitoring-port-forward: ## Port forward to access monitoring services
	@echo "Starting port forwards..."
	@echo "Prometheus: http://localhost:9090"
	@echo "Grafana: http://localhost:3000 (admin/admin123)"
	kubectl port-forward -n monitoring svc/prometheus-service 9090:9090 &
	kubectl port-forward -n monitoring svc/grafana 3000:3000 &
	@echo "Press Ctrl+C to stop port forwarding"
	wait

# Utility targets
status-staging: ## Check staging deployment status
	kubectl get all -n synapmentor-staging

status-prod: ## Check production deployment status
	kubectl get all -n synapmentor

logs-backend-staging: ## View backend logs in staging
	kubectl logs -l app=synapmentor-backend -n synapmentor-staging --tail=100 -f

logs-frontend-staging: ## View frontend logs in staging
	kubectl logs -l app=synapmentor-frontend -n synapmentor-staging --tail=100 -f

logs-backend-prod: ## View backend logs in production
	kubectl logs -l app=synapmentor-backend -n synapmentor --tail=100 -f

logs-frontend-prod: ## View frontend logs in production
	kubectl logs -l app=synapmentor-frontend -n synapmentor --tail=100 -f

rollback-staging: ## Rollback staging deployment
	kubectl rollout undo deployment/synapmentor-backend -n synapmentor-staging
	kubectl rollout undo deployment/synapmentor-frontend -n synapmentor-staging

rollback-prod: ## Rollback production deployment
	@echo "Rolling back production deployment..."
	@read -p "Are you sure you want to rollback production? [y/N] " confirm && [ "$$confirm" = "y" ]
	kubectl rollout undo deployment/synapmentor-backend -n synapmentor
	kubectl rollout undo deployment/synapmentor-frontend -n synapmentor

clean-images: ## Clean up local container images
	podman image prune -f
	podman system prune -f

clean-k8s-staging: ## Clean up staging Kubernetes resources
	kubectl delete namespace synapmentor-staging

clean-k8s-prod: ## Clean up production Kubernetes resources
	@echo "This will delete ALL production resources!"
	@read -p "Are you sure you want to delete production resources? [y/N] " confirm && [ "$$confirm" = "y" ]
	kubectl delete namespace synapmentor

clean: clean-images ## Clean up local resources

# Full deployment pipeline
deploy-staging: build push k8s-deploy-staging ## Full staging deployment pipeline

deploy-prod: build push k8s-deploy-prod ## Full production deployment pipeline

# Security scanning
security-scan: ## Run security scans on images
	trivy image $(BACKEND_IMAGE)
	trivy image $(FRONTEND_IMAGE)

# Database operations
db-backup-staging: ## Backup staging database
	kubectl exec -n synapmentor-staging deployment/synapmentor-backend -- sqlite3 /root/data/synapmentor.db .dump > backup-staging-$(shell date +%Y%m%d-%H%M%S).sql

db-backup-prod: ## Backup production database
	kubectl exec -n synapmentor deployment/synapmentor-backend -- sqlite3 /root/data/synapmentor.db .dump > backup-prod-$(shell date +%Y%m%d-%H%M%S).sql
