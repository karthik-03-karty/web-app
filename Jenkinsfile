pipeline {
    agent any
    
    environment {
        REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'synapmentor'
        BACKEND_IMAGE = "${REGISTRY}/${IMAGE_NAME}-backend"
        FRONTEND_IMAGE = "${REGISTRY}/${IMAGE_NAME}-frontend"
        KUBECONFIG = credentials('kubeconfig')
        REGISTRY_CREDENTIALS = credentials('registry-credentials')
        SONAR_TOKEN = credentials('sonar-token')
        SLACK_WEBHOOK = credentials('slack-webhook')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    env.BUILD_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
            }
        }
        
        stage('Code Quality') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'go mod tidy'
                            sh 'go test -v ./...'
                            sh 'go vet ./...'
                            // Generate coverage report
                            sh 'go test -coverprofile=coverage.out ./...'
                            sh 'go tool cover -html=coverage.out -o coverage.html'
                        }
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'backend',
                                reportFiles: 'coverage.html',
                                reportName: 'Go Coverage Report'
                            ])
                        }
                    }
                }
                
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                            sh 'npm run test:ci'
                            sh 'npm run lint'
                            sh 'npm audit --audit-level moderate'
                        }
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'frontend/test-results.xml'
                        }
                    }
                }
                
                stage('Security Scan') {
                    steps {
                        // Trivy security scanning
                        sh 'trivy fs --format json --output trivy-report.json .'
                        // OWASP Dependency Check
                        dependencyCheck additionalArguments: '--format JSON --format HTML', odcInstallation: 'Default'
                    }
                    post {
                        always {
                            dependencyCheckPublisher pattern: 'dependency-check-report.xml'
                        }
                    }
                }
            }
        }
        
        stage('Build Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        script {
                            def backendImage = podman.build(
                                "${BACKEND_IMAGE}:${BUILD_TAG}",
                                "./backend"
                            )
                            backendImage.tag("${BACKEND_IMAGE}:latest")
                        }
                    }
                }
                
                stage('Build Frontend') {
                    steps {
                        script {
                            def frontendImage = podman.build(
                                "${FRONTEND_IMAGE}:${BUILD_TAG}",
                                "./frontend"
                            )
                            frontendImage.tag("${FRONTEND_IMAGE}:latest")
                        }
                    }
                }
            }
        }
        
        stage('Image Security Scan') {
            parallel {
                stage('Scan Backend Image') {
                    steps {
                        sh "trivy image --format json --output backend-image-scan.json ${BACKEND_IMAGE}:${BUILD_TAG}"
                    }
                }
                
                stage('Scan Frontend Image') {
                    steps {
                        sh "trivy image --format json --output frontend-image-scan.json ${FRONTEND_IMAGE}:${BUILD_TAG}"
                    }
                }
            }
        }
        
        stage('Push Images') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    buildingTag()
                }
            }
            steps {
                script {
                    podman.withRegistry("https://${REGISTRY}", REGISTRY_CREDENTIALS) {
                        sh "podman push ${BACKEND_IMAGE}:${BUILD_TAG}"
                        sh "podman push ${BACKEND_IMAGE}:latest"
                        sh "podman push ${FRONTEND_IMAGE}:${BUILD_TAG}"
                        sh "podman push ${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    sh """
                        helm upgrade --install synapmentor-staging ./k8s/helm \
                            --namespace staging \
                            --set image.backend.tag=${BUILD_TAG} \
                            --set image.frontend.tag=${BUILD_TAG} \
                            --set environment=staging \
                            --wait --timeout=300s
                    """
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Manual approval for production deployment
                    input message: 'Deploy to Production?', ok: 'Deploy'
                    
                    sh """
                        helm upgrade --install synapmentor-prod ./k8s/helm \
                            --namespace production \
                            --set image.backend.tag=${BUILD_TAG} \
                            --set image.frontend.tag=${BUILD_TAG} \
                            --set environment=production \
                            --wait --timeout=600s
                    """
                }
            }
        }
        
        stage('Post-Deploy Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    def namespace = env.BRANCH_NAME == 'main' ? 'production' : 'staging'
                    sh """
                        kubectl wait --for=condition=ready pod -l app=synapmentor-backend -n ${namespace} --timeout=300s
                        kubectl wait --for=condition=ready pod -l app=synapmentor-frontend -n ${namespace} --timeout=300s
                    """
                    
                    // Health checks
                    sh "curl -f http://synapmentor-${namespace}.example.com/health"
                    sh "curl -f http://synapmentor-${namespace}.example.com/api/v1/health"
                }
            }
        }
    }
    
    post {
        always {
            // Clean up
            sh 'podman system prune -f'
            
            // Archive artifacts
            archiveArtifacts artifacts: '**/*.json,**/*.html,**/*.xml', allowEmptyArchive: true
            
            // Publish test results
            publishTestResults testResultsPattern: '**/test-results.xml'
        }
        
        success {
            script {
                if (env.BRANCH_NAME == 'main') {
                    slackSend(
                        channel: '#deployments',
                        color: 'good',
                        message: "✅ Production deployment successful! Version: ${BUILD_TAG}"
                    )
                }
            }
        }
        
        failure {
            slackSend(
                channel: '#alerts',
                color: 'danger',
                message: "❌ Pipeline failed for ${env.BRANCH_NAME} - Build: ${BUILD_NUMBER}"
            )
        }
    }
}
