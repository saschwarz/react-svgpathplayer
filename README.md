[![build status](https://secure.travis-ci.org/saschwarz/react-svgpathplayer.png)](http://travis-ci.org/saschwarz/react-svgpathplayer) [![bitHound Score](https://www.bithound.io/github/saschwarz/react-svgpathplayer/badges/score.svg)](https://www.bithound.io/github/saschwarz/react-svgpathplayer) [![Dependency Status](https://david-dm.org/saschwarz/react-svgpathplayer.svg)](https://david-dm.org/saschwarz/react-svgpathplayer)
# react-svgpathplayer - Boilerplate for React.js components

This is a simple boilerplate that has been developed to make it easier to develop React components and small projects.

## Basic Usage

* Linting - **npm run lint** - Runs ESLint.
* Testing - **npm test** and **npm run tdd** - Runs Karma/Mocha/Chai/Phantom. Code coverage report is generated through istanbul/isparta to `build/`.
* Developing - **npm start** - Runs the development server at *localhost:8080* and use Hot Module Replacement. You can override the default host and port through env (`HOST`, `PORT`).
* Creating a version - **npm version <x.y.<>** - Updates */dist* and *package.json* with the new version and create a version tag to Git.
* Publishing a version - **npm publish** - Pushes a new version to npm and updates the project site.

## Highlighting Demo

```js
var a = 5;
var b = 10;

// just trying out code highlighting feature here
console.log(a + b);
```

## License

*react-svgpathplayer* is available under the MIT license. See LICENSE for more details.
