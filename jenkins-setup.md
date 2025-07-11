# Jenkins CI/CD Setup for SynapMentor

This guide will help you set up Jenkins to automatically build your SynapMentor application.

## 🚀 What This Pipeline Does

The Jenkins pipeline will automatically:
1. ✅ **Checkout** your code from GitHub
2. ✅ **Install** all dependencies (npm install, go mod tidy)
3. ✅ **Build** both frontend and backend
4. ✅ **Test** the applications (optional)
5. ✅ **Package** everything into a ready-to-run bundle
6. ✅ **Archive** build artifacts for download
7. ✅ **Deploy** to development environment (optional)

## 📋 Prerequisites

### Jenkins Server Requirements:
- Jenkins 2.400+ installed
- Required plugins:
  - Pipeline plugin
  - Git plugin
  - NodeJS plugin
  - Go plugin (or manual Go installation)

### Tools to Install on Jenkins Server:
- **Node.js 18+**
- **Go 1.21+**
- **Git**

## 🔧 Jenkins Setup Steps

### Step 1: Install Required Plugins

Go to Jenkins → Manage Jenkins → Manage Plugins → Available

Install these plugins:
- `Pipeline`
- `Git`
- `NodeJS`
- `Workspace Cleanup`

### Step 2: Configure Global Tools

Go to Jenkins → Manage Jenkins → Global Tool Configuration

#### Configure Node.js:
- Click "Add NodeJS"
- Name: `18` (or your preferred name)
- Version: Select Node.js 18.x
- ✅ Install automatically

#### Configure Go (if Go plugin is installed):
- Click "Add Go"
- Name: `1.21`
- Version: Select Go 1.21.x
- ✅ Install automatically

### Step 3: Create New Pipeline Job

1. Go to Jenkins Dashboard
2. Click "New Item"
3. Enter job name: `SynapMentor-Build`
4. Select "Pipeline"
5. Click "OK"

### Step 4: Configure Pipeline

In the job configuration:

#### General Settings:
- ✅ GitHub project: `https://github.com/karthik-03-karty/web-app`
- Description: `Automated build pipeline for SynapMentor application`

#### Build Triggers:
Choose one or more:
- ✅ **GitHub hook trigger for GITScm polling** (recommended)
- ✅ **Poll SCM**: `H/5 * * * *` (check every 5 minutes)
- ✅ **Build periodically**: `H 2 * * *` (daily at 2 AM)

#### Pipeline Configuration:
- Definition: `Pipeline script from SCM`
- SCM: `Git`
- Repository URL: `https://github.com/karthik-03-karty/web-app.git`
- Branch: `*/master`
- Script Path: `Jenkinsfile`

### Step 5: GitHub Webhook (Optional but Recommended)

To trigger builds automatically when you push code:

1. Go to your GitHub repository
2. Settings → Webhooks → Add webhook
3. Payload URL: `http://your-jenkins-server:8080/github-webhook/`
4. Content type: `application/json`
5. Events: `Just the push event`
6. ✅ Active

## 🎯 Pipeline Features

### Automatic Building:
- **Backend**: Compiles Go code into executable
- **Frontend**: Runs `npm install` and `npm run build`
- **Testing**: Runs Go tests and npm lint
- **Packaging**: Creates ready-to-deploy package

### Build Artifacts:
After each build, you'll get:
- `synapmentor-backend` (executable)
- `frontend-dist/` (built React app)
- `synapmentor-{build-number}-{commit}.tar.gz` (complete package)

### Build Notifications:
- ✅ Success/failure status
- 📦 Package information
- 🕐 Build timestamps
- 📝 Git commit details

## 📦 Using Build Artifacts

After a successful build:

1. Go to Jenkins job → Build History
2. Click on a build number
3. Click "Build Artifacts"
4. Download the `.tar.gz` package

### To run the downloaded package:
```bash
# Extract the package
tar -xzf synapmentor-{build-number}-{commit}.tar.gz

# Navigate to extracted folder
cd synapmentor-{build-number}-{commit}

# Start the application
./start.sh
```

## 🔧 Customization Options

### Environment Variables:
You can customize these in the Jenkinsfile:
- `NODE_VERSION`: Node.js version (default: 18)
- `GO_VERSION`: Go version (default: 1.21)
- `BUILD_DIR`: Build artifacts directory

### Additional Steps:
You can add more stages like:
- Code quality checks
- Security scanning
- Database migrations
- Email notifications
- Slack notifications

## 🚨 Troubleshooting

### Common Issues:

1. **Node.js not found**:
   - Ensure NodeJS plugin is installed
   - Configure Node.js in Global Tool Configuration

2. **Go not found**:
   - Install Go manually on Jenkins server
   - Or use Go plugin and configure in Global Tools

3. **Permission denied**:
   - Ensure Jenkins user has proper permissions
   - Check file permissions in workspace

4. **Build fails on npm install**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and try again

### Debug Commands:
```bash
# Check available tools
which node
which npm
which go

# Check versions
node --version
npm --version
go version

# Check workspace permissions
ls -la workspace/
```

## 📞 Need Credentials?

If you need to provide any credentials for:
- Private repositories
- External services
- Deployment targets
- Notification services

Please let me know and I'll help you configure them securely in Jenkins!

## 🎉 Benefits

With this setup, you'll never need to manually:
- Run `npm install`
- Run `npm run build`
- Run `go build`
- Package the application

Just push your code to GitHub, and Jenkins will automatically build everything for you! 🚀
