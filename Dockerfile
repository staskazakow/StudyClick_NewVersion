FROM node:18-alpine as build

WORKDIR /usr/src/app

ADD *.json ./

RUN npm install --legacy-peer-deps

ADD ./public ./public
ADD ./src ./src
