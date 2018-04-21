/**
 *  Utility methods
 */

/** @type {Object} Window */
export const w = window;

/** @type {Function} Query selector */
export const $ = document.querySelectorAll.bind(document);

export default class utils {

  constructor(){
    /**
     * Normalize requestAnimationFrame cross-browser
     */
    if (!w['requestAnimationFrame']) {

      w['requestAnimationFrame'] = ( w['webkitRequestAnimationFrame'] ||
                                     w['mozRequestAnimationFrame'] ||
                                     w['oRequestAnimationFrame'] ||
                                     w['msRequestAnimationFrame'] ||
                                     function(callback) {
                                       return w['setTimeout'](callback, 1000 / 60);
                                     });

    }

    /**
     * Normalize cancelAnimationFrame cross-browser
     */
    if (!w['cancelAnimationFrame']) {

      w['cancelAnimationFrame'] = ( w['cancelRequestAnimationFrame'] ||
                                    w['webkitCancelAnimationFrame'] ||
                                    w['webkitCancelRequestAnimationFrame'] ||
                                    w['mozCancelAnimationFrame'] ||
                                    w['mozCancelRequestAnimationFrame'] ||
                                    w['oCancelAnimationFrame'] ||
                                    w['oCancelRequestAnimationFrame'] ||
                                    w['msCancelAnimationFrame'] ||
                                    w['msCancelRequestAnimationFrame'] ||
                                    w.clearTimeout );

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
  captureMouse (el) {

    let utils = this;

    let mouse = {
      x: 0,
      y: 0,
      percentageX: 0,
      percentageY: 0
    };

    function mouseListener(e) {

      let offsetLeft = el.offsetLeft || 0;
      let offsetTop = el.offsetTop || 0;

      mouse.x = e.pageX - offsetLeft;
      mouse.y = e.pageY -offsetTop;

      mouse.percentageX = (mouse.x - utils.screenSize().width / 2) / (utils.screenSize().width) * 100;
      mouse.percentageY = (mouse.y - utils.screenSize().height / 2) / (utils.screenSize().height) * 100;

    }

    el.addEventListener('mousemove', mouseListener, { passive: true });

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
  captureTouch (el) {

    let touch = {
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

    el.addEventListener('touchstart', touchStartListener, { passive: true });
    el.addEventListener('touchend', touchEndListener, { passive: true });
    el.addEventListener('touchmove', touchMoveListener, { passive: true });

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
  captureTilt () {

    let tilt = {
      x: 0,
      y: 0
    };

    /**
     * Handle Device Orientation
     *  - Tilt 90º > 0º to increase gravity on mobile
     */
    function handleOrientation (e) {

      var x = e.gamma;
      var y = e.beta;

      if (x > 90) { x = 90 }
      if (x < 45) { x = 45 }

      if (y > 90) { y = 90 }
      if (y < 0) { y = 0 }

      var rangeX = (90 - Math.floor( Math.abs(x) ) ) / 45;
      var rangeY = (90 - Math.floor( Math.abs(y) ) ) / 90;

      // Do stuff with the new orientation data
      if (Math.floor( rangeY * 10 ) > 0) {
        this.gravity = rangeY;
      }

      if (Math.floor( rangeX * 10 ) > 0) {
        this.speed = rangeX;
      }

    }

    w.addEventListener('deviceorientation', (e) => handleOrientation(e), { capture: true, passive: true });

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
  containsPoint (rect, x, y) {

    return !(x < rect.x || x > rect.x + rect.width ||
             y < rect.y || y > rect.y + rect.height);

  }


  /**
   * Check if two rectangles intersect
   *
   * @param {Object} rectA - first object with rectangular bounds
   * @param {Object} rectB - second object with rectangular bounds
   *
   * @return {Boolean} true|false - if rect contains x/y coordinates
   */
  intersects (rectA, rectB) {

    return !( rectA.x + rectA.width < rectB.x ||
              rectB.x + rectB.width < rectA.x ||
              rectA.y + rectA.height < rectB.y ||
              rectB.y + rectB.height < rectA.y);

  }

  /**
   * Get random number between two numbers
   *
   * @param {Number} min - Minimum value
   * @param {Number} max - Maximum value
   *
   * @return {Number} randomized value between min and max
   */
  rand (min, max) {
    return (Math.random() * (max - min)) + min;
  }

  /**
   * Get random integer between two numbers
   *
   * @param {Number} min - Minimum value
   * @param {Number} max - Maximum value
   *
   * @return {Number} randomized value between min and max
   */
  randInt (min, max) {
    return Math.floor( (Math.random() * (max - min)) + min );
  }

  /**
   * Get random integer that is a multiple within a range of numbers
   *
   * @param {Number} multiple - Multiple to increment by (and minimum value)
   * @param {Number} range - Range of multiple (and maximum value)
   *
   * @return {Number} randomized value within range, incrementing by multiple
   */
  randMultiple (multiple, range) {
    return Math.floor( (Math.random() * (range - multiple) + multiple + 1) / multiple ) * multiple;
  }

  /**
   * Get heads (TRUE) or tails (FALSE)
   *
   * @return {Boolean} randomized value of TRUE or FALSE
   */
  coinFlip () {
    return (Math.floor(Math.random() * 2) == 0);
  }

  /**
   * Get current screen size (width / height)
   *
   * @return {Object} screen - width / height of current screen object
   */
  screenSize () {
    let d = document,
        e = d.documentElement,
        g = d.body,
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return {
      width: x,
      height: y
    };
  }


  colorToRGB (color, alpha) {
    //number in octal format or string prefixed with #
    if (typeof color === 'string' && color[0] === '#') {
      color = w.parseInt(color.slice(1), 16);
    }

    alpha = (alpha === undefined) ? 1 : alpha;
    //parse hex values

    let r = color >> 16 & 0xff,
        g = color >> 8 & 0xff,
        b = color & 0xff,
        a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
    //only use 'rgba' if needed

    if (a === 1) {
      return 'rgb('+ r +','+ g +','+ b +')';
    } else {
      return 'rgba('+ r +','+ g +','+ b +','+ a +')';
    }
  }

  convertRange (value, oldRange, newRange) {
    let OldRange = (oldRange.max - oldRange.min);
    let NewRange = (newRange.max - newRange.min);

    return (((value - oldRange.min) * NewRange) / OldRange) + newRange.min;
  }

  /**
   * Chaining delays (setTimeout)
   */
  delay (cb, ms) {

    // MyPromise constructor - subclass of Promise
    function MyPromise(fn) {
      let promise       = new Promise((resolve, reject) => fn(resolve, reject));
      promise.__proto__ = MyPromise.prototype;
      return promise;
    }

    // MyPromise should extend Promise
    MyPromise.__proto__ = Promise;
    MyPromise.prototype.__proto__ = Promise.prototype;

    // Extend MyPromise to return delay from promise success
    MyPromise.prototype.delay = function (cb, ms) {
      return this.then( () => utils.prototype.delay(cb, ms));
    }

    // Create internal 'wait' promise using setTimeout
    let _wait = ms => new MyPromise( resolve => setTimeout(resolve, ms) );

    return _wait(ms).then(cb);

  }


  deviceOrientationSupport () {
    return !!w['DeviceOrientationEvent'];
  }

  touchSupport () {
    return ('ontouchstart' in w);
  }

  allowDeviceOrientation () {
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
  logCoordinates (el, mouse, touch, which){

    function canvasTouchListener(){

      console.log('current touch position: ', 'x: ' + touch.x + ', y: ' + touch.y);

    }

    function canvasMouseListener(){

      if (mouse.current){
        console.log('current mouse position: ', 'x: ' + mouse.current.x + ', y: ' + mouse.current.y);
      } else {
        console.log('current mouse position: ', 'x: ' + mouse.x + ', y: ' + mouse.y + ', percentageX: ' + mouse.percentageX + ', percentageY: ' + mouse.percentageY);
      }

    }

    if (touch && which === 'touch'){
      el.addEventListener('touchmove', canvasTouchListener, { passive: true });
    } else {
      el.addEventListener('mousemove', canvasMouseListener, { passive: true });
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
  setupHelpers (el, mouse, touch, which){

    this.logCoordinates(el, mouse, touch, which || 'mouse');

  }


  /**
   * Throttle an event and provide custom event for callback
   * @param {String} type - Type of event to throttle
   * @param {String} name - Name of new CustomEvent to dispatch
   * @param {Function} cb - Callback function
   * @listens {type} Listen for event to throttle
   */
  throttleEvent(obj, type, cb) {

      obj = obj || w;
      var running = false;

      var func = () => {
        if (running) {
          return;
        }
        running = true;
        w.requestAnimationFrame(() => {
          cb && cb();
          running = false;
        });
      };

      obj.addEventListener(type, func, { passive: true });
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
  isElementInViewport(element, percentage) {

    var rect = element.getBoundingClientRect();

    percentage = percentage || 1;

    return (
        rect.bottom >= 0 &&
        rect.right  >= 0 &&
        rect.top  <= ( ( window.innerHeight || document.documentElement.clientHeight ) * percentage ) &&
        rect.left <= ( ( window.innerWidth || document.documentElement.clientWidth ) * percentage )
    );

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
  addClassOnScrollInToView(settings) {

    let _utils = this;
    let videos = Array.from($('[data-video-inview-play]'));
    let videosExist = videos.length > 0;

    settings.activeClass = settings.activeClass || 'inview';
    settings.threshold = settings.threshold || 0.25;
    settings.removeClassOnExit = settings.removeClassOnExit !== false;
    settings.playVideosInView = settings.playVideosInView !== false;
    settings.inviewVideoAttribute = settings.inviewVideoAttribute || 'data-video-inview-play';

    /** Scroll event callback  */
    function _scrollCallback(){

      function playVideosInView(){
        videos.forEach((video) => {
          if (!video.isPlaying){
            video.play();
            video.isPlaying = true;
            // console.log('video started!');
          }
        });
      }

      function pauseVideosInView(){
        videos.forEach((video) => {
          if (video.isPlaying){
            video.pause();
            video.isPlaying = false;
            // console.log('video stopped!');
          }
        });
      }

      function toggleActiveClass(el){
        if (_utils.isElementInViewport(el, 1 - settings.threshold)) {
          el.classList.add(settings.activeClass);
          if (videosExist) playVideosInView();
        } else {
          if (videosExist) pauseVideosInView();
        }

        if (settings.removeClassOnExit){
          if (!_utils.isElementInViewport(el, 1 - settings.threshold)){
            el.classList.remove(settings.activeClass);
          }
        }
      }

      Array.prototype.forEach.call(settings.elements, (el) => {
        toggleActiveClass(el);
      });

    }

    /** Throttle default scroll event and listen for optimizedScroll event */
    this.throttleEvent(w, 'scroll', _scrollCallback);

  }

  clamp(number, min, max) {

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
  xhrPromise (options){
    return new Promise((resolve, reject) => {
      let xhr    = new XMLHttpRequest();
      let params = options.params;

      xhr.open(options.method, options.url);

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };

      // Set headers
      if (options.headers) {
        Object.keys(options.headers).forEach((key) => {
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }

      // We'll need to stringify if we've been given an object
      // If we have a string, this is skipped.
      if (params && typeof params === 'object') {
        params = Object.keys(params).map((key) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        }).join('&');
      }

      xhr.send(params);
    });
  }

}
