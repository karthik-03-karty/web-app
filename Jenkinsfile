pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building SynapMentor...'
                
                // Backend build
                dir('backend') {
                    bat 'go build -o synapmentor-backend.exe cmd/server/main.go'
                }
                
                // Frontend build  
                dir('frontend') {
                    bat 'npm ci'
                    bat 'npm run build'
                }
                
                echo 'Build completed!'
            }
        }
    }
    
    post {
        success {
            echo 'Build successful! ✅'
        }
        failure {
            echo 'Build failed! ❌'
        }
    }
}
