pipeline {
  agent any

  stages {
    stage('Deploy to K8s') {
      steps {
        withKubeConfig([credentialsId: 'kube-config']) {
          bat 'kubectl get deployment'
          bat 'kubectl delete deployment/seatbooking-web-deployment  --ignore-not-found=true'
          bat 'kubectl delete service/seatbooking-web  --ignore-not-found=true'
          bat 'kubectl create -f ./deployment.yaml'
        }
      } 
    }
  }
}
