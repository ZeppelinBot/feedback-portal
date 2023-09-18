#!/bin/bash

docker build -t zeppelin-feedback-portal-meta ./packages/meta
docker build -t zeppelin-feedback-portal-app ./packages/app
