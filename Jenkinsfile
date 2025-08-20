pipeline {
    agent any

    environment {
        ENV_FILE = "env/.env"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Clean old containers') {
            steps {
                bat """
                docker rm -f playwright-tests || true
                docker compose --env-file %ENV_FILE% down -v || true
                """
            }
        }

        stage('Run Playwright Tests in Docker') {
            steps {
                bat """
                docker compose --env-file %ENV_FILE% up --build --abort-on-container-exit
                """
            }
        }

        stage('Archive Test Results') {
            steps {
                // Save artifacts
                archiveArtifacts artifacts: 'allure-results/**', fingerprint: true
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                archiveArtifacts artifacts: 'logs/**', fingerprint: true
            }
        }

        stage('Allure Report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: "allure-results"]]
            }
        }

        stage('Publish Playwright HTML Report') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            bat "docker compose down"
        }
    }
}
