(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("_"), require("Snap"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "_", "Snap"], factory);
	else if(typeof exports === 'object')
		exports["SVGPathPlayer"] = factory(require("React"), require("_"), require("Snap"));
	else
		root["SVGPathPlayer"] = factory(root["React"], root["_"], root["Snap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _snapsvg = __webpack_require__(4);
	
	var _snapsvg2 = _interopRequireDefault(_snapsvg);
	
	__webpack_require__(5);
	
	var _controls = __webpack_require__(9);
	
	var _controls2 = _interopRequireDefault(_controls);
	
	var _spinner = __webpack_require__(11);
	
	var _spinner2 = _interopRequireDefault(_spinner);
	
	var SVGPathPlayer = (function (_React$Component) {
	    _inherits(SVGPathPlayer, _React$Component);
	
	    _createClass(SVGPathPlayer, null, [{
	        key: 'propTypes',
	
	        /*
	         Animates "drawing" of path with optional marker that is moved
	         along the path. Stepping is enabled if segments are supplied.
	         Segments are not animated only hidden/displayed.
	         Assumes:
	         In the input svg:
	           - path is initially display:none
	           - segments are initially display:none
	           - marker can have any initial display and it will be made
	             visible and positioned at the start of the path on mount.
	         - If a marker is defined and the path or segments have markers
	           their markers will be hidden and the marker will be moved and
	           displayed (at the start of the path/end of segments).
	         */
	        value: {
	            controls: _react2['default'].PropTypes.bool, // show controls
	            decimalPlaces: _react2['default'].PropTypes.number, // distance display decimal places - default to 1
	            loading: _react2['default'].PropTypes.bool, // show loading indicator
	            marker: _react2['default'].PropTypes.string, // selector to SVG object to use as path marker
	            path: _react2['default'].PropTypes.string, // selector to SVG path to render
	
	            position: _react2['default'].PropTypes.number, // start position along path
	            repeat: _react2['default'].PropTypes.bool, // loop playing
	            scale: _react2['default'].PropTypes.number, // multiply length/position by this before display default 1
	            segments: _react2['default'].PropTypes.string, // selector to container of SVG path segments to render
	            startplaying: _react2['default'].PropTypes.bool, // start playing
	            step: _react2['default'].PropTypes.number, // starting segment 0-based
	
	            svg: _react2['default'].PropTypes.string.isRequired, // URL to svg element
	            time: _react2['default'].PropTypes.number, // path animation time defaults to 2000ms
	            units: _react2['default'].PropTypes.string // unit display string default ''
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            controls: true,
	            decimalPlaces: 1,
	            loading: true,
	            marker: '',
	            path: undefined,
	            position: 0,
	            repeat: false,
	            scale: 1.0,
	            segments: undefined,
	            step: -1,
	
	            startplaying: false,
	            svg: '',
	            time: 2000,
	            units: ''
	        },
	        enumerable: true
	    }]);
	
	    function SVGPathPlayer(props) {
	        _classCallCheck(this, SVGPathPlayer);
	
	        _get(Object.getPrototypeOf(SVGPathPlayer.prototype), 'constructor', this).call(this, props);
	        this.state = {
	            length: 0,
	            position: this.props.position,
	            mode: 'loading',
	            step: this.props.step,
	            steps: 0
	        };
	        this.svg = null;
	        this.snapAnimate = null;
	        this.currentSegment = null;
	        this.snapSegments = [];
	
	        this.path = null;
	        this.marker = null;
	        this.segmentLengths = [];
	
	        this.play = this.play.bind(this);
	        this.playSegmentForward = this.playSegmentForward.bind(this);
	        this.playSegmentBackward = this.playSegmentBackward.bind(this);
	        this.pause = this.pause.bind(this);
	        this.loadFile = this.loadFile.bind(this);
	    }
	
	    _createClass(SVGPathPlayer, [{
	        key: 'play',
	        value: function play() {
	            var _this = this;
	
	            var start = this.state.position;
	            if (start >= this.state.length) {
	                start = 0; // at the end and pressed play so restart
	            }
	            var remainingLength = this.state.length - start;
	            var remainingTime = this.props.time * remainingLength / this.state.length;
	            this._segmentToPath();
	            this.setState({ mode: 'playing' });
	            this.path.attr({ 'stroke-dasharray': this.state.length + ' ' + this.state.length });
	            this.path.attr({ display: 'block' });
	            this.snapAnimate = _snapsvg2['default'].animate(remainingLength, 0, function (val) {
	                // incremental callback
	                var newPos = _this.state.length - val;
	                _this.path.attr({ 'stroke-dashoffset': val });
	                if (_this.marker) {
	                    _this._positionMarker(_this.path, newPos, _this.state.length);
	                }
	                _this.setState({ position: newPos,
	                    step: _this._segmentFromPosition(newPos) });
	            }, remainingTime, mina.linear, function () {
	                // end callback
	                _this.setState({ mode: 'path',
	                    position: 0 });
	                if (_this.props.repeat) {
	                    setTimeout(function () {
	                        return _this.play();
	                    }, 1);
	                }
	            });
	        }
	    }, {
	        key: 'playSegmentForward',
	        value: function playSegmentForward() {
	            var nextStep = undefined;
	            this.pause();
	            if (this.state.step === -1 || // never stepped
	            this.state.step + 1 > this.state.steps - 1) {
	                // stepped off end
	                nextStep = 0;
	            } else {
	                nextStep = this.state.step + 1;
	            }
	            this._transitionSegment(nextStep);
	        }
	    }, {
	        key: 'playSegmentBackward',
	        value: function playSegmentBackward() {
	            var nextStep = undefined;
	            this.pause();
	            if (this.state.step <= 0) {
	                // never stepped start at -1
	                nextStep = this.state.steps - 1;
	            } else {
	                nextStep = this.state.step - 1;
	            }
	            this._transitionSegment(nextStep);
	        }
	    }, {
	        key: 'loadFile',
	        value: function loadFile(file) {
	            var pathLength = 0;
	            var mode = 'path';
	            this.svg = (0, _snapsvg2['default'])(this.svgImage);
	            this.svg.append(file);
	            if (this.props.path) {
	                this._selectPath(this.props.path, true);
	                pathLength = this.path && this.path.getTotalLength() || 0;
	            }
	            if (this.props.segments) {
	                this.snapSegments = this.svg.selectAll(this.props.segments + ' path');
	                this.segmentLengths = this._segmentLengths();
	                if (this.segmentLengths.length > 0 && !pathLength) {
	                    pathLength = this._segmentPosition(this.snapSegments.length - 1);
	                }
	            }
	            if (this.props.marker) {
	                this.marker = this.svg.select(this.props.marker);
	                if (this.marker) {
	                    this.marker.attr({ marker: '', markerStart: '', markerEnd: '' });
	                }
	                if (this.props.path && this.path) {
	                    this.path.attr({ marker: '', markerStart: '', markerEnd: '' });
	                }
	                if (this.props.segments) {
	                    this.snapSegments.attr({ marker: '', markerStart: '', markerEnd: '' });
	                }
	                this._positionMarker(this.path, 0);
	            }
	            this.setState({ mode: mode,
	                steps: this.snapSegments.length,
	                length: pathLength });
	            this._hideSegments();
	            if (this.props.startplaying) {
	                this.play();
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _snapsvg2['default'].load(this.props.svg, this.loadFile);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.svg.remove(); // destory SnapSVG for this DOM element
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var loading = this.state.mode === 'loading',
	                controls = '';
	            if (this.props.controls) {
	                var props = {
	                    length: this.state.length,
	                    mode: this.state.mode,
	                    position: this.state.position,
	                    scale: this.props.scale,
	                    step: this.state.step,
	                    units: this.props.units
	                };
	                if (this.props.path) {
	                    props.pause = this.pause;
	                    props.play = this.play;
	                }
	                if (this.props.segments) {
	                    props.backward = this.playSegmentBackward;
	                    props.forward = this.playSegmentForward;
	                }
	                controls = _react2['default'].createElement(_controls2['default'], props);
	            }
	            return _react2['default'].createElement(
	                'div',
	                { className: 'svg-path-player' },
	                _react2['default'].createElement(_spinner2['default'], { loading: this.props.loading && loading }),
	                _react2['default'].createElement('div', { className: 'svg-container svg-container-box', ref: function (ref) {
	                        return _this2.svgImage = ref;
	                    } }),
	                controls
	            );
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.setState({ mode: 'path' });
	            this.snapAnimate && this.snapAnimate.stop(); // resume() doesn't work... :(
	        }
	    }, {
	        key: '_positionMarker',
	        value: function _positionMarker(path, location, end) {
	            if (this.marker) {
	                var point = _snapsvg2['default'].path.getPointAtLength(path, location);
	                var now = point;
	                if (end && end - location < 1) {
	                    // Snap.svg at very end of path returns rotation as 90 degrees
	                    while (point.alpha === 90) {
	                        location -= 1;
	                        point = _snapsvg2['default'].path.getPointAtLength(path, location);
	                    }
	                }
	                this.marker.transform('translate(' + now.x + ',' + now.y + ') rotate(' + (point.alpha - 90) + ')');
	            }
	        }
	    }, {
	        key: '_selectPath',
	        value: function _selectPath(pathClass, display) {
	            var path = this.svg.select(pathClass);
	            if (path) {
	                path.attr({ display: '' });
	            }
	            this.path = this.svg.select(pathClass + ' path');
	            if (!display) {
	                this._hidePath();
	            }
	        }
	    }, {
	        key: '_hidePath',
	        value: function _hidePath() {
	            if (this.path) {
	                this.path.attr({ display: 'none' });
	            }
	        }
	    }, {
	        key: '_transitionSegment',
	        value: function _transitionSegment(nextStep) {
	            var pathLen = undefined;
	            this._pathToSegment();
	            this.setState({ mode: 'playing' });
	            this._hideCurrentSegment();
	            this._showSegment(nextStep);
	
	            pathLen = this._segmentPosition(nextStep);
	            this._positionMarker(this.currentSegment, pathLen, pathLen);
	            this.setState({ step: nextStep,
	                position: this._segmentPosition(nextStep),
	                mode: 'segment' });
	        }
	    }, {
	        key: '_segmentFromPosition',
	        value: function _segmentFromPosition(pos) {
	            var x = _lodash2['default'].findLastIndex(this.segmentLengths, function (length) {
	                return pos >= length;
	            });
	            x = x < 0 ? 0 : x;
	            return x;
	        }
	    }, {
	        key: '_pathToSegment',
	        value: function _pathToSegment() {
	            // switch from playing path to playing segment
	            if (this.mode === 'playing') {
	                this.pause();
	            }
	            this.setState({ mode: 'segment' });
	            this._hidePath();
	        }
	    }, {
	        key: '_segmentToPath',
	        value: function _segmentToPath() {
	            // switch from playing segment to playing path
	            this.setState({ mode: 'path' });
	            this._hideSegments();
	        }
	    }, {
	        key: '_hideSegments',
	        value: function _hideSegments() {
	            _lodash2['default'].each(this.snapSegments, function (segment) {
	                segment.attr({ display: 'none' });
	            });
	        }
	    }, {
	        key: '_hideCurrentSegment',
	        value: function _hideCurrentSegment() {
	            if (this.currentSegment) {
	                this.currentSegment.attr({ display: 'none' });
	            }
	        }
	    }, {
	        key: '_showSegment',
	        value: function _showSegment(step) {
	            this.currentSegment = this.snapSegments[step];
	            this.currentSegment.attr({ display: 'block' });
	        }
	    }, {
	        key: '_segmentLengths',
	        value: function _segmentLengths() {
	            // total length of path at end of each segment
	            return _lodash2['default'].reduce(this.snapSegments, function (a, v) {
	                if (_lodash2['default'].last(a)) {
	                    a.push(_lodash2['default'].last(a) + v.getTotalLength());
	                } else {
	                    a.push(v.getTotalLength());
	                }
	                return a;
	            }, []);
	        }
	    }, {
	        key: '_segmentPosition',
	        value: function _segmentPosition(step) {
	            return this.segmentLengths[step];
	        }
	    }]);
	
	    return SVGPathPlayer;
	})(_react2['default'].Component);
	
	exports['default'] = SVGPathPlayer;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Snap;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&includePaths[]=/Users/saschwarz/dev/react-svgpathplayer/node_modules!./svgpathplayer.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&includePaths[]=/Users/saschwarz/dev/react-svgpathplayer/node_modules!./svgpathplayer.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "/* http://chadkuehn.com/animated-font-spinners/ */\n.glyphicon-spin {\n  -webkit-animation: spin 1000ms infinite linear;\n  animation: spin 1000ms infinite linear;\n}\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n\n@keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n\n.svg-path-player {\n  border: 1px solid #d3d3d3;\n  position: relative;\n}\n\n.svg-path-player .buttons {\n  border-top: 1px solid #d3d3d3;\n  padding: 2px;\n  overflow: hidden;\n}\n\n.svg-path-player .buttons .btn {\n  margin-right: 2px;\n}\n\n.svg-path-player .buttons .btn .glyphicon {\n  top: 1px;\n}\n\n.svg-path-player .buttons .status {\n  float: right;\n}\n\n.svg-path-player .buttons .status:after {\n  clear: both;\n}\n\n.svg-path-player .buttons .steps, .svg-path-player .buttons .distance {\n  height: 2em;\n  padding-top: 6px;\n  padding-right: 4px;\n}\n\n.svg-path-player .buttons .steps {\n  margin-right: 10px;\n}\n\n.svg-path-player .buttons .inactive {\n  color: #d3d3d3;\n}\n\n.svg-path-player .loading {\n  position: absolute;\n  top: 45%;\n  left: 47%;\n  color: #d3d3d3;\n  font-size: 1.5em;\n}\n", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(10);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Controls = (function (_React$Component) {
	    _inherits(Controls, _React$Component);
	
	    function Controls() {
	        _classCallCheck(this, Controls);
	
	        _get(Object.getPrototypeOf(Controls.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(Controls, [{
	        key: '_displayDistance',
	        value: function _displayDistance(position) {
	            return (position * this.props.scale).toFixed(this.props.decimalPlaces);
	        }
	    }, {
	        key: '_displayStep',
	        value: function _displayStep(step) {
	            if (step < 0) {
	                return 0;
	            }
	            return step + 1;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var steps = undefined,
	                playPauseButtons = undefined,
	                segmentButtons = undefined;
	            var loading = this.props.mode === 'loading';
	            var stepClasses = (0, _classnames2['default'])(['steps'], { 'inactive': this.props.mode === 'path' || this.props.mode === 'playing' || loading });
	            var distanceClasses = (0, _classnames2['default'])(['distance'], { 'inactive': loading });
	            if (this.props.play || this.props.pause) {
	                var showPause = this.props.mode === 'playing';
	                var playDisplay = { display: !showPause ? 'inline' : 'none' };
	                var pauseDisplay = { display: showPause ? 'inline' : 'none' };
	
	                playPauseButtons = _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                        'button',
	                        { 'aria-pressed': 'false', autoComplete: 'off', className: 'btn btn-success play', disabled: loading, onClick: this.props.play, style: playDisplay, type: 'button' },
	                        _react2['default'].createElement('span', { 'aria-hidden': 'true', className: 'glyphicon glyphicon-play' })
	                    ),
	                    _react2['default'].createElement(
	                        'button',
	                        { 'aria-pressed': 'false', autoComplete: 'off', className: 'btn pause', disabled: loading, onClick: this.props.pause, style: pauseDisplay, type: 'button' },
	                        _react2['default'].createElement('span', { 'aria-hidden': 'true', className: 'glyphicon glyphicon-pause' })
	                    )
	                );
	            }
	            if (this.props.backward || this.props.forward) {
	                segmentButtons = _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                        'button',
	                        { 'aria-pressed': 'false', autoComplete: 'off', className: 'btn step-backward', disabled: loading, onClick: this.props.backward, type: 'button' },
	                        _react2['default'].createElement('span', { 'aria-hidden': 'true', className: 'glyphicon glyphicon-step-backward' })
	                    ),
	                    _react2['default'].createElement(
	                        'button',
	                        { 'aria-pressed': 'false', autoComplete: 'off', className: 'btn step-forward', disabled: loading, onClick: this.props.forward, type: 'button' },
	                        _react2['default'].createElement('span', { 'aria-hidden': 'true', className: 'glyphicon glyphicon-step-forward' })
	                    )
	                );
	                steps = _react2['default'].createElement(
	                    'label',
	                    { className: stepClasses },
	                    this._displayStep(this.props.step),
	                    ' - ',
	                    this._displayStep(this.props.step + 1)
	                );
	            }
	
	            var buttons = _react2['default'].createElement(
	                'span',
	                null,
	                playPauseButtons,
	                segmentButtons
	            );
	
	            var distance = _react2['default'].createElement(
	                'label',
	                { className: distanceClasses },
	                this._displayDistance(this.props.position),
	                ' : ',
	                this._displayDistance(this.props.length),
	                ' ',
	                this.props.units
	            );
	
	            return _react2['default'].createElement(
	                'div',
	                { className: 'buttons' },
	                buttons,
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'status' },
	                    steps,
	                    distance
	                )
	            );
	        }
	    }], [{
	        key: 'propTypes',
	        value: {
	            backward: _react2['default'].PropTypes.any, // func to call stepping backward
	            decimalPlaces: _react2['default'].PropTypes.number, // distance display decimal places - default to 1
	            forward: _react2['default'].PropTypes.any, // func to call stepping forward
	            length: _react2['default'].PropTypes.number, // total path length
	            mode: _react2['default'].PropTypes.string, // "loading", "path", "playing", "segment"
	            pause: _react2['default'].PropTypes.any, // func to pause animation
	            play: _react2['default'].PropTypes.any, // func to start animation
	            position: _react2['default'].PropTypes.number, // start position along path
	            scale: _react2['default'].PropTypes.number, // multiply length/position by this before display default 1
	            step: _react2['default'].PropTypes.number, // starting segment 0-based
	            units: _react2['default'].PropTypes.string // unit display string default ''
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            decimalPlaces: 1,
	            mode: 'loading',
	            position: 0,
	            scale: 1.0,
	            step: 0,
	            units: ''
	        },
	        enumerable: true
	    }]);
	
	    return Controls;
	})(_react2['default'].Component);
	
	exports['default'] = Controls;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = Spinner;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function Spinner(_ref) {
	    var loading = _ref.loading;
	
	    var show = loading || loading === undefined ? {} : { display: 'none' };
	    return _react2['default'].createElement('div', { className: 'loading glyphicon glyphicon-refresh glyphicon-spin', style: show });
	}
	
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=svgpathplayer.js.map