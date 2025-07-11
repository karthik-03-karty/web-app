# Quick Jenkins Setup for SynapMentor (Your Configuration)

## 🚀 Step-by-Step Setup Guide

### Step 1: Access Your Jenkins Server
1. Open your browser and go to: **http://localhost:9090**
2. Login with:
   - **Username**: `root`
   - **Password**: `root`

### Step 2: Install Required Plugins

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Click on **Available** tab
3. Search and install these plugins:
   - `Pipeline`
   - `Git`
   - `NodeJS`
   - `Workspace Cleanup`
4. Click **Install without restart**
5. Wait for installation to complete

### Step 3: Configure Global Tools

1. Go to **Manage Jenkins** → **Global Tool Configuration**

#### Configure Node.js:
1. Scroll down to **NodeJS** section
2. Click **Add NodeJS**
3. Fill in:
   - **Name**: `Node18`
   - **Version**: Select `NodeJS 18.x.x` (latest 18.x version)
   - ✅ Check **Install automatically**
4. Click **Save**

#### Configure Go (if available):
1. Scroll down to **Go** section (if Go plugin is installed)
2. Click **Add Go**
3. Fill in:
   - **Name**: `Go1.21`
   - **Version**: Select `Go 1.21.x` (latest 1.21.x version)
   - ✅ Check **Install automatically**
4. Click **Save**

### Step 4: Create the Pipeline Job

1. From Jenkins Dashboard, click **New Item**
2. Enter item name: `SynapMentor-Build`
3. Select **Pipeline**
4. Click **OK**

### Step 5: Configure the Pipeline Job

#### General Settings:
1. **Description**: `Automated CI/CD pipeline for SynapMentor application`
2. ✅ Check **GitHub project**
3. **Project url**: `https://github.com/karthik-03-karty/web-app/`

#### Build Triggers:
Choose one or more options:
1. ✅ **Poll SCM**: `H/5 * * * *` (checks GitHub every 5 minutes)
2. ✅ **Build periodically**: `H 2 * * *` (builds daily at 2 AM)
3. ✅ **GitHub hook trigger for GITScm polling** (for webhook - optional)

#### Pipeline Configuration:
1. **Definition**: Select `Pipeline script from SCM`
2. **SCM**: Select `Git`
3. **Repository URL**: `https://github.com/karthik-03-karty/web-app.git`
4. **Credentials**: Leave as `- none -` (for public repo)
5. **Branch Specifier**: `*/master`
6. **Script Path**: `Jenkinsfile`

#### Advanced Settings (Optional):
1. **Lightweight checkout**: ✅ Check this for faster checkouts

### Step 6: Save and Test

1. Click **Save**
2. You'll be redirected to the job page
3. Click **Build Now** to test the pipeline

## 🎯 What Happens During Build

The pipeline will automatically:
1. **Checkout** your code from GitHub
2. **Setup Environment** (Node.js, Go)
3. **Backend Build**:
   - `go mod download`
   - `go mod tidy`
   - `go test -v ./...`
   - `go build -o synapmentor-backend cmd/server/main.go`
4. **Frontend Build**:
   - `npm ci`
   - `npm run lint`
   - `npm run build`
5. **Package Application**:
   - Creates ready-to-run package
   - Includes startup scripts
   - Archives as `.tar.gz`
6. **Archive Artifacts** for download

## 📦 Downloading Build Artifacts

After a successful build:
1. Go to the build page (click on build number)
2. Click **Build Artifacts** on the left
3. Download the `.tar.gz` file
4. Extract and run with `./start.sh`

## 🔧 Troubleshooting

### If Node.js is not found:
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Make sure NodeJS is configured with name `Node18`
3. Update Jenkinsfile if you used a different name

### If Go is not found:
1. Install Go manually on your Jenkins server
2. Or install Go plugin and configure it
3. Make sure the tool name matches what's in Jenkinsfile

### If build fails:
1. Check the **Console Output** in the build
2. Look for specific error messages
3. Common issues:
   - Missing tools (Node.js, Go)
   - Network connectivity
   - Permission issues

## 🚀 GitHub Webhook (Optional)

To trigger builds automatically when you push code:

1. Go to your GitHub repository: https://github.com/karthik-03-karty/web-app
2. Click **Settings** → **Webhooks** → **Add webhook**
3. **Payload URL**: `http://your-server-ip:9090/github-webhook/`
   - Replace `your-server-ip` with your actual server IP
   - If Jenkins is on the same machine as your browser, use: `http://localhost:9090/github-webhook/`
4. **Content type**: `application/json`
5. **Which events**: Select `Just the push event`
6. ✅ **Active**
7. Click **Add webhook**

## 🎉 Success!

Once configured, your workflow will be:
1. **Write code** → Push to GitHub
2. **Jenkins automatically** → Builds everything
3. **Download package** → Ready to run!

No more manual `npm install` or build commands! 🚀

## 📞 Need Help?

If you encounter any issues:
1. Check Jenkins logs: **Manage Jenkins** → **System Log**
2. Check build console output
3. Verify tool configurations
4. Make sure GitHub repository is accessible

Your Jenkins is now ready to automatically build SynapMentor! 🎯
