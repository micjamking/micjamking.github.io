/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Utility methods
 */

/** @type {Object} Window */
var w = exports.w = window;

/** @type {Function} Query selector */
var $ = exports.$ = document.querySelectorAll.bind(document);

var utils = function () {
  function utils() {
    _classCallCheck(this, utils);

    /**
     * Normalize requestAnimationFrame cross-browser
     */
    if (!w['requestAnimationFrame']) {

      w['requestAnimationFrame'] = w['webkitRequestAnimationFrame'] || w['mozRequestAnimationFrame'] || w['oRequestAnimationFrame'] || w['msRequestAnimationFrame'] || function (callback) {
        return w['setTimeout'](callback, 1000 / 60);
      };
    }

    /**
     * Normalize cancelAnimationFrame cross-browser
     */
    if (!w['cancelAnimationFrame']) {

      w['cancelAnimationFrame'] = w['cancelRequestAnimationFrame'] || w['webkitCancelAnimationFrame'] || w['webkitCancelRequestAnimationFrame'] || w['mozCancelAnimationFrame'] || w['mozCancelRequestAnimationFrame'] || w['oCancelAnimationFrame'] || w['oCancelRequestAnimationFrame'] || w['msCancelAnimationFrame'] || w['msCancelRequestAnimationFrame'] || w.clearTimeout;
    }

    // console.log('instantiated new utility object');
  }

  /**
   * Capture mouse movement and coordinates over canvas element
   *
   * @param {HTMLElement} el - Canvas element to listen for events
   *
   * @return {Object} mouse - object containing mouse coordinates
   * @return {Object} mouse.x - x-axis mouse coordinates
   * @return {Object} mouse.y - y-axis mouse coordinates
   */


  _createClass(utils, [{
    key: 'captureMouse',
    value: function captureMouse(el) {

      var utils = this;

      var mouse = {
        x: 0,
        y: 0,
        percentageX: 0,
        percentageY: 0
      };

      function mouseListener(e) {

        var offsetLeft = el.offsetLeft || 0;
        var offsetTop = el.offsetTop || 0;

        mouse.x = e.pageX - offsetLeft;
        mouse.y = e.pageY - offsetTop;

        mouse.percentageX = (mouse.x - utils.screenSize().width / 2) / utils.screenSize().width * 100;
        mouse.percentageY = (mouse.y - utils.screenSize().height / 2) / utils.screenSize().height * 100;
      }

      el.addEventListener('mousemove', mouseListener);

      return mouse;
    }

    /**
     * Capture touch movement and coordinates over canvas element
     *
     * @param {HTMLElement} el - Canvas element to listen for events
     *
     * @return {Object} touch - object containing touch coordinates
     * @return {Object} touch.x - x-axis touch coordinates
     * @return {Object} touch.y - y-axis touch coordinates
     * @return {Boolean} touch.isPressed - true|false if user is currently touching screen
     */

  }, {
    key: 'captureTouch',
    value: function captureTouch(el) {

      var touch = {
        x: 0,
        y: 0,
        isPressed: false
      };

      function touchStartListener() {

        touch.isPressed = true;
      }

      function touchEndListener() {

        touch.isPressed = false;
      }

      function touchMoveListener(e) {

        el.offsetLeft = el.offsetLeft || 0;
        el.offsetTop = el.offsetTop || 0;

        touch.x = e.touches[0].pageX - el.offsetLeft;
        touch.y = e.touches[0].pageY - el.offsetTop;
      }

      el.addEventListener('touchstart', touchStartListener);
      el.addEventListener('touchend', touchEndListener);
      el.addEventListener('touchmove', touchMoveListener);

      return touch;
    }

    /**
     * Capture device tilt / roatation movement
     *
     * @return {Object} touch - object containing touch coordinates
     * @return {Object} touch.x - x-axis touch coordinates
     * @return {Object} touch.y - y-axis touch coordinates
     * @return {Boolean} touch.isPressed - true|false if user is currently touching screen
     */

  }, {
    key: 'captureTilt',
    value: function captureTilt() {

      var tilt = {
        x: 0,
        y: 0
      };

      /**
       * Handle Device Orientation
       *  - Tilt 90º > 0º to increase gravity on mobile
       */
      function handleOrientation(e) {

        var x = e.gamma;
        var y = e.beta;

        if (x > 90) {
          x = 90;
        }
        if (x < 45) {
          x = 45;
        }

        if (y > 90) {
          y = 90;
        }
        if (y < 0) {
          y = 0;
        }

        var rangeX = (90 - Math.floor(Math.abs(x))) / 45;
        var rangeY = (90 - Math.floor(Math.abs(y))) / 90;

        // Do stuff with the new orientation data
        if (Math.floor(rangeY * 10) > 0) {
          this.gravity = rangeY;
        }

        if (Math.floor(rangeX * 10) > 0) {
          this.speed = rangeX;
        }
      }

      w.addEventListener('deviceorientation', function (e) {
        return handleOrientation(e);
      }, true);

      return tilt;
    }

    /**
     * Check if rectangle contains x/y coordinates
     *
     * @param {Object} rect - object containing a rectangle
     * @param {Number} rect.x - x-axis coordinate of a rectangle
     * @param {Number} rect.y - y-axis coordinate of a rectangle
     * @param {Number} rect.width - width of a rectangle
     * @param {Number} rect.height - height of a rectangle
     * @param {Number} x - target x-axis coordinate
     * @param {Number} y - target y-axis coordinate
     *
     * @return {Boolean} true|false - if rect contains x/y coordinates
     */

  }, {
    key: 'containsPoint',
    value: function containsPoint(rect, x, y) {

      return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
    }

    /**
     * Check if two rectangles intersect
     *
     * @param {Object} rectA - first object with rectangular bounds
     * @param {Object} rectB - second object with rectangular bounds
     *
     * @return {Boolean} true|false - if rect contains x/y coordinates
     */

  }, {
    key: 'intersects',
    value: function intersects(rectA, rectB) {

      return !(rectA.x + rectA.width < rectB.x || rectB.x + rectB.width < rectA.x || rectA.y + rectA.height < rectB.y || rectB.y + rectB.height < rectA.y);
    }

    /**
     * Get random number between two numbers
     *
     * @param {Number} min - Minimum value
     * @param {Number} max - Maximum value
     *
     * @return {Number} randomized value between min and max
     */

  }, {
    key: 'rand',
    value: function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    /**
     * Get random integer between two numbers
     *
     * @param {Number} min - Minimum value
     * @param {Number} max - Maximum value
     *
     * @return {Number} randomized value between min and max
     */

  }, {
    key: 'randInt',
    value: function randInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Get random integer that is a multiple within a range of numbers
     *
     * @param {Number} multiple - Multiple to increment by (and minimum value)
     * @param {Number} range - Range of multiple (and maximum value)
     *
     * @return {Number} randomized value within range, incrementing by multiple
     */

  }, {
    key: 'randMultiple',
    value: function randMultiple(multiple, range) {
      return Math.floor((Math.random() * (range - multiple) + multiple + 1) / multiple) * multiple;
    }

    /**
     * Get heads (TRUE) or tails (FALSE)
     *
     * @return {Boolean} randomized value of TRUE or FALSE
     */

  }, {
    key: 'coinFlip',
    value: function coinFlip() {
      return Math.floor(Math.random() * 2) == 0;
    }

    /**
     * Get current screen size (width / height)
     *
     * @return {Object} screen - width / height of current screen object
     */

  }, {
    key: 'screenSize',
    value: function screenSize() {
      var d = document,
          e = d.documentElement,
          g = d.body,
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;

      return {
        width: x,
        height: y
      };
    }
  }, {
    key: 'colorToRGB',
    value: function colorToRGB(color, alpha) {
      //number in octal format or string prefixed with #
      if (typeof color === 'string' && color[0] === '#') {
        color = w.parseInt(color.slice(1), 16);
      }

      alpha = alpha === undefined ? 1 : alpha;
      //parse hex values

      var r = color >> 16 & 0xff,
          g = color >> 8 & 0xff,
          b = color & 0xff,
          a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
      //only use 'rgba' if needed

      if (a === 1) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      } else {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
      }
    }
  }, {
    key: 'convertRange',
    value: function convertRange(value, oldRange, newRange) {
      var OldRange = oldRange.max - oldRange.min;
      var NewRange = newRange.max - newRange.min;

      return (value - oldRange.min) * NewRange / OldRange + newRange.min;
    }

    /**
     * Chaining delays (setTimeout)
     */

  }, {
    key: 'delay',
    value: function delay(cb, ms) {

      // MyPromise constructor - subclass of Promise
      function MyPromise(fn) {
        var promise = new Promise(function (resolve, reject) {
          return fn(resolve, reject);
        });
        promise.__proto__ = MyPromise.prototype;
        return promise;
      }

      // MyPromise should extend Promise
      MyPromise.__proto__ = Promise;
      MyPromise.prototype.__proto__ = Promise.prototype;

      // Extend MyPromise to return delay from promise success
      MyPromise.prototype.delay = function (cb, ms) {
        return this.then(function () {
          return utils.prototype.delay(cb, ms);
        });
      };

      // Create internal 'wait' promise using setTimeout
      var _wait = function _wait(ms) {
        return new MyPromise(function (resolve) {
          return setTimeout(resolve, ms);
        });
      };

      return _wait(ms).then(cb);
    }
  }, {
    key: 'deviceOrientationSupport',
    value: function deviceOrientationSupport() {
      return !!w['DeviceOrientationEvent'];
    }
  }, {
    key: 'touchSupport',
    value: function touchSupport() {
      return 'ontouchstart' in w;
    }
  }, {
    key: 'allowDeviceOrientation',
    value: function allowDeviceOrientation() {
      return this.deviceOrientationSupport() && this.touchSupport();
    }

    /**
     * Log UI Coordinates
     *
     * @param {HTMLElement} element - Canvas element to listen for events
     * @param {Object} mouse - Object containing mouse coordinates
     * @param {Object} touch - Object containing touch coordinates
     * @param {String} which - 'mouse'|'touch' - string containing which type of device input
     */

  }, {
    key: 'logCoordinates',
    value: function logCoordinates(el, mouse, touch, which) {

      function canvasTouchListener() {

        console.log('current touch position: ', 'x: ' + touch.x + ', y: ' + touch.y);
      }

      function canvasMouseListener() {

        if (mouse.current) {
          console.log('current mouse position: ', 'x: ' + mouse.current.x + ', y: ' + mouse.current.y);
        } else {
          console.log('current mouse position: ', 'x: ' + mouse.x + ', y: ' + mouse.y + ', percentageX: ' + mouse.percentageX + ', percentageY: ' + mouse.percentageY);
        }
      }

      if (touch && which === 'touch') {
        el.addEventListener('touchmove', canvasTouchListener);
      } else {
        el.addEventListener('mousemove', canvasMouseListener);
      }
    }

    /**
     * Setup mouse/touch canvas listeners in aggregate
     *
     * @param {HTMLElement} element - Canvas element to listen for events
     * @param {Object} mouse - Object containing mouse coordinates
     * @param {Object} touch - Object containing touch coordinates
     * @param {String} which - 'mouse'|'touch' - string containing which type of device input
     */

  }, {
    key: 'setupHelpers',
    value: function setupHelpers(el, mouse, touch, which) {

      this.logCoordinates(el, mouse, touch, which || 'mouse');
    }

    /**
     * Throttle an event and provide custom event for callback
     * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
     * @param {String} type - Type of event to throttle
     * @param {String} name - Name of new CustomEvent to dispatch
     * @param {Object} obj - Object to attach event to and dispatch the custom event from
     * @listens {type} Listen for event to throttle and dispatch custom event for
     * @emits {name} Custom event to dispatch on object
     */

  }, {
    key: 'throttleEvent',
    value: function throttleEvent(type, name, obj) {

      obj = obj || w;
      var running = false;

      var func = function func() {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(function () {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };

      obj.addEventListener(type, func);
    }

    /**
     * Check if element is currently visible in viewport
     * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
     * @param {HTMLElement} element - DOM element to check if currently visible
     * @param {Number} percentage - The percentage of screen threshold the element must be within
     * @return {Boolean} true|false - Returns true if bottom and right property of element is greater
     * than 0, and top and left property of element is less than the window height and width respectively,
     * taking in to account a threshold percentage of the screen.
     */

  }, {
    key: 'isElementInViewport',
    value: function isElementInViewport(element, percentage) {

      var rect = element.getBoundingClientRect();

      percentage = percentage || 1;

      return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) * percentage && rect.left <= (window.innerWidth || document.documentElement.clientWidth) * percentage;
    }

    /**
     * Add class to element when it is scrolled in to view
     * @param {Object} settings - Settings object
     * @param {String} settings.activeClass - Name of class to add
     * @param {Array} settings.elements - Array of HTML elements to watch
     * @param {Number} settings.threshold - Percentage threshold the element needs to come into view before class is added
     * @param {Boolean} settings.removeClassOnExit - Whether to remove the active class on exit of viewport
     * @param {Boolean} settings.playVideosInView - Whether to play videos when they enter viewport
     * @param {Boolean} settings.inviewVideoAttribute - The data-* attribute to check for videos that need to be played
     *
     * @listens {scroll} Listen for scroll event on window (default)
     * @listens {optimizedScroll} Listen for optimizedScroll event on window and fire callback function
     * @emits {optimizedScroll} Dispatch custom scroll event after throttling default scroll event
     */

  }, {
    key: 'addClassOnScrollInToView',
    value: function addClassOnScrollInToView(settings) {

      var _utils = this;

      settings.activeClass = settings.activeClass || 'inview';
      settings.threshold = settings.threshold || 0.25;
      settings.removeClassOnExit = settings.removeClassOnExit !== false;
      settings.playVideosInView = settings.playVideosInView !== false;
      settings.inviewVideoAttribute = settings.inviewVideoAttribute || 'data-video-inview-play';

      /** Scroll event callback  */
      function _scrollCallback() {

        function playVideosInView(el) {
          var videos = Array.from(el.querySelectorAll('[data-video-inview-play]'));
          if (videos.length > 0) {
            videos.forEach(function (video) {
              if (!video.isPlaying) {
                video.play();
                video.isPlaying = true;
                // console.log('video started!');
              }
            });
          }
        }

        function pauseVideosInView(el) {
          var videos = Array.from(el.querySelectorAll('[data-video-inview-play]'));
          if (videos.length > 0) {
            videos.forEach(function (video) {
              if (video.isPlaying) {
                video.pause();
                video.isPlaying = false;
                console.log('video stopped!');
              }
            });
          }
        }

        function toggleActiveClass(el) {
          if (_utils.isElementInViewport(el, 1 - settings.threshold)) {
            el.classList.add(settings.activeClass);
            playVideosInView(el);
          } else {
            pauseVideosInView(el);
          }

          if (settings.removeClassOnExit) {
            if (!_utils.isElementInViewport(el, 1 - settings.threshold)) {
              el.classList.remove(settings.activeClass);
            }
          }
        }

        Array.prototype.forEach.call(settings.elements, function (el) {
          toggleActiveClass(el);
        });
      }

      /** Throttle default scroll event and listen for optimizedScroll event */
      this.throttleEvent('scroll', 'optimizedScroll');
      w.addEventListener('optimizedScroll', function () {
        _scrollCallback();
      });
    }
  }, {
    key: 'clamp',
    value: function clamp(number, min, max) {

      return Math.min(Math.max(number, min), max);
    }

    /**
     * Native XMLHttpRequest as Promise
     * @see https://stackoverflow.com/a/30008115/933951
     * @param {Object} options - Options object
     * @param {String} options.method - Type of XHR
     * @param {String} options.url - URL for XHR
     * @param {String|Object} options.params - Query parameters for XHR
     * @param {Object} options.headers - Query parameters for XHR
     * @return {Promise} Promise object of XHR
     */

  }, {
    key: 'xhrPromise',
    value: function xhrPromise(options) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var params = options.params;

        xhr.open(options.method, options.url);

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText
            });
          }
        };

        xhr.onerror = function () {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        };

        // Set headers
        if (options.headers) {
          Object.keys(options.headers).forEach(function (key) {
            xhr.setRequestHeader(key, options.headers[key]);
          });
        }

        // We'll need to stringify if we've been given an object
        // If we have a string, this is skipped.
        if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
          params = Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');
        }

        xhr.send(params);
      });
    }
  }]);

  return utils;
}();

exports.default = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function (window, document, exportName, undefined) {
    'use strict';

    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = document.createElement('div');

    var TYPE_FUNCTION = 'function';

    var round = Math.round;
    var abs = Math.abs;
    var now = Date.now;

    /**
     * set a timeout with a given scope
     * @param {Function} fn
     * @param {Number} timeout
     * @param {Object} context
     * @returns {number}
     */
    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
    }

    /**
     * if the argument is an array, we want to execute the fn on each entry
     * if it aint an array we don't want to do a thing.
     * this is used by all the methods that accept a single and array argument.
     * @param {*|Array} arg
     * @param {String} fn
     * @param {Object} [context]
     * @returns {Boolean}
     */
    function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
            each(arg, context[fn], context);
            return true;
        }
        return false;
    }

    /**
     * walk objects and arrays
     * @param {Object} obj
     * @param {Function} iterator
     * @param {Object} context
     */
    function each(obj, iterator, context) {
        var i;

        if (!obj) {
            return;
        }

        if (obj.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length !== undefined) {
            i = 0;
            while (i < obj.length) {
                iterator.call(context, obj[i], i, obj);
                i++;
            }
        } else {
            for (i in obj) {
                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
            }
        }
    }

    /**
     * wrap a method with a deprecation warning and stack trace
     * @param {Function} method
     * @param {String} name
     * @param {String} message
     * @returns {Function} A new function wrapping the supplied method.
     */
    function deprecate(method, name, message) {
        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
        return function () {
            var e = new Error('get-stack-trace');
            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

            var log = window.console && (window.console.warn || window.console.log);
            if (log) {
                log.call(window.console, deprecationMessage, stack);
            }
            return method.apply(this, arguments);
        };
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} target
     * @param {...Object} objects_to_assign
     * @returns {Object} target
     */
    var assign;
    if (typeof Object.assign !== 'function') {
        assign = function assign(target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    } else {
        assign = Object.assign;
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} dest
     * @param {Object} src
     * @param {Boolean} [merge=false]
     * @returns {Object} dest
     */
    var extend = deprecate(function extend(dest, src, merge) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
            if (!merge || merge && dest[keys[i]] === undefined) {
                dest[keys[i]] = src[keys[i]];
            }
            i++;
        }
        return dest;
    }, 'extend', 'Use `assign`.');

    /**
     * merge the values from src in the dest.
     * means that properties that exist in dest will not be overwritten by src
     * @param {Object} dest
     * @param {Object} src
     * @returns {Object} dest
     */
    var merge = deprecate(function merge(dest, src) {
        return extend(dest, src, true);
    }, 'merge', 'Use `assign`.');

    /**
     * simple class inheritance
     * @param {Function} child
     * @param {Function} base
     * @param {Object} [properties]
     */
    function inherit(child, base, properties) {
        var baseP = base.prototype,
            childP;

        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;

        if (properties) {
            assign(childP, properties);
        }
    }

    /**
     * simple function bind
     * @param {Function} fn
     * @param {Object} context
     * @returns {Function}
     */
    function bindFn(fn, context) {
        return function boundFn() {
            return fn.apply(context, arguments);
        };
    }

    /**
     * let a boolean value also be a function that must return a boolean
     * this first item in args will be used as the context
     * @param {Boolean|Function} val
     * @param {Array} [args]
     * @returns {Boolean}
     */
    function boolOrFn(val, args) {
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == TYPE_FUNCTION) {
            return val.apply(args ? args[0] || undefined : undefined, args);
        }
        return val;
    }

    /**
     * use the val2 when val1 is undefined
     * @param {*} val1
     * @param {*} val2
     * @returns {*}
     */
    function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1;
    }

    /**
     * addEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function addEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.addEventListener(type, handler, false);
        });
    }

    /**
     * removeEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.removeEventListener(type, handler, false);
        });
    }

    /**
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    function hasParent(node, parent) {
        while (node) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    /**
     * small indexOf wrapper
     * @param {String} str
     * @param {String} find
     * @returns {Boolean} found
     */
    function inStr(str, find) {
        return str.indexOf(find) > -1;
    }

    /**
     * split string on whitespace
     * @param {String} str
     * @returns {Array} words
     */
    function splitStr(str) {
        return str.trim().split(/\s+/g);
    }

    /**
     * find if a array contains the object using indexOf or a simple polyFill
     * @param {Array} src
     * @param {String} find
     * @param {String} [findByKey]
     * @return {Boolean|Number} false when not found, or the index
     */
    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
            return src.indexOf(find);
        } else {
            var i = 0;
            while (i < src.length) {
                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                    return i;
                }
                i++;
            }
            return -1;
        }
    }

    /**
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */
    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    }

    /**
     * unique array with objects based on a key (like 'id') or just by the array's value
     * @param {Array} src [{id:1},{id:2},{id:1}]
     * @param {String} [key]
     * @param {Boolean} [sort=False]
     * @returns {Array} [{id:1},{id:2}]
     */
    function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;

        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }

        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }

        return results;
    }

    /**
     * get the prefixed property
     * @param {Object} obj
     * @param {String} property
     * @returns {String|Undefined} prefixed
     */
    function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);

        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = prefix ? prefix + camelProp : property;

            if (prop in obj) {
                return prop;
            }
            i++;
        }
        return undefined;
    }

    /**
     * get a unique id
     * @returns {number} uniqueId
     */
    var _uniqueId = 1;
    function uniqueId() {
        return _uniqueId++;
    }

    /**
     * get the window object of an element
     * @param {HTMLElement} element
     * @returns {DocumentView|Window}
     */
    function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return doc.defaultView || doc.parentWindow || window;
    }

    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

    var SUPPORT_TOUCH = 'ontouchstart' in window;
    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

    var INPUT_TYPE_TOUCH = 'touch';
    var INPUT_TYPE_PEN = 'pen';
    var INPUT_TYPE_MOUSE = 'mouse';
    var INPUT_TYPE_KINECT = 'kinect';

    var COMPUTE_INTERVAL = 25;

    var INPUT_START = 1;
    var INPUT_MOVE = 2;
    var INPUT_END = 4;
    var INPUT_CANCEL = 8;

    var DIRECTION_NONE = 1;
    var DIRECTION_LEFT = 2;
    var DIRECTION_RIGHT = 4;
    var DIRECTION_UP = 8;
    var DIRECTION_DOWN = 16;

    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

    var PROPS_XY = ['x', 'y'];
    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

    /**
     * create new input type manager
     * @param {Manager} manager
     * @param {Function} callback
     * @returns {Input}
     * @constructor
     */
    function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;

        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.
        this.domHandler = function (ev) {
            if (boolOrFn(manager.options.enable, [manager])) {
                self.handler(ev);
            }
        };

        this.init();
    }

    Input.prototype = {
        /**
         * should handle the inputEvent data and trigger the callback
         * @virtual
         */
        handler: function handler() {},

        /**
         * bind the events
         */
        init: function init() {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },

        /**
         * unbind the events
         */
        destroy: function destroy() {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
    };

    /**
     * create new input type manager
     * called by the Manager constructor
     * @param {Hammer} manager
     * @returns {Input}
     */
    function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;

        if (inputClass) {
            Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
            Type = PointerEventInput;
        } else if (SUPPORT_ONLY_TOUCH) {
            Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
            Type = MouseInput;
        } else {
            Type = TouchMouseInput;
        }
        return new Type(manager, inputHandler);
    }

    /**
     * handle input events
     * @param {Manager} manager
     * @param {String} eventType
     * @param {Object} input
     */
    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;

        if (isFirst) {
            manager.session = {};
        }

        // source event is the normalized value of the domEvents
        // like 'touchstart, mouseup, pointerdown'
        input.eventType = eventType;

        // compute scale, rotation etc
        computeInputData(manager, input);

        // emit secret event
        manager.emit('hammer.input', input);

        manager.recognize(input);
        manager.session.prevInput = input;
    }

    /**
     * extend the data with some usable properties like scale, rotate, velocity etc
     * @param {Object} manager
     * @param {Object} input
     */
    function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;

        // store the first input to calculate the distance and direction
        if (!session.firstInput) {
            session.firstInput = simpleCloneInputData(input);
        }

        // to compute scale and rotation we need to store the multiple touches
        if (pointersLength > 1 && !session.firstMultiple) {
            session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
            session.firstMultiple = false;
        }

        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;

        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);

        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;

        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;

        computeIntervalInputData(session, input);

        // find the correct target
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
            target = input.srcEvent.target;
        }
        input.target = target;
    }

    function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};

        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
            prevDelta = session.prevDelta = {
                x: prevInput.deltaX || 0,
                y: prevInput.deltaY || 0
            };

            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            };
        }

        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
    }

    /**
     * velocity is calculated every x ms
     * @param {Object} session
     * @param {Object} input
     */
    function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
            deltaTime = input.timeStamp - last.timeStamp,
            velocity,
            velocityX,
            velocityY,
            direction;

        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
            var deltaX = input.deltaX - last.deltaX;
            var deltaY = input.deltaY - last.deltaY;

            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY);

            session.lastInterval = input;
        } else {
            // use latest velocity info if it doesn't overtake a minimum period
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction;
        }

        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
    }

    /**
     * create a simple clone from the input used for storage of firstInput and firstMultiple
     * @param {Object} input
     * @returns {Object} clonedInputData
     */
    function simpleCloneInputData(input) {
        // make a simple copy of the pointers because we will get a reference if we don't
        // we only need clientXY for the calculations
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
            pointers[i] = {
                clientX: round(input.pointers[i].clientX),
                clientY: round(input.pointers[i].clientY)
            };
            i++;
        }

        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        };
    }

    /**
     * get the center of all the pointers
     * @param {Array} pointers
     * @return {Object} center contains `x` and `y` properties
     */
    function getCenter(pointers) {
        var pointersLength = pointers.length;

        // no need to loop when only one touch
        if (pointersLength === 1) {
            return {
                x: round(pointers[0].clientX),
                y: round(pointers[0].clientY)
            };
        }

        var x = 0,
            y = 0,
            i = 0;
        while (i < pointersLength) {
            x += pointers[i].clientX;
            y += pointers[i].clientY;
            i++;
        }

        return {
            x: round(x / pointersLength),
            y: round(y / pointersLength)
        };
    }

    /**
     * calculate the velocity between two points. unit is in px per ms.
     * @param {Number} deltaTime
     * @param {Number} x
     * @param {Number} y
     * @return {Object} velocity `x` and `y`
     */
    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    }

    /**
     * get the direction between two points
     * @param {Number} x
     * @param {Number} y
     * @return {Number} direction
     */
    function getDirection(x, y) {
        if (x === y) {
            return DIRECTION_NONE;
        }

        if (abs(x) >= abs(y)) {
            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }

    /**
     * calculate the absolute distance between two points
     * @param {Object} p1 {x, y}
     * @param {Object} p2 {x, y}
     * @param {Array} [props] containing x and y keys
     * @return {Number} distance
     */
    function getDistance(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];

        return Math.sqrt(x * x + y * y);
    }

    /**
     * calculate the angle between two coordinates
     * @param {Object} p1
     * @param {Object} p2
     * @param {Array} [props] containing x and y keys
     * @return {Number} angle
     */
    function getAngle(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * calculate the rotation degrees between two pointersets
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} rotation
     */
    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }

    /**
     * calculate the scale factor between two pointersets
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} scale
     */
    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }

    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    };

    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

    /**
     * Mouse events input
     * @constructor
     * @extends Input
     */
    function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;

        this.pressed = false; // mousedown state

        Input.apply(this, arguments);
    }

    inherit(MouseInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function MEhandler(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];

            // on start we want to have the left mouse button down
            if (eventType & INPUT_START && ev.button === 0) {
                this.pressed = true;
            }

            if (eventType & INPUT_MOVE && ev.which !== 1) {
                eventType = INPUT_END;
            }

            // mouse must be down
            if (!this.pressed) {
                return;
            }

            if (eventType & INPUT_END) {
                this.pressed = false;
            }

            this.callback(this.manager, eventType, {
                pointers: [ev],
                changedPointers: [ev],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            });
        }
    });

    var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    };

    // in IE10 the pointer types is defined as an enum
    var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
    };

    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

    // IE10 has prefixed support, and case-sensitive
    if (window.MSPointerEvent && !window.PointerEvent) {
        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }

    /**
     * Pointer events input
     * @constructor
     * @extends Input
     */
    function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;

        Input.apply(this, arguments);

        this.store = this.manager.session.pointerEvents = [];
    }

    inherit(PointerEventInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function PEhandler(ev) {
            var store = this.store;
            var removePointer = false;

            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

            var isTouch = pointerType == INPUT_TYPE_TOUCH;

            // get index of the event in the store
            var storeIndex = inArray(store, ev.pointerId, 'pointerId');

            // start and mouse must be down
            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                if (storeIndex < 0) {
                    store.push(ev);
                    storeIndex = store.length - 1;
                }
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                removePointer = true;
            }

            // it not found, so the pointer hasn't been down (so it's probably a hover)
            if (storeIndex < 0) {
                return;
            }

            // update the event in the store
            store[storeIndex] = ev;

            this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ev],
                pointerType: pointerType,
                srcEvent: ev
            });

            if (removePointer) {
                // remove from the store
                store.splice(storeIndex, 1);
            }
        }
    });

    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Touch events input
     * @constructor
     * @extends Input
     */
    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;

        Input.apply(this, arguments);
    }

    inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

            // should we handle the touch events?
            if (type === INPUT_START) {
                this.started = true;
            }

            if (!this.started) {
                return;
            }

            var touches = normalizeSingleTouches.call(this, ev, type);

            // when done, reset the started state
            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                this.started = false;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);

        if (type & (INPUT_END | INPUT_CANCEL)) {
            all = uniqueArray(all.concat(changed), 'identifier', true);
        }

        return [all, changed];
    }

    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Multi-user touch events input
     * @constructor
     * @extends Input
     */
    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};

        Input.apply(this, arguments);
    }

    inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
            var type = TOUCH_INPUT_MAP[ev.type];
            var touches = getTouches.call(this, ev, type);
            if (!touches) {
                return;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;

        // when there is only one touch, the process can be simplified
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches];
        }

        var i,
            targetTouches,
            changedTouches = toArray(ev.changedTouches),
            changedTargetTouches = [],
            target = this.target;

        // get target touches from touches
        targetTouches = allTouches.filter(function (touch) {
            return hasParent(touch.target, target);
        });

        // collect touches
        if (type === INPUT_START) {
            i = 0;
            while (i < targetTouches.length) {
                targetIds[targetTouches[i].identifier] = true;
                i++;
            }
        }

        // filter changed touches to only contain touches that exist in the collected target ids
        i = 0;
        while (i < changedTouches.length) {
            if (targetIds[changedTouches[i].identifier]) {
                changedTargetTouches.push(changedTouches[i]);
            }

            // cleanup removed touches
            if (type & (INPUT_END | INPUT_CANCEL)) {
                delete targetIds[changedTouches[i].identifier];
            }
            i++;
        }

        if (!changedTargetTouches.length) {
            return;
        }

        return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }

    /**
     * Combined touch and mouse input
     *
     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
     * This because touch devices also emit mouse events while doing a touch.
     *
     * @constructor
     * @extends Input
     */

    var DEDUP_TIMEOUT = 2500;
    var DEDUP_DISTANCE = 25;

    function TouchMouseInput() {
        Input.apply(this, arguments);

        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);

        this.primaryTouch = null;
        this.lastTouches = [];
    }

    inherit(TouchMouseInput, Input, {
        /**
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */
        handler: function TMEhandler(manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
                return;
            }

            // when we're in a touch event, record touches to  de-dupe synthetic mouse event
            if (isTouch) {
                recordTouches.call(this, inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
                return;
            }

            this.callback(manager, inputEvent, inputData);
        },

        /**
         * remove the event listeners
         */
        destroy: function destroy() {
            this.touch.destroy();
            this.mouse.destroy();
        }
    });

    function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START) {
            this.primaryTouch = eventData.changedPointers[0].identifier;
            setLastTouch.call(this, eventData);
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            setLastTouch.call(this, eventData);
        }
    }

    function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];

        if (touch.identifier === this.primaryTouch) {
            var lastTouch = { x: touch.clientX, y: touch.clientY };
            this.lastTouches.push(lastTouch);
            var lts = this.lastTouches;
            var removeLastTouch = function removeLastTouch() {
                var i = lts.indexOf(lastTouch);
                if (i > -1) {
                    lts.splice(i, 1);
                }
            };
            setTimeout(removeLastTouch, DEDUP_TIMEOUT);
        }
    }

    function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX,
            y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
            var t = this.lastTouches[i];
            var dx = Math.abs(x - t.x),
                dy = Math.abs(y - t.y);
            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                return true;
            }
        }
        return false;
    }

    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

    // magical touchAction value
    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';
    var TOUCH_ACTION_MAP = getTouchActionProps();

    /**
     * Touch Action
     * sets the touchAction property or uses the js alternative
     * @param {Manager} manager
     * @param {String} value
     * @constructor
     */
    function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
    }

    TouchAction.prototype = {
        /**
         * set the touchAction value on the element or enable the polyfill
         * @param {String} value
         */
        set: function set(value) {
            // find out the touch-action by the event handlers
            if (value == TOUCH_ACTION_COMPUTE) {
                value = this.compute();
            }

            if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
            }
            this.actions = value.toLowerCase().trim();
        },

        /**
         * just re-set the touchAction value
         */
        update: function update() {
            this.set(this.manager.options.touchAction);
        },

        /**
         * compute the value for the touchAction property based on the recognizer's settings
         * @returns {String} value
         */
        compute: function compute() {
            var actions = [];
            each(this.manager.recognizers, function (recognizer) {
                if (boolOrFn(recognizer.options.enable, [recognizer])) {
                    actions = actions.concat(recognizer.getTouchAction());
                }
            });
            return cleanTouchActions(actions.join(' '));
        },

        /**
         * this method is called on each input cycle and provides the preventing of the browser behavior
         * @param {Object} input
         */
        preventDefaults: function preventDefaults(input) {
            var srcEvent = input.srcEvent;
            var direction = input.offsetDirection;

            // if the touch action did prevented once this session
            if (this.manager.session.prevented) {
                srcEvent.preventDefault();
                return;
            }

            var actions = this.actions;
            var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

            if (hasNone) {
                //do not prevent defaults if this is a tap gesture

                var isTapPointer = input.pointers.length === 1;
                var isTapMovement = input.distance < 2;
                var isTapTouchTime = input.deltaTime < 250;

                if (isTapPointer && isTapMovement && isTapTouchTime) {
                    return;
                }
            }

            if (hasPanX && hasPanY) {
                // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
                return;
            }

            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                return this.preventSrc(srcEvent);
            }
        },

        /**
         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
         * @param {Object} srcEvent
         */
        preventSrc: function preventSrc(srcEvent) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault();
        }
    };

    /**
     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
     * @param {String} actions
     * @returns {*}
     */
    function cleanTouchActions(actions) {
        // none
        if (inStr(actions, TOUCH_ACTION_NONE)) {
            return TOUCH_ACTION_NONE;
        }

        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

        // if both pan-x and pan-y are set (different recognizers
        // for different directions, e.g. horizontal pan but vertical swipe?)
        // we need none (as otherwise with pan-x pan-y combined none of these
        // recognizers will work, since the browser would handle all panning
        if (hasPanX && hasPanY) {
            return TOUCH_ACTION_NONE;
        }

        // pan-x OR pan-y
        if (hasPanX || hasPanY) {
            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }

        // manipulation
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
            return TOUCH_ACTION_MANIPULATION;
        }

        return TOUCH_ACTION_AUTO;
    }

    function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION) {
            return false;
        }
        var touchMap = {};
        var cssSupports = window.CSS && window.CSS.supports;
        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {

            // If css.supports is not supported but there is native touch-action assume it supports
            // all values. This is the case for IE 10 and 11.
            touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
        });
        return touchMap;
    }

    /**
     * Recognizer flow explained; *
     * All recognizers have the initial state of POSSIBLE when a input session starts.
     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
     * Example session for mouse-input: mousedown -> mousemove -> mouseup
     *
     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
     * which determines with state it should be.
     *
     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
     * POSSIBLE to give it another change on the next cycle.
     *
     *               Possible
     *                  |
     *            +-----+---------------+
     *            |                     |
     *      +-----+-----+               |
     *      |           |               |
     *   Failed      Cancelled          |
     *                          +-------+------+
     *                          |              |
     *                      Recognized       Began
     *                                         |
     *                                      Changed
     *                                         |
     *                                  Ended/Recognized
     */
    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;

    /**
     * Recognizer
     * Every recognizer needs to extend from this class.
     * @constructor
     * @param {Object} options
     */
    function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});

        this.id = uniqueId();

        this.manager = null;

        // default is enable true
        this.options.enable = ifUndefined(this.options.enable, true);

        this.state = STATE_POSSIBLE;

        this.simultaneous = {};
        this.requireFail = [];
    }

    Recognizer.prototype = {
        /**
         * @virtual
         * @type {Object}
         */
        defaults: {},

        /**
         * set options
         * @param {Object} options
         * @return {Recognizer}
         */
        set: function set(options) {
            assign(this.options, options);

            // also update the touchAction, in case something changed about the directions/enabled state
            this.manager && this.manager.touchAction.update();
            return this;
        },

        /**
         * recognize simultaneous with an other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        recognizeWith: function recognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                return this;
            }

            var simultaneous = this.simultaneous;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (!simultaneous[otherRecognizer.id]) {
                simultaneous[otherRecognizer.id] = otherRecognizer;
                otherRecognizer.recognizeWith(this);
            }
            return this;
        },

        /**
         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            delete this.simultaneous[otherRecognizer.id];
            return this;
        },

        /**
         * recognizer can only run when an other is failing
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        requireFailure: function requireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                return this;
            }

            var requireFail = this.requireFail;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (inArray(requireFail, otherRecognizer) === -1) {
                requireFail.push(otherRecognizer);
                otherRecognizer.requireFailure(this);
            }
            return this;
        },

        /**
         * drop the requireFailure link. it does not remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRequireFailure: function dropRequireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            var index = inArray(this.requireFail, otherRecognizer);
            if (index > -1) {
                this.requireFail.splice(index, 1);
            }
            return this;
        },

        /**
         * has require failures boolean
         * @returns {boolean}
         */
        hasRequireFailures: function hasRequireFailures() {
            return this.requireFail.length > 0;
        },

        /**
         * if the recognizer can recognize simultaneous with an other recognizer
         * @param {Recognizer} otherRecognizer
         * @returns {Boolean}
         */
        canRecognizeWith: function canRecognizeWith(otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id];
        },

        /**
         * You should use `tryEmit` instead of `emit` directly to check
         * that all the needed recognizers has failed before emitting.
         * @param {Object} input
         */
        emit: function emit(input) {
            var self = this;
            var state = this.state;

            function emit(event) {
                self.manager.emit(event, input);
            }

            // 'panstart' and 'panmove'
            if (state < STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }

            emit(self.options.event); // simple 'eventName' events

            if (input.additionalEvent) {
                // additional event(panleft, panright, pinchin, pinchout...)
                emit(input.additionalEvent);
            }

            // panend and pancancel
            if (state >= STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }
        },

        /**
         * Check that all the require failure recognizers has failed,
         * if true, it emits a gesture event,
         * otherwise, setup the state to FAILED.
         * @param {Object} input
         */
        tryEmit: function tryEmit(input) {
            if (this.canEmit()) {
                return this.emit(input);
            }
            // it's failing anyway
            this.state = STATE_FAILED;
        },

        /**
         * can we emit?
         * @returns {boolean}
         */
        canEmit: function canEmit() {
            var i = 0;
            while (i < this.requireFail.length) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                    return false;
                }
                i++;
            }
            return true;
        },

        /**
         * update the recognizer
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            // make a new copy of the inputData
            // so we can change the inputData without messing up the other recognizers
            var inputDataClone = assign({}, inputData);

            // is is enabled and allow recognizing?
            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                this.reset();
                this.state = STATE_FAILED;
                return;
            }

            // reset when we've reached the end
            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                this.state = STATE_POSSIBLE;
            }

            this.state = this.process(inputDataClone);

            // the recognizer has recognized a gesture
            // so trigger an event
            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                this.tryEmit(inputDataClone);
            }
        },

        /**
         * return the state of the recognizer
         * the actual recognizing happens in this method
         * @virtual
         * @param {Object} inputData
         * @returns {Const} STATE
         */
        process: function process(inputData) {}, // jshint ignore:line

        /**
         * return the preferred touch-action
         * @virtual
         * @returns {Array}
         */
        getTouchAction: function getTouchAction() {},

        /**
         * called when the gesture isn't allowed to recognize
         * like when another is being recognized or it is disabled
         * @virtual
         */
        reset: function reset() {}
    };

    /**
     * get a usable string, used as event postfix
     * @param {Const} state
     * @returns {String} state
     */
    function stateStr(state) {
        if (state & STATE_CANCELLED) {
            return 'cancel';
        } else if (state & STATE_ENDED) {
            return 'end';
        } else if (state & STATE_CHANGED) {
            return 'move';
        } else if (state & STATE_BEGAN) {
            return 'start';
        }
        return '';
    }

    /**
     * direction cons to string
     * @param {Const} direction
     * @returns {String}
     */
    function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
            return 'down';
        } else if (direction == DIRECTION_UP) {
            return 'up';
        } else if (direction == DIRECTION_LEFT) {
            return 'left';
        } else if (direction == DIRECTION_RIGHT) {
            return 'right';
        }
        return '';
    }

    /**
     * get a recognizer by name if it is bound to a manager
     * @param {Recognizer|String} otherRecognizer
     * @param {Recognizer} recognizer
     * @returns {Recognizer}
     */
    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
            return manager.get(otherRecognizer);
        }
        return otherRecognizer;
    }

    /**
     * This recognizer is just used as a base for the simple attribute recognizers.
     * @constructor
     * @extends Recognizer
     */
    function AttrRecognizer() {
        Recognizer.apply(this, arguments);
    }

    inherit(AttrRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof AttrRecognizer
         */
        defaults: {
            /**
             * @type {Number}
             * @default 1
             */
            pointers: 1
        },

        /**
         * Used to check if it the recognizer receives valid input, like input.distance > 10.
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {Boolean} recognized
         */
        attrTest: function attrTest(input) {
            var optionPointers = this.options.pointers;
            return optionPointers === 0 || input.pointers.length === optionPointers;
        },

        /**
         * Process the input and return the state for the recognizer
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {*} State
         */
        process: function process(input) {
            var state = this.state;
            var eventType = input.eventType;

            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
            var isValid = this.attrTest(input);

            // on cancel input and we've recognized before, return STATE_CANCELLED
            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                return state | STATE_CANCELLED;
            } else if (isRecognized || isValid) {
                if (eventType & INPUT_END) {
                    return state | STATE_ENDED;
                } else if (!(state & STATE_BEGAN)) {
                    return STATE_BEGAN;
                }
                return state | STATE_CHANGED;
            }
            return STATE_FAILED;
        }
    });

    /**
     * Pan
     * Recognized when the pointer is down and moved in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);

        this.pX = null;
        this.pY = null;
    }

    inherit(PanRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PanRecognizer
         */
        defaults: {
            event: 'pan',
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },

        getTouchAction: function getTouchAction() {
            var direction = this.options.direction;
            var actions = [];
            if (direction & DIRECTION_HORIZONTAL) {
                actions.push(TOUCH_ACTION_PAN_Y);
            }
            if (direction & DIRECTION_VERTICAL) {
                actions.push(TOUCH_ACTION_PAN_X);
            }
            return actions;
        },

        directionTest: function directionTest(input) {
            var options = this.options;
            var hasMoved = true;
            var distance = input.distance;
            var direction = input.direction;
            var x = input.deltaX;
            var y = input.deltaY;

            // lock to axis?
            if (!(direction & options.direction)) {
                if (options.direction & DIRECTION_HORIZONTAL) {
                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    hasMoved = x != this.pX;
                    distance = Math.abs(input.deltaX);
                } else {
                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                    hasMoved = y != this.pY;
                    distance = Math.abs(input.deltaY);
                }
            }
            input.direction = direction;
            return hasMoved && distance > options.threshold && direction & options.direction;
        },

        attrTest: function attrTest(input) {
            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
        },

        emit: function emit(input) {

            this.pX = input.deltaX;
            this.pY = input.deltaY;

            var direction = directionStr(input.direction);

            if (direction) {
                input.additionalEvent = this.options.event + direction;
            }
            this._super.emit.call(this, input);
        }
    });

    /**
     * Pinch
     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * @constructor
     * @extends AttrRecognizer
     */
    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(PinchRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'pinch',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },

        emit: function emit(input) {
            if (input.scale !== 1) {
                var inOut = input.scale < 1 ? 'in' : 'out';
                input.additionalEvent = this.options.event + inOut;
            }
            this._super.emit.call(this, input);
        }
    });

    /**
     * Press
     * Recognized when the pointer is down for x ms without any movement.
     * @constructor
     * @extends Recognizer
     */
    function PressRecognizer() {
        Recognizer.apply(this, arguments);

        this._timer = null;
        this._input = null;
    }

    inherit(PressRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PressRecognizer
         */
        defaults: {
            event: 'press',
            pointers: 1,
            time: 251, // minimal time of the pointer to be pressed
            threshold: 9 // a minimal movement is ok, but keep it low
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_AUTO];
        },

        process: function process(input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTime = input.deltaTime > options.time;

            this._input = input;

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                this.reset();
            } else if (input.eventType & INPUT_START) {
                this.reset();
                this._timer = setTimeoutContext(function () {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit();
                }, options.time, this);
            } else if (input.eventType & INPUT_END) {
                return STATE_RECOGNIZED;
            }
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit(input) {
            if (this.state !== STATE_RECOGNIZED) {
                return;
            }

            if (input && input.eventType & INPUT_END) {
                this.manager.emit(this.options.event + 'up', input);
            } else {
                this._input.timeStamp = now();
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Rotate
     * Recognized when two or more pointer are moving in a circular motion.
     * @constructor
     * @extends AttrRecognizer
     */
    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(RotateRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof RotateRecognizer
         */
        defaults: {
            event: 'rotate',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
    });

    /**
     * Swipe
     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(SwipeRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof SwipeRecognizer
         */
        defaults: {
            event: 'swipe',
            threshold: 10,
            velocity: 0.3,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },

        getTouchAction: function getTouchAction() {
            return PanRecognizer.prototype.getTouchAction.call(this);
        },

        attrTest: function attrTest(input) {
            var direction = this.options.direction;
            var velocity;

            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                velocity = input.overallVelocity;
            } else if (direction & DIRECTION_HORIZONTAL) {
                velocity = input.overallVelocityX;
            } else if (direction & DIRECTION_VERTICAL) {
                velocity = input.overallVelocityY;
            }

            return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
        },

        emit: function emit(input) {
            var direction = directionStr(input.offsetDirection);
            if (direction) {
                this.manager.emit(this.options.event + direction, input);
            }

            this.manager.emit(this.options.event, input);
        }
    });

    /**
     * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
     * a single tap.
     *
     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
     * multi-taps being recognized.
     * @constructor
     * @extends Recognizer
     */
    function TapRecognizer() {
        Recognizer.apply(this, arguments);

        // previous time and center,
        // used for tap counting
        this.pTime = false;
        this.pCenter = false;

        this._timer = null;
        this._input = null;
        this.count = 0;
    }

    inherit(TapRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300, // max time between the multi-tap taps
            time: 250, // max time of the pointer to be down (like finger on the screen)
            threshold: 9, // a minimal movement is ok, but keep it low
            posThreshold: 10 // a multi-tap can be a bit off the initial position
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_MANIPULATION];
        },

        process: function process(input) {
            var options = this.options;

            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTouchTime = input.deltaTime < options.time;

            this.reset();

            if (input.eventType & INPUT_START && this.count === 0) {
                return this.failTimeout();
            }

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END) {
                    return this.failTimeout();
                }

                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

                this.pTime = input.timeStamp;
                this.pCenter = input.center;

                if (!validMultiTap || !validInterval) {
                    this.count = 1;
                } else {
                    this.count += 1;
                }

                this._input = input;

                // if tap count matches we have recognized it,
                // else it has began recognizing...
                var tapCount = this.count % options.taps;
                if (tapCount === 0) {
                    // no failing requirements, immediately trigger the tap event
                    // or wait as long as the multitap interval to trigger
                    if (!this.hasRequireFailures()) {
                        return STATE_RECOGNIZED;
                    } else {
                        this._timer = setTimeoutContext(function () {
                            this.state = STATE_RECOGNIZED;
                            this.tryEmit();
                        }, options.interval, this);
                        return STATE_BEGAN;
                    }
                }
            }
            return STATE_FAILED;
        },

        failTimeout: function failTimeout() {
            this._timer = setTimeoutContext(function () {
                this.state = STATE_FAILED;
            }, this.options.interval, this);
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit() {
            if (this.state == STATE_RECOGNIZED) {
                this._input.tapCount = this.count;
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Simple way to create a manager with a default set of recognizers.
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options);
    }

    /**
     * @const {string}
     */
    Hammer.VERSION = '2.0.7';

    /**
     * default settings
     * @namespace
     */
    Hammer.defaults = {
        /**
         * set if DOM events are being triggered.
         * But this is slower and unused by simple implementations, so disabled by default.
         * @type {Boolean}
         * @default false
         */
        domEvents: false,

        /**
         * The value for the touchAction property/fallback.
         * When set to `compute` it will magically set the correct value based on the added recognizers.
         * @type {String}
         * @default compute
         */
        touchAction: TOUCH_ACTION_COMPUTE,

        /**
         * @type {Boolean}
         * @default true
         */
        enable: true,

        /**
         * EXPERIMENTAL FEATURE -- can be removed/changed
         * Change the parent input target element.
         * If Null, then it is being set the to main element.
         * @type {Null|EventTarget}
         * @default null
         */
        inputTarget: null,

        /**
         * force an input class
         * @type {Null|Function}
         * @default null
         */
        inputClass: null,

        /**
         * Default recognizer setup when calling `Hammer()`
         * When creating a new Manager these will be skipped.
         * @type {Array}
         */
        preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

        /**
         * Some CSS properties can be used to improve the working of Hammer.
         * Add them to this method and they will be set when creating a new Manager.
         * @namespace
         */
        cssProps: {
            /**
             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userSelect: 'none',

            /**
             * Disable the Windows Phone grippers when pressing an element.
             * @type {String}
             * @default 'none'
             */
            touchSelect: 'none',

            /**
             * Disables the default callout shown when you touch and hold a touch target.
             * On iOS, when you touch and hold a touch target such as a link, Safari displays
             * a callout containing information about the link. This property allows you to disable that callout.
             * @type {String}
             * @default 'none'
             */
            touchCallout: 'none',

            /**
             * Specifies whether zooming is enabled. Used by IE10>
             * @type {String}
             * @default 'none'
             */
            contentZooming: 'none',

            /**
             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userDrag: 'none',

            /**
             * Overrides the highlight color shown when the user taps a link or a JavaScript
             * clickable element in iOS. This property obeys the alpha value, if specified.
             * @type {String}
             * @default 'rgba(0,0,0,0)'
             */
            tapHighlightColor: 'rgba(0,0,0,0)'
        }
    };

    var STOP = 1;
    var FORCED_STOP = 2;

    /**
     * Manager
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Manager(element, options) {
        this.options = assign({}, Hammer.defaults, options || {});

        this.options.inputTarget = this.options.inputTarget || element;

        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};

        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);

        toggleCssProps(this, true);

        each(this.options.recognizers, function (item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3]);
        }, this);
    }

    Manager.prototype = {
        /**
         * set options
         * @param {Object} options
         * @returns {Manager}
         */
        set: function set(options) {
            assign(this.options, options);

            // Options that need a little more setup
            if (options.touchAction) {
                this.touchAction.update();
            }
            if (options.inputTarget) {
                // Clean up existing event listeners and reinitialize
                this.input.destroy();
                this.input.target = options.inputTarget;
                this.input.init();
            }
            return this;
        },

        /**
         * stop recognizing for this session.
         * This session will be discarded, when a new [input]start event is fired.
         * When forced, the recognizer cycle is stopped immediately.
         * @param {Boolean} [force]
         */
        stop: function stop(force) {
            this.session.stopped = force ? FORCED_STOP : STOP;
        },

        /**
         * run the recognizers!
         * called by the inputHandler function on every movement of the pointers (touches)
         * it walks through all the recognizers and tries to detect the gesture that is being made
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            var session = this.session;
            if (session.stopped) {
                return;
            }

            // run the touch-action polyfill
            this.touchAction.preventDefaults(inputData);

            var recognizer;
            var recognizers = this.recognizers;

            // this holds the recognizer that is being recognized.
            // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
            // if no recognizer is detecting a thing, it is set to `null`
            var curRecognizer = session.curRecognizer;

            // reset when the last recognizer is recognized
            // or when we're in a new session
            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                curRecognizer = session.curRecognizer = null;
            }

            var i = 0;
            while (i < recognizers.length) {
                recognizer = recognizers[i];

                // find out if we are allowed try to recognize the input for this one.
                // 1.   allow if the session is NOT forced stopped (see the .stop() method)
                // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
                //      that is being recognized.
                // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
                //      this can be setup with the `recognizeWith()` method on the recognizer.
                if (session.stopped !== FORCED_STOP && ( // 1
                !curRecognizer || recognizer == curRecognizer || // 2
                recognizer.canRecognizeWith(curRecognizer))) {
                    // 3
                    recognizer.recognize(inputData);
                } else {
                    recognizer.reset();
                }

                // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
                // current active recognizer. but only if we don't already have an active recognizer
                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                    curRecognizer = session.curRecognizer = recognizer;
                }
                i++;
            }
        },

        /**
         * get a recognizer by its event name.
         * @param {Recognizer|String} recognizer
         * @returns {Recognizer|Null}
         */
        get: function get(recognizer) {
            if (recognizer instanceof Recognizer) {
                return recognizer;
            }

            var recognizers = this.recognizers;
            for (var i = 0; i < recognizers.length; i++) {
                if (recognizers[i].options.event == recognizer) {
                    return recognizers[i];
                }
            }
            return null;
        },

        /**
         * add a recognizer to the manager
         * existing recognizers with the same event name will be removed
         * @param {Recognizer} recognizer
         * @returns {Recognizer|Manager}
         */
        add: function add(recognizer) {
            if (invokeArrayArg(recognizer, 'add', this)) {
                return this;
            }

            // remove existing
            var existing = this.get(recognizer.options.event);
            if (existing) {
                this.remove(existing);
            }

            this.recognizers.push(recognizer);
            recognizer.manager = this;

            this.touchAction.update();
            return recognizer;
        },

        /**
         * remove a recognizer by name or instance
         * @param {Recognizer|String} recognizer
         * @returns {Manager}
         */
        remove: function remove(recognizer) {
            if (invokeArrayArg(recognizer, 'remove', this)) {
                return this;
            }

            recognizer = this.get(recognizer);

            // let's make sure this recognizer exists
            if (recognizer) {
                var recognizers = this.recognizers;
                var index = inArray(recognizers, recognizer);

                if (index !== -1) {
                    recognizers.splice(index, 1);
                    this.touchAction.update();
                }
            }

            return this;
        },

        /**
         * bind event
         * @param {String} events
         * @param {Function} handler
         * @returns {EventEmitter} this
         */
        on: function on(events, handler) {
            if (events === undefined) {
                return;
            }
            if (handler === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            });
            return this;
        },

        /**
         * unbind event, leave emit blank to remove all handlers
         * @param {String} events
         * @param {Function} [handler]
         * @returns {EventEmitter} this
         */
        off: function off(events, handler) {
            if (events === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                if (!handler) {
                    delete handlers[event];
                } else {
                    handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
                }
            });
            return this;
        },

        /**
         * emit event to the listeners
         * @param {String} event
         * @param {Object} data
         */
        emit: function emit(event, data) {
            // we also want to trigger dom events
            if (this.options.domEvents) {
                triggerDomEvent(event, data);
            }

            // no handlers, so skip it all
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (!handlers || !handlers.length) {
                return;
            }

            data.type = event;
            data.preventDefault = function () {
                data.srcEvent.preventDefault();
            };

            var i = 0;
            while (i < handlers.length) {
                handlers[i](data);
                i++;
            }
        },

        /**
         * destroy the manager and unbinds all events
         * it doesn't unbind dom events, that is the user own responsibility
         */
        destroy: function destroy() {
            this.element && toggleCssProps(this, false);

            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null;
        }
    };

    /**
     * add/remove the css properties as defined in manager.options.cssProps
     * @param {Manager} manager
     * @param {Boolean} add
     */
    function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style) {
            return;
        }
        var prop;
        each(manager.options.cssProps, function (value, name) {
            prop = prefixed(element.style, name);
            if (add) {
                manager.oldCssProps[prop] = element.style[prop];
                element.style[prop] = value;
            } else {
                element.style[prop] = manager.oldCssProps[prop] || '';
            }
        });
        if (!add) {
            manager.oldCssProps = {};
        }
    }

    /**
     * trigger dom event
     * @param {String} event
     * @param {Object} data
     */
    function triggerDomEvent(event, data) {
        var gestureEvent = document.createEvent('Event');
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
    }

    assign(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,

        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,

        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,

        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,

        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,

        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,

        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        assign: assign,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    });

    // this prevents errors when Hammer is loaded in the presence of an AMD
    //  style loader but by script tag, not by the loader.
    var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line
    freeGlobal.Hammer = Hammer;

    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return Hammer;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = Hammer;
    } else {
        window[exportName] = Hammer;
    }
})(window, document, 'Hammer');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Parallaxer
 * A class that creates a parallax effect based on the mouse position
 */
var Parallaxer = function () {

  /**
   * @param {Element} baseElement - The base element to use for mouseEffects
   * @param {Element} rootElement - The root element to apply parallax effects to.
   * @param {Object} rotationSentivity - x,y object with rotation sensitivity.
   * @param {Object} translateSentitivy - x,y object with translate senstiivity.
   * @constructor
   */
  function Parallaxer(baseElement, rootElement, rotationSensitivity, translateSensitity) {
    _classCallCheck(this, Parallaxer);

    // External utilities
    this.utils = new _utils2.default();

    /**
     * Add required styles to body.
     */
    this.$body = (0, _utils.$)('body')[0];

    this.$body.style.transformStyle = 'preserve-3d';
    this.$body.style.webkitTransformStyle = 'preserve-3d';
    this.$body.style.perspective = window.innerHeight / 2 + 'px';
    this.$body.style.webkitPerspective = window.innerHeight / 2 + 'px';

    /**
     * Flag to allow animation.
     * @type {boolean}
     */
    this.animate_ = false;

    /**
     * The current mouse position data acquired from the mouse tracker.
     * @type {Object}
     */
    this.mousePosition_ = null;

    /**
     * The rotation sensitivity of the parallax effect.
     */
    this.rotationSensitivity = rotationSensitivity || {
      x: 0.2,
      y: 0.2
    };

    /**
     * The translate sensitivity of the parallax effect.
     */
    this.translateSensitivity = translateSensitity || {
      x: 1,
      y: 1
    };

    /**
     * The current transform values.
     */
    this.transformValues = {
      xDeg: 0,
      yDeg: 0,
      zDeg: 0,
      xTrans: 0,
      yTrans: 0

      /**
       * The root element to manipulate.
       * @type {Element}
       */
    };this.$rootElement_ = rootElement;
    this.baseElement = baseElement || _utils.w;

    this.mousePosition_ = this.utils.captureMouse(this.baseElement);
  }

  /**
   * Runs the animation.
   */


  _createClass(Parallaxer, [{
    key: 'run',
    value: function run() {
      this.animate_ = true;
      this.rafLoop_();
    }

    /**
     * Stops the animation.
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.animate_ = false;
    }

    /**
     * Internal animation cycle.
     */

  }, {
    key: 'rafLoop_',
    value: function rafLoop_() {
      var _this = this;

      if (!this.animate_) {
        return;
      }

      window.requestAnimationFrame(function () {
        _this.rafLoop_();
      });

      this.render_();
    }

    /**
     * Internal render cycle.
     */

  }, {
    key: 'render_',
    value: function render_() {

      if (!this.mousePosition_) {
        return;
      }

      var xDegree = this.mousePosition_.percentageX * this.rotationSensitivity.x;
      var yDegree = this.mousePosition_.percentageY * this.rotationSensitivity.y;

      var xTrans = -this.mousePosition_.percentageX * this.translateSensitivity.x;
      var yTrans = -this.mousePosition_.percentageY * this.translateSensitivity.y;

      this.transformValues.xDeg += (xDegree - this.transformValues.xDeg) * 0.05;
      this.transformValues.yDeg += (yDegree - this.transformValues.yDeg) * 0.05;
      this.transformValues.xTrans += (xTrans - this.transformValues.xTrans) * 0.05;
      this.transformValues.yTrans += (yTrans - this.transformValues.yTrans) * 0.05;

      var rotateXstring = 'rotateX( ' + this.transformValues.yDeg + 'deg )';
      var rotateYstring = 'rotateY( ' + -this.transformValues.xDeg + 'deg )';
      var rotateZstring = 'rotateZ(0deg)';
      var translateXstring = 'translateX( ' + -this.transformValues.xTrans + 'px )';
      var translateYstring = 'translateY( ' + -this.transformValues.yTrans + 'px )';

      var transformString = rotateXstring + ' ' + rotateYstring + ' ' + rotateZstring + ' ' + translateXstring + ' ' + translateYstring;

      this.$rootElement_.forEach(function ($rootElement) {
        $rootElement.style.perspectiveOrigin = '50%, 50%';
        $rootElement.style.webkitPerspectiveOrigin = '50%, 50%';

        $rootElement.style.transform = transformString;
        $rootElement.style.webkitTransform = transformString;

        $rootElement.style.transformOrigin = '50% 50%';
        $rootElement.style.webkitTransformOrigin = '50% 50%';
      });
    }
  }]);

  return Parallaxer;
}();

exports.default = Parallaxer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Particle Canvas
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// Libs


var _resizeObserverPolyfill = __webpack_require__(22);

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _particle = __webpack_require__(17);

var _particle2 = _interopRequireDefault(_particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParticleCanvas = function () {

  /**
   * @param {HTMLElement} settings.canvasEL - HTMLElement of canvas
   */
  function ParticleCanvas(settings) {
    _classCallCheck(this, ParticleCanvas);

    // Internal Settings
    this.maxWidth = settings.maxWidth;
    this.maxHeight = settings.maxHeight;
    this.canvasBackground = settings.canvasBackground;

    // External utilities
    this.utils = new _utils2.default();
    this.requestAnimationFrame = _utils.w.requestAnimationFrame.bind(_utils.w);
    this.devicePixelRatio = _utils.w.devicePixelRatio;

    // DOM & Canvas object references
    this.$canvas = settings.canvasEL;
    this.$canvasParent = settings.canvasEL.parentNode;
    this.context = this.$canvas.getContext('2d');
    this.left = 0;
    this.top = 0;
    this.right = this.maxWidth || this.utils.screenSize().width;
    this.bottom = this.maxHeight || this.utils.screenSize().height;

    // Set canvas size to fullscreen
    this.$canvas.width = this.maxWidth || this.utils.screenSize().width;
    this.$canvas.height = this.maxHeight || this.utils.screenSize().height;
    this.centerX = this.$canvas.width / 2;
    this.centerY = this.$canvas.height / 2;

    // Environment physics
    this.spring = 0.05;
    this.bounce = -1;
    this.gravity = 0;
    this.speed = 0.25;
    this.friction = 1;

    var particleCount = void 0;

    if (this.utils.screenSize().width > 1440) {
      particleCount = 150;
    } else if (this.utils.screenSize().width > 1024) {
      particleCount = 125;
    } else if (this.utils.screenSize().width > 640) {
      particleCount = 100;
    } else {
      particleCount = 75;
    }

    // Particle settings
    this.particles = [];
    this.numOfParticles = settings.numOfParticles || particleCount;
    this.particleDistance = 150;
    this.particleOpacity = settings.particleOpacity || 0.5;
    this.particleSpring = 0.000005;
    this.particleSize = 3;
    this.particleLineWidth = settings.particleLineWidth || 1;
    this.particleColors = ['#D6E9F1' // slightly darker light blue
    ];
    this.particleColors = settings.particleColors || this.particleColors;

    // Set mouse/touch coordinates to variable
    this.isTouching = false;
    this.respondToMouse = settings.respondToMouse !== false;
    this.touch = this.utils.captureTouch(_utils.w);
    this.mouse = this.utils.captureMouse(_utils.w);
    this.mouseBallThreshold = 150;
    this.mouseBall = new _particle2.default(this.mouseBallThreshold, 'transparent');

    // this.utils.setupHelpers(w, this.mouse, this.touch);

    // Start animation
    this._init();

    // console.log('instantiated particle canvas', this);
  }

  /**
   * Initialize canvas
   */


  _createClass(ParticleCanvas, [{
    key: '_init',
    value: function _init() {
      // Set initial mouse ball position
      this.mouseBall.x = this.centerX;
      this.mouseBall.y = this.centerY;

      // Kick off main functions
      this._upscaleCanvas();
      this._setupListeners();
      this._generateParticles();
      this._animate();

      // console.log('initialized particle animation');
    }

    /**
     * Upscale canvas if device pixel ratio doesnt match
     * @see https://www.html5rocks.com/en/tutorials/canvas/hidpi/
     */

  }, {
    key: '_upscaleCanvas',
    value: function _upscaleCanvas() {
      // console.log('device pixel ratio =', this.devicePixelRatio);

      var _oldWidth = this.$canvas.width,
          _oldHeight = this.$canvas.height;

      // Upscale canvas element by devicePixelRatio
      this.$canvas.width *= this.devicePixelRatio;
      this.$canvas.height *= this.devicePixelRatio;

      // Set canvas center
      this.centerX = _oldWidth / 2;
      this.centerY = _oldHeight / 2;

      // Downscale canvas style (CSS) to original size
      this.$canvas.style.width = _oldWidth + 'px';
      this.$canvas.style.height = _oldHeight + 'px';

      // Scale canvas context to counter manually scaled canvas
      this.context.scale(this.devicePixelRatio, this.devicePixelRatio);

      return false;
    }

    /**
    * Setup event listeners
    */

  }, {
    key: '_setupListeners',
    value: function _setupListeners() {
      var _this = this;

      _utils.w.addEventListener('resize', function () {
        return _this._onWindowResize();
      });
      var $body = document.querySelectorAll('body')[0];

      if (this.$canvasParent !== _utils.w && !$body.classList.contains('home')) {
        new _resizeObserverPolyfill2.default(function () {
          _this._onElementResize();
        }).observe(this.$canvasParent);
      }

      if (this.utils.allowDeviceOrientation()) {

        // w.addEventListener('deviceorientation', (e) => this._handleOrientation(e), true);

      } else {

        document.addEventListener('mousemove', function (e) {
          return _this._mouseMoveCallback(e);
        });
        document.addEventListener('mousedown', function (e) {
          return _this._mouseDownCallback(e);
        });
        document.addEventListener('mouseup', function (e) {
          return _this._mouseUpCallback(e);
        });
      }
    }

    /**
    * Generate particles
    */

  }, {
    key: '_generateParticles',
    value: function _generateParticles() {
      for (var i = 0; i < this.numOfParticles; i++) {
        var particle = new _particle2.default(this.utils.rand(0, this.particleSize), this.particleColors[this.utils.randInt(0, this.particleColors.length)]);

        particle.x = this.utils.randInt(1, this.$canvas.width / this.devicePixelRatio);
        particle.y = this.utils.randInt(1, this.$canvas.height / this.devicePixelRatio);
        particle.vx = this.utils.randInt(-this.speed, this.speed);
        particle.vy = this.utils.randInt(-this.speed, this.speed);
        particle.opacity = this.particleOpacity;

        if (particle.vx === 0) {
          particle.vx = this.utils.coinFlip() ? this.speed : -this.speed;
        }

        if (particle.vy === 0) {
          particle.vy = this.utils.coinFlip() ? this.speed : -this.speed;
        }

        this.particles.push(particle);
      }
    }

    /**
    * Motion animation
    */

  }, {
    key: '_motion',
    value: function _motion(particle) {

      // Add gravity
      particle.vy += this.gravity;

      // Increment velocity
      particle.x += particle.vx;
      particle.y += particle.vy;
    }

    /**
    * Detection against top/right/bottom/left boundaries
    */

  }, {
    key: '_boundaryDetection',
    value: function _boundaryDetection(particle) {
      if (particle.x + particle.radius > this.right) {
        particle.x = this.right - particle.radius;
        particle.vx *= this.bounce;
      } else if (particle.x - particle.radius < this.left) {
        particle.x = this.left + particle.radius;
        particle.vx *= this.bounce;
      }

      if (particle.y + particle.radius > this.bottom) {
        particle.y = this.bottom - particle.radius;
        particle.vy *= this.bounce;
      } else if (particle.y - particle.radius < this.top) {
        particle.y = this.top + particle.radius;
        particle.vy *= this.bounce;
      }
    }

    /**
     * Collision detection between mouse and particles
     *
     * @param {Object} particle - Instance 2D Ball context
     */

  }, {
    key: '_mouseCollision',
    value: function _mouseCollision(particle) {
      var dx = particle.x - this.mouseBall.x,
          dy = particle.y - this.mouseBall.y,
          dist = Math.sqrt(dx * dx + dy * dy),
          min_dist = particle.radius + this.mouseBall.radius;

      var normVec = {
        x: dx / dist,
        y: dy / dist
      },
          velocity = 100,
          repulseFactor = this.utils.clamp(1 / min_dist * (-1 * Math.pow(dist / min_dist, 2) + 1) * min_dist * velocity, 0, 50);

      var pos = {
        x: particle.x + normVec.x * repulseFactor,
        y: particle.y + normVec.y * repulseFactor
      };

      particle.x = pos.x;
      particle.y = pos.y;

      return particle;
    }

    /**
    * Collision detection between particles
    */

  }, {
    key: '_collisionCheck',
    value: function _collisionCheck(particleA, i) {
      for (var j = i + 1; j < this.numOfParticles; j++) {
        var particleB = this.particles[j],
            dx = particleB.x - particleA.x,
            dy = particleB.y - particleA.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            min_dist = this.particleDistance;

        // If particle is within range of another
        if (dist < min_dist) {
          var tx = particleA.x + dx / dist * min_dist,
              ty = particleA.y + dy / dist * min_dist,
              ax = (tx - particleB.x) * this.particleSpring,
              ay = (ty - particleB.y) * this.particleSpring;

          // Draw connection from particleA
          // to particleB coordinates
          this.context.lineWidth = this.particleLineWidth / 4;
          this.context.strokeStyle = particleA.color;
          this.context.beginPath();
          this.context.moveTo(particleA.x, particleA.y);
          this.context.lineTo(particleB.x, particleB.y);
          this.context.stroke();

          particleA.vx -= ax;
          particleA.vy -= ay;
          particleB.vx += ax;
          particleB.vy += ay;
        }
      }
    }

    /**
    * Animation loop
    */

  }, {
    key: '_animate',
    value: function _animate() {

      // Call request animation frame recursively
      this.requestAnimationFrame(this._animate.bind(this), this.$canvas);

      // Clear canvas every frame
      if (this.canvasBackground) {
        this.context.fillStyle = this.canvasBackground;
        this.context.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
      } else {
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
      }

      // Animate stuff...
      if (this.particles) {
        for (var i = 0; i < this.particles.length; i++) {
          var particle = this.particles[i];

          this._motion(particle, i);
          this._boundaryDetection(particle, i);
          this._collisionCheck(particle, i);

          if (!this.utils.allowDeviceOrientation() && this.respondToMouse) {
            this._mouseCollision(particle, i);
          }

          particle.draw(this.context);
        }
      }

      this.mouseBall.draw(this.context);
    }

    /**
     * Handle Device Orientation
     *  - Tilt 90º > 0º to increase gravity on mobile
     */

  }, {
    key: '_handleOrientation',
    value: function _handleOrientation(event) {

      var x = event.gamma;
      var y = event.beta;

      if (x > 90) {
        x = 90;
      }
      if (x < 45) {
        x = 45;
      }

      if (y > 90) {
        y = 90;
      }
      if (y < 0) {
        y = 0;
      }

      var rangeX = (90 - Math.floor(Math.abs(x))) / 45;
      var rangeY = (90 - Math.floor(Math.abs(y))) / 90;

      // Do stuff with the new orientation data
      if (Math.floor(rangeY * 10) > 0) {
        this.gravity = rangeY;
      }

      if (Math.floor(rangeX * 10) > 0) {
        this.speed = rangeX;
      }
    }

    /**
     * Mouse move callback
     *
     * @param {Event} e - Event Object
     *
     */

  }, {
    key: '_mouseMoveCallback',
    value: function _mouseMoveCallback() {
      // Set mouseBall to mouse coordinates
      this.mouseBall.x = this.mouse.x;
      this.mouseBall.y = this.mouse.y;
    }

    /**
     * Mouse Down callback:
     * - Increment particles on press and hold
     *
     * @param {Event} e - Event Object
     *
     */

  }, {
    key: '_mouseDownCallback',
    value: function _mouseDownCallback() {
      this.isTouching = true;
      this.mouseBall.radius = 0;
    }

    /**
     * Mouse Up callback:
     * - Reset particle count on press release
     *
     * @param {Event} e - Event Object
     *
     */

  }, {
    key: '_mouseUpCallback',
    value: function _mouseUpCallback() {
      this.isTouching = false;
      this.mouseBall.radius = this.mouseBallThreshold;
    }

    /**
    * Window resize callback
    */

  }, {
    key: '_onElementResize',
    value: function _onElementResize() {
      this.right = this.$canvas.width = this.$canvasParent.offsetWidth;
      this.bottom = this.$canvas.height = this.$canvasParent.offsetHeight;
      this.centerX = this.$canvas.width / 2;
      this.centerY = this.$canvas.height / 2;
      this._upscaleCanvas();
    }

    /**
    * Window resize callback
    */

  }, {
    key: '_onWindowResize',
    value: function _onWindowResize() {
      this.right = this.$canvas.width = this.maxWidth || this.utils.screenSize().width;
      this.bottom = this.$canvas.height = this.maxHeight || this.utils.screenSize().height;
      this.centerX = this.$canvas.width / 2;
      this.centerY = this.$canvas.height / 2;
      this._upscaleCanvas();
    }
  }]);

  return ParticleCanvas;
}();

exports.default = ParticleCanvas;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(7);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 *  Third-party vendor entry point
 */

/**
 * Vue.js
 *
 * @desc Explicitly install router
 * @see https://router.vuejs.org/en/installation.html
 */
// import Vue from 'vue';
// import VueRouter from 'vue-router';
// Vue.config.devtools = false;
// Vue.use( VueRouter );


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Main application
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = __webpack_require__(0);

var _ui = __webpack_require__(8);

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {

  /**
   * Setup variables and event listeners
   */
  function App() {
    _classCallCheck(this, App);

    /** Setup event listeners */
    this._registerListeners();

    // console.log('instantiated app');
  }

  /**
   * Setup UI
   * @private
   */


  _createClass(App, [{
    key: '_initUI',
    value: function _initUI() {

      _utils.w.vm = new _ui2.default();
    }

    /**
     * Setup Event Listeners
     * @listens {DOMContentLoaded} Initialize UI
     * @listens {load} Initialize Social Media API
     * @private
     */

  }, {
    key: '_registerListeners',
    value: function _registerListeners() {
      var _this = this;

      _utils.w.addEventListener('load', function (e) {
        return _this._initUI(e);
      });
    }
  }]);

  return App;
}();

/** hello.world */


exports.default = App;
new App();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(9);

var _vue2 = _interopRequireDefault(_vue);

var _vueTouch = __webpack_require__(11);

var _vueTouch2 = _interopRequireDefault(_vueTouch);

var _vanillaLazyload = __webpack_require__(12);

var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

var _utils2 = __webpack_require__(0);

var _utils3 = _interopRequireDefault(_utils2);

var _state = __webpack_require__(13);

var _state2 = _interopRequireDefault(_state);

var _pageTransitions = __webpack_require__(14);

var _pageTransitions2 = _interopRequireDefault(_pageTransitions);

var _home = __webpack_require__(15);

var _home2 = _interopRequireDefault(_home);

var _caseStudy = __webpack_require__(18);

var _caseStudy2 = _interopRequireDefault(_caseStudy);

var _gohawaii = __webpack_require__(19);

var _gohawaii2 = _interopRequireDefault(_gohawaii);

var _touraloha = __webpack_require__(20);

var _touraloha2 = _interopRequireDefault(_touraloha);

var _teacup = __webpack_require__(21);

var _teacup2 = _interopRequireDefault(_teacup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  User Interface
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Libs


// Services


// Components


// Pages


// Case study page config


var _stateService = new _state2.default();
_vue2.default.use(_vueTouch2.default);

var UI = function (_Vue) {
  _inherits(UI, _Vue);

  function UI() {
    _classCallCheck(this, UI);

    var _utils = new _utils3.default();

    /** Options */
    var _options = {
      el: '.container',
      delimiters: ['[[', ']]'],
      data: {
        isActive: false,
        stateService: _stateService
      }
    };

    _options.methods = {
      onSwipeUp: function onSwipeUp() {
        this.stateService.getNextItem();
        // console.log('swiped up');
      },
      onSwipeDown: function onSwipeDown() {
        this.stateService.getPreviousItem();
        // console.log('swiped down');
      }
    };

    /** Options - Custom Directives */
    _options.directives = {
      init: {
        // directive definition
        inserted: function inserted(el, binding) {
          binding.value();
        }
      }
    };

    /** Options - Lifecycle Methods */
    _options.mounted = function () {
      var _this2 = this;

      var $preloader = (0, _utils2.$)('.preloader')[0];
      var $body = (0, _utils2.$)('body')[0];
      var $logo = $preloader.querySelectorAll('.preloader__logo')[0];

      _utils.delay(function () {
        $logo.classList.remove('fade-in-up');
        $logo.classList.add('fade-out-up');
      }, 1000).delay(function () {
        _this2.isActive = true;
        $preloader.classList.add('fade-out');

        _utils.delay(function () {
          if ($body.classList.contains('home')) {
            new _home2.default(_this2.stateService);
          } else if ($body.classList.contains('case-study')) {
            var caseStudy = $body.classList.item(1);
            var caseStudySettings = {};

            switch (caseStudy) {
              case 'gohawaii':
                caseStudySettings = new _gohawaii2.default();
                break;
              case 'tour-aloha':
                caseStudySettings = new _touraloha2.default();
                break;
              case 'teacup-analytics':
                caseStudySettings = new _teacup2.default();
                break;
              case 'clearstream':
              case 'mobipcs':
              default:
                console.log('No case study settings available for this page!');
            }

            new _caseStudy2.default(caseStudySettings);
          }
        }, 0);
      }, 500).delay(function () {
        $preloader.classList.remove('active');
        new _vanillaLazyload2.default();
        new _pageTransitions2.default();
      }, 0);
    };

    return _possibleConstructorReturn(this, (UI.__proto__ || Object.getPrototypeOf(UI)).call(this, _options));
  }

  return UI;
}(_vue2.default);

exports.default = UI;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.4.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
!function (t, e) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : t.Vue = e();
}(undefined, function () {
  "use strict";
  function t(t) {
    return void 0 === t || null === t;
  }function e(t) {
    return void 0 !== t && null !== t;
  }function n(t) {
    return !0 === t;
  }function r(t) {
    return !1 === t;
  }function i(t) {
    return "string" == typeof t || "number" == typeof t || "boolean" == typeof t;
  }function o(t) {
    return null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  }function a(t) {
    return "[object Object]" === pi.call(t);
  }function s(t) {
    return "[object RegExp]" === pi.call(t);
  }function c(t) {
    var e = parseFloat(t);return e >= 0 && Math.floor(e) === e && isFinite(t);
  }function u(t) {
    return null == t ? "" : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? JSON.stringify(t, null, 2) : String(t);
  }function l(t) {
    var e = parseFloat(t);return isNaN(e) ? t : e;
  }function f(t, e) {
    for (var n = Object.create(null), r = t.split(","), i = 0; i < r.length; i++) {
      n[r[i]] = !0;
    }return e ? function (t) {
      return n[t.toLowerCase()];
    } : function (t) {
      return n[t];
    };
  }function p(t, e) {
    if (t.length) {
      var n = t.indexOf(e);if (n > -1) return t.splice(n, 1);
    }
  }function d(t, e) {
    return hi.call(t, e);
  }function v(t) {
    var e = Object.create(null);return function (n) {
      return e[n] || (e[n] = t(n));
    };
  }function h(t, e) {
    function n(n) {
      var r = arguments.length;return r ? r > 1 ? t.apply(e, arguments) : t.call(e, n) : t.call(e);
    }return n._length = t.length, n;
  }function m(t, e) {
    e = e || 0;for (var n = t.length - e, r = new Array(n); n--;) {
      r[n] = t[n + e];
    }return r;
  }function y(t, e) {
    for (var n in e) {
      t[n] = e[n];
    }return t;
  }function g(t) {
    for (var e = {}, n = 0; n < t.length; n++) {
      t[n] && y(e, t[n]);
    }return e;
  }function _(t, e, n) {}function b(t, e) {
    if (t === e) return !0;var n = o(t),
        r = o(e);if (!n || !r) return !n && !r && String(t) === String(e);try {
      var i = Array.isArray(t),
          a = Array.isArray(e);if (i && a) return t.length === e.length && t.every(function (t, n) {
        return b(t, e[n]);
      });if (i || a) return !1;var s = Object.keys(t),
          c = Object.keys(e);return s.length === c.length && s.every(function (n) {
        return b(t[n], e[n]);
      });
    } catch (t) {
      return !1;
    }
  }function $(t, e) {
    for (var n = 0; n < t.length; n++) {
      if (b(t[n], e)) return n;
    }return -1;
  }function C(t) {
    var e = !1;return function () {
      e || (e = !0, t.apply(this, arguments));
    };
  }function w(t) {
    var e = (t + "").charCodeAt(0);return 36 === e || 95 === e;
  }function x(t, e, n, r) {
    Object.defineProperty(t, e, { value: n, enumerable: !!r, writable: !0, configurable: !0 });
  }function A(t) {
    if (!Ti.test(t)) {
      var e = t.split(".");return function (t) {
        for (var n = 0; n < e.length; n++) {
          if (!t) return;t = t[e[n]];
        }return t;
      };
    }
  }function k(t, e, n) {
    if (ki.errorHandler) ki.errorHandler.call(null, t, e, n);else {
      if (!ji || "undefined" == typeof console) throw t;console.error(t);
    }
  }function O(t) {
    return "function" == typeof t && /native code/.test(t.toString());
  }function T(t) {
    Gi.target && Zi.push(Gi.target), Gi.target = t;
  }function S() {
    Gi.target = Zi.pop();
  }function E(t, e, n) {
    t.__proto__ = e;
  }function j(t, e, n) {
    for (var r = 0, i = n.length; r < i; r++) {
      var o = n[r];x(t, o, e[o]);
    }
  }function L(t, e) {
    if (o(t)) {
      var n;return d(t, "__ob__") && t.__ob__ instanceof eo ? n = t.__ob__ : to.shouldConvert && !zi() && (Array.isArray(t) || a(t)) && Object.isExtensible(t) && !t._isVue && (n = new eo(t)), e && n && n.vmCount++, n;
    }
  }function N(t, e, n, r, i) {
    var o = new Gi(),
        a = Object.getOwnPropertyDescriptor(t, e);if (!a || !1 !== a.configurable) {
      var s = a && a.get,
          c = a && a.set,
          u = !i && L(n);Object.defineProperty(t, e, { enumerable: !0, configurable: !0, get: function get() {
          var e = s ? s.call(t) : n;return Gi.target && (o.depend(), u && u.dep.depend(), Array.isArray(e) && D(e)), e;
        }, set: function set(e) {
          var r = s ? s.call(t) : n;e === r || e !== e && r !== r || (c ? c.call(t, e) : n = e, u = !i && L(e), o.notify());
        } });
    }
  }function I(t, e, n) {
    if (Array.isArray(t) && c(e)) return t.length = Math.max(t.length, e), t.splice(e, 1, n), n;if (d(t, e)) return t[e] = n, n;var r = t.__ob__;return t._isVue || r && r.vmCount ? n : r ? (N(r.value, e, n), r.dep.notify(), n) : (t[e] = n, n);
  }function M(t, e) {
    if (Array.isArray(t) && c(e)) t.splice(e, 1);else {
      var n = t.__ob__;t._isVue || n && n.vmCount || d(t, e) && (delete t[e], n && n.dep.notify());
    }
  }function D(t) {
    for (var e = void 0, n = 0, r = t.length; n < r; n++) {
      (e = t[n]) && e.__ob__ && e.__ob__.dep.depend(), Array.isArray(e) && D(e);
    }
  }function P(t, e) {
    if (!e) return t;for (var n, r, i, o = Object.keys(e), s = 0; s < o.length; s++) {
      r = t[n = o[s]], i = e[n], d(t, n) ? a(r) && a(i) && P(r, i) : I(t, n, i);
    }return t;
  }function F(t, e, n) {
    return n ? t || e ? function () {
      var r = "function" == typeof e ? e.call(n) : e,
          i = "function" == typeof t ? t.call(n) : void 0;return r ? P(r, i) : i;
    } : void 0 : e ? t ? function () {
      return P("function" == typeof e ? e.call(this) : e, "function" == typeof t ? t.call(this) : t);
    } : e : t;
  }function R(t, e) {
    return e ? t ? t.concat(e) : Array.isArray(e) ? e : [e] : t;
  }function H(t, e) {
    var n = Object.create(t || null);return e ? y(n, e) : n;
  }function B(t) {
    var e = t.props;if (e) {
      var n,
          r,
          i = {};if (Array.isArray(e)) for (n = e.length; n--;) {
        "string" == typeof (r = e[n]) && (i[yi(r)] = { type: null });
      } else if (a(e)) for (var o in e) {
        r = e[o], i[yi(o)] = a(r) ? r : { type: r };
      }t.props = i;
    }
  }function U(t) {
    var e = t.inject;if (Array.isArray(e)) for (var n = t.inject = {}, r = 0; r < e.length; r++) {
      n[e[r]] = e[r];
    }
  }function V(t) {
    var e = t.directives;if (e) for (var n in e) {
      var r = e[n];"function" == typeof r && (e[n] = { bind: r, update: r });
    }
  }function z(t, e, n) {
    function r(r) {
      var i = no[r] || ro;c[r] = i(t[r], e[r], n, r);
    }"function" == typeof e && (e = e.options), B(e), U(e), V(e);var i = e.extends;if (i && (t = z(t, i, n)), e.mixins) for (var o = 0, a = e.mixins.length; o < a; o++) {
      t = z(t, e.mixins[o], n);
    }var s,
        c = {};for (s in t) {
      r(s);
    }for (s in e) {
      d(t, s) || r(s);
    }return c;
  }function K(t, e, n, r) {
    if ("string" == typeof n) {
      var i = t[e];if (d(i, n)) return i[n];var o = yi(n);if (d(i, o)) return i[o];var a = gi(o);if (d(i, a)) return i[a];var s = i[n] || i[o] || i[a];return s;
    }
  }function J(t, e, n, r) {
    var i = e[t],
        o = !d(n, t),
        a = n[t];if (G(Boolean, i.type) && (o && !d(i, "default") ? a = !1 : G(String, i.type) || "" !== a && a !== bi(t) || (a = !0)), void 0 === a) {
      a = q(r, i, t);var s = to.shouldConvert;to.shouldConvert = !0, L(a), to.shouldConvert = s;
    }return a;
  }function q(t, e, n) {
    if (d(e, "default")) {
      var r = e.default;return t && t.$options.propsData && void 0 === t.$options.propsData[n] && void 0 !== t._props[n] ? t._props[n] : "function" == typeof r && "Function" !== W(e.type) ? r.call(t) : r;
    }
  }function W(t) {
    var e = t && t.toString().match(/^\s*function (\w+)/);return e ? e[1] : "";
  }function G(t, e) {
    if (!Array.isArray(e)) return W(e) === W(t);for (var n = 0, r = e.length; n < r; n++) {
      if (W(e[n]) === W(t)) return !0;
    }return !1;
  }function Z(t) {
    return new io(void 0, void 0, void 0, String(t));
  }function Y(t) {
    var e = new io(t.tag, t.data, t.children, t.text, t.elm, t.context, t.componentOptions, t.asyncFactory);return e.ns = t.ns, e.isStatic = t.isStatic, e.key = t.key, e.isComment = t.isComment, e.isCloned = !0, e;
  }function Q(t) {
    for (var e = t.length, n = new Array(e), r = 0; r < e; r++) {
      n[r] = Y(t[r]);
    }return n;
  }function X(t) {
    function e() {
      var t = arguments,
          n = e.fns;if (!Array.isArray(n)) return n.apply(null, arguments);for (var r = n.slice(), i = 0; i < r.length; i++) {
        r[i].apply(null, t);
      }
    }return e.fns = t, e;
  }function tt(e, n, r, i, o) {
    var a, s, c, u;for (a in e) {
      s = e[a], c = n[a], u = co(a), t(s) || (t(c) ? (t(s.fns) && (s = e[a] = X(s)), r(u.name, s, u.once, u.capture, u.passive)) : s !== c && (c.fns = s, e[a] = c));
    }for (a in n) {
      t(e[a]) && i((u = co(a)).name, n[a], u.capture);
    }
  }function et(r, i, o) {
    function a() {
      o.apply(this, arguments), p(s.fns, a);
    }var s,
        c = r[i];t(c) ? s = X([a]) : e(c.fns) && n(c.merged) ? (s = c).fns.push(a) : s = X([c, a]), s.merged = !0, r[i] = s;
  }function nt(n, r, i) {
    var o = r.options.props;if (!t(o)) {
      var a = {},
          s = n.attrs,
          c = n.props;if (e(s) || e(c)) for (var u in o) {
        var l = bi(u);rt(a, c, u, l, !0) || rt(a, s, u, l, !1);
      }return a;
    }
  }function rt(t, n, r, i, o) {
    if (e(n)) {
      if (d(n, r)) return t[r] = n[r], o || delete n[r], !0;if (d(n, i)) return t[r] = n[i], o || delete n[i], !0;
    }return !1;
  }function it(t) {
    for (var e = 0; e < t.length; e++) {
      if (Array.isArray(t[e])) return Array.prototype.concat.apply([], t);
    }return t;
  }function ot(t) {
    return i(t) ? [Z(t)] : Array.isArray(t) ? st(t) : void 0;
  }function at(t) {
    return e(t) && e(t.text) && r(t.isComment);
  }function st(r, o) {
    var a,
        s,
        c,
        u = [];for (a = 0; a < r.length; a++) {
      t(s = r[a]) || "boolean" == typeof s || (c = u[u.length - 1], Array.isArray(s) ? u.push.apply(u, st(s, (o || "") + "_" + a)) : i(s) ? at(c) ? c.text += String(s) : "" !== s && u.push(Z(s)) : at(s) && at(c) ? u[u.length - 1] = Z(c.text + s.text) : (n(r._isVList) && e(s.tag) && t(s.key) && e(o) && (s.key = "__vlist" + o + "_" + a + "__"), u.push(s)));
    }return u;
  }function ct(t, e) {
    return t.__esModule && t.default && (t = t.default), o(t) ? e.extend(t) : t;
  }function ut(t, e, n, r, i) {
    var o = so();return o.asyncFactory = t, o.asyncMeta = { data: e, context: n, children: r, tag: i }, o;
  }function lt(r, i, a) {
    if (n(r.error) && e(r.errorComp)) return r.errorComp;if (e(r.resolved)) return r.resolved;if (n(r.loading) && e(r.loadingComp)) return r.loadingComp;if (!e(r.contexts)) {
      var s = r.contexts = [a],
          c = !0,
          u = function u() {
        for (var t = 0, e = s.length; t < e; t++) {
          s[t].$forceUpdate();
        }
      },
          l = C(function (t) {
        r.resolved = ct(t, i), c || u();
      }),
          f = C(function (t) {
        e(r.errorComp) && (r.error = !0, u());
      }),
          p = r(l, f);return o(p) && ("function" == typeof p.then ? t(r.resolved) && p.then(l, f) : e(p.component) && "function" == typeof p.component.then && (p.component.then(l, f), e(p.error) && (r.errorComp = ct(p.error, i)), e(p.loading) && (r.loadingComp = ct(p.loading, i), 0 === p.delay ? r.loading = !0 : setTimeout(function () {
        t(r.resolved) && t(r.error) && (r.loading = !0, u());
      }, p.delay || 200)), e(p.timeout) && setTimeout(function () {
        t(r.resolved) && f(null);
      }, p.timeout))), c = !1, r.loading ? r.loadingComp : r.resolved;
    }r.contexts.push(a);
  }function ft(t) {
    if (Array.isArray(t)) for (var n = 0; n < t.length; n++) {
      var r = t[n];if (e(r) && e(r.componentOptions)) return r;
    }
  }function pt(t) {
    t._events = Object.create(null), t._hasHookEvent = !1;var e = t.$options._parentListeners;e && ht(t, e);
  }function dt(t, e, n) {
    n ? ao.$once(t, e) : ao.$on(t, e);
  }function vt(t, e) {
    ao.$off(t, e);
  }function ht(t, e, n) {
    ao = t, tt(e, n || {}, dt, vt, t);
  }function mt(t, e) {
    var n = {};if (!t) return n;for (var r = [], i = 0, o = t.length; i < o; i++) {
      var a = t[i];if (a.context !== e && a.functionalContext !== e || !a.data || null == a.data.slot) r.push(a);else {
        var s = a.data.slot,
            c = n[s] || (n[s] = []);"template" === a.tag ? c.push.apply(c, a.children) : c.push(a);
      }
    }return r.every(yt) || (n.default = r), n;
  }function yt(t) {
    return t.isComment || " " === t.text;
  }function gt(t, e) {
    e = e || {};for (var n = 0; n < t.length; n++) {
      Array.isArray(t[n]) ? gt(t[n], e) : e[t[n].key] = t[n].fn;
    }return e;
  }function _t(t) {
    var e = t.$options,
        n = e.parent;if (n && !e.abstract) {
      for (; n.$options.abstract && n.$parent;) {
        n = n.$parent;
      }n.$children.push(t);
    }t.$parent = n, t.$root = n ? n.$root : t, t.$children = [], t.$refs = {}, t._watcher = null, t._inactive = null, t._directInactive = !1, t._isMounted = !1, t._isDestroyed = !1, t._isBeingDestroyed = !1;
  }function bt(t, e, n) {
    t.$el = e, t.$options.render || (t.$options.render = so), At(t, "beforeMount");var r;return r = function r() {
      t._update(t._render(), n);
    }, t._watcher = new go(t, r, _), n = !1, null == t.$vnode && (t._isMounted = !0, At(t, "mounted")), t;
  }function $t(t, e, n, r, i) {
    var o = !!(i || t.$options._renderChildren || r.data.scopedSlots || t.$scopedSlots !== Oi);if (t.$options._parentVnode = r, t.$vnode = r, t._vnode && (t._vnode.parent = r), t.$options._renderChildren = i, t.$attrs = r.data && r.data.attrs, t.$listeners = n, e && t.$options.props) {
      to.shouldConvert = !1;for (var a = t._props, s = t.$options._propKeys || [], c = 0; c < s.length; c++) {
        var u = s[c];a[u] = J(u, t.$options.props, e, t);
      }to.shouldConvert = !0, t.$options.propsData = e;
    }if (n) {
      var l = t.$options._parentListeners;t.$options._parentListeners = n, ht(t, n, l);
    }o && (t.$slots = mt(i, r.context), t.$forceUpdate());
  }function Ct(t) {
    for (; t && (t = t.$parent);) {
      if (t._inactive) return !0;
    }return !1;
  }function wt(t, e) {
    if (e) {
      if (t._directInactive = !1, Ct(t)) return;
    } else if (t._directInactive) return;if (t._inactive || null === t._inactive) {
      t._inactive = !1;for (var n = 0; n < t.$children.length; n++) {
        wt(t.$children[n]);
      }At(t, "activated");
    }
  }function xt(t, e) {
    if (!(e && (t._directInactive = !0, Ct(t)) || t._inactive)) {
      t._inactive = !0;for (var n = 0; n < t.$children.length; n++) {
        xt(t.$children[n]);
      }At(t, "deactivated");
    }
  }function At(t, e) {
    var n = t.$options[e];if (n) for (var r = 0, i = n.length; r < i; r++) {
      try {
        n[r].call(t);
      } catch (n) {
        k(n, t, e + " hook");
      }
    }t._hasHookEvent && t.$emit("hook:" + e);
  }function kt() {
    mo = lo.length = fo.length = 0, po = {}, vo = ho = !1;
  }function Ot() {
    ho = !0;var t, e;for (lo.sort(function (t, e) {
      return t.id - e.id;
    }), mo = 0; mo < lo.length; mo++) {
      e = (t = lo[mo]).id, po[e] = null, t.run();
    }var n = fo.slice(),
        r = lo.slice();kt(), Et(n), Tt(r), Ki && ki.devtools && Ki.emit("flush");
  }function Tt(t) {
    for (var e = t.length; e--;) {
      var n = t[e],
          r = n.vm;r._watcher === n && r._isMounted && At(r, "updated");
    }
  }function St(t) {
    t._inactive = !1, fo.push(t);
  }function Et(t) {
    for (var e = 0; e < t.length; e++) {
      t[e]._inactive = !0, wt(t[e], !0);
    }
  }function jt(t) {
    var e = t.id;if (null == po[e]) {
      if (po[e] = !0, ho) {
        for (var n = lo.length - 1; n > mo && lo[n].id > t.id;) {
          n--;
        }lo.splice(n + 1, 0, t);
      } else lo.push(t);vo || (vo = !0, qi(Ot));
    }
  }function Lt(t) {
    _o.clear(), Nt(t, _o);
  }function Nt(t, e) {
    var n,
        r,
        i = Array.isArray(t);if ((i || o(t)) && Object.isExtensible(t)) {
      if (t.__ob__) {
        var a = t.__ob__.dep.id;if (e.has(a)) return;e.add(a);
      }if (i) for (n = t.length; n--;) {
        Nt(t[n], e);
      } else for (n = (r = Object.keys(t)).length; n--;) {
        Nt(t[r[n]], e);
      }
    }
  }function It(t, e, n) {
    bo.get = function () {
      return this[e][n];
    }, bo.set = function (t) {
      this[e][n] = t;
    }, Object.defineProperty(t, n, bo);
  }function Mt(t) {
    t._watchers = [];var e = t.$options;e.props && Dt(t, e.props), e.methods && Ut(t, e.methods), e.data ? Pt(t) : L(t._data = {}, !0), e.computed && Rt(t, e.computed), e.watch && e.watch !== Ri && Vt(t, e.watch);
  }function Dt(t, e) {
    var n = t.$options.propsData || {},
        r = t._props = {},
        i = t.$options._propKeys = [],
        o = !t.$parent;to.shouldConvert = o;for (var a in e) {
      !function (o) {
        i.push(o);var a = J(o, e, n, t);N(r, o, a), o in t || It(t, "_props", o);
      }(a);
    }to.shouldConvert = !0;
  }function Pt(t) {
    var e = t.$options.data;a(e = t._data = "function" == typeof e ? Ft(e, t) : e || {}) || (e = {});for (var n = Object.keys(e), r = t.$options.props, i = (t.$options.methods, n.length); i--;) {
      var o = n[i];r && d(r, o) || w(o) || It(t, "_data", o);
    }L(e, !0);
  }function Ft(t, e) {
    try {
      return t.call(e);
    } catch (t) {
      return k(t, e, "data()"), {};
    }
  }function Rt(t, e) {
    var n = t._computedWatchers = Object.create(null);for (var r in e) {
      var i = e[r],
          o = "function" == typeof i ? i : i.get;n[r] = new go(t, o || _, _, $o), r in t || Ht(t, r, i);
    }
  }function Ht(t, e, n) {
    "function" == typeof n ? (bo.get = Bt(e), bo.set = _) : (bo.get = n.get ? !1 !== n.cache ? Bt(e) : n.get : _, bo.set = n.set ? n.set : _), Object.defineProperty(t, e, bo);
  }function Bt(t) {
    return function () {
      var e = this._computedWatchers && this._computedWatchers[t];if (e) return e.dirty && e.evaluate(), Gi.target && e.depend(), e.value;
    };
  }function Ut(t, e) {
    t.$options.props;for (var n in e) {
      t[n] = null == e[n] ? _ : h(e[n], t);
    }
  }function Vt(t, e) {
    for (var n in e) {
      var r = e[n];if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
        zt(t, n, r[i]);
      } else zt(t, n, r);
    }
  }function zt(t, e, n, r) {
    return a(n) && (r = n, n = n.handler), "string" == typeof n && (n = t[n]), t.$watch(e, n, r);
  }function Kt(t) {
    var e = t.$options.provide;e && (t._provided = "function" == typeof e ? e.call(t) : e);
  }function Jt(t) {
    var e = qt(t.$options.inject, t);e && (to.shouldConvert = !1, Object.keys(e).forEach(function (n) {
      N(t, n, e[n]);
    }), to.shouldConvert = !0);
  }function qt(t, e) {
    if (t) {
      for (var n = Object.create(null), r = Ji ? Reflect.ownKeys(t) : Object.keys(t), i = 0; i < r.length; i++) {
        for (var o = r[i], a = t[o], s = e; s;) {
          if (s._provided && a in s._provided) {
            n[o] = s._provided[a];break;
          }s = s.$parent;
        }
      }return n;
    }
  }function Wt(t, n, r, i, o) {
    var a = {},
        s = t.options.props;if (e(s)) for (var c in s) {
      a[c] = J(c, s, n || {});
    } else e(r.attrs) && Gt(a, r.attrs), e(r.props) && Gt(a, r.props);var u = Object.create(i),
        l = t.options.render.call(null, function (t, e, n, r) {
      return ee(u, t, e, n, r, !0);
    }, { data: r, props: a, children: o, parent: i, listeners: r.on || {}, injections: qt(t.options.inject, i), slots: function slots() {
        return mt(o, i);
      } });return l instanceof io && (l.functionalContext = i, l.functionalOptions = t.options, r.slot && ((l.data || (l.data = {})).slot = r.slot)), l;
  }function Gt(t, e) {
    for (var n in e) {
      t[yi(n)] = e[n];
    }
  }function Zt(r, i, a, s, c) {
    if (!t(r)) {
      var u = a.$options._base;if (o(r) && (r = u.extend(r)), "function" == typeof r) {
        var l;if (t(r.cid) && (l = r, void 0 === (r = lt(l, u, a)))) return ut(l, i, a, s, c);i = i || {}, me(r), e(i.model) && te(r.options, i);var f = nt(i, r, c);if (n(r.options.functional)) return Wt(r, f, i, a, s);var p = i.on;if (i.on = i.nativeOn, n(r.options.abstract)) {
          var d = i.slot;i = {}, d && (i.slot = d);
        }Qt(i);var v = r.options.name || c;return new io("vue-component-" + r.cid + (v ? "-" + v : ""), i, void 0, void 0, void 0, a, { Ctor: r, propsData: f, listeners: p, tag: c, children: s }, l);
      }
    }
  }function Yt(t, n, r, i) {
    var o = t.componentOptions,
        a = { _isComponent: !0, parent: n, propsData: o.propsData, _componentTag: o.tag, _parentVnode: t, _parentListeners: o.listeners, _renderChildren: o.children, _parentElm: r || null, _refElm: i || null },
        s = t.data.inlineTemplate;return e(s) && (a.render = s.render, a.staticRenderFns = s.staticRenderFns), new o.Ctor(a);
  }function Qt(t) {
    t.hook || (t.hook = {});for (var e = 0; e < wo.length; e++) {
      var n = wo[e],
          r = t.hook[n],
          i = Co[n];t.hook[n] = r ? Xt(i, r) : i;
    }
  }function Xt(t, e) {
    return function (n, r, i, o) {
      t(n, r, i, o), e(n, r, i, o);
    };
  }function te(t, n) {
    var r = t.model && t.model.prop || "value",
        i = t.model && t.model.event || "input";(n.props || (n.props = {}))[r] = n.model.value;var o = n.on || (n.on = {});e(o[i]) ? o[i] = [n.model.callback].concat(o[i]) : o[i] = n.model.callback;
  }function ee(t, e, r, o, a, s) {
    return (Array.isArray(r) || i(r)) && (a = o, o = r, r = void 0), n(s) && (a = Ao), ne(t, e, r, o, a);
  }function ne(t, n, r, i, o) {
    if (e(r) && e(r.__ob__)) return so();if (e(r) && e(r.is) && (n = r.is), !n) return so();Array.isArray(i) && "function" == typeof i[0] && ((r = r || {}).scopedSlots = { default: i[0] }, i.length = 0), o === Ao ? i = ot(i) : o === xo && (i = it(i));var a, s;if ("string" == typeof n) {
      var c;s = ki.getTagNamespace(n), a = ki.isReservedTag(n) ? new io(ki.parsePlatformTagName(n), r, i, void 0, void 0, t) : e(c = K(t.$options, "components", n)) ? Zt(c, r, t, i, n) : new io(n, r, i, void 0, void 0, t);
    } else a = Zt(n, r, t, i);return e(a) ? (s && re(a, s), a) : so();
  }function re(n, r) {
    if (n.ns = r, "foreignObject" !== n.tag && e(n.children)) for (var i = 0, o = n.children.length; i < o; i++) {
      var a = n.children[i];e(a.tag) && t(a.ns) && re(a, r);
    }
  }function ie(t, n) {
    var r, i, a, s, c;if (Array.isArray(t) || "string" == typeof t) for (r = new Array(t.length), i = 0, a = t.length; i < a; i++) {
      r[i] = n(t[i], i);
    } else if ("number" == typeof t) for (r = new Array(t), i = 0; i < t; i++) {
      r[i] = n(i + 1, i);
    } else if (o(t)) for (s = Object.keys(t), r = new Array(s.length), i = 0, a = s.length; i < a; i++) {
      c = s[i], r[i] = n(t[c], c, i);
    }return e(r) && (r._isVList = !0), r;
  }function oe(t, e, n, r) {
    var i = this.$scopedSlots[t];if (i) return n = n || {}, r && (n = y(y({}, r), n)), i(n) || e;var o = this.$slots[t];return o || e;
  }function ae(t) {
    return K(this.$options, "filters", t, !0) || Ci;
  }function se(t, e, n) {
    var r = ki.keyCodes[e] || n;return Array.isArray(r) ? -1 === r.indexOf(t) : r !== t;
  }function ce(t, e, n, r, i) {
    if (n) if (o(n)) {
      Array.isArray(n) && (n = g(n));var a;for (var s in n) {
        !function (o) {
          if ("class" === o || "style" === o || vi(o)) a = t;else {
            var s = t.attrs && t.attrs.type;a = r || ki.mustUseProp(e, s, o) ? t.domProps || (t.domProps = {}) : t.attrs || (t.attrs = {});
          }o in a || (a[o] = n[o], i && ((t.on || (t.on = {}))["update:" + o] = function (t) {
            n[o] = t;
          }));
        }(s);
      }
    } else ;return t;
  }function ue(t, e) {
    var n = this._staticTrees[t];return n && !e ? Array.isArray(n) ? Q(n) : Y(n) : (n = this._staticTrees[t] = this.$options.staticRenderFns[t].call(this._renderProxy), fe(n, "__static__" + t, !1), n);
  }function le(t, e, n) {
    return fe(t, "__once__" + e + (n ? "_" + n : ""), !0), t;
  }function fe(t, e, n) {
    if (Array.isArray(t)) for (var r = 0; r < t.length; r++) {
      t[r] && "string" != typeof t[r] && pe(t[r], e + "_" + r, n);
    } else pe(t, e, n);
  }function pe(t, e, n) {
    t.isStatic = !0, t.key = e, t.isOnce = n;
  }function de(t, e) {
    if (e) if (a(e)) {
      var n = t.on = t.on ? y({}, t.on) : {};for (var r in e) {
        var i = n[r],
            o = e[r];n[r] = i ? [].concat(o, i) : o;
      }
    } else ;return t;
  }function ve(t) {
    t._vnode = null, t._staticTrees = null;var e = t.$vnode = t.$options._parentVnode,
        n = e && e.context;t.$slots = mt(t.$options._renderChildren, n), t.$scopedSlots = Oi, t._c = function (e, n, r, i) {
      return ee(t, e, n, r, i, !1);
    }, t.$createElement = function (e, n, r, i) {
      return ee(t, e, n, r, i, !0);
    };var r = e && e.data;N(t, "$attrs", r && r.attrs, null, !0), N(t, "$listeners", t.$options._parentListeners, null, !0);
  }function he(t, e) {
    var n = t.$options = Object.create(t.constructor.options);n.parent = e.parent, n.propsData = e.propsData, n._parentVnode = e._parentVnode, n._parentListeners = e._parentListeners, n._renderChildren = e._renderChildren, n._componentTag = e._componentTag, n._parentElm = e._parentElm, n._refElm = e._refElm, e.render && (n.render = e.render, n.staticRenderFns = e.staticRenderFns);
  }function me(t) {
    var e = t.options;if (t.super) {
      var n = me(t.super);if (n !== t.superOptions) {
        t.superOptions = n;var r = ye(t);r && y(t.extendOptions, r), (e = t.options = z(n, t.extendOptions)).name && (e.components[e.name] = t);
      }
    }return e;
  }function ye(t) {
    var e,
        n = t.options,
        r = t.extendOptions,
        i = t.sealedOptions;for (var o in n) {
      n[o] !== i[o] && (e || (e = {}), e[o] = ge(n[o], r[o], i[o]));
    }return e;
  }function ge(t, e, n) {
    if (Array.isArray(t)) {
      var r = [];n = Array.isArray(n) ? n : [n], e = Array.isArray(e) ? e : [e];for (var i = 0; i < t.length; i++) {
        (e.indexOf(t[i]) >= 0 || n.indexOf(t[i]) < 0) && r.push(t[i]);
      }return r;
    }return t;
  }function _e(t) {
    this._init(t);
  }function be(t) {
    t.use = function (t) {
      var e = this._installedPlugins || (this._installedPlugins = []);if (e.indexOf(t) > -1) return this;var n = m(arguments, 1);return n.unshift(this), "function" == typeof t.install ? t.install.apply(t, n) : "function" == typeof t && t.apply(null, n), e.push(t), this;
    };
  }function $e(t) {
    t.mixin = function (t) {
      return this.options = z(this.options, t), this;
    };
  }function Ce(t) {
    t.cid = 0;var e = 1;t.extend = function (t) {
      t = t || {};var n = this,
          r = n.cid,
          i = t._Ctor || (t._Ctor = {});if (i[r]) return i[r];var o = t.name || n.options.name,
          a = function a(t) {
        this._init(t);
      };return a.prototype = Object.create(n.prototype), a.prototype.constructor = a, a.cid = e++, a.options = z(n.options, t), a.super = n, a.options.props && we(a), a.options.computed && xe(a), a.extend = n.extend, a.mixin = n.mixin, a.use = n.use, xi.forEach(function (t) {
        a[t] = n[t];
      }), o && (a.options.components[o] = a), a.superOptions = n.options, a.extendOptions = t, a.sealedOptions = y({}, a.options), i[r] = a, a;
    };
  }function we(t) {
    var e = t.options.props;for (var n in e) {
      It(t.prototype, "_props", n);
    }
  }function xe(t) {
    var e = t.options.computed;for (var n in e) {
      Ht(t.prototype, n, e[n]);
    }
  }function Ae(t) {
    xi.forEach(function (e) {
      t[e] = function (t, n) {
        return n ? ("component" === e && a(n) && (n.name = n.name || t, n = this.options._base.extend(n)), "directive" === e && "function" == typeof n && (n = { bind: n, update: n }), this.options[e + "s"][t] = n, n) : this.options[e + "s"][t];
      };
    });
  }function ke(t) {
    return t && (t.Ctor.options.name || t.tag);
  }function Oe(t, e) {
    return Array.isArray(t) ? t.indexOf(e) > -1 : "string" == typeof t ? t.split(",").indexOf(e) > -1 : !!s(t) && t.test(e);
  }function Te(t, e, n) {
    for (var r in t) {
      var i = t[r];if (i) {
        var o = ke(i.componentOptions);o && !n(o) && (i !== e && Se(i), t[r] = null);
      }
    }
  }function Se(t) {
    t && t.componentInstance.$destroy();
  }function Ee(t) {
    for (var n = t.data, r = t, i = t; e(i.componentInstance);) {
      (i = i.componentInstance._vnode).data && (n = je(i.data, n));
    }for (; e(r = r.parent);) {
      r.data && (n = je(n, r.data));
    }return Le(n.staticClass, n.class);
  }function je(t, n) {
    return { staticClass: Ne(t.staticClass, n.staticClass), class: e(t.class) ? [t.class, n.class] : n.class };
  }function Le(t, n) {
    return e(t) || e(n) ? Ne(t, Ie(n)) : "";
  }function Ne(t, e) {
    return t ? e ? t + " " + e : t : e || "";
  }function Ie(t) {
    return Array.isArray(t) ? Me(t) : o(t) ? De(t) : "string" == typeof t ? t : "";
  }function Me(t) {
    for (var n, r = "", i = 0, o = t.length; i < o; i++) {
      e(n = Ie(t[i])) && "" !== n && (r && (r += " "), r += n);
    }return r;
  }function De(t) {
    var e = "";for (var n in t) {
      t[n] && (e && (e += " "), e += n);
    }return e;
  }function Pe(t) {
    return Go(t) ? "svg" : "math" === t ? "math" : void 0;
  }function Fe(t) {
    if ("string" == typeof t) {
      var e = document.querySelector(t);return e || document.createElement("div");
    }return t;
  }function Re(t, e) {
    var n = t.data.ref;if (n) {
      var r = t.context,
          i = t.componentInstance || t.elm,
          o = r.$refs;e ? Array.isArray(o[n]) ? p(o[n], i) : o[n] === i && (o[n] = void 0) : t.data.refInFor ? Array.isArray(o[n]) ? o[n].indexOf(i) < 0 && o[n].push(i) : o[n] = [i] : o[n] = i;
    }
  }function He(r, i) {
    return r.key === i.key && (r.tag === i.tag && r.isComment === i.isComment && e(r.data) === e(i.data) && Be(r, i) || n(r.isAsyncPlaceholder) && r.asyncFactory === i.asyncFactory && t(i.asyncFactory.error));
  }function Be(t, n) {
    if ("input" !== t.tag) return !0;var r;return (e(r = t.data) && e(r = r.attrs) && r.type) === (e(r = n.data) && e(r = r.attrs) && r.type);
  }function Ue(t, n, r) {
    var i,
        o,
        a = {};for (i = n; i <= r; ++i) {
      e(o = t[i].key) && (a[o] = i);
    }return a;
  }function Ve(t, e) {
    (t.data.directives || e.data.directives) && ze(t, e);
  }function ze(t, e) {
    var n,
        r,
        i,
        o = t === ta,
        a = e === ta,
        s = Ke(t.data.directives, t.context),
        c = Ke(e.data.directives, e.context),
        u = [],
        l = [];for (n in c) {
      r = s[n], i = c[n], r ? (i.oldValue = r.value, qe(i, "update", e, t), i.def && i.def.componentUpdated && l.push(i)) : (qe(i, "bind", e, t), i.def && i.def.inserted && u.push(i));
    }if (u.length) {
      var f = function f() {
        for (var n = 0; n < u.length; n++) {
          qe(u[n], "inserted", e, t);
        }
      };o ? et(e.data.hook || (e.data.hook = {}), "insert", f) : f();
    }if (l.length && et(e.data.hook || (e.data.hook = {}), "postpatch", function () {
      for (var n = 0; n < l.length; n++) {
        qe(l[n], "componentUpdated", e, t);
      }
    }), !o) for (n in s) {
      c[n] || qe(s[n], "unbind", t, t, a);
    }
  }function Ke(t, e) {
    var n = Object.create(null);if (!t) return n;var r, i;for (r = 0; r < t.length; r++) {
      (i = t[r]).modifiers || (i.modifiers = ra), n[Je(i)] = i, i.def = K(e.$options, "directives", i.name, !0);
    }return n;
  }function Je(t) {
    return t.rawName || t.name + "." + Object.keys(t.modifiers || {}).join(".");
  }function qe(t, e, n, r, i) {
    var o = t.def && t.def[e];if (o) try {
      o(n.elm, t, n, r, i);
    } catch (r) {
      k(r, n.context, "directive " + t.name + " " + e + " hook");
    }
  }function We(n, r) {
    var i = r.componentOptions;if (!(e(i) && !1 === i.Ctor.options.inheritAttrs || t(n.data.attrs) && t(r.data.attrs))) {
      var o,
          a,
          s = r.elm,
          c = n.data.attrs || {},
          u = r.data.attrs || {};e(u.__ob__) && (u = r.data.attrs = y({}, u));for (o in u) {
        a = u[o], c[o] !== a && Ge(s, o, a);
      }Ii && u.value !== c.value && Ge(s, "value", u.value);for (o in c) {
        t(u[o]) && (zo(o) ? s.removeAttributeNS(Vo, Ko(o)) : Bo(o) || s.removeAttribute(o));
      }
    }
  }function Ge(t, e, n) {
    Uo(e) ? Jo(n) ? t.removeAttribute(e) : t.setAttribute(e, e) : Bo(e) ? t.setAttribute(e, Jo(n) || "false" === n ? "false" : "true") : zo(e) ? Jo(n) ? t.removeAttributeNS(Vo, Ko(e)) : t.setAttributeNS(Vo, e, n) : Jo(n) ? t.removeAttribute(e) : t.setAttribute(e, n);
  }function Ze(n, r) {
    var i = r.elm,
        o = r.data,
        a = n.data;if (!(t(o.staticClass) && t(o.class) && (t(a) || t(a.staticClass) && t(a.class)))) {
      var s = Ee(r),
          c = i._transitionClasses;e(c) && (s = Ne(s, Ie(c))), s !== i._prevClass && (i.setAttribute("class", s), i._prevClass = s);
    }
  }function Ye(t) {
    function e() {
      (a || (a = [])).push(t.slice(v, i).trim()), v = i + 1;
    }var n,
        r,
        i,
        o,
        a,
        s = !1,
        c = !1,
        u = !1,
        l = !1,
        f = 0,
        p = 0,
        d = 0,
        v = 0;for (i = 0; i < t.length; i++) {
      if (r = n, n = t.charCodeAt(i), s) 39 === n && 92 !== r && (s = !1);else if (c) 34 === n && 92 !== r && (c = !1);else if (u) 96 === n && 92 !== r && (u = !1);else if (l) 47 === n && 92 !== r && (l = !1);else if (124 !== n || 124 === t.charCodeAt(i + 1) || 124 === t.charCodeAt(i - 1) || f || p || d) {
        switch (n) {case 34:
            c = !0;break;case 39:
            s = !0;break;case 96:
            u = !0;break;case 40:
            d++;break;case 41:
            d--;break;case 91:
            p++;break;case 93:
            p--;break;case 123:
            f++;break;case 125:
            f--;}if (47 === n) {
          for (var h = i - 1, m = void 0; h >= 0 && " " === (m = t.charAt(h)); h--) {}m && sa.test(m) || (l = !0);
        }
      } else void 0 === o ? (v = i + 1, o = t.slice(0, i).trim()) : e();
    }if (void 0 === o ? o = t.slice(0, i).trim() : 0 !== v && e(), a) for (i = 0; i < a.length; i++) {
      o = Qe(o, a[i]);
    }return o;
  }function Qe(t, e) {
    var n = e.indexOf("(");return n < 0 ? '_f("' + e + '")(' + t + ")" : '_f("' + e.slice(0, n) + '")(' + t + "," + e.slice(n + 1);
  }function Xe(t) {
    console.error("[Vue compiler]: " + t);
  }function tn(t, e) {
    return t ? t.map(function (t) {
      return t[e];
    }).filter(function (t) {
      return t;
    }) : [];
  }function en(t, e, n) {
    (t.props || (t.props = [])).push({ name: e, value: n });
  }function nn(t, e, n) {
    (t.attrs || (t.attrs = [])).push({ name: e, value: n });
  }function rn(t, e, n, r, i, o) {
    (t.directives || (t.directives = [])).push({ name: e, rawName: n, value: r, arg: i, modifiers: o });
  }function on(t, e, n, r, i, o) {
    r && r.capture && (delete r.capture, e = "!" + e), r && r.once && (delete r.once, e = "~" + e), r && r.passive && (delete r.passive, e = "&" + e);var a;r && r.native ? (delete r.native, a = t.nativeEvents || (t.nativeEvents = {})) : a = t.events || (t.events = {});var s = { value: n, modifiers: r },
        c = a[e];Array.isArray(c) ? i ? c.unshift(s) : c.push(s) : a[e] = c ? i ? [s, c] : [c, s] : s;
  }function an(t, e, n) {
    var r = sn(t, ":" + e) || sn(t, "v-bind:" + e);if (null != r) return Ye(r);if (!1 !== n) {
      var i = sn(t, e);if (null != i) return JSON.stringify(i);
    }
  }function sn(t, e) {
    var n;if (null != (n = t.attrsMap[e])) for (var r = t.attrsList, i = 0, o = r.length; i < o; i++) {
      if (r[i].name === e) {
        r.splice(i, 1);break;
      }
    }return n;
  }function cn(t, e, n) {
    var r = n || {},
        i = r.number,
        o = "$$v";r.trim && (o = "(typeof $$v === 'string'? $$v.trim(): $$v)"), i && (o = "_n(" + o + ")");var a = un(e, o);t.model = { value: "(" + e + ")", expression: '"' + e + '"', callback: "function ($$v) {" + a + "}" };
  }function un(t, e) {
    var n = ln(t);return null === n.idx ? t + "=" + e : "$set(" + n.exp + ", " + n.idx + ", " + e + ")";
  }function ln(t) {
    if (Eo = t, So = Eo.length, Lo = No = Io = 0, t.indexOf("[") < 0 || t.lastIndexOf("]") < So - 1) return { exp: t, idx: null };for (; !pn();) {
      dn(jo = fn()) ? hn(jo) : 91 === jo && vn(jo);
    }return { exp: t.substring(0, No), idx: t.substring(No + 1, Io) };
  }function fn() {
    return Eo.charCodeAt(++Lo);
  }function pn() {
    return Lo >= So;
  }function dn(t) {
    return 34 === t || 39 === t;
  }function vn(t) {
    var e = 1;for (No = Lo; !pn();) {
      if (t = fn(), dn(t)) hn(t);else if (91 === t && e++, 93 === t && e--, 0 === e) {
        Io = Lo;break;
      }
    }
  }function hn(t) {
    for (var e = t; !pn() && (t = fn()) !== e;) {}
  }function mn(t, e, n) {
    var r = n && n.number,
        i = an(t, "value") || "null",
        o = an(t, "true-value") || "true",
        a = an(t, "false-value") || "false";en(t, "checked", "Array.isArray(" + e + ")?_i(" + e + "," + i + ")>-1" + ("true" === o ? ":(" + e + ")" : ":_q(" + e + "," + o + ")")), on(t, ua, "var $$a=" + e + ",$$el=$event.target,$$c=$$el.checked?(" + o + "):(" + a + ");if(Array.isArray($$a)){var $$v=" + (r ? "_n(" + i + ")" : i) + ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" + e + "=$$a.concat($$v))}else{$$i>-1&&(" + e + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{" + un(e, "$$c") + "}", null, !0);
  }function yn(t, e, n) {
    var r = n && n.number,
        i = an(t, "value") || "null";en(t, "checked", "_q(" + e + "," + (i = r ? "_n(" + i + ")" : i) + ")"), on(t, ua, un(e, i), null, !0);
  }function gn(t, e, n) {
    var r = "var $$selectedVal = " + ('Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (n && n.number ? "_n(val)" : "val") + "})") + ";";on(t, "change", r = r + " " + un(e, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"), null, !0);
  }function _n(t, e, n) {
    var r = t.attrsMap.type,
        i = n || {},
        o = i.lazy,
        a = i.number,
        s = i.trim,
        c = !o && "range" !== r,
        u = o ? "change" : "range" === r ? ca : "input",
        l = "$event.target.value";s && (l = "$event.target.value.trim()"), a && (l = "_n(" + l + ")");var f = un(e, l);c && (f = "if($event.target.composing)return;" + f), en(t, "value", "(" + e + ")"), on(t, u, f, null, !0), (s || a) && on(t, "blur", "$forceUpdate()");
  }function bn(t) {
    var n;e(t[ca]) && (t[n = Ni ? "change" : "input"] = [].concat(t[ca], t[n] || []), delete t[ca]), e(t[ua]) && (t[n = Fi ? "click" : "change"] = [].concat(t[ua], t[n] || []), delete t[ua]);
  }function $n(t, _e2, n, r, i) {
    if (n) {
      var o = _e2,
          a = Do;_e2 = function e(n) {
        null !== (1 === arguments.length ? o(n) : o.apply(null, arguments)) && Cn(t, _e2, r, a);
      };
    }Do.addEventListener(t, _e2, Hi ? { capture: r, passive: i } : r);
  }function Cn(t, e, n, r) {
    (r || Do).removeEventListener(t, e, n);
  }function wn(e, n) {
    if (!t(e.data.on) || !t(n.data.on)) {
      var r = n.data.on || {},
          i = e.data.on || {};Do = n.elm, bn(r), tt(r, i, $n, Cn, n.context);
    }
  }function xn(n, r) {
    if (!t(n.data.domProps) || !t(r.data.domProps)) {
      var i,
          o,
          a = r.elm,
          s = n.data.domProps || {},
          c = r.data.domProps || {};e(c.__ob__) && (c = r.data.domProps = y({}, c));for (i in s) {
        t(c[i]) && (a[i] = "");
      }for (i in c) {
        if (o = c[i], "textContent" !== i && "innerHTML" !== i || (r.children && (r.children.length = 0), o !== s[i])) if ("value" === i) {
          a._value = o;var u = t(o) ? "" : String(o);An(a, r, u) && (a.value = u);
        } else a[i] = o;
      }
    }
  }function An(t, e, n) {
    return !t.composing && ("option" === e.tag || kn(t, n) || On(t, n));
  }function kn(t, e) {
    var n = !0;try {
      n = document.activeElement !== t;
    } catch (t) {}return n && t.value !== e;
  }function On(t, n) {
    var r = t.value,
        i = t._vModifiers;return e(i) && i.number ? l(r) !== l(n) : e(i) && i.trim ? r.trim() !== n.trim() : r !== n;
  }function Tn(t) {
    var e = Sn(t.style);return t.staticStyle ? y(t.staticStyle, e) : e;
  }function Sn(t) {
    return Array.isArray(t) ? g(t) : "string" == typeof t ? pa(t) : t;
  }function En(t, e) {
    var n,
        r = {};if (e) for (var i = t; i.componentInstance;) {
      (i = i.componentInstance._vnode).data && (n = Tn(i.data)) && y(r, n);
    }(n = Tn(t.data)) && y(r, n);for (var o = t; o = o.parent;) {
      o.data && (n = Tn(o.data)) && y(r, n);
    }return r;
  }function jn(n, r) {
    var i = r.data,
        o = n.data;if (!(t(i.staticStyle) && t(i.style) && t(o.staticStyle) && t(o.style))) {
      var a,
          s,
          c = r.elm,
          u = o.staticStyle,
          l = o.normalizedStyle || o.style || {},
          f = u || l,
          p = Sn(r.data.style) || {};r.data.normalizedStyle = e(p.__ob__) ? y({}, p) : p;var d = En(r, !0);for (s in f) {
        t(d[s]) && ha(c, s, "");
      }for (s in d) {
        (a = d[s]) !== f[s] && ha(c, s, null == a ? "" : a);
      }
    }
  }function Ln(t, e) {
    if (e && (e = e.trim())) if (t.classList) e.indexOf(" ") > -1 ? e.split(/\s+/).forEach(function (e) {
      return t.classList.add(e);
    }) : t.classList.add(e);else {
      var n = " " + (t.getAttribute("class") || "") + " ";n.indexOf(" " + e + " ") < 0 && t.setAttribute("class", (n + e).trim());
    }
  }function Nn(t, e) {
    if (e && (e = e.trim())) if (t.classList) e.indexOf(" ") > -1 ? e.split(/\s+/).forEach(function (e) {
      return t.classList.remove(e);
    }) : t.classList.remove(e), t.classList.length || t.removeAttribute("class");else {
      for (var n = " " + (t.getAttribute("class") || "") + " ", r = " " + e + " "; n.indexOf(r) >= 0;) {
        n = n.replace(r, " ");
      }(n = n.trim()) ? t.setAttribute("class", n) : t.removeAttribute("class");
    }
  }function In(t) {
    if (t) {
      if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
        var e = {};return !1 !== t.css && y(e, _a(t.name || "v")), y(e, t), e;
      }return "string" == typeof t ? _a(t) : void 0;
    }
  }function Mn(t) {
    Oa(function () {
      Oa(t);
    });
  }function Dn(t, e) {
    var n = t._transitionClasses || (t._transitionClasses = []);n.indexOf(e) < 0 && (n.push(e), Ln(t, e));
  }function Pn(t, e) {
    t._transitionClasses && p(t._transitionClasses, e), Nn(t, e);
  }function Fn(t, e, n) {
    var r = Rn(t, e),
        i = r.type,
        o = r.timeout,
        a = r.propCount;if (!i) return n();var s = i === $a ? xa : ka,
        c = 0,
        u = function u() {
      t.removeEventListener(s, l), n();
    },
        l = function l(e) {
      e.target === t && ++c >= a && u();
    };setTimeout(function () {
      c < a && u();
    }, o + 1), t.addEventListener(s, l);
  }function Rn(t, e) {
    var n,
        r = window.getComputedStyle(t),
        i = r[wa + "Delay"].split(", "),
        o = r[wa + "Duration"].split(", "),
        a = Hn(i, o),
        s = r[Aa + "Delay"].split(", "),
        c = r[Aa + "Duration"].split(", "),
        u = Hn(s, c),
        l = 0,
        f = 0;return e === $a ? a > 0 && (n = $a, l = a, f = o.length) : e === Ca ? u > 0 && (n = Ca, l = u, f = c.length) : f = (n = (l = Math.max(a, u)) > 0 ? a > u ? $a : Ca : null) ? n === $a ? o.length : c.length : 0, { type: n, timeout: l, propCount: f, hasTransform: n === $a && Ta.test(r[wa + "Property"]) };
  }function Hn(t, e) {
    for (; t.length < e.length;) {
      t = t.concat(t);
    }return Math.max.apply(null, e.map(function (e, n) {
      return Bn(e) + Bn(t[n]);
    }));
  }function Bn(t) {
    return 1e3 * Number(t.slice(0, -1));
  }function Un(n, r) {
    var i = n.elm;e(i._leaveCb) && (i._leaveCb.cancelled = !0, i._leaveCb());var a = In(n.data.transition);if (!t(a) && !e(i._enterCb) && 1 === i.nodeType) {
      for (var s = a.css, c = a.type, u = a.enterClass, f = a.enterToClass, p = a.enterActiveClass, d = a.appearClass, v = a.appearToClass, h = a.appearActiveClass, m = a.beforeEnter, y = a.enter, g = a.afterEnter, _ = a.enterCancelled, b = a.beforeAppear, $ = a.appear, w = a.afterAppear, x = a.appearCancelled, A = a.duration, k = uo, O = uo.$vnode; O && O.parent;) {
        k = (O = O.parent).context;
      }var T = !k._isMounted || !n.isRootInsert;if (!T || $ || "" === $) {
        var S = T && d ? d : u,
            E = T && h ? h : p,
            j = T && v ? v : f,
            L = T ? b || m : m,
            N = T && "function" == typeof $ ? $ : y,
            I = T ? w || g : g,
            M = T ? x || _ : _,
            D = l(o(A) ? A.enter : A),
            P = !1 !== s && !Ii,
            F = Kn(N),
            R = i._enterCb = C(function () {
          P && (Pn(i, j), Pn(i, E)), R.cancelled ? (P && Pn(i, S), M && M(i)) : I && I(i), i._enterCb = null;
        });n.data.show || et(n.data.hook || (n.data.hook = {}), "insert", function () {
          var t = i.parentNode,
              e = t && t._pending && t._pending[n.key];e && e.tag === n.tag && e.elm._leaveCb && e.elm._leaveCb(), N && N(i, R);
        }), L && L(i), P && (Dn(i, S), Dn(i, E), Mn(function () {
          Dn(i, j), Pn(i, S), R.cancelled || F || (zn(D) ? setTimeout(R, D) : Fn(i, c, R));
        })), n.data.show && (r && r(), N && N(i, R)), P || F || R();
      }
    }
  }function Vn(n, r) {
    function i() {
      x.cancelled || (n.data.show || ((a.parentNode._pending || (a.parentNode._pending = {}))[n.key] = n), v && v(a), b && (Dn(a, f), Dn(a, d), Mn(function () {
        Dn(a, p), Pn(a, f), x.cancelled || $ || (zn(w) ? setTimeout(x, w) : Fn(a, u, x));
      })), h && h(a, x), b || $ || x());
    }var a = n.elm;e(a._enterCb) && (a._enterCb.cancelled = !0, a._enterCb());var s = In(n.data.transition);if (t(s)) return r();if (!e(a._leaveCb) && 1 === a.nodeType) {
      var c = s.css,
          u = s.type,
          f = s.leaveClass,
          p = s.leaveToClass,
          d = s.leaveActiveClass,
          v = s.beforeLeave,
          h = s.leave,
          m = s.afterLeave,
          y = s.leaveCancelled,
          g = s.delayLeave,
          _ = s.duration,
          b = !1 !== c && !Ii,
          $ = Kn(h),
          w = l(o(_) ? _.leave : _),
          x = a._leaveCb = C(function () {
        a.parentNode && a.parentNode._pending && (a.parentNode._pending[n.key] = null), b && (Pn(a, p), Pn(a, d)), x.cancelled ? (b && Pn(a, f), y && y(a)) : (r(), m && m(a)), a._leaveCb = null;
      });g ? g(i) : i();
    }
  }function zn(t) {
    return "number" == typeof t && !isNaN(t);
  }function Kn(n) {
    if (t(n)) return !1;var r = n.fns;return e(r) ? Kn(Array.isArray(r) ? r[0] : r) : (n._length || n.length) > 1;
  }function Jn(t, e) {
    !0 !== e.data.show && Un(e);
  }function qn(t, e, n) {
    var r = e.value,
        i = t.multiple;if (!i || Array.isArray(r)) {
      for (var o, a, s = 0, c = t.options.length; s < c; s++) {
        if (a = t.options[s], i) o = $(r, Wn(a)) > -1, a.selected !== o && (a.selected = o);else if (b(Wn(a), r)) return void (t.selectedIndex !== s && (t.selectedIndex = s));
      }i || (t.selectedIndex = -1);
    }
  }function Wn(t) {
    return "_value" in t ? t._value : t.value;
  }function Gn(t) {
    t.target.composing = !0;
  }function Zn(t) {
    t.target.composing && (t.target.composing = !1, Yn(t.target, "input"));
  }function Yn(t, e) {
    var n = document.createEvent("HTMLEvents");n.initEvent(e, !0, !0), t.dispatchEvent(n);
  }function Qn(t) {
    return !t.componentInstance || t.data && t.data.transition ? t : Qn(t.componentInstance._vnode);
  }function Xn(t) {
    var e = t && t.componentOptions;return e && e.Ctor.options.abstract ? Xn(ft(e.children)) : t;
  }function tr(t) {
    var e = {},
        n = t.$options;for (var r in n.propsData) {
      e[r] = t[r];
    }var i = n._parentListeners;for (var o in i) {
      e[yi(o)] = i[o];
    }return e;
  }function er(t, e) {
    if (/\d-keep-alive$/.test(e.tag)) return t("keep-alive", { props: e.componentOptions.propsData });
  }function nr(t) {
    for (; t = t.parent;) {
      if (t.data.transition) return !0;
    }
  }function rr(t, e) {
    return e.key === t.key && e.tag === t.tag;
  }function ir(t) {
    return t.isComment && t.asyncFactory;
  }function or(t) {
    t.elm._moveCb && t.elm._moveCb(), t.elm._enterCb && t.elm._enterCb();
  }function ar(t) {
    t.data.newPos = t.elm.getBoundingClientRect();
  }function sr(t) {
    var e = t.data.pos,
        n = t.data.newPos,
        r = e.left - n.left,
        i = e.top - n.top;if (r || i) {
      t.data.moved = !0;var o = t.elm.style;o.transform = o.WebkitTransform = "translate(" + r + "px," + i + "px)", o.transitionDuration = "0s";
    }
  }function cr(t, e) {
    var n = e ? Ha(e) : Fa;if (n.test(t)) {
      for (var r, i, o = [], a = n.lastIndex = 0; r = n.exec(t);) {
        (i = r.index) > a && o.push(JSON.stringify(t.slice(a, i)));var s = Ye(r[1].trim());o.push("_s(" + s + ")"), a = i + r[0].length;
      }return a < t.length && o.push(JSON.stringify(t.slice(a))), o.join("+");
    }
  }function ur(t, e) {
    var n = e ? $s : bs;return t.replace(n, function (t) {
      return _s[t];
    });
  }function lr(t, e) {
    function n(e) {
      l += e, t = t.substring(e);
    }function r(t, n, r) {
      var i, s;if (null == n && (n = l), null == r && (r = l), t && (s = t.toLowerCase()), t) for (i = a.length - 1; i >= 0 && a[i].lowerCasedTag !== s; i--) {} else i = 0;if (i >= 0) {
        for (var c = a.length - 1; c >= i; c--) {
          e.end && e.end(a[c].tag, n, r);
        }a.length = i, o = i && a[i - 1].tag;
      } else "br" === s ? e.start && e.start(t, [], !0, n, r) : "p" === s && (e.start && e.start(t, [], !1, n, r), e.end && e.end(t, n, r));
    }for (var i, o, a = [], s = e.expectHTML, c = e.isUnaryTag || $i, u = e.canBeLeftOpenTag || $i, l = 0; t;) {
      if (i = t, o && ys(o)) {
        var f = 0,
            p = o.toLowerCase(),
            d = gs[p] || (gs[p] = new RegExp("([\\s\\S]*?)(</" + p + "[^>]*>)", "i")),
            v = t.replace(d, function (t, n, r) {
          return f = r.length, ys(p) || "noscript" === p || (n = n.replace(/<!--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), ws(p, n) && (n = n.slice(1)), e.chars && e.chars(n), "";
        });l += t.length - v.length, t = v, r(p, l - f, l);
      } else {
        var h = t.indexOf("<");if (0 === h) {
          if (is.test(t)) {
            var m = t.indexOf("--\x3e");if (m >= 0) {
              e.shouldKeepComment && e.comment(t.substring(4, m)), n(m + 3);continue;
            }
          }if (os.test(t)) {
            var y = t.indexOf("]>");if (y >= 0) {
              n(y + 2);continue;
            }
          }var g = t.match(rs);if (g) {
            n(g[0].length);continue;
          }var _ = t.match(ns);if (_) {
            var b = l;n(_[0].length), r(_[1], b, l);continue;
          }var $ = function () {
            var e = t.match(ts);if (e) {
              var r = { tagName: e[1], attrs: [], start: l };n(e[0].length);for (var i, o; !(i = t.match(es)) && (o = t.match(Ya));) {
                n(o[0].length), r.attrs.push(o);
              }if (i) return r.unarySlash = i[1], n(i[0].length), r.end = l, r;
            }
          }();if ($) {
            !function (t) {
              var n = t.tagName,
                  i = t.unarySlash;s && ("p" === o && Ka(n) && r(o), u(n) && o === n && r(n));for (var l = c(n) || !!i, f = t.attrs.length, p = new Array(f), d = 0; d < f; d++) {
                var v = t.attrs[d];as && -1 === v[0].indexOf('""') && ("" === v[3] && delete v[3], "" === v[4] && delete v[4], "" === v[5] && delete v[5]);var h = v[3] || v[4] || v[5] || "";p[d] = { name: v[1], value: ur(h, e.shouldDecodeNewlines) };
              }l || (a.push({ tag: n, lowerCasedTag: n.toLowerCase(), attrs: p }), o = n), e.start && e.start(n, p, l, t.start, t.end);
            }($), ws(o, t) && n(1);continue;
          }
        }var C = void 0,
            w = void 0,
            x = void 0;if (h >= 0) {
          for (w = t.slice(h); !(ns.test(w) || ts.test(w) || is.test(w) || os.test(w) || (x = w.indexOf("<", 1)) < 0);) {
            h += x, w = t.slice(h);
          }C = t.substring(0, h), n(h);
        }h < 0 && (C = t, t = ""), e.chars && C && e.chars(C);
      }if (t === i) {
        e.chars && e.chars(t);break;
      }
    }r();
  }function fr(t, e) {
    function n(t) {
      t.pre && (s = !1), ps(t.tag) && (c = !1);
    }ss = e.warn || Xe, ps = e.isPreTag || $i, ds = e.mustUseProp || $i, vs = e.getTagNamespace || $i, us = tn(e.modules, "transformNode"), ls = tn(e.modules, "preTransformNode"), fs = tn(e.modules, "postTransformNode"), cs = e.delimiters;var r,
        i,
        o = [],
        a = !1 !== e.preserveWhitespace,
        s = !1,
        c = !1;return lr(t, { warn: ss, expectHTML: e.expectHTML, isUnaryTag: e.isUnaryTag, canBeLeftOpenTag: e.canBeLeftOpenTag, shouldDecodeNewlines: e.shouldDecodeNewlines, shouldKeepComment: e.comments, start: function start(t, a, u) {
        function l(t) {}var f = i && i.ns || vs(t);Ni && "svg" === f && (a = Er(a));var p = { type: 1, tag: t, attrsList: a, attrsMap: Or(a), parent: i, children: [] };f && (p.ns = f), Sr(p) && !zi() && (p.forbidden = !0);for (var d = 0; d < ls.length; d++) {
          ls[d](p, e);
        }if (s || (pr(p), p.pre && (s = !0)), ps(p.tag) && (c = !0), s) dr(p);else {
          mr(p), yr(p), $r(p), vr(p), p.plain = !p.key && !a.length, hr(p), Cr(p), wr(p);for (var v = 0; v < us.length; v++) {
            us[v](p, e);
          }xr(p);
        }if (r ? o.length || r.if && (p.elseif || p.else) && (l(), br(r, { exp: p.elseif, block: p })) : (r = p, l()), i && !p.forbidden) if (p.elseif || p.else) gr(p, i);else if (p.slotScope) {
          i.plain = !1;var h = p.slotTarget || '"default"';(i.scopedSlots || (i.scopedSlots = {}))[h] = p;
        } else i.children.push(p), p.parent = i;u ? n(p) : (i = p, o.push(p));for (var m = 0; m < fs.length; m++) {
          fs[m](p, e);
        }
      }, end: function end() {
        var t = o[o.length - 1],
            e = t.children[t.children.length - 1];e && 3 === e.type && " " === e.text && !c && t.children.pop(), o.length -= 1, i = o[o.length - 1], n(t);
      }, chars: function chars(t) {
        if (i && (!Ni || "textarea" !== i.tag || i.attrsMap.placeholder !== t)) {
          var e = i.children;if (t = c || t.trim() ? Tr(i) ? t : js(t) : a && e.length ? " " : "") {
            var n;!s && " " !== t && (n = cr(t, cs)) ? e.push({ type: 2, expression: n, text: t }) : " " === t && e.length && " " === e[e.length - 1].text || e.push({ type: 3, text: t });
          }
        }
      }, comment: function comment(t) {
        i.children.push({ type: 3, text: t, isComment: !0 });
      } }), r;
  }function pr(t) {
    null != sn(t, "v-pre") && (t.pre = !0);
  }function dr(t) {
    var e = t.attrsList.length;if (e) for (var n = t.attrs = new Array(e), r = 0; r < e; r++) {
      n[r] = { name: t.attrsList[r].name, value: JSON.stringify(t.attrsList[r].value) };
    } else t.pre || (t.plain = !0);
  }function vr(t) {
    var e = an(t, "key");e && (t.key = e);
  }function hr(t) {
    var e = an(t, "ref");e && (t.ref = e, t.refInFor = Ar(t));
  }function mr(t) {
    var e;if (e = sn(t, "v-for")) {
      var n = e.match(ks);if (!n) return;t.for = n[2].trim();var r = n[1].trim(),
          i = r.match(Os);i ? (t.alias = i[1].trim(), t.iterator1 = i[2].trim(), i[3] && (t.iterator2 = i[3].trim())) : t.alias = r;
    }
  }function yr(t) {
    var e = sn(t, "v-if");if (e) t.if = e, br(t, { exp: e, block: t });else {
      null != sn(t, "v-else") && (t.else = !0);var n = sn(t, "v-else-if");n && (t.elseif = n);
    }
  }function gr(t, e) {
    var n = _r(e.children);n && n.if && br(n, { exp: t.elseif, block: t });
  }function _r(t) {
    for (var e = t.length; e--;) {
      if (1 === t[e].type) return t[e];t.pop();
    }
  }function br(t, e) {
    t.ifConditions || (t.ifConditions = []), t.ifConditions.push(e);
  }function $r(t) {
    null != sn(t, "v-once") && (t.once = !0);
  }function Cr(t) {
    if ("slot" === t.tag) t.slotName = an(t, "name");else {
      var e = an(t, "slot");e && (t.slotTarget = '""' === e ? '"default"' : e), "template" === t.tag && (t.slotScope = sn(t, "scope"));
    }
  }function wr(t) {
    var e;(e = an(t, "is")) && (t.component = e), null != sn(t, "inline-template") && (t.inlineTemplate = !0);
  }function xr(t) {
    var e,
        n,
        r,
        i,
        o,
        a,
        s,
        c = t.attrsList;for (e = 0, n = c.length; e < n; e++) {
      if (r = i = c[e].name, o = c[e].value, As.test(r)) {
        if (t.hasBindings = !0, (a = kr(r)) && (r = r.replace(Es, "")), Ss.test(r)) r = r.replace(Ss, ""), o = Ye(o), s = !1, a && (a.prop && (s = !0, "innerHtml" === (r = yi(r)) && (r = "innerHTML")), a.camel && (r = yi(r)), a.sync && on(t, "update:" + yi(r), un(o, "$event"))), s || !t.component && ds(t.tag, t.attrsMap.type, r) ? en(t, r, o) : nn(t, r, o);else if (xs.test(r)) on(t, r = r.replace(xs, ""), o, a, !1, ss);else {
          var u = (r = r.replace(As, "")).match(Ts),
              l = u && u[1];l && (r = r.slice(0, -(l.length + 1))), rn(t, r, i, o, l, a);
        }
      } else nn(t, r, JSON.stringify(o));
    }
  }function Ar(t) {
    for (var e = t; e;) {
      if (void 0 !== e.for) return !0;e = e.parent;
    }return !1;
  }function kr(t) {
    var e = t.match(Es);if (e) {
      var n = {};return e.forEach(function (t) {
        n[t.slice(1)] = !0;
      }), n;
    }
  }function Or(t) {
    for (var e = {}, n = 0, r = t.length; n < r; n++) {
      e[t[n].name] = t[n].value;
    }return e;
  }function Tr(t) {
    return "script" === t.tag || "style" === t.tag;
  }function Sr(t) {
    return "style" === t.tag || "script" === t.tag && (!t.attrsMap.type || "text/javascript" === t.attrsMap.type);
  }function Er(t) {
    for (var e = [], n = 0; n < t.length; n++) {
      var r = t[n];Ls.test(r.name) || (r.name = r.name.replace(Ns, ""), e.push(r));
    }return e;
  }function jr(t, e) {
    t && (hs = Is(e.staticKeys || ""), ms = e.isReservedTag || $i, Lr(t), Nr(t, !1));
  }function Lr(t) {
    if (t.static = Ir(t), 1 === t.type) {
      if (!ms(t.tag) && "slot" !== t.tag && null == t.attrsMap["inline-template"]) return;for (var e = 0, n = t.children.length; e < n; e++) {
        var r = t.children[e];Lr(r), r.static || (t.static = !1);
      }if (t.ifConditions) for (var i = 1, o = t.ifConditions.length; i < o; i++) {
        var a = t.ifConditions[i].block;Lr(a), a.static || (t.static = !1);
      }
    }
  }function Nr(t, e) {
    if (1 === t.type) {
      if ((t.static || t.once) && (t.staticInFor = e), t.static && t.children.length && (1 !== t.children.length || 3 !== t.children[0].type)) return void (t.staticRoot = !0);if (t.staticRoot = !1, t.children) for (var n = 0, r = t.children.length; n < r; n++) {
        Nr(t.children[n], e || !!t.for);
      }if (t.ifConditions) for (var i = 1, o = t.ifConditions.length; i < o; i++) {
        Nr(t.ifConditions[i].block, e);
      }
    }
  }function Ir(t) {
    return 2 !== t.type && (3 === t.type || !(!t.pre && (t.hasBindings || t.if || t.for || di(t.tag) || !ms(t.tag) || Mr(t) || !Object.keys(t).every(hs))));
  }function Mr(t) {
    for (; t.parent;) {
      if ("template" !== (t = t.parent).tag) return !1;if (t.for) return !0;
    }return !1;
  }function Dr(t, e, n) {
    var r = e ? "nativeOn:{" : "on:{";for (var i in t) {
      var o = t[i];r += '"' + i + '":' + Pr(i, o) + ",";
    }return r.slice(0, -1) + "}";
  }function Pr(t, e) {
    if (!e) return "function(){}";if (Array.isArray(e)) return "[" + e.map(function (e) {
      return Pr(t, e);
    }).join(",") + "]";var n = Ds.test(e.value),
        r = Ms.test(e.value);if (e.modifiers) {
      var i = "",
          o = "",
          a = [];for (var s in e.modifiers) {
        Rs[s] ? (o += Rs[s], Ps[s] && a.push(s)) : a.push(s);
      }return a.length && (i += Fr(a)), o && (i += o), "function($event){" + i + (n ? e.value + "($event)" : r ? "(" + e.value + ")($event)" : e.value) + "}";
    }return n || r ? e.value : "function($event){" + e.value + "}";
  }function Fr(t) {
    return "if(!('button' in $event)&&" + t.map(Rr).join("&&") + ")return null;";
  }function Rr(t) {
    var e = parseInt(t, 10);if (e) return "$event.keyCode!==" + e;var n = Ps[t];return "_k($event.keyCode," + JSON.stringify(t) + (n ? "," + JSON.stringify(n) : "") + ")";
  }function Hr(t, e) {
    var n = new Bs(e);return { render: "with(this){return " + (t ? Br(t, n) : '_c("div")') + "}", staticRenderFns: n.staticRenderFns };
  }function Br(t, e) {
    if (t.staticRoot && !t.staticProcessed) return Ur(t, e);if (t.once && !t.onceProcessed) return Vr(t, e);if (t.for && !t.forProcessed) return Jr(t, e);if (t.if && !t.ifProcessed) return zr(t, e);if ("template" !== t.tag || t.slotTarget) {
      if ("slot" === t.tag) return oi(t, e);var n;if (t.component) n = ai(t.component, t, e);else {
        var r = t.plain ? void 0 : qr(t, e),
            i = t.inlineTemplate ? null : Xr(t, e, !0);n = "_c('" + t.tag + "'" + (r ? "," + r : "") + (i ? "," + i : "") + ")";
      }for (var o = 0; o < e.transforms.length; o++) {
        n = e.transforms[o](t, n);
      }return n;
    }return Xr(t, e) || "void 0";
  }function Ur(t, e) {
    return t.staticProcessed = !0, e.staticRenderFns.push("with(this){return " + Br(t, e) + "}"), "_m(" + (e.staticRenderFns.length - 1) + (t.staticInFor ? ",true" : "") + ")";
  }function Vr(t, e) {
    if (t.onceProcessed = !0, t.if && !t.ifProcessed) return zr(t, e);if (t.staticInFor) {
      for (var n = "", r = t.parent; r;) {
        if (r.for) {
          n = r.key;break;
        }r = r.parent;
      }return n ? "_o(" + Br(t, e) + "," + e.onceId++ + (n ? "," + n : "") + ")" : Br(t, e);
    }return Ur(t, e);
  }function zr(t, e, n, r) {
    return t.ifProcessed = !0, Kr(t.ifConditions.slice(), e, n, r);
  }function Kr(t, e, n, r) {
    function i(t) {
      return n ? n(t, e) : t.once ? Vr(t, e) : Br(t, e);
    }if (!t.length) return r || "_e()";var o = t.shift();return o.exp ? "(" + o.exp + ")?" + i(o.block) + ":" + Kr(t, e, n, r) : "" + i(o.block);
  }function Jr(t, e, n, r) {
    var i = t.for,
        o = t.alias,
        a = t.iterator1 ? "," + t.iterator1 : "",
        s = t.iterator2 ? "," + t.iterator2 : "";return t.forProcessed = !0, (r || "_l") + "((" + i + "),function(" + o + a + s + "){return " + (n || Br)(t, e) + "})";
  }function qr(t, e) {
    var n = "{",
        r = Wr(t, e);r && (n += r + ","), t.key && (n += "key:" + t.key + ","), t.ref && (n += "ref:" + t.ref + ","), t.refInFor && (n += "refInFor:true,"), t.pre && (n += "pre:true,"), t.component && (n += 'tag:"' + t.tag + '",');for (var i = 0; i < e.dataGenFns.length; i++) {
      n += e.dataGenFns[i](t);
    }if (t.attrs && (n += "attrs:{" + si(t.attrs) + "},"), t.props && (n += "domProps:{" + si(t.props) + "},"), t.events && (n += Dr(t.events, !1, e.warn) + ","), t.nativeEvents && (n += Dr(t.nativeEvents, !0, e.warn) + ","), t.slotTarget && (n += "slot:" + t.slotTarget + ","), t.scopedSlots && (n += Zr(t.scopedSlots, e) + ","), t.model && (n += "model:{value:" + t.model.value + ",callback:" + t.model.callback + ",expression:" + t.model.expression + "},"), t.inlineTemplate) {
      var o = Gr(t, e);o && (n += o + ",");
    }return n = n.replace(/,$/, "") + "}", t.wrapData && (n = t.wrapData(n)), t.wrapListeners && (n = t.wrapListeners(n)), n;
  }function Wr(t, e) {
    var n = t.directives;if (n) {
      var r,
          i,
          o,
          a,
          s = "directives:[",
          c = !1;for (r = 0, i = n.length; r < i; r++) {
        o = n[r], a = !0;var u = e.directives[o.name];u && (a = !!u(t, o, e.warn)), a && (c = !0, s += '{name:"' + o.name + '",rawName:"' + o.rawName + '"' + (o.value ? ",value:(" + o.value + "),expression:" + JSON.stringify(o.value) : "") + (o.arg ? ',arg:"' + o.arg + '"' : "") + (o.modifiers ? ",modifiers:" + JSON.stringify(o.modifiers) : "") + "},");
      }return c ? s.slice(0, -1) + "]" : void 0;
    }
  }function Gr(t, e) {
    var n = t.children[0];if (1 === n.type) {
      var r = Hr(n, e.options);return "inlineTemplate:{render:function(){" + r.render + "},staticRenderFns:[" + r.staticRenderFns.map(function (t) {
        return "function(){" + t + "}";
      }).join(",") + "]}";
    }
  }function Zr(t, e) {
    return "scopedSlots:_u([" + Object.keys(t).map(function (n) {
      return Yr(n, t[n], e);
    }).join(",") + "])";
  }function Yr(t, e, n) {
    return e.for && !e.forProcessed ? Qr(t, e, n) : "{key:" + t + ",fn:function(" + String(e.attrsMap.scope) + "){return " + ("template" === e.tag ? Xr(e, n) || "void 0" : Br(e, n)) + "}}";
  }function Qr(t, e, n) {
    var r = e.for,
        i = e.alias,
        o = e.iterator1 ? "," + e.iterator1 : "",
        a = e.iterator2 ? "," + e.iterator2 : "";return e.forProcessed = !0, "_l((" + r + "),function(" + i + o + a + "){return " + Yr(t, e, n) + "})";
  }function Xr(t, e, n, r, i) {
    var o = t.children;if (o.length) {
      var a = o[0];if (1 === o.length && a.for && "template" !== a.tag && "slot" !== a.tag) return (r || Br)(a, e);var s = n ? ti(o, e.maybeComponent) : 0,
          c = i || ni;return "[" + o.map(function (t) {
        return c(t, e);
      }).join(",") + "]" + (s ? "," + s : "");
    }
  }function ti(t, e) {
    for (var n = 0, r = 0; r < t.length; r++) {
      var i = t[r];if (1 === i.type) {
        if (ei(i) || i.ifConditions && i.ifConditions.some(function (t) {
          return ei(t.block);
        })) {
          n = 2;break;
        }(e(i) || i.ifConditions && i.ifConditions.some(function (t) {
          return e(t.block);
        })) && (n = 1);
      }
    }return n;
  }function ei(t) {
    return void 0 !== t.for || "template" === t.tag || "slot" === t.tag;
  }function ni(t, e) {
    return 1 === t.type ? Br(t, e) : 3 === t.type && t.isComment ? ii(t) : ri(t);
  }function ri(t) {
    return "_v(" + (2 === t.type ? t.expression : ci(JSON.stringify(t.text))) + ")";
  }function ii(t) {
    return "_e(" + JSON.stringify(t.text) + ")";
  }function oi(t, e) {
    var n = t.slotName || '"default"',
        r = Xr(t, e),
        i = "_t(" + n + (r ? "," + r : ""),
        o = t.attrs && "{" + t.attrs.map(function (t) {
      return yi(t.name) + ":" + t.value;
    }).join(",") + "}",
        a = t.attrsMap["v-bind"];return !o && !a || r || (i += ",null"), o && (i += "," + o), a && (i += (o ? "" : ",null") + "," + a), i + ")";
  }function ai(t, e, n) {
    var r = e.inlineTemplate ? null : Xr(e, n, !0);return "_c(" + t + "," + qr(e, n) + (r ? "," + r : "") + ")";
  }function si(t) {
    for (var e = "", n = 0; n < t.length; n++) {
      var r = t[n];e += '"' + r.name + '":' + ci(r.value) + ",";
    }return e.slice(0, -1);
  }function ci(t) {
    return t.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }function ui(t, e) {
    try {
      return new Function(t);
    } catch (n) {
      return e.push({ err: n, code: t }), _;
    }
  }function li(t) {
    var e = Object.create(null);return function (n, r, i) {
      var o = (r = r || {}).delimiters ? String(r.delimiters) + n : n;if (e[o]) return e[o];var a = t(n, r),
          s = {},
          c = [];return s.render = ui(a.render, c), s.staticRenderFns = a.staticRenderFns.map(function (t) {
        return ui(t, c);
      }), e[o] = s;
    };
  }function fi(t) {
    if (t.outerHTML) return t.outerHTML;var e = document.createElement("div");return e.appendChild(t.cloneNode(!0)), e.innerHTML;
  }var pi = Object.prototype.toString,
      di = f("slot,component", !0),
      vi = f("key,ref,slot,is"),
      hi = Object.prototype.hasOwnProperty,
      mi = /-(\w)/g,
      yi = v(function (t) {
    return t.replace(mi, function (t, e) {
      return e ? e.toUpperCase() : "";
    });
  }),
      gi = v(function (t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }),
      _i = /([^-])([A-Z])/g,
      bi = v(function (t) {
    return t.replace(_i, "$1-$2").replace(_i, "$1-$2").toLowerCase();
  }),
      $i = function $i(t, e, n) {
    return !1;
  },
      Ci = function Ci(t) {
    return t;
  },
      wi = "data-server-rendered",
      xi = ["component", "directive", "filter"],
      Ai = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated"],
      ki = { optionMergeStrategies: Object.create(null), silent: !1, productionTip: !1, devtools: !1, performance: !1, errorHandler: null, warnHandler: null, ignoredElements: [], keyCodes: Object.create(null), isReservedTag: $i, isReservedAttr: $i, isUnknownElement: $i, getTagNamespace: _, parsePlatformTagName: Ci, mustUseProp: $i, _lifecycleHooks: Ai },
      Oi = Object.freeze({}),
      Ti = /[^\w.$]/,
      Si = _,
      Ei = "__proto__" in {},
      ji = "undefined" != typeof window,
      Li = ji && window.navigator.userAgent.toLowerCase(),
      Ni = Li && /msie|trident/.test(Li),
      Ii = Li && Li.indexOf("msie 9.0") > 0,
      Mi = Li && Li.indexOf("edge/") > 0,
      Di = Li && Li.indexOf("android") > 0,
      Pi = Li && /iphone|ipad|ipod|ios/.test(Li),
      Fi = Li && /chrome\/\d+/.test(Li) && !Mi,
      Ri = {}.watch,
      Hi = !1;if (ji) try {
    var Bi = {};Object.defineProperty(Bi, "passive", { get: function get() {
        Hi = !0;
      } }), window.addEventListener("test-passive", null, Bi);
  } catch (t) {}var Ui,
      Vi,
      zi = function zi() {
    return void 0 === Ui && (Ui = !ji && "undefined" != typeof global && "server" === global.process.env.VUE_ENV), Ui;
  },
      Ki = ji && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
      Ji = "undefined" != typeof Symbol && O(Symbol) && "undefined" != typeof Reflect && O(Reflect.ownKeys),
      qi = function () {
    function t() {
      r = !1;var t = n.slice(0);n.length = 0;for (var e = 0; e < t.length; e++) {
        t[e]();
      }
    }var e,
        n = [],
        r = !1;if ("undefined" != typeof Promise && O(Promise)) {
      var i = Promise.resolve(),
          o = function o(t) {
        console.error(t);
      };e = function e() {
        i.then(t).catch(o), Pi && setTimeout(_);
      };
    } else if ("undefined" == typeof MutationObserver || !O(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) e = function e() {
      setTimeout(t, 0);
    };else {
      var a = 1,
          s = new MutationObserver(t),
          c = document.createTextNode(String(a));s.observe(c, { characterData: !0 }), e = function e() {
        a = (a + 1) % 2, c.data = String(a);
      };
    }return function (t, i) {
      var o;if (n.push(function () {
        if (t) try {
          t.call(i);
        } catch (t) {
          k(t, i, "nextTick");
        } else o && o(i);
      }), r || (r = !0, e()), !t && "undefined" != typeof Promise) return new Promise(function (t, e) {
        o = t;
      });
    };
  }();Vi = "undefined" != typeof Set && O(Set) ? Set : function () {
    function t() {
      this.set = Object.create(null);
    }return t.prototype.has = function (t) {
      return !0 === this.set[t];
    }, t.prototype.add = function (t) {
      this.set[t] = !0;
    }, t.prototype.clear = function () {
      this.set = Object.create(null);
    }, t;
  }();var Wi = 0,
      Gi = function Gi() {
    this.id = Wi++, this.subs = [];
  };Gi.prototype.addSub = function (t) {
    this.subs.push(t);
  }, Gi.prototype.removeSub = function (t) {
    p(this.subs, t);
  }, Gi.prototype.depend = function () {
    Gi.target && Gi.target.addDep(this);
  }, Gi.prototype.notify = function () {
    for (var t = this.subs.slice(), e = 0, n = t.length; e < n; e++) {
      t[e].update();
    }
  }, Gi.target = null;var Zi = [],
      Yi = Array.prototype,
      Qi = Object.create(Yi);["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (t) {
    var e = Yi[t];x(Qi, t, function () {
      for (var n = [], r = arguments.length; r--;) {
        n[r] = arguments[r];
      }var i,
          o = e.apply(this, n),
          a = this.__ob__;switch (t) {case "push":case "unshift":
          i = n;break;case "splice":
          i = n.slice(2);}return i && a.observeArray(i), a.dep.notify(), o;
    });
  });var Xi = Object.getOwnPropertyNames(Qi),
      to = { shouldConvert: !0 },
      eo = function eo(t) {
    this.value = t, this.dep = new Gi(), this.vmCount = 0, x(t, "__ob__", this), Array.isArray(t) ? ((Ei ? E : j)(t, Qi, Xi), this.observeArray(t)) : this.walk(t);
  };eo.prototype.walk = function (t) {
    for (var e = Object.keys(t), n = 0; n < e.length; n++) {
      N(t, e[n], t[e[n]]);
    }
  }, eo.prototype.observeArray = function (t) {
    for (var e = 0, n = t.length; e < n; e++) {
      L(t[e]);
    }
  };var no = ki.optionMergeStrategies;no.data = function (t, e, n) {
    return n ? F(t, e, n) : e && "function" != typeof e ? t : F.call(this, t, e);
  }, Ai.forEach(function (t) {
    no[t] = R;
  }), xi.forEach(function (t) {
    no[t + "s"] = H;
  }), no.watch = function (t, e) {
    if (t === Ri && (t = void 0), e === Ri && (e = void 0), !e) return Object.create(t || null);if (!t) return e;var n = {};y(n, t);for (var r in e) {
      var i = n[r],
          o = e[r];i && !Array.isArray(i) && (i = [i]), n[r] = i ? i.concat(o) : Array.isArray(o) ? o : [o];
    }return n;
  }, no.props = no.methods = no.inject = no.computed = function (t, e) {
    if (!t) return e;var n = Object.create(null);return y(n, t), e && y(n, e), n;
  }, no.provide = F;var ro = function ro(t, e) {
    return void 0 === e ? t : e;
  },
      io = function io(t, e, n, r, i, o, a, s) {
    this.tag = t, this.data = e, this.children = n, this.text = r, this.elm = i, this.ns = void 0, this.context = o, this.functionalContext = void 0, this.key = e && e.key, this.componentOptions = a, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
  },
      oo = { child: {} };oo.child.get = function () {
    return this.componentInstance;
  }, Object.defineProperties(io.prototype, oo);var ao,
      so = function so(t) {
    void 0 === t && (t = "");var e = new io();return e.text = t, e.isComment = !0, e;
  },
      co = v(function (t) {
    var e = "&" === t.charAt(0),
        n = "~" === (t = e ? t.slice(1) : t).charAt(0),
        r = "!" === (t = n ? t.slice(1) : t).charAt(0);return t = r ? t.slice(1) : t, { name: t, once: n, capture: r, passive: e };
  }),
      uo = null,
      lo = [],
      fo = [],
      po = {},
      vo = !1,
      ho = !1,
      mo = 0,
      yo = 0,
      go = function go(t, e, n, r) {
    this.vm = t, t._watchers.push(this), r ? (this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++yo, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new Vi(), this.newDepIds = new Vi(), this.expression = "", "function" == typeof e ? this.getter = e : (this.getter = A(e), this.getter || (this.getter = function () {})), this.value = this.lazy ? void 0 : this.get();
  };go.prototype.get = function () {
    T(this);var t,
        e = this.vm;try {
      t = this.getter.call(e, e);
    } catch (t) {
      if (!this.user) throw t;k(t, e, 'getter for watcher "' + this.expression + '"');
    } finally {
      this.deep && Lt(t), S(), this.cleanupDeps();
    }return t;
  }, go.prototype.addDep = function (t) {
    var e = t.id;this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this));
  }, go.prototype.cleanupDeps = function () {
    for (var t = this, e = this.deps.length; e--;) {
      var n = t.deps[e];t.newDepIds.has(n.id) || n.removeSub(t);
    }var r = this.depIds;this.depIds = this.newDepIds, this.newDepIds = r, this.newDepIds.clear(), r = this.deps, this.deps = this.newDeps, this.newDeps = r, this.newDeps.length = 0;
  }, go.prototype.update = function () {
    this.lazy ? this.dirty = !0 : this.sync ? this.run() : jt(this);
  }, go.prototype.run = function () {
    if (this.active) {
      var t = this.get();if (t !== this.value || o(t) || this.deep) {
        var e = this.value;if (this.value = t, this.user) try {
          this.cb.call(this.vm, t, e);
        } catch (t) {
          k(t, this.vm, 'callback for watcher "' + this.expression + '"');
        } else this.cb.call(this.vm, t, e);
      }
    }
  }, go.prototype.evaluate = function () {
    this.value = this.get(), this.dirty = !1;
  }, go.prototype.depend = function () {
    for (var t = this, e = this.deps.length; e--;) {
      t.deps[e].depend();
    }
  }, go.prototype.teardown = function () {
    var t = this;if (this.active) {
      this.vm._isBeingDestroyed || p(this.vm._watchers, this);for (var e = this.deps.length; e--;) {
        t.deps[e].removeSub(t);
      }this.active = !1;
    }
  };var _o = new Vi(),
      bo = { enumerable: !0, configurable: !0, get: _, set: _ },
      $o = { lazy: !0 },
      Co = { init: function init(t, e, n, r) {
      if (!t.componentInstance || t.componentInstance._isDestroyed) (t.componentInstance = Yt(t, uo, n, r)).$mount(e ? t.elm : void 0, e);else if (t.data.keepAlive) {
        var i = t;Co.prepatch(i, i);
      }
    }, prepatch: function prepatch(t, e) {
      var n = e.componentOptions;$t(e.componentInstance = t.componentInstance, n.propsData, n.listeners, e, n.children);
    }, insert: function insert(t) {
      var e = t.context,
          n = t.componentInstance;n._isMounted || (n._isMounted = !0, At(n, "mounted")), t.data.keepAlive && (e._isMounted ? St(n) : wt(n, !0));
    }, destroy: function destroy(t) {
      var e = t.componentInstance;e._isDestroyed || (t.data.keepAlive ? xt(e, !0) : e.$destroy());
    } },
      wo = Object.keys(Co),
      xo = 1,
      Ao = 2,
      ko = 0;!function (t) {
    t.prototype._init = function (t) {
      var e = this;e._uid = ko++, e._isVue = !0, t && t._isComponent ? he(e, t) : e.$options = z(me(e.constructor), t || {}, e), e._renderProxy = e, e._self = e, _t(e), pt(e), ve(e), At(e, "beforeCreate"), Jt(e), Mt(e), Kt(e), At(e, "created"), e.$options.el && e.$mount(e.$options.el);
    };
  }(_e), function (t) {
    var e = {};e.get = function () {
      return this._data;
    };var n = {};n.get = function () {
      return this._props;
    }, Object.defineProperty(t.prototype, "$data", e), Object.defineProperty(t.prototype, "$props", n), t.prototype.$set = I, t.prototype.$delete = M, t.prototype.$watch = function (t, e, n) {
      var r = this;if (a(e)) return zt(r, t, e, n);(n = n || {}).user = !0;var i = new go(r, t, e, n);return n.immediate && e.call(r, i.value), function () {
        i.teardown();
      };
    };
  }(_e), function (t) {
    var e = /^hook:/;t.prototype.$on = function (t, n) {
      var r = this,
          i = this;if (Array.isArray(t)) for (var o = 0, a = t.length; o < a; o++) {
        r.$on(t[o], n);
      } else (i._events[t] || (i._events[t] = [])).push(n), e.test(t) && (i._hasHookEvent = !0);return i;
    }, t.prototype.$once = function (t, e) {
      function n() {
        r.$off(t, n), e.apply(r, arguments);
      }var r = this;return n.fn = e, r.$on(t, n), r;
    }, t.prototype.$off = function (t, e) {
      var n = this,
          r = this;if (!arguments.length) return r._events = Object.create(null), r;if (Array.isArray(t)) {
        for (var i = 0, o = t.length; i < o; i++) {
          n.$off(t[i], e);
        }return r;
      }var a = r._events[t];if (!a) return r;if (1 === arguments.length) return r._events[t] = null, r;for (var s, c = a.length; c--;) {
        if ((s = a[c]) === e || s.fn === e) {
          a.splice(c, 1);break;
        }
      }return r;
    }, t.prototype.$emit = function (t) {
      var e = this,
          n = e._events[t];if (n) {
        n = n.length > 1 ? m(n) : n;for (var r = m(arguments, 1), i = 0, o = n.length; i < o; i++) {
          try {
            n[i].apply(e, r);
          } catch (n) {
            k(n, e, 'event handler for "' + t + '"');
          }
        }
      }return e;
    };
  }(_e), function (t) {
    t.prototype._update = function (t, e) {
      var n = this;n._isMounted && At(n, "beforeUpdate");var r = n.$el,
          i = n._vnode,
          o = uo;uo = n, n._vnode = t, i ? n.$el = n.__patch__(i, t) : (n.$el = n.__patch__(n.$el, t, e, !1, n.$options._parentElm, n.$options._refElm), n.$options._parentElm = n.$options._refElm = null), uo = o, r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el);
    }, t.prototype.$forceUpdate = function () {
      var t = this;t._watcher && t._watcher.update();
    }, t.prototype.$destroy = function () {
      var t = this;if (!t._isBeingDestroyed) {
        At(t, "beforeDestroy"), t._isBeingDestroyed = !0;var e = t.$parent;!e || e._isBeingDestroyed || t.$options.abstract || p(e.$children, t), t._watcher && t._watcher.teardown();for (var n = t._watchers.length; n--;) {
          t._watchers[n].teardown();
        }t._data.__ob__ && t._data.__ob__.vmCount--, t._isDestroyed = !0, t.__patch__(t._vnode, null), At(t, "destroyed"), t.$off(), t.$el && (t.$el.__vue__ = null);
      }
    };
  }(_e), function (t) {
    t.prototype.$nextTick = function (t) {
      return qi(t, this);
    }, t.prototype._render = function () {
      var t = this,
          e = t.$options,
          n = e.render,
          r = e.staticRenderFns,
          i = e._parentVnode;if (t._isMounted) for (var o in t.$slots) {
        t.$slots[o] = Q(t.$slots[o]);
      }t.$scopedSlots = i && i.data.scopedSlots || Oi, r && !t._staticTrees && (t._staticTrees = []), t.$vnode = i;var a;try {
        a = n.call(t._renderProxy, t.$createElement);
      } catch (e) {
        k(e, t, "render function"), a = t._vnode;
      }return a instanceof io || (a = so()), a.parent = i, a;
    }, t.prototype._o = le, t.prototype._n = l, t.prototype._s = u, t.prototype._l = ie, t.prototype._t = oe, t.prototype._q = b, t.prototype._i = $, t.prototype._m = ue, t.prototype._f = ae, t.prototype._k = se, t.prototype._b = ce, t.prototype._v = Z, t.prototype._e = so, t.prototype._u = gt, t.prototype._g = de;
  }(_e);var Oo = [String, RegExp, Array],
      To = { KeepAlive: { name: "keep-alive", abstract: !0, props: { include: Oo, exclude: Oo }, created: function created() {
        this.cache = Object.create(null);
      }, destroyed: function destroyed() {
        var t = this;for (var e in t.cache) {
          Se(t.cache[e]);
        }
      }, watch: { include: function include(t) {
          Te(this.cache, this._vnode, function (e) {
            return Oe(t, e);
          });
        }, exclude: function exclude(t) {
          Te(this.cache, this._vnode, function (e) {
            return !Oe(t, e);
          });
        } }, render: function render() {
        var t = ft(this.$slots.default),
            e = t && t.componentOptions;if (e) {
          var n = ke(e);if (n && (this.include && !Oe(this.include, n) || this.exclude && Oe(this.exclude, n))) return t;var r = null == t.key ? e.Ctor.cid + (e.tag ? "::" + e.tag : "") : t.key;this.cache[r] ? t.componentInstance = this.cache[r].componentInstance : this.cache[r] = t, t.data.keepAlive = !0;
        }return t;
      } } };!function (t) {
    var e = {};e.get = function () {
      return ki;
    }, Object.defineProperty(t, "config", e), t.util = { warn: Si, extend: y, mergeOptions: z, defineReactive: N }, t.set = I, t.delete = M, t.nextTick = qi, t.options = Object.create(null), xi.forEach(function (e) {
      t.options[e + "s"] = Object.create(null);
    }), t.options._base = t, y(t.options.components, To), be(t), $e(t), Ce(t), Ae(t);
  }(_e), Object.defineProperty(_e.prototype, "$isServer", { get: zi }), Object.defineProperty(_e.prototype, "$ssrContext", { get: function get() {
      return this.$vnode && this.$vnode.ssrContext;
    } }), _e.version = "2.4.2";var So,
      Eo,
      jo,
      Lo,
      No,
      Io,
      Mo,
      Do,
      Po,
      Fo = f("style,class"),
      Ro = f("input,textarea,option,select"),
      Ho = function Ho(t, e, n) {
    return "value" === n && Ro(t) && "button" !== e || "selected" === n && "option" === t || "checked" === n && "input" === t || "muted" === n && "video" === t;
  },
      Bo = f("contenteditable,draggable,spellcheck"),
      Uo = f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
      Vo = "http://www.w3.org/1999/xlink",
      zo = function zo(t) {
    return ":" === t.charAt(5) && "xlink" === t.slice(0, 5);
  },
      Ko = function Ko(t) {
    return zo(t) ? t.slice(6, t.length) : "";
  },
      Jo = function Jo(t) {
    return null == t || !1 === t;
  },
      qo = { svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML" },
      Wo = f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),
      Go = f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
      Zo = function Zo(t) {
    return Wo(t) || Go(t);
  },
      Yo = Object.create(null),
      Qo = Object.freeze({ createElement: function createElement(t, e) {
      var n = document.createElement(t);return "select" !== t ? n : (e.data && e.data.attrs && void 0 !== e.data.attrs.multiple && n.setAttribute("multiple", "multiple"), n);
    }, createElementNS: function createElementNS(t, e) {
      return document.createElementNS(qo[t], e);
    }, createTextNode: function createTextNode(t) {
      return document.createTextNode(t);
    }, createComment: function createComment(t) {
      return document.createComment(t);
    }, insertBefore: function insertBefore(t, e, n) {
      t.insertBefore(e, n);
    }, removeChild: function removeChild(t, e) {
      t.removeChild(e);
    }, appendChild: function appendChild(t, e) {
      t.appendChild(e);
    }, parentNode: function parentNode(t) {
      return t.parentNode;
    }, nextSibling: function nextSibling(t) {
      return t.nextSibling;
    }, tagName: function tagName(t) {
      return t.tagName;
    }, setTextContent: function setTextContent(t, e) {
      t.textContent = e;
    }, setAttribute: function setAttribute(t, e, n) {
      t.setAttribute(e, n);
    } }),
      Xo = { create: function create(t, e) {
      Re(e);
    }, update: function update(t, e) {
      t.data.ref !== e.data.ref && (Re(t, !0), Re(e));
    }, destroy: function destroy(t) {
      Re(t, !0);
    } },
      ta = new io("", {}, []),
      ea = ["create", "activate", "update", "remove", "destroy"],
      na = { create: Ve, update: Ve, destroy: function destroy(t) {
      Ve(t, ta);
    } },
      ra = Object.create(null),
      ia = [Xo, na],
      oa = { create: We, update: We },
      aa = { create: Ze, update: Ze },
      sa = /[\w).+\-_$\]]/,
      ca = "__r",
      ua = "__c",
      la = { create: wn, update: wn },
      fa = { create: xn, update: xn },
      pa = v(function (t) {
    var e = {},
        n = /;(?![^(]*\))/g,
        r = /:(.+)/;return t.split(n).forEach(function (t) {
      if (t) {
        var n = t.split(r);n.length > 1 && (e[n[0].trim()] = n[1].trim());
      }
    }), e;
  }),
      da = /^--/,
      va = /\s*!important$/,
      ha = function ha(t, e, n) {
    if (da.test(e)) t.style.setProperty(e, n);else if (va.test(n)) t.style.setProperty(e, n.replace(va, ""), "important");else {
      var r = ya(e);if (Array.isArray(n)) for (var i = 0, o = n.length; i < o; i++) {
        t.style[r] = n[i];
      } else t.style[r] = n;
    }
  },
      ma = ["Webkit", "Moz", "ms"],
      ya = v(function (t) {
    if (Po = Po || document.createElement("div").style, "filter" !== (t = yi(t)) && t in Po) return t;for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < ma.length; n++) {
      var r = ma[n] + e;if (r in Po) return r;
    }
  }),
      ga = { create: jn, update: jn },
      _a = v(function (t) {
    return { enterClass: t + "-enter", enterToClass: t + "-enter-to", enterActiveClass: t + "-enter-active", leaveClass: t + "-leave", leaveToClass: t + "-leave-to", leaveActiveClass: t + "-leave-active" };
  }),
      ba = ji && !Ii,
      $a = "transition",
      Ca = "animation",
      wa = "transition",
      xa = "transitionend",
      Aa = "animation",
      ka = "animationend";ba && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (wa = "WebkitTransition", xa = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Aa = "WebkitAnimation", ka = "webkitAnimationEnd"));var Oa = ji && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout,
      Ta = /\b(transform|all)(,|$)/,
      Sa = function (r) {
    function o(t) {
      return new io(E.tagName(t).toLowerCase(), {}, [], void 0, t);
    }function a(t, e) {
      function n() {
        0 == --n.listeners && s(t);
      }return n.listeners = e, n;
    }function s(t) {
      var n = E.parentNode(t);e(n) && E.removeChild(n, t);
    }function c(t, r, i, o, a) {
      if (t.isRootInsert = !a, !u(t, r, i, o)) {
        var s = t.data,
            c = t.children,
            l = t.tag;e(l) ? (t.elm = t.ns ? E.createElementNS(t.ns, l) : E.createElement(l, t), y(t), v(t, c, r), e(s) && m(t, r), d(i, t.elm, o)) : n(t.isComment) ? (t.elm = E.createComment(t.text), d(i, t.elm, o)) : (t.elm = E.createTextNode(t.text), d(i, t.elm, o));
      }
    }function u(t, r, i, o) {
      var a = t.data;if (e(a)) {
        var s = e(t.componentInstance) && a.keepAlive;if (e(a = a.hook) && e(a = a.init) && a(t, !1, i, o), e(t.componentInstance)) return l(t, r), n(s) && p(t, r, i, o), !0;
      }
    }function l(t, n) {
      e(t.data.pendingInsert) && (n.push.apply(n, t.data.pendingInsert), t.data.pendingInsert = null), t.elm = t.componentInstance.$el, h(t) ? (m(t, n), y(t)) : (Re(t), n.push(t));
    }function p(t, n, r, i) {
      for (var o, a = t; a.componentInstance;) {
        if (a = a.componentInstance._vnode, e(o = a.data) && e(o = o.transition)) {
          for (o = 0; o < T.activate.length; ++o) {
            T.activate[o](ta, a);
          }n.push(a);break;
        }
      }d(r, t.elm, i);
    }function d(t, n, r) {
      e(t) && (e(r) ? r.parentNode === t && E.insertBefore(t, n, r) : E.appendChild(t, n));
    }function v(t, e, n) {
      if (Array.isArray(e)) for (var r = 0; r < e.length; ++r) {
        c(e[r], n, t.elm, null, !0);
      } else i(t.text) && E.appendChild(t.elm, E.createTextNode(t.text));
    }function h(t) {
      for (; t.componentInstance;) {
        t = t.componentInstance._vnode;
      }return e(t.tag);
    }function m(t, n) {
      for (var r = 0; r < T.create.length; ++r) {
        T.create[r](ta, t);
      }e(k = t.data.hook) && (e(k.create) && k.create(ta, t), e(k.insert) && n.push(t));
    }function y(t) {
      for (var n, r = t; r;) {
        e(n = r.context) && e(n = n.$options._scopeId) && E.setAttribute(t.elm, n, ""), r = r.parent;
      }e(n = uo) && n !== t.context && e(n = n.$options._scopeId) && E.setAttribute(t.elm, n, "");
    }function g(t, e, n, r, i, o) {
      for (; r <= i; ++r) {
        c(n[r], o, t, e);
      }
    }function _(t) {
      var n,
          r,
          i = t.data;if (e(i)) for (e(n = i.hook) && e(n = n.destroy) && n(t), n = 0; n < T.destroy.length; ++n) {
        T.destroy[n](t);
      }if (e(n = t.children)) for (r = 0; r < t.children.length; ++r) {
        _(t.children[r]);
      }
    }function b(t, n, r, i) {
      for (; r <= i; ++r) {
        var o = n[r];e(o) && (e(o.tag) ? ($(o), _(o)) : s(o.elm));
      }
    }function $(t, n) {
      if (e(n) || e(t.data)) {
        var r,
            i = T.remove.length + 1;for (e(n) ? n.listeners += i : n = a(t.elm, i), e(r = t.componentInstance) && e(r = r._vnode) && e(r.data) && $(r, n), r = 0; r < T.remove.length; ++r) {
          T.remove[r](t, n);
        }e(r = t.data.hook) && e(r = r.remove) ? r(t, n) : n();
      } else s(t.elm);
    }function C(n, r, i, o, a) {
      for (var s, u, l, f = 0, p = 0, d = r.length - 1, v = r[0], h = r[d], m = i.length - 1, y = i[0], _ = i[m], $ = !a; f <= d && p <= m;) {
        t(v) ? v = r[++f] : t(h) ? h = r[--d] : He(v, y) ? (w(v, y, o), v = r[++f], y = i[++p]) : He(h, _) ? (w(h, _, o), h = r[--d], _ = i[--m]) : He(v, _) ? (w(v, _, o), $ && E.insertBefore(n, v.elm, E.nextSibling(h.elm)), v = r[++f], _ = i[--m]) : He(h, y) ? (w(h, y, o), $ && E.insertBefore(n, h.elm, v.elm), h = r[--d], y = i[++p]) : (t(s) && (s = Ue(r, f, d)), t(u = e(y.key) ? s[y.key] : null) ? (c(y, o, n, v.elm), y = i[++p]) : He(l = r[u], y) ? (w(l, y, o), r[u] = void 0, $ && E.insertBefore(n, l.elm, v.elm), y = i[++p]) : (c(y, o, n, v.elm), y = i[++p]));
      }f > d ? g(n, t(i[m + 1]) ? null : i[m + 1].elm, i, p, m, o) : p > m && b(n, r, f, d);
    }function w(r, i, o, a) {
      if (r !== i) {
        var s = i.elm = r.elm;if (n(r.isAsyncPlaceholder)) e(i.asyncFactory.resolved) ? A(r.elm, i, o) : i.isAsyncPlaceholder = !0;else if (n(i.isStatic) && n(r.isStatic) && i.key === r.key && (n(i.isCloned) || n(i.isOnce))) i.componentInstance = r.componentInstance;else {
          var c,
              u = i.data;e(u) && e(c = u.hook) && e(c = c.prepatch) && c(r, i);var l = r.children,
              f = i.children;if (e(u) && h(i)) {
            for (c = 0; c < T.update.length; ++c) {
              T.update[c](r, i);
            }e(c = u.hook) && e(c = c.update) && c(r, i);
          }t(i.text) ? e(l) && e(f) ? l !== f && C(s, l, f, o, a) : e(f) ? (e(r.text) && E.setTextContent(s, ""), g(s, null, f, 0, f.length - 1, o)) : e(l) ? b(s, l, 0, l.length - 1) : e(r.text) && E.setTextContent(s, "") : r.text !== i.text && E.setTextContent(s, i.text), e(u) && e(c = u.hook) && e(c = c.postpatch) && c(r, i);
        }
      }
    }function x(t, r, i) {
      if (n(i) && e(t.parent)) t.parent.data.pendingInsert = r;else for (var o = 0; o < r.length; ++o) {
        r[o].data.hook.insert(r[o]);
      }
    }function A(t, r, i) {
      if (n(r.isComment) && e(r.asyncFactory)) return r.elm = t, r.isAsyncPlaceholder = !0, !0;r.elm = t;var o = r.tag,
          a = r.data,
          s = r.children;if (e(a) && (e(k = a.hook) && e(k = k.init) && k(r, !0), e(k = r.componentInstance))) return l(r, i), !0;if (e(o)) {
        if (e(s)) if (t.hasChildNodes()) {
          for (var c = !0, u = t.firstChild, f = 0; f < s.length; f++) {
            if (!u || !A(u, s[f], i)) {
              c = !1;break;
            }u = u.nextSibling;
          }if (!c || u) return !1;
        } else v(r, s, i);if (e(a)) for (var p in a) {
          if (!j(p)) {
            m(r, i);break;
          }
        }
      } else t.data !== r.text && (t.data = r.text);return !0;
    }var k,
        O,
        T = {},
        S = r.modules,
        E = r.nodeOps;for (k = 0; k < ea.length; ++k) {
      for (T[ea[k]] = [], O = 0; O < S.length; ++O) {
        e(S[O][ea[k]]) && T[ea[k]].push(S[O][ea[k]]);
      }
    }var j = f("attrs,style,class,staticClass,staticStyle,key");return function (r, i, a, s, u, l) {
      if (!t(i)) {
        var f = !1,
            p = [];if (t(r)) f = !0, c(i, p, u, l);else {
          var d = e(r.nodeType);if (!d && He(r, i)) w(r, i, p, s);else {
            if (d) {
              if (1 === r.nodeType && r.hasAttribute(wi) && (r.removeAttribute(wi), a = !0), n(a) && A(r, i, p)) return x(i, p, !0), r;r = o(r);
            }var v = r.elm,
                m = E.parentNode(v);if (c(i, p, v._leaveCb ? null : m, E.nextSibling(v)), e(i.parent)) {
              for (var y = i.parent; y;) {
                y.elm = i.elm, y = y.parent;
              }if (h(i)) for (var g = 0; g < T.create.length; ++g) {
                T.create[g](ta, i.parent);
              }
            }e(m) ? b(m, [r], 0, 0) : e(r.tag) && _(r);
          }
        }return x(i, p, f), i.elm;
      }e(r) && _(r);
    };
  }({ nodeOps: Qo, modules: [oa, aa, la, fa, ga, ji ? { create: Jn, activate: Jn, remove: function remove(t, e) {
        !0 !== t.data.show ? Vn(t, e) : e();
      } } : {}].concat(ia) }),
      Ea = f("text,number,password,search,email,tel,url");Ii && document.addEventListener("selectionchange", function () {
    var t = document.activeElement;t && t.vmodel && Yn(t, "input");
  });var ja = { model: { inserted: function inserted(t, e, n) {
        if ("select" === n.tag) {
          var r = function r() {
            qn(t, e, n.context);
          };r(), (Ni || Mi) && setTimeout(r, 0), t._vOptions = [].map.call(t.options, Wn);
        } else ("textarea" === n.tag || Ea(t.type)) && (t._vModifiers = e.modifiers, e.modifiers.lazy || (t.addEventListener("change", Zn), Di || (t.addEventListener("compositionstart", Gn), t.addEventListener("compositionend", Zn)), Ii && (t.vmodel = !0)));
      }, componentUpdated: function componentUpdated(t, e, n) {
        if ("select" === n.tag) {
          qn(t, e, n.context);var r = t._vOptions;(t._vOptions = [].map.call(t.options, Wn)).some(function (t, e) {
            return !b(t, r[e]);
          }) && Yn(t, "change");
        }
      } }, show: { bind: function bind(t, e, n) {
        var r = e.value,
            i = (n = Qn(n)).data && n.data.transition,
            o = t.__vOriginalDisplay = "none" === t.style.display ? "" : t.style.display;r && i ? (n.data.show = !0, Un(n, function () {
          t.style.display = o;
        })) : t.style.display = r ? o : "none";
      }, update: function update(t, e, n) {
        var r = e.value;r !== e.oldValue && ((n = Qn(n)).data && n.data.transition ? (n.data.show = !0, r ? Un(n, function () {
          t.style.display = t.__vOriginalDisplay;
        }) : Vn(n, function () {
          t.style.display = "none";
        })) : t.style.display = r ? t.__vOriginalDisplay : "none");
      }, unbind: function unbind(t, e, n, r, i) {
        i || (t.style.display = t.__vOriginalDisplay);
      } } },
      La = { name: String, appear: Boolean, css: Boolean, mode: String, type: String, enterClass: String, leaveClass: String, enterToClass: String, leaveToClass: String, enterActiveClass: String, leaveActiveClass: String, appearClass: String, appearActiveClass: String, appearToClass: String, duration: [Number, String, Object] },
      Na = { name: "transition", props: La, abstract: !0, render: function render(t) {
      var e = this,
          n = this.$options._renderChildren;if (n && (n = n.filter(function (t) {
        return t.tag || ir(t);
      })).length) {
        var r = this.mode,
            o = n[0];if (nr(this.$vnode)) return o;var a = Xn(o);if (!a) return o;if (this._leaving) return er(t, o);var s = "__transition-" + this._uid + "-";a.key = null == a.key ? a.isComment ? s + "comment" : s + a.tag : i(a.key) ? 0 === String(a.key).indexOf(s) ? a.key : s + a.key : a.key;var c = (a.data || (a.data = {})).transition = tr(this),
            u = this._vnode,
            l = Xn(u);if (a.data.directives && a.data.directives.some(function (t) {
          return "show" === t.name;
        }) && (a.data.show = !0), l && l.data && !rr(a, l) && !ir(l)) {
          var f = l && (l.data.transition = y({}, c));if ("out-in" === r) return this._leaving = !0, et(f, "afterLeave", function () {
            e._leaving = !1, e.$forceUpdate();
          }), er(t, o);if ("in-out" === r) {
            if (ir(a)) return u;var p,
                d = function d() {
              p();
            };et(c, "afterEnter", d), et(c, "enterCancelled", d), et(f, "delayLeave", function (t) {
              p = t;
            });
          }
        }return o;
      }
    } },
      Ia = y({ tag: String, moveClass: String }, La);delete Ia.mode;var Ma = { Transition: Na, TransitionGroup: { props: Ia, render: function render(t) {
        for (var e = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, i = this.$slots.default || [], o = this.children = [], a = tr(this), s = 0; s < i.length; s++) {
          var c = i[s];c.tag && null != c.key && 0 !== String(c.key).indexOf("__vlist") && (o.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = a);
        }if (r) {
          for (var u = [], l = [], f = 0; f < r.length; f++) {
            var p = r[f];p.data.transition = a, p.data.pos = p.elm.getBoundingClientRect(), n[p.key] ? u.push(p) : l.push(p);
          }this.kept = t(e, null, u), this.removed = l;
        }return t(e, null, o);
      }, beforeUpdate: function beforeUpdate() {
        this.__patch__(this._vnode, this.kept, !1, !0), this._vnode = this.kept;
      }, updated: function updated() {
        var t = this.prevChildren,
            e = this.moveClass || (this.name || "v") + "-move";if (t.length && this.hasMove(t[0].elm, e)) {
          t.forEach(or), t.forEach(ar), t.forEach(sr);document.body.offsetHeight;t.forEach(function (t) {
            if (t.data.moved) {
              var n = t.elm,
                  r = n.style;Dn(n, e), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(xa, n._moveCb = function t(r) {
                r && !/transform$/.test(r.propertyName) || (n.removeEventListener(xa, t), n._moveCb = null, Pn(n, e));
              });
            }
          });
        }
      }, methods: { hasMove: function hasMove(t, e) {
          if (!ba) return !1;if (this._hasMove) return this._hasMove;var n = t.cloneNode();t._transitionClasses && t._transitionClasses.forEach(function (t) {
            Nn(n, t);
          }), Ln(n, e), n.style.display = "none", this.$el.appendChild(n);var r = Rn(n);return this.$el.removeChild(n), this._hasMove = r.hasTransform;
        } } } };_e.config.mustUseProp = Ho, _e.config.isReservedTag = Zo, _e.config.isReservedAttr = Fo, _e.config.getTagNamespace = Pe, _e.config.isUnknownElement = function (t) {
    if (!ji) return !0;if (Zo(t)) return !1;if (t = t.toLowerCase(), null != Yo[t]) return Yo[t];var e = document.createElement(t);return t.indexOf("-") > -1 ? Yo[t] = e.constructor === window.HTMLUnknownElement || e.constructor === window.HTMLElement : Yo[t] = /HTMLUnknownElement/.test(e.toString());
  }, y(_e.options.directives, ja), y(_e.options.components, Ma), _e.prototype.__patch__ = ji ? Sa : _, _e.prototype.$mount = function (t, e) {
    return t = t && ji ? Fe(t) : void 0, bt(this, t, e);
  }, setTimeout(function () {
    ki.devtools && Ki && Ki.emit("init", _e);
  }, 0);var Da,
      Pa = !!ji && function (t, e) {
    var n = document.createElement("div");return n.innerHTML = '<div a="' + t + '"/>', n.innerHTML.indexOf(e) > 0;
  }("\n", "&#10;"),
      Fa = /\{\{((?:.|\n)+?)\}\}/g,
      Ra = /[-.*+?^${}()|[\]\/\\]/g,
      Ha = v(function (t) {
    var e = t[0].replace(Ra, "\\$&"),
        n = t[1].replace(Ra, "\\$&");return new RegExp(e + "((?:.|\\n)+?)" + n, "g");
  }),
      Ba = [{ staticKeys: ["staticClass"], transformNode: function transformNode(t, e) {
      e.warn;var n = sn(t, "class");n && (t.staticClass = JSON.stringify(n));var r = an(t, "class", !1);r && (t.classBinding = r);
    }, genData: function genData(t) {
      var e = "";return t.staticClass && (e += "staticClass:" + t.staticClass + ","), t.classBinding && (e += "class:" + t.classBinding + ","), e;
    } }, { staticKeys: ["staticStyle"], transformNode: function transformNode(t, e) {
      e.warn;var n = sn(t, "style");n && (t.staticStyle = JSON.stringify(pa(n)));var r = an(t, "style", !1);r && (t.styleBinding = r);
    }, genData: function genData(t) {
      var e = "";return t.staticStyle && (e += "staticStyle:" + t.staticStyle + ","), t.styleBinding && (e += "style:(" + t.styleBinding + "),"), e;
    } }],
      Ua = { model: function model(t, e, n) {
      Mo = n;var r = e.value,
          i = e.modifiers,
          o = t.tag,
          a = t.attrsMap.type;if (t.component) return cn(t, r, i), !1;if ("select" === o) gn(t, r, i);else if ("input" === o && "checkbox" === a) mn(t, r, i);else if ("input" === o && "radio" === a) yn(t, r, i);else if ("input" === o || "textarea" === o) _n(t, r, i);else if (!ki.isReservedTag(o)) return cn(t, r, i), !1;return !0;
    }, text: function text(t, e) {
      e.value && en(t, "textContent", "_s(" + e.value + ")");
    }, html: function html(t, e) {
      e.value && en(t, "innerHTML", "_s(" + e.value + ")");
    } },
      Va = f("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),
      za = f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
      Ka = f("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),
      Ja = { expectHTML: !0, modules: Ba, directives: Ua, isPreTag: function isPreTag(t) {
      return "pre" === t;
    }, isUnaryTag: Va, mustUseProp: Ho, canBeLeftOpenTag: za, isReservedTag: Zo, getTagNamespace: Pe, staticKeys: function (t) {
      return t.reduce(function (t, e) {
        return t.concat(e.staticKeys || []);
      }, []).join(",");
    }(Ba) },
      qa = { decode: function decode(t) {
      return Da = Da || document.createElement("div"), Da.innerHTML = t, Da.textContent;
    } },
      Wa = /([^\s"'<>/=]+)/,
      Ga = /(?:=)/,
      Za = [/"([^"]*)"+/.source, /'([^']*)'+/.source, /([^\s"'=<>`]+)/.source],
      Ya = new RegExp("^\\s*" + Wa.source + "(?:\\s*(" + Ga.source + ")\\s*(?:" + Za.join("|") + "))?"),
      Qa = "[a-zA-Z_][\\w\\-\\.]*",
      Xa = "((?:" + Qa + "\\:)?" + Qa + ")",
      ts = new RegExp("^<" + Xa),
      es = /^\s*(\/?)>/,
      ns = new RegExp("^<\\/" + Xa + "[^>]*>"),
      rs = /^<!DOCTYPE [^>]+>/i,
      is = /^<!--/,
      os = /^<!\[/,
      as = !1;"x".replace(/x(.)?/g, function (t, e) {
    as = "" === e;
  });var ss,
      cs,
      us,
      ls,
      fs,
      ps,
      ds,
      vs,
      hs,
      ms,
      ys = f("script,style,textarea", !0),
      gs = {},
      _s = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&amp;": "&", "&#10;": "\n" },
      bs = /&(?:lt|gt|quot|amp);/g,
      $s = /&(?:lt|gt|quot|amp|#10);/g,
      Cs = f("pre,textarea", !0),
      ws = function ws(t, e) {
    return t && Cs(t) && "\n" === e[0];
  },
      xs = /^@|^v-on:/,
      As = /^v-|^@|^:/,
      ks = /(.*?)\s+(?:in|of)\s+(.*)/,
      Os = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,
      Ts = /:(.*)$/,
      Ss = /^:|^v-bind:/,
      Es = /\.[^.]+/g,
      js = v(qa.decode),
      Ls = /^xmlns:NS\d+/,
      Ns = /^NS\d+:/,
      Is = v(function (t) {
    return f("type,tag,attrsList,attrsMap,plain,parent,children,attrs" + (t ? "," + t : ""));
  }),
      Ms = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,
      Ds = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,
      Ps = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] },
      Fs = function Fs(t) {
    return "if(" + t + ")return null;";
  },
      Rs = { stop: "$event.stopPropagation();", prevent: "$event.preventDefault();", self: Fs("$event.target !== $event.currentTarget"), ctrl: Fs("!$event.ctrlKey"), shift: Fs("!$event.shiftKey"), alt: Fs("!$event.altKey"), meta: Fs("!$event.metaKey"), left: Fs("'button' in $event && $event.button !== 0"), middle: Fs("'button' in $event && $event.button !== 1"), right: Fs("'button' in $event && $event.button !== 2") },
      Hs = { on: function on(t, e) {
      t.wrapListeners = function (t) {
        return "_g(" + t + "," + e.value + ")";
      };
    }, bind: function bind(t, e) {
      t.wrapData = function (n) {
        return "_b(" + n + ",'" + t.tag + "'," + e.value + "," + (e.modifiers && e.modifiers.prop ? "true" : "false") + (e.modifiers && e.modifiers.sync ? ",true" : "") + ")";
      };
    }, cloak: _ },
      Bs = function Bs(t) {
    this.options = t, this.warn = t.warn || Xe, this.transforms = tn(t.modules, "transformCode"), this.dataGenFns = tn(t.modules, "genData"), this.directives = y(y({}, Hs), t.directives);var e = t.isReservedTag || $i;this.maybeComponent = function (t) {
      return !e(t.tag);
    }, this.onceId = 0, this.staticRenderFns = [];
  },
      Us = function (t) {
    return function (e) {
      function n(n, r) {
        var i = Object.create(e),
            o = [],
            a = [];if (i.warn = function (t, e) {
          (e ? a : o).push(t);
        }, r) {
          r.modules && (i.modules = (e.modules || []).concat(r.modules)), r.directives && (i.directives = y(Object.create(e.directives), r.directives));for (var s in r) {
            "modules" !== s && "directives" !== s && (i[s] = r[s]);
          }
        }var c = t(n, i);return c.errors = o, c.tips = a, c;
      }return { compile: n, compileToFunctions: li(n) };
    };
  }(function (t, e) {
    var n = fr(t.trim(), e);jr(n, e);var r = Hr(n, e);return { ast: n, render: r.render, staticRenderFns: r.staticRenderFns };
  })(Ja).compileToFunctions,
      Vs = v(function (t) {
    var e = Fe(t);return e && e.innerHTML;
  }),
      zs = _e.prototype.$mount;return _e.prototype.$mount = function (t, e) {
    if ((t = t && Fe(t)) === document.body || t === document.documentElement) return this;var n = this.$options;if (!n.render) {
      var r = n.template;if (r) {
        if ("string" == typeof r) "#" === r.charAt(0) && (r = Vs(r));else {
          if (!r.nodeType) return this;r = r.innerHTML;
        }
      } else t && (r = fi(t));if (r) {
        var i = Us(r, { shouldDecodeNewlines: Pa, delimiters: n.delimiters, comments: n.comments }, this),
            o = i.render,
            a = i.staticRenderFns;n.render = o, n.staticRenderFns = a;
      }
    }return zs.call(this, t, e);
  }, _e.compile = Us, _e;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(__webpack_require__(1)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.Hammer);
})(undefined, function (Hammer) {
  'use strict';

  Hammer = 'default' in Hammer ? Hammer['default'] : Hammer;

  function assign(target) {
    var sources = [],
        len = arguments.length - 1;
    while (len-- > 0) {
      sources[len] = arguments[len + 1];
    }for (var i = 0; i < sources.length; i++) {
      var source = sources[i];
      var keys = Object.keys(source);
      for (var i$1 = 0; i$1 < keys.length; i$1++) {
        var key = keys[i$1];
        target[key] = source[key];
      }
    }
    return target;
  }
  function createProp() {
    return {
      type: Object,
      default: function _default() {
        return {};
      }
    };
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  var directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all'];
  function guardDirections(options) {
    var dir = options.direction;
    if (typeof dir === 'string') {
      var hammerDirection = 'DIRECTION_' + dir.toUpperCase();
      if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
        options.direction = Hammer[hammerDirection];
      } else {
        console.warn('[vue-touch] invalid direction: ' + dir);
      }
    }
    return options;
  }
  var config = {};
  var customEvents = {};
  var gestures = ['pan', 'panstart', 'panmove', 'panend', 'pancancel', 'panleft', 'panright', 'panup', 'pandown', 'pinch', 'pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'pinchin', 'pinchout', 'press', 'pressup', 'rotate', 'rotatestart', 'rotatemove', 'rotateend', 'rotatecancel', 'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'tap'];
  var gestureMap = {
    pan: 'pan',
    panstart: 'pan',
    panmove: 'pan',
    panend: 'pan',
    pancancel: 'pan',
    panleft: 'pan',
    panright: 'pan',
    panup: 'pan',
    pandown: 'pan',
    pinch: 'pinch',
    pinchstart: 'pinch',
    pinchmove: 'pinch',
    pinchend: 'pinch',
    pinchcancel: 'pinch',
    pinchin: 'pinch',
    pinchout: 'pinch',
    press: 'press',
    pressup: 'press',
    rotate: 'rotate',
    rotatestart: 'rotate',
    rotatemove: 'rotate',
    rotateend: 'rotate',
    rotatecancel: 'rotate',
    swipe: 'swipe',
    swipeleft: 'swipe',
    swiperight: 'swipe',
    swipeup: 'swipe',
    swipedown: 'swipe',
    tap: 'tap'
  };

  var Component = {
    props: {
      options: createProp(),
      tapOptions: createProp(),
      panOptions: createProp(),
      pinchOptions: createProp(),
      pressOptions: createProp(),
      rotateOptions: createProp(),
      swipeOptions: createProp(),
      tag: { type: String, default: 'div' },
      enabled: {
        default: true,
        type: [Boolean, Object]
      }
    },
    mounted: function mounted() {
      if (!this.$isServer) {
        this.hammer = new Hammer.Manager(this.$el, this.options);
        this.recognizers = {};
        this.setupBuiltinRecognizers();
        this.setupCustomRecognizers();
        this.updateEnabled(this.enabled);
      }
    },
    destroyed: function destroyed() {
      if (!this.$isServer) {
        this.hammer.destroy();
      }
    },
    watch: {
      enabled: {
        deep: true,
        handler: function handler() {
          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }(ref = this).updateEnabled.apply(ref, args);
          var ref;
        }
      }
    },
    methods: {
      setupBuiltinRecognizers: function setupBuiltinRecognizers() {
        var this$1 = this;
        for (var i = 0; i < gestures.length; i++) {
          var gesture = gestures[i];
          if (this$1._events[gesture]) {
            var mainGesture = gestureMap[gesture];
            var options = assign({}, config[mainGesture] || {}, this$1[mainGesture + "Options"]);
            this$1.addRecognizer(mainGesture, options);
            this$1.addEvent(gesture);
          }
        }
      },
      setupCustomRecognizers: function setupCustomRecognizers() {
        var this$1 = this;
        var gestures$$1 = Object.keys(customEvents);
        for (var i = 0; i < gestures$$1.length; i++) {
          var gesture = gestures$$1[i];
          if (this$1._events[gesture]) {
            var opts = customEvents[gesture];
            var localCustomOpts = this$1[gesture + "Options"] || {};
            var options = assign({}, opts, localCustomOpts);
            this$1.addRecognizer(gesture, options, { mainGesture: options.type });
            this$1.addEvent(gesture);
          }
        }
      },
      addRecognizer: function addRecognizer(gesture, options, ref) {
        if (ref === void 0) ref = {};
        var mainGesture = ref.mainGesture;
        if (!this.recognizers[gesture]) {
          var recognizer = new Hammer[capitalize(mainGesture || gesture)](guardDirections(options));
          this.recognizers[gesture] = recognizer;
          this.hammer.add(recognizer);
          recognizer.recognizeWith(this.hammer.recognizers);
        }
      },
      addEvent: function addEvent(gesture) {
        var this$1 = this;
        this.hammer.on(gesture, function (e) {
          return this$1.$emit(gesture, e);
        });
      },
      updateEnabled: function updateEnabled(newVal, oldVal) {
        var this$1 = this;
        if (newVal === true) {
          this.enableAll();
        } else if (newVal === false) {
          this.disableAll();
        } else if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object') {
          var keys = Object.keys(newVal);
          for (var i = 0; i < keys.length; i++) {
            var event = keys[i];
            if (this$1.recognizers[event]) {
              newVal[event] ? this$1.enable(event) : this$1.disable(event);
            }
          }
        }
      },
      enable: function enable(r) {
        var recognizer = this.recognizers[r];
        if (!recognizer.options.enable) {
          recognizer.set({ enable: true });
        }
      },
      disable: function disable(r) {
        var recognizer = this.recognizers[r];
        if (recognizer.options.enable) {
          recognizer.set({ enable: false });
        }
      },
      toggle: function toggle(r) {
        var recognizer = this.recognizers[r];
        if (recognizer) {
          recognizer.options.enable ? this.disable(r) : this.enable(r);
        }
      },
      enableAll: function enableAll(r) {
        this.toggleAll({ enable: true });
      },
      disableAll: function disableAll(r) {
        this.toggleAll({ enable: false });
      },
      toggleAll: function toggleAll(ref) {
        var this$1 = this;
        var enable = ref.enable;
        var keys = Object.keys(this.recognizers);
        for (var i = 0; i < keys.length; i++) {
          var r = this$1.recognizers[keys[i]];
          if (r.options.enable !== enable) {
            r.set({ enable: enable });
          }
        }
      },
      isEnabled: function isEnabled(r) {
        return this.recognizers[r] && this.recognizers[r].options.enable;
      }
    },
    render: function render(h) {
      return h(this.tag, {}, this.$slots.default);
    }
  };

  var installed = false;
  var vueTouch = { config: config, customEvents: customEvents };
  vueTouch.install = function install(Vue, opts) {
    if (opts === void 0) opts = {};
    var name = opts.name || 'v-touch';
    Vue.component(name, assign(Component, { name: name }));
    installed = true;
  }.bind(vueTouch);
  vueTouch.registerCustomEvent = function registerCustomEvent(event, options) {
    if (options === void 0) options = {};
    if (installed) {
      console.warn("\n      [vue-touch]: Custom Event '" + event + "' couldn't be added to vue-touch.\n      Custom Events have to be registered before installing the plugin.\n      ");
      return;
    }
    options.event = event;
    customEvents[event] = options;
    Component.props[event + "Options"] = {
      type: Object,
      default: function default$1() {
        return {};
      }
    };
  }.bind(vueTouch);
  vueTouch.component = Component;
  if (( false ? 'undefined' : _typeof(exports)) == "object") {
    module.exports = vueTouch;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return vueTouch;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof window !== 'undefined' && window.Vue) {
    window.VueTouch = vueTouch;
    Vue.use(vueTouch);
  }
});
//# sourceMappingURL=vue-touch.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];for (var o in n) {
      Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
  }return e;
},
    _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof2(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
};!function (e, t) {
  "object" === ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e.LazyLoad = t();
}(undefined, function () {
  "use strict";
  var e = function e() {
    return { elements_selector: "img", container: window, threshold: 300, throttle: 150, data_src: "src", data_srcset: "srcset", class_loading: "loading", class_loaded: "loaded", class_error: "error", class_initial: "initial", skip_invisible: !0, callback_load: null, callback_error: null, callback_set: null, callback_processed: null, callback_enter: null };
  },
      t = !("onscroll" in window) || /glebot/.test(navigator.userAgent),
      n = function n(e, t) {
    e && e(t);
  },
      o = function o(e) {
    return e.getBoundingClientRect().top + window.pageYOffset - e.ownerDocument.documentElement.clientTop;
  },
      i = function i(e, t, n) {
    return (t === window ? window.innerHeight + window.pageYOffset : o(t) + t.offsetHeight) <= o(e) - n;
  },
      s = function s(e) {
    return e.getBoundingClientRect().left + window.pageXOffset - e.ownerDocument.documentElement.clientLeft;
  },
      r = function r(e, t, n) {
    var o = window.innerWidth;return (t === window ? o + window.pageXOffset : s(t) + o) <= s(e) - n;
  },
      l = function l(e, t, n) {
    return (t === window ? window.pageYOffset : o(t)) >= o(e) + n + e.offsetHeight;
  },
      a = function a(e, t, n) {
    return (t === window ? window.pageXOffset : s(t)) >= s(e) + n + e.offsetWidth;
  },
      c = function c(e, t, n) {
    return !(i(e, t, n) || l(e, t, n) || r(e, t, n) || a(e, t, n));
  },
      u = function u(e, t) {
    var n,
        o = new e(t);try {
      n = new CustomEvent("LazyLoad::Initialized", { detail: { instance: o } });
    } catch (e) {
      (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: o });
    }window.dispatchEvent(n);
  },
      d = function d(e, t) {
    return e.getAttribute("data-" + t);
  },
      h = function h(e, t, n) {
    return e.setAttribute("data-" + t, n);
  },
      f = function f(e, t) {
    var n = e.parentNode;if (!n || "PICTURE" === n.tagName) for (var o = 0; o < n.children.length; o++) {
      var i = n.children[o];if ("SOURCE" === i.tagName) {
        var s = d(i, t);s && i.setAttribute("srcset", s);
      }
    }
  },
      _ = function _(e, t, n) {
    var o = e.tagName,
        i = d(e, n);if ("IMG" === o) {
      f(e, t);var s = d(e, t);return s && e.setAttribute("srcset", s), void (i && e.setAttribute("src", i));
    }"IFRAME" !== o ? i && (e.style.backgroundImage = 'url("' + i + '")') : i && e.setAttribute("src", i);
  },
      p = "undefined" != typeof window,
      m = p && "classList" in document.createElement("p"),
      g = function g(e, t) {
    m ? e.classList.add(t) : e.className += (e.className ? " " : "") + t;
  },
      v = function v(e, t) {
    m ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
  },
      w = function w(t) {
    this._settings = _extends({}, e(), t), this._queryOriginNode = this._settings.container === window ? document : this._settings.container, this._previousLoopTime = 0, this._loopTimeout = null, this._boundHandleScroll = this.handleScroll.bind(this), this._isFirstLoop = !0, window.addEventListener("resize", this._boundHandleScroll), this.update();
  };w.prototype = { _reveal: function _reveal(e) {
      var t = this._settings,
          o = function o() {
        t && (e.removeEventListener("load", i), e.removeEventListener("error", o), v(e, t.class_loading), g(e, t.class_error), n(t.callback_error, e));
      },
          i = function i() {
        t && (v(e, t.class_loading), g(e, t.class_loaded), e.removeEventListener("load", i), e.removeEventListener("error", o), n(t.callback_load, e));
      };n(t.callback_enter, e), "IMG" !== e.tagName && "IFRAME" !== e.tagName || (e.addEventListener("load", i), e.addEventListener("error", o), g(e, t.class_loading)), _(e, t.data_srcset, t.data_src), n(t.callback_set, e);
    }, _loopThroughElements: function _loopThroughElements() {
      var e = this._settings,
          o = this._elements,
          i = o ? o.length : 0,
          s = void 0,
          r = [],
          l = this._isFirstLoop;for (s = 0; s < i; s++) {
        var a = o[s];e.skip_invisible && null === a.offsetParent || (t || c(a, e.container, e.threshold)) && (l && g(a, e.class_initial), this._reveal(a), r.push(s), h(a, "was-processed", !0));
      }for (; r.length;) {
        o.splice(r.pop(), 1), n(e.callback_processed, o.length);
      }0 === i && this._stopScrollHandler(), l && (this._isFirstLoop = !1);
    }, _purgeElements: function _purgeElements() {
      var e = this._elements,
          t = e.length,
          n = void 0,
          o = [];for (n = 0; n < t; n++) {
        var i = e[n];d(i, "was-processed") && o.push(n);
      }for (; o.length > 0;) {
        e.splice(o.pop(), 1);
      }
    }, _startScrollHandler: function _startScrollHandler() {
      this._isHandlingScroll || (this._isHandlingScroll = !0, this._settings.container.addEventListener("scroll", this._boundHandleScroll));
    }, _stopScrollHandler: function _stopScrollHandler() {
      this._isHandlingScroll && (this._isHandlingScroll = !1, this._settings.container.removeEventListener("scroll", this._boundHandleScroll));
    }, handleScroll: function handleScroll() {
      var e = this._settings.throttle;if (0 !== e) {
        var t = Date.now(),
            n = e - (t - this._previousLoopTime);n <= 0 || n > e ? (this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._previousLoopTime = t, this._loopThroughElements()) : this._loopTimeout || (this._loopTimeout = setTimeout(function () {
          this._previousLoopTime = Date.now(), this._loopTimeout = null, this._loopThroughElements();
        }.bind(this), n));
      } else this._loopThroughElements();
    }, update: function update() {
      this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)), this._purgeElements(), this._loopThroughElements(), this._startScrollHandler();
    }, destroy: function destroy() {
      window.removeEventListener("resize", this._boundHandleScroll), this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._stopScrollHandler(), this._elements = null, this._queryOriginNode = null, this._settings = null;
    } };var b = window.lazyLoadOptions;return p && b && function (e, t) {
    var n = t.length;if (n) for (var o = 0; o < n; o++) {
      u(e, t[o]);
    } else u(e, t);
  }(w, b), w;
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** Libs */


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** State Service */
var StateService = function () {
  function StateService() {
    _classCallCheck(this, StateService);

    // console.log('instantiate state service');

    /** @private */
    this._$location = _utils.w.location;
    this._utils = new _utils2.default();
    this._currentLocation = '';
    this._itemListViewModel = [];
    this._activeIndex = 0;
  }

  /**
   * Store item model
   *
   * @param {Object} item - Item model
   * @param {String} item.name - Topic name of item
   * @param {String} item.optionCount - # of options
   *
   * @return {Array} Array of items
   */


  _createClass(StateService, [{
    key: 'addItemModel',
    value: function addItemModel(item) {

      // console.log('added item: ', item);

      this._itemListViewModel.push(item);

      return this._itemListViewModel;
    }

    /**
     * Get item list view model
     *
     * @return {Array} List of items
     */

  }, {
    key: 'getItemListViewModel',
    value: function getItemListViewModel() {

      return this._itemListViewModel;
    }

    /**
     * Return index of item name
     *
     * @param {String} item - Name of item
     *
     * @return {Number} Integer index of item in sequence
     * @private
     */

  }, {
    key: 'getItemIndex',
    value: function getItemIndex(item) {
      var _this = this;

      return parseInt(this._itemListViewModel.findIndex(function (el, i) {
        return _this._itemListViewModel[i].name === item;
      }), 10);
    }

    /**
     * Get the active index
     *
     * @return {Number} current active index
     */

  }, {
    key: 'getIndex',
    value: function getIndex() {

      return this._activeIndex;
    }

    /**
     * Set the active index
     *
     * @param {Number} index - Integer for index
     *
     * @return {Number} current active index
     */

  }, {
    key: 'setIndex',
    value: function setIndex(index) {

      this._activeIndex = index;

      // console.log('current index: ', this._activeIndex);

      return this._activeIndex;
    }

    /**
     * Get current item in sequence
     *
     * @return {String} The current active item name
     */

  }, {
    key: 'getCurrentItem',
    value: function getCurrentItem() {

      if (this._itemListViewModel[this._activeIndex]) {
        return this._itemListViewModel[this._activeIndex].name;
      }
    }

    /**
     * Get next item in sequence
     *
     * @return {Object} $location object
     */

  }, {
    key: 'getNextItem',
    value: function getNextItem() {

      if (this._itemListViewModel.length - 1 !== this._activeIndex) {
        this.setIndex(this._activeIndex + 1);
      } else {
        this.setIndex(0);
      }
    }

    /**
     * Get previous item in sequence
     *
     * @return {Object} $location object
     */

  }, {
    key: 'getPreviousItem',
    value: function getPreviousItem() {

      if (this._activeIndex !== 0) {
        this.setIndex(this._activeIndex - 1);
      }
    }
  }]);

  return StateService;
}();

exports.default = StateService;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Page Transitions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// Libs


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageTransitions = function () {
  function PageTransitions() {
    _classCallCheck(this, PageTransitions);

    this._utils = new _utils2.default();
    this._$w = _utils.w;
    this._$ = _utils.$;
    this._$ctas = Array.from(this._$('.delay-transition'));
    this._$body = (0, _utils.$)('body')[0];
    this._exitTransitionClass = 'exit-page-transition';

    this._setupListeners();
  }

  /**
   * Setup listeners for page transitions
   */


  _createClass(PageTransitions, [{
    key: '_setupListeners',
    value: function _setupListeners() {
      var _this = this;

      if (this._$ctas.length > 0) {
        this._$ctas.forEach(function ($cta) {
          $cta.addEventListener('click', function (e) {
            return _this._delayPageTransition(e, $cta);
          });
        });
      }
    }

    /**
     * Delay page transitions using utils.delay
     * @param {Event} e - Event object
     * @param {HTMLElement} cta - Element clicked
     */

  }, {
    key: '_delayPageTransition',
    value: function _delayPageTransition(e, cta) {
      var _this2 = this;

      e.preventDefault();

      // console.log('clicked a delayed link!', _linkURL);

      var _linkURL = cta.getAttribute('href');
      var _delayTimeout = cta.dataset.delay || 3000;

      this._utils.delay(function () {
        _this2._$body.classList.add(_this2._exitTransitionClass);
      }, 0).delay(function () {
        _this2._$w.location = _linkURL;
      }, _delayTimeout);
    }
  }]);

  return PageTransitions;
}();

exports.default = PageTransitions;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Home Page Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// Libs


// Components


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _mouseScroller = __webpack_require__(16);

var _mouseScroller2 = _interopRequireDefault(_mouseScroller);

var _parallaxer = __webpack_require__(2);

var _parallaxer2 = _interopRequireDefault(_parallaxer);

var _particleCanvas = __webpack_require__(3);

var _particleCanvas2 = _interopRequireDefault(_particleCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomePage = function () {

  /**
   * @param {Object} stateService - State service
   */
  function HomePage(stateService) {
    _classCallCheck(this, HomePage);

    // External utilities
    this._stateService = stateService;
    this._utils = new _utils2.default();
    this._$w = _utils.w;
    this._$ = _utils.$;

    // DOM element references
    this._$canvas = (0, _utils.$)('.canvas')[0];

    // Particle background settings
    this._canvasParticleColors = ['#D6E9F1'];

    // Parallax Settings
    this._parallaxers = [];
    this._parallaxBaseEl = this._$w;
    this._parallaxMainEl = (0, _utils.$)('.main');
    this._parallaxOffsetEls = (0, _utils.$)('.background-images__image--offset');
    this._parallaxContentEls = (0, _utils.$)('.case-study__inner-content');

    // 3, 2, 1... blastOff!
    this._init();
  }

  /**
   * Kick start page
   */


  _createClass(HomePage, [{
    key: '_init',
    value: function _init() {
      this._setupCanvas();
      this._setupScrollEffect();
      this._setupParallaxers();
    }

    /**
     * Sets up particle background
     */

  }, {
    key: '_setupCanvas',
    value: function _setupCanvas() {
      if (this._$canvas) {
        new _particleCanvas2.default({
          canvasEL: this._$canvas,
          particleColors: this._canvasParticleColors
        });
      }
    }

    /**
     * Sets up parallax animations
     */

  }, {
    key: '_setupParallaxers',
    value: function _setupParallaxers() {
      // On desktop-only...
      if (!this._utils.allowDeviceOrientation()) {

        if (!this._parallaxers.length) {
          this._parallaxers = [
          // Case study wrapper element
          new _parallaxer2.default(this._parallaxBaseEl, this._parallaxMainEl, { x: 0.1, y: 0.1 }, { x: 0.25, y: 0.25 }),
          // Case study background offset
          new _parallaxer2.default(this._parallaxBaseEl, this._parallaxOffsetEls, { x: 0.1, y: 0.1 }, { x: 1.5, y: 1.25 }),
          // Case study title, subtitle, and cta button
          new _parallaxer2.default(this._parallaxBaseEl, this._parallaxContentEls, { x: 0.1, y: 0.1 }, { x: 0.2, y: 0.2 })];

          // Run parallaxers.
          this._parallaxers.forEach(function (parallaxer) {
            parallaxer.run();
          });
        }
      }
    }

    /**
     * Adds a class when element enters viewport
     */

  }, {
    key: '_setupScrollEffect',
    value: function _setupScrollEffect() {
      var _this = this;

      new _mouseScroller2.default({
        debounceTime: 1000,
        scrollThreshold: 0.4,
        scrollDownCallback: function scrollDownCallback() {
          return _this._stateService.getNextItem();
        },
        scrollUpCallback: function scrollUpCallback() {
          return _this._stateService.getPreviousItem();
        }
      });
    }
  }]);

  return HomePage;
}();

exports.default = HomePage;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A UI util class to detect mouse scrolling.
 */
var MouseScroller = function () {

  /**
   * @param config Configuration options for mouse scroller.
   *     - scrollUpCallback (function)
   *     - scrollDownCallback (function)
   */
  function MouseScroller(config) {
    var _this = this;

    _classCallCheck(this, MouseScroller);

    this.config = config;

    /**
     * Whether if mouse scroll is allowed.
     * @type {boolean}
     */
    this.canScroll = true;

    /**
     * The callback for scrolling up.
     * @type {Function}
     */
    this.scrollUpCallback = config.scrollUpCallback;

    /**
     * The callback for scrolling down.
     * @type {Function}
     */
    this.scrollDownCallback = config.scrollDownCallback;

    this.mouseListener = function (e) {
      _this.onMouseWheel_(e);
    };

    // Mouse wheel events.
    window.addEventListener('mousewheel', this.mouseListener);

    // Firefox
    window.addEventListener('DOMMouseScroll', this.mouseListener);
  }

  _createClass(MouseScroller, [{
    key: 'onMouseWheel_',
    value: function onMouseWheel_(event) {
      var _this2 = this;

      if (this.config.preventDefault) {
        event.preventDefault();
      }

      if (!this.canScroll) {
        return;
      }

      // Normalize scroll speed differences between browers.
      var scrollSpeed;
      var w = event.wheelDelta;
      var d = event.detail;
      if (d) {
        if (w) {
          // Opera
          scrollSpeed = w / d / 40 * d > 0 ? 1 : -1;
        } else {
          // Firefox;
          scrollSpeed = -d / 4;
        }
      } else {
        scrollSpeed = w / 120;
      }

      // Threshold for scroll motion to be detected in mousewheel.
      // Edge case: caution with setting this above 0.3 as people remoting into a
      // linux machine have higher latency and mousewheel events don't fire as
      // quickly.
      var scrollThreshold = this.config.scrollThreshold || 0.1;

      // Debounce the next and previous in order to ensure we don't change
      // more than two pages at once.
      // Additionally, mousepads gets a little tricker because they can continue
      // to produce scroll events.  Add enough buffer.
      var debounceTime = this.config.debounceTime || 810;

      if (Math.abs(scrollSpeed) >= scrollThreshold && this.canScroll) {
        this.canScroll = false;

        if (scrollSpeed <= 0) {
          this.scrollDownCallback();
        } else {
          this.scrollUpCallback();
        }

        // Deboucing. Disallow any scrolling for a set period.
        window.setTimeout(function () {
          _this2.canScroll = true;
        }, debounceTime);
      }
    }

    /**
     * Disposes the instance of the mouse scroller.
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      window.removeEventListener('mousewheel', this.mouseListener);
      window.removeEventListener('DOMMouseScroll', this.mouseListener);
    }
  }]);

  return MouseScroller;
}();

exports.default = MouseScroller;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Particle constructor
 */

var Particle = function () {
  function Particle(radius, color, image, isHSLA, isShadow) {
    _classCallCheck(this, Particle);

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.color = color || '#ff0000';
    this.radius = radius || 40;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 0;
    this.image = image || null;
    this.opacity = 1;
    this.isHSLA = isHSLA || false;
    this.isShadow = isShadow || false;
  }

  /**
   * Draw
   * @param (2DContext) context - Canvas context
   */


  _createClass(Particle, [{
    key: 'draw',
    value: function draw(context, utils) {

      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.scale(this.scaleX, this.scaleY);
      context.lineWidth = this.lineWidth;
      context.globalAlpha = this.opacity;

      // If image was passed in
      if (this.image) {
        var ballWidth = this.radius * 2;
        var imageHeight = ballWidth * (this.image.height / this.image.width);
        context.drawImage(this.image, 0 - this.radius, 0 - imageHeight / 2, this.radius * 2, imageHeight);
        context.fillStyle = 'rgba(255, 255, 255, 0)';
      } else {
        if (utils && !this.isHSLA) {
          context.fillStyle = utils.colorToRGB(this.color, this.opacity);
        } else {
          context.fillStyle = this.color;
        }
      }

      if (this.isShadow) {
        context.shadowColor = this.color;
        context.shadowBlur = this.isShadow;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
      }

      context.beginPath();
      // x, y, radius, start_angle, end_angle, anti-clockwise
      context.arc(0, 0, this.radius, 0, Math.PI * 2, true);

      context.closePath();
      context.fill();
      if (this.lineWidth > 0) {
        context.stroke();
      }
      context.restore();
    }

    /**
     * Get bounds of particle
     */

  }, {
    key: 'getBounds',
    value: function getBounds() {

      return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.radius * 2,
        height: this.radius * 2
      };
    }
  }]);

  return Particle;
}();

exports.default = Particle;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Case Study Page Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// Libs


// Components


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _parallaxer = __webpack_require__(2);

var _parallaxer2 = _interopRequireDefault(_parallaxer);

var _particleCanvas = __webpack_require__(3);

var _particleCanvas2 = _interopRequireDefault(_particleCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CaseStudyPage = function () {

  /**
   * @param {Object} settings - Settings object
   * @param {Function} settings.callback - Callback function for custom functionality
   * @param {Object} settings.parallaxer - Config object for parallaxer effect
   * @param {NodeList} settings.parallaxer.els - HTML Nodelist of parallax elements
   * @param {NodeList} settings.parallaxer.baseEl - HTMLElement for root element for parallax effect
   * @param {Object} settings.parallaxer.baseRotationSensitivity - {x,y,increment} object with rotation sensitivity and increment
   * @param {NodeList} settings.parallaxer.baseTranslateSensitivity - {x,y,increment} object with translate sensitivity and increment
   * @param {Object} settings.canvas - Config object for canvas backgrounds
   * @param {String} settings.canvas.backgroundColor - Hex color for canvas background
   * @param {Array} settings.canvas.particleColors - Array of hex colors for particles
   */
  function CaseStudyPage(settings) {
    _classCallCheck(this, CaseStudyPage);

    // External utilities
    this._utils = new _utils2.default();
    this._$w = _utils.w;
    this._$ = _utils.$;

    // DOM element references
    this._$sections = this._$('.section:not(.section--intro), .section__phases__header, .section__phases__phase, .footer');
    this._$footer__canvas = this._$('.footer__canvas')[0];
    this._$process__canvas = this._$('.section--process__canvas')[0];

    // Particle background settings
    this._canvasBackgroundColor = settings.canvas ? settings.canvas.backgroundColor : '#374650';
    this._canvasParticleColors = settings.canvas ? settings.canvas.particleColors : ['#2C4050'];

    // Callback function
    if (settings.callback) {
      this._cb = function () {
        settings.callback();
      };
    }

    // Parallax Settings
    if (settings.parallaxer) {
      this._parallaxers = [];
      this._parallaxBaseEl = settings.parallaxer.baseEl;
      this._parallaxEls = Array.from(settings.parallaxer.els);
      this._parallaxBaseRotationSensitivity = settings.parallaxer.baseRotationSensitivity || { x: 0.15, y: 0.15, increment: 0.15 };
      this._parallaxBaseTranslateSensitivity = settings.parallaxer.baseTranslateSensitivity || { x: 0.15, y: 0.15, increment: 0.15 };
    }

    // 3, 2, 1... blastOff!
    this._init();
  }

  /**
   * Kick start page
   */


  _createClass(CaseStudyPage, [{
    key: '_init',
    value: function _init() {
      this._setupCanvases();
      this._setupScrollEffect();

      if (this._cb) {
        this._cb();
      }

      if (this._parallaxBaseEl) {
        this._setupParallaxers();
      }
    }

    /**
     * Sets up particle backgrounds
     */

  }, {
    key: '_setupCanvases',
    value: function _setupCanvases() {
      var _numOfParticles = !this._utils.allowDeviceOrientation() ? 300 : 150;
      if (this._$process__canvas) {
        new _particleCanvas2.default({
          canvasEL: this._$process__canvas,
          canvasBackground: this._canvasBackgroundColor,
          particleColors: this._canvasParticleColors,
          particleLineWidth: 4,
          maxHeight: this._$process__canvas.parentNode.offsetHeight,
          numOfParticles: _numOfParticles,
          particleOpacity: 1.0
        });
      }

      if (this._$footer__canvas) {
        var _numOfParticles2 = !this._utils.allowDeviceOrientation() ? 75 : 25;
        new _particleCanvas2.default({
          canvasEL: this._$footer__canvas,
          canvasBackground: this._canvasBackgroundColor,
          particleColors: this._canvasParticleColors,
          particleLineWidth: 4,
          maxHeight: 400,
          respondToMouse: false,
          numOfParticles: _numOfParticles2,
          particleOpacity: 1.0
        });
      }
    }

    /**
     * Sets up parallax animations
     */

  }, {
    key: '_setupParallaxers',
    value: function _setupParallaxers() {
      var _this = this;

      // On desktop-only...
      if (!this._utils.allowDeviceOrientation()) {

        if (!this._parallaxers.length) {

          // Generate parallaxers from elements
          this._parallaxEls.forEach(function (el, i) {
            var _rotateX = _this._parallaxBaseRotationSensitivity.x + _this._parallaxBaseRotationSensitivity.increment * (i - 1),
                _rotateY = _this._parallaxBaseRotationSensitivity.y + _this._parallaxBaseRotationSensitivity.increment * (i - 1),
                _translateX = _this._parallaxBaseTranslateSensitivity.x + _this._parallaxBaseTranslateSensitivity.increment * (i - 1),
                _translateY = _this._parallaxBaseTranslateSensitivity.y + _this._parallaxBaseTranslateSensitivity.increment * (i - 1);

            _this._parallaxers.push(new _parallaxer2.default(_this._parallaxBaseEl, [el], { x: _rotateX, y: _rotateY }, { x: _translateX, y: _translateY }));
          });

          // Run parallaxers.
          this._parallaxers.forEach(function (parallaxer) {
            parallaxer.run();
          });
        }
      }
    }

    /**
     * Adds a class when element enters viewport
     */

  }, {
    key: '_setupScrollEffect',
    value: function _setupScrollEffect() {
      this._utils.addClassOnScrollInToView({
        elements: this._$sections,
        threshold: 0.25,
        removeClassOnExit: false
      });
    }
  }]);

  return CaseStudyPage;
}();

exports.default = CaseStudyPage;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * GoHawaii Page Settings
                                                                                                                                                           */


var GoHawaii = function GoHawaii() {
  _classCallCheck(this, GoHawaii);

  this.parallaxer = {};
  this.parallaxer.baseEl = (0, _utils.$)('.section--custom-animation')[0];
  this.parallaxer.els = (0, _utils.$)('.section--custom-animation .section__element');
  this.parallaxer.baseRotationSensitivity = {
    x: 0,
    y: 0,
    increment: 0
  };
  this.parallaxer.baseTranslateSensitivity = {
    x: 0.25,
    y: 0.35,
    increment: 0.15
  };
};

exports.default = GoHawaii;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Tour Aloha Page Settings
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TourAloha = function () {
  function TourAloha() {
    var _this = this;

    _classCallCheck(this, TourAloha);

    this._utils = new _utils2.default();
    this._$section = (0, _utils.$)('.section--custom-animation')[0];
    this._$markers = (0, _utils.$)('.section__element--map-marker');
    this._$popup = (0, _utils.$)('.section__element--map-popup')[0];
    console.log('Tour Aloha instantiated.');
    this._top = 0;
    this._left = 0;
    this._right = this._$section.offsetWidth;
    this._bottom = this._$section.offsetHeight;

    this._popupOffsetTop = '125';
    this._popupOffsetLeft = '32';

    var bg = this._$section.querySelectorAll('.section__elements')[0];
    bg.addEventListener('click', function () {
      _this._$popup.classList.remove('active');
    }, true);
  }

  _createClass(TourAloha, [{
    key: 'callback',
    value: function callback() {
      this._scatterMarkers();
    }

    /**
     * Callback to create popup effect
     * @param {Event} e - Event object
     */

  }, {
    key: '_markerPopup',
    value: function _markerPopup(e) {
      console.log('clicked marker: ', el);

      var target = e.target || e.srcElement;
      var el = target.parentNode.parentNode;
      var top = parseInt(el.style.top.replace('px', ''), 10) - this._popupOffsetTop;
      var left = parseInt(el.style.left.replace('px', ''), 10) - this._popupOffsetLeft;

      this._$popup.style.top = top + 'px';
      this._$popup.style.left = left + 'px';

      this._$popup.classList.add('active');
    }

    /**
     * Scatter
     */

  }, {
    key: '_scatterMarkers',
    value: function _scatterMarkers() {
      var _this2 = this;

      this._$markers.forEach(function ($marker) {
        var y_pos = _this2._utils.randInt(_this2._top, _this2._bottom);
        var x_pos = _this2._utils.randInt(_this2._left, _this2._right);
        $marker.style.top = y_pos + 'px';
        $marker.style.left = x_pos + 'px';

        $marker.addEventListener('click', function (e) {
          return _this2._markerPopup(e);
        }, true);

        // console.log('set marker position', $marker);
      });
    }
  }]);

  return TourAloha;
}();

exports.default = TourAloha;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Teacup Analytics Page Settings
                                                                                                                                                           */


var Teacup = function Teacup() {
  _classCallCheck(this, Teacup);

  this.parallaxer = {};
  this.parallaxer.baseEl = (0, _utils.$)('.section--custom-animation')[0];
  this.parallaxer.els = (0, _utils.$)('.section--custom-animation .section__element');
  this.parallaxer.baseRotationSensitivity = {
    x: 0,
    y: 0,
    increment: 0
  };
  this.parallaxer.baseTranslateSensitivity = {
    x: 0.25,
    y: 0.35,
    increment: 0.15
  };
};

exports.default = Teacup;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if (ctx === void 0) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties(anonymous.prototype, prototypeAccessors);

        return anonymous;
    }();
}();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
}();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) {
        return setTimeout(function () {
            return callback(Date.now());
        }, 1000 / 60);
    };
}();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function throttle(callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function ResizeObserverController() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */

/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */

/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) {
        return observer.broadcastActive();
    });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
    var propertyName = ref.propertyName;if (propertyName === void 0) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = function defineConfigurable(target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
};

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = function getWindowOf(target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
};

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [],
        len = arguments.length - 1;
    while (len-- > 0) {
        positions[len] = arguments[len + 1];
    }return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) {
            return target instanceof getWindowOf(target).SVGGraphicsElement;
        };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) {
        return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
    };
}();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function ResizeObservation(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */

/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */

/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function ResizeObserverSPI(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */

/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */

/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
    var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
}();

exports.default = index;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ })
/******/ ]);