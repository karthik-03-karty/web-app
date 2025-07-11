# SynapMentor Operations Guide

This guide covers operational procedures for the SynapMentor application running on Kubernetes with Podman containers.

## Quick Start

### Prerequisites
- Kubernetes cluster access
- kubectl configured
- Podman installed
- Helm 3.x installed
- Access to container registry

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd synapmentor

# Make scripts executable
chmod +x scripts/deploy.sh

# Install dependencies (for local development)
make install
```

## Deployment Procedures

### Staging Deployment
```bash
# Option 1: Using deployment script
./scripts/deploy.sh staging deploy

# Option 2: Using Makefile
make deploy-staging

# Option 3: Using Helm
make helm-deploy-staging
```

### Production Deployment
```bash
# Option 1: Using deployment script
./scripts/deploy.sh production deploy

# Option 2: Using Makefile
make deploy-prod

# Option 3: Using Helm
make helm-deploy-prod
```

### Rollback Procedures
```bash
# Rollback staging
make rollback-staging

# Rollback production
make rollback-prod

# Or using deployment script
./scripts/deploy.sh production rollback
```

## Monitoring and Observability

### Setting Up Monitoring
```bash
# Deploy monitoring stack
make monitoring-setup

# Access monitoring services
make monitoring-port-forward
```

### Accessing Monitoring Services
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin123)

### Key Metrics to Monitor
1. **Application Metrics**
   - HTTP request rate and latency
   - Error rates (4xx, 5xx responses)
   - Database connection pool usage
   - Memory and CPU usage

2. **Infrastructure Metrics**
   - Pod restart counts
   - Node resource utilization
   - Persistent volume usage
   - Network traffic

3. **Business Metrics**
   - User registrations
   - Session bookings
   - Payment transactions
   - Content uploads

### Alerting Rules
Critical alerts are configured for:
- High error rates (>5% for 5 minutes)
- High memory usage (>80% for 5 minutes)
- High CPU usage (>80% for 5 minutes)
- Pod crash looping
- Service unavailability

## Logging

### Viewing Logs
```bash
# Backend logs (staging)
make logs-backend-staging

# Frontend logs (staging)
make logs-frontend-staging

# Backend logs (production)
make logs-backend-prod

# Frontend logs (production)
make logs-frontend-prod

# Or using kubectl directly
kubectl logs -l app=synapmentor-backend -n synapmentor --tail=100 -f
```

### Log Aggregation
Logs are collected by Fluentd and can be viewed in:
- Elasticsearch (if deployed)
- Kubernetes dashboard
- kubectl commands

### Log Levels
- **Production**: INFO level and above
- **Staging**: DEBUG level and above

## Database Operations

### Backup Procedures
```bash
# Backup staging database
make db-backup-staging

# Backup production database
make db-backup-prod
```

### Database Maintenance
```bash
# Connect to database pod
kubectl exec -it deployment/synapmentor-backend -n synapmentor -- /bin/sh

# Access SQLite database
sqlite3 /root/data/synapmentor.db

# Common SQLite commands
.tables          # List tables
.schema users    # Show table schema
.quit           # Exit SQLite
```

## Security Operations

### Security Scanning
```bash
# Scan container images for vulnerabilities
make security-scan

# Manual Trivy scan
trivy image your-registry.com/synapmentor-backend:latest
trivy image your-registry.com/synapmentor-frontend:latest
```

### Certificate Management
- SSL certificates are managed by cert-manager
- Automatic renewal is configured
- Monitor certificate expiration in Grafana

### Secret Rotation
```bash
# Update secrets in Kubernetes
kubectl edit secret synapmentor-backend-secrets -n synapmentor

# Restart deployments to pick up new secrets
kubectl rollout restart deployment/synapmentor-backend -n synapmentor
kubectl rollout restart deployment/synapmentor-frontend -n synapmentor
```

## Troubleshooting

### Common Issues

#### 1. Pod Not Starting
```bash
# Check pod status
kubectl describe pod <pod-name> -n <namespace>

# Common causes:
# - Image pull errors
# - Resource limits exceeded
# - Configuration errors
# - Volume mount issues
```

#### 2. Service Unavailable
```bash
# Check service and endpoints
kubectl get svc -n <namespace>
kubectl get endpoints -n <namespace>

# Check ingress
kubectl describe ingress -n <namespace>
```

#### 3. High Memory Usage
```bash
# Check resource usage
kubectl top pods -n <namespace>

# Scale up if needed
kubectl scale deployment/synapmentor-backend --replicas=5 -n <namespace>
```

#### 4. Database Connection Issues
```bash
# Check database pod
kubectl logs deployment/synapmentor-backend -n <namespace>

# Check persistent volume
kubectl get pv,pvc -n <namespace>
```

### Debug Commands
```bash
# Execute into pod
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh

# Port forward for local testing
kubectl port-forward svc/synapmentor-backend-service 8081:8081 -n <namespace>

# Test connectivity
kubectl run debug --image=busybox -it --rm -- /bin/sh
```

## Performance Optimization

### Scaling
```bash
# Manual scaling
kubectl scale deployment/synapmentor-backend --replicas=5 -n synapmentor

# Check HPA status
kubectl get hpa -n synapmentor
```

### Resource Optimization
- Monitor resource usage in Grafana
- Adjust resource requests/limits based on usage patterns
- Use vertical pod autoscaler for automatic resource adjustment

## Disaster Recovery

### Backup Strategy
1. **Database**: Daily automated backups
2. **Configuration**: All configs in Git
3. **Secrets**: Stored in secure secret management system
4. **Container Images**: Tagged and stored in registry

### Recovery Procedures
1. **Application Recovery**
   ```bash
   # Redeploy from known good configuration
   git checkout <last-known-good-commit>
   make deploy-prod
   ```

2. **Database Recovery**
   ```bash
   # Restore from backup
   kubectl exec -it deployment/synapmentor-backend -n synapmentor -- /bin/sh
   sqlite3 /root/data/synapmentor.db < backup-file.sql
   ```

## Maintenance Windows

### Planned Maintenance
1. Schedule during low-traffic periods
2. Notify users in advance
3. Use rolling updates to minimize downtime
4. Monitor application health during updates

### Emergency Maintenance
1. Assess impact and urgency
2. Implement fix or rollback
3. Communicate with stakeholders
4. Document incident and lessons learned

## Contact Information

### On-Call Procedures
- **Primary**: DevOps team
- **Secondary**: Development team
- **Escalation**: Engineering manager

### Communication Channels
- **Alerts**: Slack #alerts channel
- **Deployments**: Slack #deployments channel
- **Incidents**: Slack #incidents channel

## Runbooks

### Weekly Tasks
- [ ] Review monitoring dashboards
- [ ] Check certificate expiration dates
- [ ] Review security scan results
- [ ] Verify backup integrity

### Monthly Tasks
- [ ] Update container base images
- [ ] Review resource usage and scaling
- [ ] Security audit
- [ ] Disaster recovery testing

### Quarterly Tasks
- [ ] Full security assessment
- [ ] Performance review and optimization
- [ ] Infrastructure cost review
- [ ] Update documentation
