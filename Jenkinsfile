pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        EMAIL_TO = 'muhammad.asimsqa177@gmail.com'
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

        stage('Verify Node Installation') {
            steps {
                bat '''
                node -v
                npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
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
                <h2 style="color:green;">Build Passed ✅</h2>

                <table border="1" cellpadding="6" cellspacing="0">
                    <tr><td><b>Job</b></td><td>${env.JOB_NAME}</td></tr>
                    <tr><td><b>Build</b></td><td>#${env.BUILD_NUMBER}</td></tr>
                    <tr><td><b>Status</b></td><td>SUCCESS</td></tr>
                    <tr><td><b>Build URL</b></td><td><a href="${env.BUILD_URL}">${env.BUILD_URL}</a></td></tr>
                </table>

                <br>

                <b>Allure Report:</b><br>
                <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a>

                <br><br>

                <b>Playwright HTML Report:</b><br>
                <a href="${env.BUILD_URL}Playwright_20HTML_20Report/">
                    Open Playwright HTML Report
                </a>
                """
            )
        }

        failure {
            emailext(
                to: "${EMAIL_TO}",
                subject: "❌ BUILD FAILED | ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                <h2 style="color:red;">Build Failed ❌</h2>

                <table border="1" cellpadding="6" cellspacing="0">
                    <tr><td><b>Job</b></td><td>${env.JOB_NAME}</td></tr>
                    <tr><td><b>Build</b></td><td>#${env.BUILD_NUMBER}</td></tr>
                    <tr><td><b>Status</b></td><td>FAILED</td></tr>
                    <tr><td><b>Build URL</b></td><td><a href="${env.BUILD_URL}">${env.BUILD_URL}</a></td></tr>
                </table>

                <br>

                <b>Console Log:</b><br>
                <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a>

                <br><br>

                <b>Allure Report:</b><br>
                <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a>
                """
            )
        }

        cleanup {
            echo 'Pipeline completed.'
        }
    }
}