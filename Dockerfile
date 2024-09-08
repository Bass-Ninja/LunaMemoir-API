FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./


RUN yarn install
RUN yarn build

COPY . .

COPY .env.stage.prod .env

EXPOSE 6001

CMD ["sh", "-c", "yarn migration:run && yarn start:prod"]

