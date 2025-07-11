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

        stage('Deploy Full Application') {
            steps {
                echo 'Deploying full application with Docker Compose...'

                script {
                    // Stop existing containers
                    bat "docker-compose down || exit 0"

                    // Build and start both frontend and backend
                    bat "docker-compose up -d --build"

                    // Wait for services to start
                    bat "ping 127.0.0.1 -n 10 > nul"

                    // Check if containers are running
                    bat "docker-compose ps"
                    bat "docker-compose logs --tail=20"

                    echo "Full application deployed successfully!"
                    echo "Frontend available at: http://localhost"
                    echo "Backend available at: http://localhost:8081"
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
            echo "Frontend running at: http://localhost"
            echo "Backend running at: http://localhost:8081"
            echo "Full application with backend API is now available!"
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
