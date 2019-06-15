FROM mhart/alpine-node:latest

RUN apk add --update bash git
COPY package.json package-lock.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /usr/var/app && cp -a /tmp/node_modules /usr/var/app/

WORKDIR /usr/var/app/server
COPY . /usr/var/app/server

EXPOSE 3001
