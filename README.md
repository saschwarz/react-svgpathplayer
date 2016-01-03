[![build status](https://secure.travis-ci.org/saschwarz/react-svgpathplayer.svg?style=flat-square)](http://travis-ci.org/saschwarz/react-svgpathplayer) [![bitHound Score](https://www.bithound.io/github/saschwarz/react-svgpathplayer/badges/score.svg?style=flat-square)](https://www.bithound.io/github/saschwarz/react-svgpathplayer) [![Dependency Status](https://david-dm.org/saschwarz/react-svgpathplayer.svg?style=flat-square)](https://david-dm.org/saschwarz/react-svgpathplayer) [![license](https://img.shields.io/npm/v/react-svgpathplayer.svg?style=flat-square)](https://www.npmjs.com/package/react-svgpathplayer) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/saschwarz/react-svgpathplayer/blob/master/LICENSE)
# react-svgpathplayer

## Description/Features

This player component loads an [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) image as it's child element using [Snap.svg](http://snapsvg.io/). It has two modes of operation: play/pause animation of a `path` element and/or forward/backward display of `path` elements contained in a parent element ("stepped" path or "stepping").

An SVG [marker](http://www.w3.org/TR/SVG/painting.html#Markers) can also be specified to follow the leading end of the the path during animation and to be positioned at the end of stepped paths.

The player is configured by supplying CSS selector strings for the animated path, parent element of stepped segments, and marker. These strings are supplied to SnapSVG's `select` method and are applied only to the SVG element in the DOM. CSS class selectors are recommended if multiple players will be used on a single page; if `id`s are used in SVG images they must be globally unique to the page.

The presence/absence of `path` and `segments` properties enables/disables their respective control buttons and display sections.

The player's controls can be hidden and the path can be animated once or looped repeatedly. See the demo for configuration examples.

## Basic Usage

See the [demo](http://saschwarz.github.io/react-svgpathplayer/) for example usage of this component and coposition of the SVG images.

There is also a [demo](http://saschwarz.github.io/react-svgpathplayer/script.html) using this component in a plain HTML/JS file.

This component is NPM installable:
```
npm install react-svgpathplayer
```

A UMD build for use directly in the browser is available via CDN at https://npmcdn.com/react-svgpathplayer.

## Developers

* Linting - **npm run lint** - Runs ESLint.
* Developing - **npm start** - Runs the development server at *localhost:8080* and use Hot Module Replacement. You can override the default host and port through env (`HOST`, `PORT`).
* Testing - **npm test** - Runs a single pass through the tests and writes coverage to `build` directory.
* TDD - **npm run tdd** - watches for file changes and re-runs tests/coverage

## License

*react-svgpathplayer* is available under the MIT license. See LICENSE for more details.
