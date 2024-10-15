<p style="text-align:center;">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Luna-Memoir] is a web app that allows an individual to keep track of their dreams, allowing them to analyze the pattern or possible symbols.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# debug mode
$ yarn run start:debug
```
## Docker
```
 docker-compose --env-file .env.stage.prod up --build
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Database

Create 2 files in the root of the project: 

- .env.stage.dev
- .env.stage.prod


E.g. env file for the dev enviroment
```bash
JWT_SECRET=6a464532323517e7633a804f03aa8e6e5707ad86c86a28f05c8f5ba6461cb318

STAGE=dev
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=luna-memoir

PORT=5000
HOST=127.0.0.1
```


## Migrations

```bash
# generate new migration
$ yarn migration:generate -p ./src/database/migrations/<MigrationName>

# apply migration
$ yarn migration:run

# revert last migration
$ yarn migration:revert
```

