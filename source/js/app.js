/**
 *  Main application
 */


import utils, { w, $ } from './lib/utils';
import ParticleCanvas from './components/particleCanvas';

export default class App {

  /**
   * Setup variables and event listeners
   */
  constructor(){

    // External utilities
    this.utils = new utils();

    /** DOM References */
    this.$preloader = $('.preloader')[0];

    /** Setup event listeners */
    this._registerListeners();

    console.log('instantiated app');

  }


  /**
   * Initialize animations
   * @private
   */
  _initAnimations() {

    new ParticleCanvas();

  }


  /**
   * Setup UI
   * @private
   */
  _initUI() {

    let logo = this.$preloader.querySelectorAll('.preloader__logo')[0];

    this.utils
    .delay(() => {
      logo.classList.remove('fade-in-up');
      logo.classList.add('fade-out-up');
    }, 1000)
    .delay(() => {
      this.$preloader.classList.add('fade-out');
      this._initAnimations();
    }, 500)
    .delay(() => {
      this.$preloader.style.display = 'none';
    }, 0);

  }


  /**
   * Setup Event Listeners
   * @listens {DOMContentLoaded} Initialize UI
   * @listens {load} Initialize Social Media API
   * @private
   */
  _registerListeners() {

    w.addEventListener( 'load', (e) => this._initUI(e) );

  }

}

/** hello.world */
new App();
