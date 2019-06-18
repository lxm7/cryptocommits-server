FROM mhart/alpine-node:latest

COPY package.json package-lock.json /tmp/
RUN cd /tmp && npm ci
RUN mkdir -p /usr/var/app && cp -a /tmp/node_modules /usr/var/app/

WORKDIR /usr/var/app/server
COPY . ./

EXPOSE 3001
