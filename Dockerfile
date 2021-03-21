#Base image for node. Official image of NodeJS from DockerHub
FROM node:15.11.0-alpine3.10

#Add Labels
LABEL mantainer="Luis Cubas" \
      master="Devops & Cloud Computing" \
      description="Ejercicio 3" \
      version="1.0" \
      date="21/03/2021"

#Define environment variable MONGO_HOST with localhost as default value
ENV MONGO_HOST=localhost

#Define working directory of docker where our code will be placed inside docker
WORKDIR /usr/app/web

#Copy package.json to working directory
COPY package.json .

#Install npm dependencies
RUN npm install

#Copy rest of files to working directory
COPY . .

#Expose default port to access from localhost
EXPOSE 4000

#Define Entrypoint using npm run command 
ENTRYPOINT [ "/usr/local/bin/npm", "run"]

#Default command to run after image is build
CMD  [ "start-app" ]
