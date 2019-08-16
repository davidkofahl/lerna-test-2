FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y vim python-pip

USER jenkins

RUN pip install awscli --upgrade --user

# COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

