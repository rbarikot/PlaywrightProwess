pipeline {
    agent any

    environment {
        // Path to your env file
        ENV_FILE = "env/.env"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Build and run docker-compose with env file
                sh 'docker compose --env-file ${ENV_FILE} up --build --abort-on-container-exit'
            }
            post {
                always {
                    // Stop and clean up containers
                    sh 'docker compose down'
                }
            }
        }

        stage('Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**/*.*', fingerprint: true
        }
    }
}
