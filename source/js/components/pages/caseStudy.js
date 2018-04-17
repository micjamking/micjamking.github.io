/**
 *  Case Study Page Component
 */

// Libs
import utils, { w, $ } from './../../lib/utils';
import Parallaxer from './../../lib/parallaxer';

// Components
import ParticleCanvas from './../particleCanvas';

export default class CaseStudyPage {

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
  constructor(settings){
    // External utilities
    this._utils = new utils();
    this._$w    = w;
    this._$     = $;

    // DOM element references
    this._$sections = this._$('.section:not(.section--intro), .section__phases__header, .section__phases__phase, .footer');
    this._$footer__canvas = this._$('.footer__canvas')[0];
    this._$process__canvas = this._$('.section--process__canvas')[0];

    // Particle background settings
    this._canvasBackgroundColor = (settings.canvas) ? settings.canvas.backgroundColor : '#374650';
    this._canvasParticleColors = (settings.canvas) ? settings.canvas.particleColors : ['#2C4050'];

    // Callback function
    this._cb = settings.callback;

    // Parallax Settings
    if (settings.parallaxer){
      this._parallaxers = [];
      this._parallaxBaseEl = settings.parallaxer.baseEl;
      this._parallaxEls = Array.from(settings.parallaxer.els);
      this._parallaxBaseRotationSensitivity = settings.parallaxer.baseRotationSensitivity || { x: 0.15, y: 0.15, increment: 0.15};
      this._parallaxBaseTranslateSensitivity = settings.parallaxer.baseTranslateSensitivity || { x: 0.15, y: 0.15, increment: 0.15};
    }

    // 3, 2, 1... blastOff!
    this._init();
  }

  /**
   * Kick start page
   */
  _init() {
    this._setupCanvases();
    this._setupScrollEffect();

    if (this._cb){
      this._cb();
    }

    if (this._parallaxBaseEl){
      this._setupParallaxers();
    }
  }

  /**
   * Sets up particle backgrounds
   */
  _setupCanvases() {
    if (this._$process__canvas){
      new ParticleCanvas({
        canvasEL: this._$process__canvas,
        canvasBackground: this._canvasBackgroundColor,
        particleColors: this._canvasParticleColors,
        particleLineWidth: 4,
        maxHeight: this._$process__canvas.parentNode.offsetHeight,
        numOfParticles: 300,
        particleOpacity: 1.0
      });
    }

    if (this._$footer__canvas){
      new ParticleCanvas({
        canvasEL: this._$footer__canvas,
        canvasBackground: this._canvasBackgroundColor,
        particleColors: this._canvasParticleColors,
        particleLineWidth: 4,
        maxHeight: 400,
        respondToMouse: false,
        numOfParticles: 75,
        particleOpacity: 1.0
      });
    }
  }

  /**
   * Sets up parallax animations
   */
  _setupParallaxers() {
    // On desktop-only...
    if (!this._utils.allowDeviceOrientation()){

      if(!this._parallaxers.length) {

        // Generate parallaxers from elements
        this._parallaxEls.forEach((el, i) => {
          let _rotateX = this._parallaxBaseRotationSensitivity.x + (this._parallaxBaseRotationSensitivity.increment * (i - 1)),
              _rotateY = this._parallaxBaseRotationSensitivity.y + (this._parallaxBaseRotationSensitivity.increment * (i - 1)),
              _translateX = this._parallaxBaseTranslateSensitivity.x + (this._parallaxBaseTranslateSensitivity.increment * (i - 1)),
              _translateY = this._parallaxBaseTranslateSensitivity.y + (this._parallaxBaseTranslateSensitivity.increment * (i - 1));

          this._parallaxers.push(
            new Parallaxer(
              this._parallaxBaseEl,
              [el],
              { x: _rotateX, y: _rotateY},
              { x: _translateX, y: _translateY}
            )
          )
        });

        // Run parallaxers.
        this._parallaxers.forEach((parallaxer) => {
          parallaxer.run();
        });
      }

    }
  }

  /**
   * Adds a class when element enters viewport
   */
  _setupScrollEffect() {
    this._utils.addClassOnScrollInToView({
      elements: this._$sections,
      threshold: 0.25,
      removeClassOnExit: false
    });
  }

}
