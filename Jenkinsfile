  pipeline {
    agent any
    environment {
      IMAGE = "catpower:scm-${BUILD_NUMBER}"
    }
    stages {
      stage('Build') {
        steps {
          echo 'Build de l image Docker depuis le code recupere par SCM'
          sh '''
            { echo "FROM nginx:alpine"; echo "COPY . /usr/share/nginx/html"; } > Dockerfile
            docker build -t $IMAGE .
          '''
        }
      }
      stage('Test') {
        steps {
          echo 'Test HTTP 200'
          sh '''
            docker rm -f catpower-test 2>/dev/null || true
            docker run -d --name catpower-test --network devops $IMAGE
            sleep 2
            CODE=$(docker run --rm --network devops curlimages/curl:latest -s -o /dev/null -w "%{http_code}" http://catpower-test/)
            docker rm -f catpower-test
            echo "==> Code HTTP : $CODE"
            if [ "$CODE" != "200" ]; then exit 1; fi
          '''
        }
      }
      stage('Deploy') {
        steps {
          echo 'Deploiement continu sur le port 8081'
          sh '''
            docker rm -f catpower 2>/dev/null || true
            docker run -d --name catpower --network devops --restart unless-stopped -p 8081:80 $IMAGE
            echo "==> CatPower deploye : http://147.79.21.64:8081"
          '''
        }
      }
    }
  }
