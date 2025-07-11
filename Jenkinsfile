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
    
    // tools {
    //     nodejs "Node18"  // Requires NodeJS plugin to be installed
    //     // go "Go1.21"   // Uncomment if you install Go plugin
    // }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                
                // Display build information
                script {
                    if (isUnix()) {
                        env.BUILD_TIMESTAMP = sh(
                            script: "date '+%Y-%m-%d %H:%M:%S'",
                            returnStdout: true
                        ).trim()
                        env.GIT_COMMIT_SHORT = sh(
                            script: "git rev-parse --short HEAD",
                            returnStdout: true
                        ).trim()
                    } else {
                        env.BUILD_TIMESTAMP = bat(
                            script: "echo %date% %time%",
                            returnStdout: true
                        ).trim()
                        env.GIT_COMMIT_SHORT = bat(
                            script: "git rev-parse --short HEAD",
                            returnStdout: true
                        ).trim()
                    }
                }
                
                echo "Build started at: ${env.BUILD_TIMESTAMP}"
                echo "Git commit: ${env.GIT_COMMIT_SHORT}"
            }
        }
        
        stage('Setup Environment') {
            steps {
                echo 'Setting up build environment...'

                // Create build directory
                script {
                    if (isUnix()) {
                        sh "mkdir -p ${BUILD_DIR}"
                        sh 'rm -rf frontend/node_modules frontend/dist'
                    } else {
                        bat "mkdir ${BUILD_DIR}"
                        bat 'if exist frontend\\node_modules rmdir /s /q frontend\\node_modules'
                        bat 'if exist frontend\\dist rmdir /s /q frontend\\dist'
                    }
                }

                // Check if Node.js is available
                script {
                    try {
                        if (isUnix()) {
                            sh 'node --version'
                            sh 'npm --version'
                        } else {
                            bat 'node --version'
                            bat 'npm --version'
                        }
                        echo 'Node.js is available'
                    } catch (Exception e) {
                        echo 'Node.js not found in PATH. Please install Node.js on Jenkins server.'
                        error('Node.js is required but not found')
                    }
                }

                // Check if Go is available
                script {
                    try {
                        if (isUnix()) {
                            sh 'go version'
                        } else {
                            bat 'go version'
                        }
                        echo 'Go is available'
                    } catch (Exception e) {
                        echo 'Go not found in PATH. Please install Go on Jenkins server.'
                        error('Go is required but not found')
                    }
                }
            }
        }
        
        stage('Backend Build') {
            steps {
                echo 'Building Go backend...'
                dir('backend') {
                    script {
                        if (isUnix()) {
                            // Unix/Linux commands
                            sh 'go mod download'
                            sh 'go mod tidy'
                            sh 'go test -v ./...'
                            sh 'go build -o ../build-artifacts/synapmentor-backend cmd/server/main.go'
                            sh 'ls -la ../build-artifacts/'
                        } else {
                            // Windows commands
                            bat 'go mod download'
                            bat 'go mod tidy'
                            bat 'go test -v ./...'
                            bat 'go build -o ..\\build-artifacts\\synapmentor-backend.exe cmd\\server\\main.go'
                            bat 'dir ..\\build-artifacts\\'
                        }
                    }
                }

                echo 'Backend build completed successfully!'
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building React frontend...'
                dir('frontend') {
                    script {
                        if (isUnix()) {
                            // Unix/Linux commands
                            sh 'npm ci --prefer-offline --no-audit'
                            sh 'npm run lint'
                            sh 'npm run build'
                            sh 'cp -r dist ../build-artifacts/frontend-dist'
                            sh 'ls -la dist/'
                            sh 'ls -la ../build-artifacts/'
                        } else {
                            // Windows commands
                            bat 'npm ci --prefer-offline --no-audit'
                            bat 'npm run lint'
                            bat 'npm run build'
                            bat 'xcopy /E /I dist ..\\build-artifacts\\frontend-dist'
                            bat 'dir dist\\'
                            bat 'dir ..\\build-artifacts\\'
                        }
                    }
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

                    if (isUnix()) {
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
                    } else {
                        bat """
                            cd ${BUILD_DIR}

                            REM Create package directory
                            mkdir ${packageName}

                            REM Copy backend binary
                            copy synapmentor-backend.exe ${packageName}\\

                            REM Copy frontend build
                            xcopy /E /I frontend-dist ${packageName}\\frontend-dist

                            REM Copy database and migrations if they exist
                            if exist ..\\backend\\synapmentor.db copy ..\\backend\\synapmentor.db ${packageName}\\
                            if exist ..\\backend\\migrations xcopy /E /I ..\\backend\\migrations ${packageName}\\migrations
                        """

                        // Create Windows startup script
                        writeFile file: "${BUILD_DIR}/${packageName}/start.bat", text: '''@echo off
echo Starting SynapMentor Application...
echo Backend will be available at: http://localhost:8081
echo Frontend files are in: frontend-dist/
echo.
echo To serve frontend, you can use:
echo   npx serve frontend-dist -p 3000
echo.
echo Starting backend server...
synapmentor-backend.exe
'''

                        // Create Windows README
                        writeFile file: "${BUILD_DIR}/${packageName}/README.txt", text: '''SynapMentor Application Package
==============================

This package contains the built SynapMentor application.

Contents:
- synapmentor-backend.exe: Go backend executable
- frontend-dist/: Built React frontend files
- synapmentor.db: SQLite database (if exists)
- migrations/: Database migrations (if exists)
- start.bat: Startup script

To run the application:
1. Run the backend: synapmentor-backend.exe
2. Serve the frontend: npx serve frontend-dist -p 3000
   Or use any web server to serve the frontend-dist folder

The backend will be available at: http://localhost:8081
The frontend will be available at: http://localhost:3000
'''

                        bat """
                            cd ${BUILD_DIR}
                            echo Package created: ${packageName}
                            dir ${packageName}
                        """
                    }
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
                
                // Archive the package (Unix only - Windows doesn't create tar.gz)
                script {
                    if (isUnix()) {
                        archiveArtifacts artifacts: 'build-artifacts/*.tar.gz',
                                        fingerprint: true,
                                        allowEmptyArchive: true
                    }
                }
                
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

                    if (isUnix()) {
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
                    } else {
                        bat """
                            echo Deployment steps would go here
                            echo Built files are ready in: ${BUILD_DIR}
                            echo Package is ready for deployment

                            REM Example: Copy to a deployment directory
                            REM copy build-artifacts\\* C:\\deployment\\directory\\

                            REM Example: Extract and restart services
                            REM cd C:\\deployment\\directory\\
                            REM start synapmentor-backend.exe
                        """
                    }
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
