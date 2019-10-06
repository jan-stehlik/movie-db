# Movie database search

Movie database search is a simple react application that allows user to search for a movie by the search term. It uses [OMDb API](http://www.omdbapi.com/) to fetch movies from IMDb.

## Prerequisites

- node version >= 8.12 [Download node](https://nodejs.org/en/)
- dependency package manager npm or yarn

## Installation

To install all the dependencies run the command:

```
yarn install
```

## Running the app

To run the app in development mode run the command:

```
yarn start
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser. Please note that currently the app only runs the development bundle and not production ready bundle.

## Testing

The application is fully covered by tests. To run all test suite run:

```
yarn test
```

## Technology choices explained

This app uses number of libraries such react, material-ui, react testing libary etc. In this section I will explain reasoning behind some of the choices.

### React

React is mature industry leading UI library that enhances reusability. It has rich eco system that allows for fast prototyping.

### Material UI

For fast prototyping I chose to install component library. Material UI is mature UI component library that is very well maintaned and documented which makes it a great choise for quick demo applications.

### React testnig library

In combination with jest I use react testing libary for testing UI. This library focuses on testing public api of a part of UI rather than implementation details. Given this is the way the application is used in production this level of testing gives the best confidence that application works as intended. Additionally react testing library forces us to write more accessible UI too.

## Next steps

At the moment applications allows user to:

- search for any term in movies database
- see up to 10 results for the search term. Each result includes title and the poster of the movie (if poster exists)
- see error if searching was unsuccessful

If I had more time I would focus on:

- paging, allowing user to view more than 10 movies for a search term
- better placeholder in place of alt text of a poster
