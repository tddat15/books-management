## Title

Book-management

## Description

An application used to manage books, using NestJS platform, Elasticsearch database and TypeScript language to build.

## Version of platform and library

node: v14.20.0
nestjs: 9.3.12
elasticsearch: v7.16.0
fastify: 4.15.0

## Installation and run on local machine

To install this application, clone the repository and run the following commands:

```bash
$ yarn install

$ yarn build

$ yarn dev
```

This will install the necessary dependencies and start the server on port 3000.
The swagger website running on "http://127.0.0.1:3000/book-management"
You can access to the database tool Kibana on "http://localhost:5601/app/home#"

## Installation and run on docker

To install this application in Docker, you need docker in your machine and run the following commands:

```bash
$ docker-compose up -d --build

$ docker-compose logs -f -t
```

Docker will help to install necessary dependencies and start the server on port 3000.
The swagger website running on "http://127.0.0.1:3000/book-management"
You can access to the database tool Kibana on "http://localhost:5601/app/home#"

## Introduce overview about API in here: http://127.0.0.1:3000/book-management#/books

- `GET /books`: Can search and return a list of books, also can pagination.

- `GET /books/:id`: Returns a specific book by ID.

- `POST /books`: Creates a new book.

- `PUT /books/:id`: Updates an existing book by ID.

- `DELETE /books/:id`: Delete an existing book by ID.

- `POST /books/seeds`: Reset all data to the example data.

## TODO

This application still have many shortcomings:

- No unit test yet
- No catching with Redis
- Application not yet deployed

## License

Nest is [MIT licensed](LICENSE).
