pipeline {
    agent any
    
    environment {
        // Node.js version
        NODE_VERSION = '18'
        // Go version
        GO_VERSION = '1.21'
        // Build artifacts directory
        BUILD_DIR = 'build-artifacts'
    }
    
    tools {
        nodejs "Node18"  // This should match the name you configure in Jenkins
        // go "Go1.21"   // Uncomment if you install Go plugin
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                
                // Display build information
                script {
                    env.BUILD_TIMESTAMP = sh(
                        script: "date '+%Y-%m-%d %H:%M:%S'",
                        returnStdout: true
                    ).trim()
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                }
                
                echo "Build started at: ${env.BUILD_TIMESTAMP}"
                echo "Git commit: ${env.GIT_COMMIT_SHORT}"
            }
        }
        
        stage('Setup Environment') {
            steps {
                echo 'Setting up build environment...'
                
                // Create build directory
                sh "mkdir -p ${BUILD_DIR}"
                
                // Display environment info
                sh 'node --version'
                sh 'npm --version'
                sh 'go version'
                
                // Clean any previous builds
                sh 'rm -rf frontend/node_modules frontend/dist'
            }
        }
        
        stage('Backend Build') {
            steps {
                echo 'Building Go backend...'
                dir('backend') {
                    // Download Go dependencies
                    sh 'go mod download'
                    sh 'go mod tidy'
                    
                    // Run tests (optional)
                    sh 'go test -v ./...'
                    
                    // Build the application
                    sh 'go build -o ../build-artifacts/synapmentor-backend cmd/server/main.go'
                    
                    // Verify build
                    sh 'ls -la ../build-artifacts/'
                }
                
                echo 'Backend build completed successfully!'
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building React frontend...'
                dir('frontend') {
                    // Install dependencies
                    sh 'npm ci --prefer-offline --no-audit'
                    
                    // Run linting (optional)
                    sh 'npm run lint'
                    
                    // Build the application
                    sh 'npm run build'
                    
                    // Copy build artifacts
                    sh 'cp -r dist ../build-artifacts/frontend-dist'
                    
                    // Verify build
                    sh 'ls -la dist/'
                    sh 'ls -la ../build-artifacts/'
                }
                
                echo 'Frontend build completed successfully!'
            }
        }
        
        stage('Package Application') {
            steps {
                echo 'Packaging application...'
                
                // Create application package
                script {
                    def packageName = "synapmentor-${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                    
                    sh """
                        cd ${BUILD_DIR}
                        
                        # Create package directory
                        mkdir -p ${packageName}
                        
                        # Copy backend binary
                        cp synapmentor-backend ${packageName}/
                        
                        # Copy frontend build
                        cp -r frontend-dist ${packageName}/
                        
                        # Copy database and migrations
                        cp ../backend/synapmentor.db ${packageName}/ || echo "Database not found, will be created on first run"
                        cp -r ../backend/migrations ${packageName}/ || echo "Migrations not found"
                        
                        # Create startup script
                        cat > ${packageName}/start.sh << 'EOF'
#!/bin/bash
echo "Starting SynapMentor Application..."
echo "Backend will be available at: http://localhost:8081"
echo "Frontend files are in: frontend-dist/"
echo ""
echo "To serve frontend, you can use:"
echo "  npx serve frontend-dist -p 3000"
echo ""
echo "Starting backend server..."
./synapmentor-backend
EOF
                        
                        chmod +x ${packageName}/start.sh
                        
                        # Create README for the package
                        cat > ${packageName}/README.txt << 'EOF'
SynapMentor Application Package
==============================

This package contains the built SynapMentor application.

Contents:
- synapmentor-backend: Go backend executable
- frontend-dist/: Built React frontend files
- synapmentor.db: SQLite database (if exists)
- migrations/: Database migrations (if exists)
- start.sh: Startup script

To run the application:
1. Run the backend: ./synapmentor-backend
2. Serve the frontend: npx serve frontend-dist -p 3000
   Or use any web server to serve the frontend-dist folder

The backend will be available at: http://localhost:8081
The frontend will be available at: http://localhost:3000
EOF
                        
                        # Create archive
                        tar -czf ${packageName}.tar.gz ${packageName}
                        
                        echo "Package created: ${packageName}.tar.gz"
                        ls -la ${packageName}.tar.gz
                    """
                }
                
                echo 'Application packaged successfully!'
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving build artifacts...'
                
                // Archive the built files
                archiveArtifacts artifacts: 'build-artifacts/**/*', 
                                fingerprint: true,
                                allowEmptyArchive: false
                
                // Archive the package
                archiveArtifacts artifacts: 'build-artifacts/*.tar.gz', 
                                fingerprint: true,
                                allowEmptyArchive: false
                
                echo 'Artifacts archived successfully!'
            }
        }
        
        stage('Deploy to Development') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying to development environment...'
                
                script {
                    // You can add deployment steps here
                    // For example, copy files to a development server
                    
                    sh """
                        echo "Deployment steps would go here"
                        echo "Built files are ready in: ${BUILD_DIR}"
                        echo "Package is ready for deployment"
                        
                        # Example: Copy to a deployment directory
                        # cp build-artifacts/*.tar.gz /path/to/deployment/directory/
                        
                        # Example: Extract and restart services
                        # cd /path/to/deployment/directory/
                        # tar -xzf synapmentor-*.tar.gz
                        # ./restart-services.sh
                    """
                }
                
                echo 'Deployment completed!'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed.'
            
            // Clean up workspace (optional)
            // cleanWs()
        }
        
        success {
            echo 'Build completed successfully! 🎉'
            
            // Send success notification
            script {
                def packageName = "synapmentor-${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                
                echo """
                ✅ SynapMentor Build Successful!
                
                📦 Package: ${packageName}.tar.gz
                🕐 Build Time: ${env.BUILD_TIMESTAMP}
                📝 Commit: ${env.GIT_COMMIT_SHORT}
                🔢 Build Number: ${env.BUILD_NUMBER}
                
                📁 Artifacts available in Jenkins for download
                """
            }
        }
        
        failure {
            echo 'Build failed! ❌'
            
            // Send failure notification
            echo """
            ❌ SynapMentor Build Failed!
            
            🕐 Build Time: ${env.BUILD_TIMESTAMP}
            📝 Commit: ${env.GIT_COMMIT_SHORT}
            🔢 Build Number: ${env.BUILD_NUMBER}
            
            Please check the build logs for details.
            """
        }
        
        unstable {
            echo 'Build completed with warnings ⚠️'
        }
    }
}
