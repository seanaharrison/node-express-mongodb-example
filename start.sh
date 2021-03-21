docker run -d --name mongodb_lc -p 27017:27017 --network nodejsNetwork --restart always -v "$pwd"/database-data:/data/db mongo:3.6
docker run -d --name nodeappcontainer_lc -p 8081:3000 --network nodejsNetwork --restart always -e MONGO_HOST=mongodb_lc -e MONGO_PORT=27017 -e MONGO_DB=nodejsdb -v nodejs-public:/usr/app/web/public nodeappimage_lc:latest

