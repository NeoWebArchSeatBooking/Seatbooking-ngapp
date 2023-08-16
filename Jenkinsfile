pipeline {
  agent any

  stages {
    stage('Deploy to K8s') {
      steps {
        withKubeConfig([credentialsId: 'kube-config']) {
          bat 'kubectl get deployment'
          bat 'kubectl delete deployment/seatbooking-webapp --ignore-not-found=true'
          bat 'kubectl delete service/seatbooking-webapp --ignore-not-found=true'
          bat 'kubectl create -f ./deployment.yaml'
        }
      } 
    }
  }
}
