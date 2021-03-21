FROM node:15.11.0-alpine3.10

LABEL mantainer="Luis Cubas" \
      description="Ejercicio 3" \
      version="1.0"

ENV MONGO_HOST=localhost

WORKDIR /usr/app/web

COPY package.json .

RUN npm install

COPY . .

RUN chmod 775 entrypoint.sh

EXPOSE 3000

CMD npm start

#ENTRYPOINT [ "/usr/app/web/entrypoint.sh"]

#CMD [ "start" ]


