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

      el.offsetLeft = el.offsetLeft || 0;
      el.offsetTop = el.offsetTop || 0;

      mouse.x = e.pageX - el.offsetLeft;
      mouse.y = e.pageY - el.offsetTop;

      mouse.percentageX = (mouse.x - utils.screenSize().width / 2) / (utils.screenSize().width) * 100;
      mouse.percentageY = (mouse.y - utils.screenSize().height / 2) / (utils.screenSize().height) * 100;

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

    w.addEventListener('deviceorientation', (e) => handleOrientation(e), true);

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
  setupHelpers (el, mouse, touch, which){

    this.logCoordinates(el, mouse, touch, which || 'mouse');

  }

  /**
   * @author Joseph Lenton - PlayMyCode.com
   *
   * @param first An ImageData object from the first image we are colliding with.
   * @param x The x location of 'first'.
   * @param y The y location of 'first'.
   * @param other An ImageData object from the second image involved in the collision check.
   * @param x2 The x location of 'other'.
   * @param y2 The y location of 'other'.
   * @param isCentered True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
   */
  isPixelCollision ( first, x, y, other, x2, y2, isCentered ){
    // we need to avoid using floats, as were doing array lookups
    x  = Math.round( x );
    y  = Math.round( y );
    x2 = Math.round( x2 );
    y2 = Math.round( y2 );

    let w  = first.width,
        h  = first.height,
        w2 = other.width,
        h2 = other.height,
        pixelY, pixelX;

    // deal with the image being centred
    if ( isCentered ) {
        // fast rounding, but positive only
        x  -= ( w/2 + 0.5) << 0
        y  -= ( h/2 + 0.5) << 0
        x2 -= (w2/2 + 0.5) << 0
        y2 -= (h2/2 + 0.5) << 0
    }

    // find the top left and bottom right corners of overlapping area
    let xMin = Math.max( x, x2 ),
        yMin = Math.max( y, y2 ),
        xMax = Math.min( x+w, x2+w2 ),
        yMax = Math.min( y+h, y2+h2 );

    // Sanity collision check, we ensure that the top-left corner is both
    // above and to the left of the bottom-right corner.
    if ( xMin >= xMax || yMin >= yMax ) {
        return false;
    }

    let xDiff = xMax - xMin,
        yDiff = yMax - yMin;

    // get the pixels out from the images
    let pixels  = first.data,
        pixels2 = other.data;

    // if the area is really small,
    // then just perform a normal image collision check
    if ( xDiff < 4 && yDiff < 4 ) {
        for ( pixelX = xMin; pixelX < xMax; pixelX++ ) {
            for ( pixelY = yMin; pixelY < yMax; pixelY++ ) {
                if (
                        ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                        ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                ) {
                    return true;
                }
            }
        }
    } else {
        /* What is this doing?
         * It is iterating over the overlapping area,
         * across the x then y the,
         * checking if the pixels are on top of this.
         *
         * What is special is that it increments by incX or incY,
         * allowing it to quickly jump across the image in large increments
         * rather then slowly going pixel by pixel.
         *
         * This makes it more likely to find a colliding pixel early.
         */

        // Work out the increments,
        // it's a third, but ensure we don't get a tiny
        // slither of an area for the last iteration (using fast ceil).
        let incX = xDiff / 3.0,
            incY = yDiff / 3.0;
        incX = (~~incX === incX) ? incX : (incX+1 | 0);
        incY = (~~incY === incY) ? incY : (incY+1 | 0);

        for ( let offsetY = 0; offsetY < incY; offsetY++ ) {
            for ( let offsetX = 0; offsetX < incX; offsetX++ ) {
                for ( pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
                    for ( pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                        if (
                                ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                                ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
  }

  clamp(number, min, max) {

    return Math.min(Math.max(number, min), max);

  }

}
