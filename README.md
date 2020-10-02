# News Explorer

To get started, do the following:

`npm install && npm start`

This should install all the needed packages and start a local server.

## Angular CLI

Please use the [Angular CLI](https://cli.angular.io/). Two reasons for that:

* it reduces your development time and effort
* it establishes conventions

## Dependencies, APIs and helpers

* Angular 8 with the Angular CLI.
* @angular-redux
* Font-awesome and Primeng.

## Architecture

### No backend

At the moment there is no backend to store user's data, no need to worry about that. We focus on the frontend.

### Redux Store

We store the application state in a redux store. To change the state, you must dispatch actions. Those actions will then be digested by reducers to generate a new state.

### Redux Effects

There are asynchronous side effects performed in this application:

* when we fetch news to render them
* when we load the feed

Usually, we want to display a loading indicator when those requests are sent and we want to change the application state when we receive the response. It usually looks like:

```js
dispatch(loadingStateAction(…))
sendRequest().then(res => dispatch(setResponseAction(res)))
```

We decided to use the `redux-observable` epics to perform all of this. The idea is that the component now only dispatches one action. This action is then digested by a function called an "epic", which in turns sends the request and returns an observable of another redux action, which changes the state.

One advantage of doing so is to decouple the application business logic from the components. Testing and debugging is therefore easier and the code in components is much simpler.

## Tasks

### Create an Article component

The first task consists in creating a component that renders a summary of an article. The following are required:

* this component takes an input: an article
* this component is used in the `feed-articles.component.html` template
* the component displays the article's title, the first 200 characters of the content, the author and the date
* the component also displays a button: when the button is pressed, it should open a modal (use the `p-dialog` from PrimeNG v7) and displays the full content of the article and the image, if available.
