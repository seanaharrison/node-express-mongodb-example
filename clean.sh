#Stop docker containers
docker stop nodeappcontainer_lc
docker stop mongodb_lc

sleep 5

#Show containers exited
docker ps -a | grep nodeappcontainer_lc
docker ps -a | grep mongodb_lc

#Delete docker containers
docker rm nodeappcontainer_lc
docker rm mongodb_lc

sleep 5

#Delete docker volumes
ocker volume rm nodejs-public

#Show docker volumes
docker volume ls

#Delete docker network
docker network rm nodejsNetwork

#Show docker network
docker network ls | grep nodejsNetwork

#Show containers running
docker ps | grep mongodb_lc
docker ps | grep nodeappcontainer_lc

#Delete docker images
docker rmi nodeappimage_lc:latest
docker rmi mongo:3.6
docker rmi harbor.tallerdevops.com/lcubas/nodeappimage_lc:latest
docker rmi harbor.tallerdevops.com/lcubas/mongo:3.6
docker rmi node:15.11.0-alpine3.10

#Check docker images
docker images | grep nodeappimage_lc
docker images | grep mongo
docker images | grep node

