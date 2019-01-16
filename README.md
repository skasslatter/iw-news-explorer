# Interfacewerk News Explorer Test

## Docker

We've set everything up so that you can easily get started with Docker. The following command starts a shell session in Docker.

`docker-compose run --service-ports --workdir /myapp app sh`

From there, you can run the usual Angular CLI commands through npm:

* `npm start` continuously builds and serves the app
* `npm run ng g component my-component` scaffolds a new component
* etc.

## Without Docker

If you don't use Docker. Do the following: `npm install && npm start`

This should install all the needed packages and start a local server.

## Angular CLI

Please use the [Angular CLI](https://cli.angular.io/). Two reasons for that:

* it reduces your development time and effort
* it establishes conventions

## Dependencies, APIs and helpers

* Angular 6 with the Angular CLI
* We have pre-installed for you 3 packages: font-awesome, bootstrap (CSS only) and primeng
* Use the `NewsApiService` defined in `services/news-api.service.ts` to use the News API. For further documentation, check https://newsapi.org/docs/endpoints/everything and https://newsapi.org/docs/endpoints/sources
* Use the `FeedStoreService` defined in `services/feed-store.service.ts` to store pre-saved feeds.
