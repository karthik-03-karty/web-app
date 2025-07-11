pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'REPLACE_WITH_YOUR_DOCKERHUB_USERNAME/synapmentor-frontend'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Build Applications') {
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

                echo 'Applications built successfully!'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                dir('frontend') {
                    script {
                        // Build Docker image
                        bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                        bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"

                        echo "Docker image built: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing to DockerHub...'

                script {
                    // Login to DockerHub
                    bat "echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin"

                    // Push images
                    bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    bat "docker push ${DOCKER_IMAGE}:latest"

                    echo "Images pushed to DockerHub successfully!"
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up local Docker images...'

                script {
                    // Remove local images to save space
                    bat "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || exit 0"
                    bat "docker rmi ${DOCKER_IMAGE}:latest || exit 0"

                    // Logout from DockerHub
                    bat "docker logout"
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Docker push successful! ✅'
            echo "Docker image available at: ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }
        failure {
            echo 'Build or Docker push failed! ❌'
        }
        always {
            // Clean up Docker system
            bat 'docker system prune -f || exit 0'
        }
    }
}
