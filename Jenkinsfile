pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        EMAIL_TO = 'muhammad.asimsqa177@gmail.com'
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\PlaywrightBrowsers'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(
            numToKeepStr: '20',
            artifactNumToKeepStr: '10'
        ))
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                bat '''
                node -v
                npm -v
                git --version
                echo Browser Path:
                echo %PLAYWRIGHT_BROWSERS_PATH%
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    bat 'npx playwright test --project=chromium'
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure(
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                )
            }
        }

        stage('Publish Playwright HTML Report') {
            steps {
                publishHTML(target: [
                    allowMissing: true,
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
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }

        success {
            emailext(
                to: "${EMAIL_TO}",
                subject: "✅ BUILD SUCCESS | ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                <h2>Build Passed ✅</h2>

                <b>Job:</b> ${env.JOB_NAME}<br>
                <b>Build:</b> #${env.BUILD_NUMBER}<br>
                <b>Build URL:</b>
                <a href="${env.BUILD_URL}">${env.BUILD_URL}</a><br><br>

                <a href="${env.BUILD_URL}allure">Allure Report</a><br>
                <a href="${env.BUILD_URL}Playwright_20HTML_20Report/">Playwright HTML Report</a>
                """
            )
        }

        failure {
            emailext(
                to: "${EMAIL_TO}",
                subject: "❌ BUILD FAILED | ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                <h2>Build Failed ❌</h2>

                <b>Job:</b> ${env.JOB_NAME}<br>
                <b>Build:</b> #${env.BUILD_NUMBER}<br>

                <a href="${env.BUILD_URL}console">Console Log</a><br>
                <a href="${env.BUILD_URL}allure">Allure Report</a>
                """
            )
        }

        cleanup {
            echo 'Pipeline Completed.'
        }
    }
}