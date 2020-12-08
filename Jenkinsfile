pipeline {
    agent any
    
    tools{
        nodejs 'node'
    }

    stages {
        stage('build') {
            steps {
                sh 'npm -version'
                sh "rm -rf sa-practica1"
                sh 'git clone https://github.com/nejagope/sa-practica1'
                dir("sa-practica1"){
                    sh "npm cache clean --force "
                    sh "npm install"
                }
                
                
            }
        }
        
        stage('test') {
            steps {
                dir("sa-practica1"){
                    sh "npm test"
                }
            }
        }
        
        stage('deploy'){
            steps{
                withAWS(region:'us-east-2', credentials: 's3') {
                    s3Upload(bucket: 'sa-practica1', file: 'sa-practica1/src/index.html')
                }
            }
        }
    }
}