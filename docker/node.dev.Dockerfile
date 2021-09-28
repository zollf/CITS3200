FROM node:14

WORKDIR /app

COPY . /app

CMD yarn && yarn dev-server