# Deploying the app in Kubernetes with ArgoCD

1. Create namespace: `kubectl create namespace zeppelin-feedback-portal`
2. Create secret: `kubectl create secret -n zeppelin-feedback-portal zeppelin-feedback-portal-secrets`
3. Edit secret and input all required env values in data: `kubectl edit secret -n zeppelin-feedback-portal zeppelin-feedback-portal-secrets`
4. Create application in ArgoCD UI:
  - Name: zeppelin-feedback-portal
  - Project: default
  - Repository URL: https://github.com/ZeppelinBot/feedback-portal.git
  - Target revision: main
  - Path: kubernetes
5. Sync the application
