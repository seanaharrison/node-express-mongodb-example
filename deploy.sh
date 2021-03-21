#Create network
docker network create -d bridge nodejsNetwork

#Show docker network
docker network ls |  grep nodejsNetwork

#Create docker volumes - NodeJSAPP
docker volume create nodejs-public

#Show docker volumes
docker volume ls | grep nodejs-public

#Start mongodb container
 # --restart always --> To enable that this container start automatically after virtual machine restart
 # -v "$pwd"/database-data:/data/db --> To persist mongodb data
 # harbor.tallerdevops.com/lcubas/mongo:3.6 --> Image from harbor

docker run -d --name mongodb_lc -p 27017:27017 --network nodejsNetwork --restart always -v "$pwd"/database-data:/data/db harbor.tallerdevops.com/lcubas/mongo:3.6

#Start nodejs container
 # --restart always --> To enable that this container start automatically after virtual machine restart
 # -v nodejs-public:/usr/app/web/public --> To persist nodejs data
 # -e MONGO_HOST=mongodb_lc -e MONGO_PORT=27017 -e MONGO_DB=nodejsdb --> Environment variables to define name, port and mongo database dynamically. Those variables: MONGO_HOST, MONGO_PORT and MONGO_DB exists in .env file with their default values
 # harbor.tallerdevops.com/lcubas/nodeappimage_lc:latest --> Image from harbor
 # I defined 3 options in package.json to start trhis container:
 #  -Default value is: start-app --> To start nodejs app normally
 #  -2nd option: start-app-debug --> To start nodejs app with debug
 #  -3rd option: check-node-version --> To get node version inside docker container

docker run -d --name nodeappcontainer_lc -p 8081:3000 --network nodejsNetwork --restart always -e MONGO_HOST=mongodb_lc -e MONGO_PORT=27017 -e MONGO_DB=nodejsdb -v nodejs-public:/usr/app/web/public harbor.tallerdevops.com/lcubas/nodeappimage_lc:latest

#Show containers running
docker ps | grep mongodb_lc
docker ps | grep nodeappcontainer_lc

