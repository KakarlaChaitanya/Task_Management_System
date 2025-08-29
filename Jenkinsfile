pipeline {
    agent any

    tools {
        maven 'Maven3'   // set in Jenkins Global Tool Configuration
        jdk 'Java17'     // set in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/<your-repo>.git'
            }
        }

        stage('Backend Build - Spring Boot') {
            steps {
                dir('TaskManagement') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Frontend Build - Angular') {
            steps {
                dir('Task-Management') {
                    sh '''
                        npm install
                        npm run build --prod
                    '''
                }
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: '**/target/*.jar', followSymlinks: false
            }
        }
    }

    post {
        success {
            echo '✅ Build completed successfully!'
        }
        failure {
            echo '❌ Build failed. Check logs.'
        }
    }
}
