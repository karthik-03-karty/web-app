# Install Node.js and Go for Jenkins

## 🚨 Fix for "Invalid tool type nodejs" Error

The error you encountered means Node.js and Go are not installed on your Jenkins server. Here's how to fix it:

## 🔧 Quick Fix Options

### **Option 1: Install Tools on Jenkins Server (Recommended)**

#### **Install Node.js:**
1. **Download Node.js 18.x** from: https://nodejs.org/
2. **Install** with default settings
3. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```
4. **Restart Jenkins** service

#### **Install Go:**
1. **Download Go 1.21.x** from: https://golang.org/dl/
2. **Install** with default settings
3. **Verify installation**:
   ```bash
   go version
   ```
4. **Restart Jenkins** service

### **Option 2: Use Jenkins NodeJS Plugin (Alternative)**

1. Go to **Manage Jenkins** → **Manage Plugins**
2. **Available** tab → Search "NodeJS"
3. Install **NodeJS Plugin**
4. **Restart Jenkins**
5. Go to **Manage Jenkins** → **Global Tool Configuration**
6. **Add NodeJS** with name "Node18"
7. Update Jenkinsfile to uncomment the tools section

## 🎯 After Installing Tools

### **Test the Installation:**
1. Go to Jenkins: http://localhost:9090
2. **Manage Jenkins** → **Script Console**
3. Run this test script:
   ```groovy
   println "node --version".execute().text
   println "npm --version".execute().text
   println "go version".execute().text
   ```

### **Run Your Build Again:**
1. Go to your job: http://localhost:9090/job/SynapMentor-Build
2. Click **Build Now**
3. Check **Console Output** for progress

## 🐛 Troubleshooting

### **If Node.js is still not found:**
1. **Check PATH**: Make sure Node.js is in system PATH
2. **Restart Jenkins**: Service needs restart after installing tools
3. **Manual PATH**: Add Node.js path to Jenkins environment

### **If Go is still not found:**
1. **Check GOPATH**: Make sure Go is properly configured
2. **Environment Variables**: Set GOROOT and GOPATH if needed
3. **Restart Jenkins**: Service needs restart

### **Windows Specific:**
- Install tools as **Administrator**
- Add to **System PATH** (not just user PATH)
- **Restart Jenkins Windows Service**

### **Check Jenkins Environment:**
Go to **Manage Jenkins** → **System Information** and verify:
- `PATH` includes Node.js and Go directories
- `NODE_HOME` and `GOROOT` are set (if needed)

## 🚀 Expected Build Process

After installing tools, your build will:
1. ✅ **Checkout** code from GitHub
2. ✅ **Setup Environment** (check Node.js and Go)
3. ✅ **Backend Build** (Go compilation)
4. ✅ **Frontend Build** (npm install + build)
5. ✅ **Package** everything
6. ✅ **Archive** artifacts for download

## 📦 Build Artifacts

After successful build, you'll get:
- `synapmentor-backend.exe` (Windows) or `synapmentor-backend` (Unix)
- `frontend-dist/` folder with built React app
- Complete package as `.tar.gz` file

## 🔄 Quick Commands

### **Windows (PowerShell as Administrator):**
```powershell
# Install Node.js (using Chocolatey)
choco install nodejs

# Install Go (using Chocolatey)
choco install golang

# Restart Jenkins service
Restart-Service jenkins

# Verify installations
node --version
npm --version
go version
```

### **Linux/Mac:**
```bash
# Install Node.js (using package manager)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc

# Restart Jenkins
sudo systemctl restart jenkins

# Verify installations
node --version
npm --version
go version
```

## ✅ Success Indicators

Your build is working when you see:
- ✅ "Node.js is available" in console output
- ✅ "Go is available" in console output
- ✅ "Backend build completed successfully!"
- ✅ "Frontend build completed successfully!"
- ✅ Build artifacts archived

## 📞 Still Having Issues?

If you're still getting errors:
1. **Share the console output** - I can help debug specific errors
2. **Check Jenkins logs** - Look for detailed error messages
3. **Verify tool versions** - Make sure compatible versions are installed
4. **Environment issues** - Check if tools are in PATH

The updated Jenkinsfile should now work once Node.js and Go are installed on your Jenkins server! 🎉
