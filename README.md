# quotes-app
This is a  Quotes app exercise for Auth0.

## Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Testing](#testing)

### About
The app uses an external API to browse shared quotes. To mantain isolation on the containers, the `node_modules` folder it's inside docker. To run a command related to `node_modules` as `yarn` or `yarn lint` please use the following:

```sh
docker exec -it <container_name> <command>
```
Example:

```sh
docker exec -it quotesapp_www_1 yarn jest
```

The app uses the following technologies.

* [Docker](https://github.com/docker)
* [React.js](https://github.com/facebook/react)
* [Next.js](https://github.com/zeit/next.js/)
* [Yarn](https://github.com/yarnpkg/yarn)
* [Babel](https://babeljs.io)
* [ESLint](http://eslint.org)

### Prerequisites
* docker
* docker-compose
* npm
* node
* yarn

### Installation

Clone repo
```sh
git clone https://github.com/gabriel-miranda/quotes-app.git
cd quotes-app
```

Build with docker-compose
```sh
docker-compose build
```

Up with docker-compose
```sh
docker-compose up
```

### Testing
The preferred way is to do it inside docker.

Run the app
```sh
docker-compose up
```

Run the tests
```sh
docker exec -it quotesapp_www_1 yarn jest

```