pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'qa', 'staging', 'prod'], description: 'Select environment configuration')
    }

    environment {
        ENV_FILE = "env/.env.${params.ENVIRONMENT ?: 'dev'}"
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
                echo Cleaning old containers for environment: ${params.ENVIRONMENT}
                docker rm -f playwright-tests || echo No container to remove
                docker-compose --env-file ${ENV_FILE} down -v || echo Nothing to stop
                """
            }
        }

        stage('Run Playwright Tests in Docker') {
            steps {
                bat """
                echo Setting environment variable for Docker Compose
                set ENVIRONMENT=${params.ENVIRONMENT}
                docker-compose --env-file ${ENV_FILE} up --build --abort-on-container-exit
                """
            }
        }

        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                archiveArtifacts artifacts: 'logs/**', fingerprint: true
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
                    reportName: "Playwright HTML Report (${params.ENVIRONMENT})",
                    includes: '**/*'
                ])
            }
        }
    }

    post {
        always {
            bat """
            echo Cleaning up containers
            docker-compose down || echo Nothing to clean
            """
        }
    }
}