# Stage 1: Build the application
FROM node:20-slim AS build
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build
COPY .env.stage.prod .env

EXPOSE 6001

CMD ["sh", "-c", "yarn migration:run && yarn start:prod"]