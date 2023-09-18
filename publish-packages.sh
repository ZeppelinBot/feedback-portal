#!/bin/bash

docker image tag zeppelin-feedback-portal-meta:latest ghcr.io/zeppelinbot/zeppelin-feedback-portal-meta:latest
docker push ghcr.io/zeppelinbot/zeppelin-feedback-portal-meta:latest

docker image tag zeppelin-feedback-portal-app:latest ghcr.io/zeppelinbot/zeppelin-feedback-portal-app:latest
docker push ghcr.io/zeppelinbot/zeppelin-feedback-portal-app:latest
