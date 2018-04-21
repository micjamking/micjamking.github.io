/**
 *  Home Page Component
 */

// Libs
import utils, { w, $ } from './../../lib/utils';
import MouseScroller from './../../lib/mouse-scroller';
import Parallaxer from './../../lib/parallaxer';

// Components
import ParticleCanvas from './../particleCanvas';

export default class HomePage {

  /**
   * @param {Object} stateService - State service
   */
  constructor(stateService){
    // External utilities
    this._stateService = stateService;
    this._utils        = new utils();
    this._$w           = w;
    this._$            = $;

    // DOM element references
    this._$canvas = $('.canvas')[0];

    // Particle background settings
    this._canvasParticleColors = ['#D6E9F1'];

    // Parallax Settings
    this._parallaxers = [];
    this._parallaxBaseEl = this._$w;
    this._parallaxMainEl = $('.main');
    this._parallaxOffsetEls = $('.background-images__image--offset');
    this._parallaxContentEls = $('.case-study__inner-content');

    // 3, 2, 1... blastOff!
    this._init();
  }

  /**
   * Kick start page
   */
  _init() {
    this._setupCanvas();
    this._setupScrollEffect();
    this._setupParallaxers();
  }

  /**
   * Sets up particle background
   */
  _setupCanvas() {
    if (this._$canvas){
      new ParticleCanvas({
        canvasEL: this._$canvas,
        particleColors: this._canvasParticleColors
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
        this._parallaxers = [
          // Case study wrapper element
          new Parallaxer(
            this._parallaxBaseEl,
            this._parallaxMainEl,
            { x: 0.1, y: 0.1}, { x: 0.25, y: 0.25}
          ),
          // Case study background offset
          new Parallaxer(
            this._parallaxBaseEl,
            this._parallaxOffsetEls,
            { x: 0.1, y: 0.1}, { x: 1.5, y: 1.25}
          ),
          // Case study title, subtitle, and cta button
          new Parallaxer(
            this._parallaxBaseEl,
            this._parallaxContentEls,
            { x: 0.1, y: 0.1}, { x: 0.2, y: 0.2}
          )
        ];

        // Run parallaxers.
        this._parallaxers.forEach((parallaxer) => {
          parallaxer.run();
        });
      }

    }
  }

  /**
   * Custom scrolling on home page
   */
  _setupScrollEffect() {
    new MouseScroller({
      debounceTime: 1000,
      scrollThreshold: 0.4,
      scrollDownCallback: () => this._stateService.getNextItem(),
      scrollUpCallback:   () => this._stateService.getPreviousItem()
    });
  }

}
