pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-credinatials')
        DOCKER_IMAGE = 'nobi099/synapmentor-frontend'
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

        stage('Deploy Container') {
            steps {
                echo 'Deploying container...'

                script {
                    // Stop and remove existing container if running
                    bat "docker stop synapmentor-app || exit 0"
                    bat "docker rm synapmentor-app || exit 0"

                    // Run new container
                    bat "docker run -d --name synapmentor-app -p 80:80 ${DOCKER_IMAGE}:latest"

                    // Wait a moment for container to start (Windows syntax)
                    bat "ping 127.0.0.1 -n 6 > nul"

                    // Check if container is running
                    bat "docker ps"
                    bat "docker logs synapmentor-app"

                    echo "Container deployed successfully!"
                    echo "Application available at: http://localhost"
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up local Docker images...'

                script {
                    // Remove local images to save space (keep the one we're using)
                    bat "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || exit 0"

                    // Logout from DockerHub
                    bat "docker logout"
                }
            }
        }
    }

    post {
        success {
            echo 'Build, push, and deployment successful! ✅'
            echo "Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
            echo "Container running at: http://localhost"
            echo "Container name: synapmentor-app"
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
