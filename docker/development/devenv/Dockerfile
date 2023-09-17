FROM ubuntu:20.04

ARG DEV_UID
ARG DEV_SSH_PASSWORD

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Set up some core packages
RUN apt-get update
RUN apt-get install -y sudo curl software-properties-common ca-certificates gnupg

RUN add-apt-repository ppa:git-core/ppa && apt-get update && apt-get install -y git

# Set up SSH access
RUN apt-get install -y openssh-server iptables
RUN mkdir /var/run/sshd
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u $DEV_UID ubuntu
RUN echo "ubuntu:${DEV_SSH_PASSWORD}" | chpasswd

# Install Node.js 18 and packages needed to build native packages
RUN sudo mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install -y nodejs gcc g++ make python3

# Prepare mount root
RUN mkdir -p /var/project
RUN chown ubuntu /var/project

CMD ["/usr/sbin/sshd", "-D", "-e"]
