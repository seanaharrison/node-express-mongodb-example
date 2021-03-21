#Build docker image
docker build -t nodeappimage_lc:latest .

#Tag and push nodejs docker image to harbor
docker tag nodeappimage_lc:latest harbor.tallerdevops.com/lcubas/nodeappimage_lc:latest
docker push harbor.tallerdevops.com/lcubas/nodeappimage_lc:latest

#Tag and push mongo docker image to harbor
docker pull mongo:3.6
docker tag mongo:3.6 harbor.tallerdevops.com/lcubas/mongo:3.6
docker push harbor.tallerdevops.com/lcubas/mongo:3.6
