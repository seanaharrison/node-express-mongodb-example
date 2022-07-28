FROM node:latest

MAINTAINER Sarthak Khandelwal 

RUN echo "Tryin to build my first application"

COPY . /var/www

WORKDIR /var/www

RUN npm install

EXPOSE 3000
