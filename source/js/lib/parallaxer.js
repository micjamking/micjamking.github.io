import utils, { w, $ } from './../lib/utils';

/**
 * Parallaxer
 * A class that creates a parallax effect based on the mouse position
 */
export default class Parallaxer {

  /**
   * @param {Element} rootElement - The root element to apply parallax effects to.
   * @param {Object} rotationSentivity - x,y object with rotation sensitivity.
   * @param {Object} translateSentitivy - x,y object with translate senstiivity.
   * @constructor
   */
   constructor(rootElement, rotationSensitivity, translateSensitity) {

     // External utilities
     this.utils = new utils();

     /**
      * Add required styles to body.
      */
     this.$body = $('body')[0];

     this.$body.style.transformStyle       = 'preserve-3d';
     this.$body.style.webkitTransformStyle = 'preserve-3d';
     this.$body.style.perspective          = `${window.innerHeight / 2}px`;
     this.$body.style.webkitPerspective    = `${window.innerHeight / 2}px`;

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
     }

     /**
      * The root element to manipulate.
      * @type {Element}
      */
     this.$rootElement_ = rootElement;

     this.mousePosition_ = this.utils.captureMouse(w);
   }

   /**
    * Runs the animation.
    */
   run() {
     this.animate_ = true;
     this.rafLoop_();
   }

   /**
    * Stops the animation.
    */
   stop() {
     this.animate_ = false;
   }

   /**
    * Internal animation cycle.
    */
   rafLoop_() {
     if(!this.animate_) {
       return;
     }

     window.requestAnimationFrame(() => {
       this.rafLoop_();
     });

     this.render_();
   }

   /**
    * Internal render cycle.
    */
   render_() {

     if(!this.mousePosition_) {
       return;
     }

     let xDegree = (this.mousePosition_.percentageX) * this.rotationSensitivity.x;
     let yDegree = (this.mousePosition_.percentageY) * this.rotationSensitivity.y;

     let xTrans = -(this.mousePosition_.percentageX) * this.translateSensitivity.x;
     let yTrans = -(this.mousePosition_.percentageY) * this.translateSensitivity.y;

     this.transformValues.xDeg += (xDegree - this.transformValues.xDeg) * 0.05;
     this.transformValues.yDeg += (yDegree - this.transformValues.yDeg) * 0.05;
     this.transformValues.xTrans += (xTrans - this.transformValues.xTrans) * 0.05;
     this.transformValues.yTrans += (yTrans - this.transformValues.yTrans) * 0.05;

     let rotateXstring = `rotateX( ${this.transformValues.yDeg}deg )`;
     let rotateYstring = `rotateY( ${-this.transformValues.xDeg}deg )`;
     let rotateZstring = 'rotateZ(0deg)';
     let translateXstring = `translateX( ${-this.transformValues.xTrans}px )`;
     let translateYstring = `translateY( ${-this.transformValues.yTrans}px )`;

     let transformString = `${rotateXstring} ${rotateYstring} ${rotateZstring} ${translateXstring} ${translateYstring}`;

     this.$rootElement_.forEach(($rootElement) => {
       $rootElement.style.perspectiveOrigin = '50%, 50%';
       $rootElement.style.webkitPerspectiveOrigin = '50%, 50%';

       $rootElement.style.transform = transformString;
       $rootElement.style.webkitTransform = transformString;

       $rootElement.style.transformOrigin = '50% 50%';
       $rootElement.style.webkitTransformOrigin = '50% 50%';
     });
   }
}
