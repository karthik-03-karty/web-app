# SynapMentor Kubernetes Deployment Guide

## Step 1: Update Configuration

### 1.1 Update Registry Configuration
Edit the following files to replace `your-registry.com` with your actual registry:

```bash
# Files to update:
# - k8s/backend-deployment.yaml
# - k8s/frontend-deployment.yaml  
# - k8s/helm/values.yaml
# - scripts/deploy.sh
# - Makefile

# If using Docker Hub, replace with: docker.io/yourusername
# If using local registry, use: localhost:5000
# For this demo, we'll use Docker Hub
```

### 1.2 Update Secrets
```bash
# Generate base64 encoded secrets
echo -n "your-jwt-secret-key-here" | base64
echo -n "your-db-encryption-key" | base64

# Update k8s/secrets.yaml with the generated values
```

## Step 2: Build and Push Images

### Option A: Using Docker Hub (Recommended for demo)
```bash
# Login to Docker Hub
podman login docker.io
# Enter your Docker Hub username and password

# Build images with your Docker Hub username
export REGISTRY="docker.io/yourusername"
export IMAGE_TAG="v1.0.0"

# Build backend image
cd backend
podman build -t ${REGISTRY}/synapmentor-backend:${IMAGE_TAG} .
podman tag ${REGISTRY}/synapmentor-backend:${IMAGE_TAG} ${REGISTRY}/synapmentor-backend:latest

# Build frontend image  
cd ../frontend
podman build -t ${REGISTRY}/synapmentor-frontend:${IMAGE_TAG} .
podman tag ${REGISTRY}/synapmentor-frontend:${IMAGE_TAG} ${REGISTRY}/synapmentor-frontend:latest

# Push images
podman push ${REGISTRY}/synapmentor-backend:${IMAGE_TAG}
podman push ${REGISTRY}/synapmentor-backend:latest
podman push ${REGISTRY}/synapmentor-frontend:${IMAGE_TAG}
podman push ${REGISTRY}/synapmentor-frontend:latest
```

### Option B: Using Local Registry (For local testing)
```bash
# Start local registry
podman run -d -p 5000:5000 --name registry registry:2

# Build and push to local registry
export REGISTRY="localhost:5000"
make build
make push
```

## Step 3: Deploy to Kubernetes

### 3.1 Create Namespaces
```bash
kubectl apply -f k8s/namespace.yaml
```

### 3.2 Update Image References
Before deploying, update the image references in deployment files:

```bash
# Update backend deployment
sed -i 's|your-registry.com|docker.io/yourusername|g' k8s/backend-deployment.yaml

# Update frontend deployment  
sed -i 's|your-registry.com|docker.io/yourusername|g' k8s/frontend-deployment.yaml
```

### 3.3 Deploy Application
```bash
# Deploy to staging
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/services.yaml

# Check deployment status
kubectl get pods -n synapmentor-staging
kubectl get services -n synapmentor-staging
```

## Step 4: Access the Application

### Option A: Port Forwarding (Easiest for testing)
```bash
# Forward frontend service
kubectl port-forward -n synapmentor-staging svc/synapmentor-frontend-service 8080:80

# Forward backend service (in another terminal)
kubectl port-forward -n synapmentor-staging svc/synapmentor-backend-service 8081:8081

# Access application
# Frontend: http://localhost:8080
# Backend API: http://localhost:8081/health
```

### Option B: Using Ingress (Production-like)
```bash
# Deploy ingress
kubectl apply -f k8s/ingress.yaml

# Check ingress
kubectl get ingress -n synapmentor-staging

# Add to /etc/hosts (Linux/Mac) or C:\Windows\System32\drivers\etc\hosts (Windows)
echo "127.0.0.1 staging.synapmentor.com" >> /etc/hosts

# Access via: http://staging.synapmentor.com
```

### Option C: Using NodePort (Alternative)
```bash
# Create NodePort service
kubectl patch svc synapmentor-frontend-service -n synapmentor-staging -p '{"spec":{"type":"NodePort"}}'

# Get the NodePort
kubectl get svc synapmentor-frontend-service -n synapmentor-staging

# Access via: http://<node-ip>:<nodeport>
```

## Step 5: Verify Application

### 5.1 Check Health Endpoints
```bash
# Backend health check
curl http://localhost:8081/health

# Expected response:
# {"status":"healthy","timestamp":1234567890,"service":"synapmentor-api"}
```

### 5.2 Test API Endpoints
```bash
# Test registration endpoint
curl -X POST http://localhost:8081/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "confirm_password": "password123",
    "first_name": "Test",
    "last_name": "User",
    "role": "seeker",
    "accept_terms": true
  }'
```

### 5.3 Access Frontend
Open browser and navigate to:
- http://localhost:8080 (if using port-forward)
- http://staging.synapmentor.com (if using ingress)

## Step 6: Monitor the Application

### 6.1 View Logs
```bash
# Backend logs
kubectl logs -l app=synapmentor-backend -n synapmentor-staging -f

# Frontend logs
kubectl logs -l app=synapmentor-frontend -n synapmentor-staging -f
```

### 6.2 Check Pod Status
```bash
# Get all resources
kubectl get all -n synapmentor-staging

# Describe pods for detailed info
kubectl describe pods -n synapmentor-staging
```

### 6.3 Setup Monitoring (Optional)
```bash
# Deploy monitoring stack
kubectl create namespace monitoring
kubectl apply -f k8s/monitoring/prometheus.yaml
kubectl apply -f k8s/monitoring/grafana.yaml

# Access Grafana
kubectl port-forward -n monitoring svc/grafana 3000:3000
# Open http://localhost:3000 (admin/admin123)
```

## Troubleshooting

### Common Issues and Solutions

#### 1. ImagePullBackOff Error
```bash
# Check if images exist in registry
podman search yourusername/synapmentor-backend

# Check pod events
kubectl describe pod <pod-name> -n synapmentor-staging

# Solution: Ensure images are pushed to registry and image names are correct
```

#### 2. CrashLoopBackOff
```bash
# Check pod logs
kubectl logs <pod-name> -n synapmentor-staging

# Common causes:
# - Missing environment variables
# - Database connection issues
# - Port conflicts
```

#### 3. Service Not Accessible
```bash
# Check service endpoints
kubectl get endpoints -n synapmentor-staging

# Check if pods are ready
kubectl get pods -n synapmentor-staging

# Test service connectivity
kubectl run debug --image=busybox -it --rm -- /bin/sh
# Inside the pod: wget -qO- http://synapmentor-backend-service:8081/health
```

#### 4. Database Issues
```bash
# Check persistent volume
kubectl get pv,pvc -n synapmentor-staging

# Check if database file exists
kubectl exec -it deployment/synapmentor-backend -n synapmentor-staging -- ls -la /root/data/
```

## Quick Commands Reference

```bash
# Build and deploy everything
make deploy-staging

# Check status
make status-staging

# View logs
make logs-backend-staging

# Clean up
kubectl delete namespace synapmentor-staging

# Scale application
kubectl scale deployment/synapmentor-backend --replicas=3 -n synapmentor-staging

# Update deployment
kubectl set image deployment/synapmentor-backend backend=docker.io/yourusername/synapmentor-backend:v2.0.0 -n synapmentor-staging
```

## Production Deployment

For production deployment:

```bash
# Update production configurations
# Deploy to production namespace
make deploy-prod

# Or using Helm
make helm-deploy-prod
```

Remember to:
1. Use proper secrets management
2. Configure SSL certificates
3. Set up proper monitoring and alerting
4. Configure backup procedures
5. Test disaster recovery procedures
