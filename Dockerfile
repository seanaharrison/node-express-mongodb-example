FROM node:15.11.0-alpine3.10

LABEL mantainer="Luis Cubas" \
      description="Ejercicio 3" \
      version="1.0"

WORKDIR /usr/app/web

COPY . .

RUN npm install

CMD npm start


