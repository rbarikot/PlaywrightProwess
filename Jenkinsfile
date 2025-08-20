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

        stage('Build & Run in Docker') {
            steps {
                bat '''
                    docker compose --env-file %ENV_FILE% up --build --abort-on-container-exit
                    docker compose down
                '''
            }
        }

        stage('Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            }
        }
    }
}
