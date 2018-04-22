/**
 *  Main application
 */


import { w } from './lib/utils';
import UI from './components/ui';

export default class App {

  /**
   * Setup variables and event listeners
   */
  constructor(){

    /** Setup event listeners */
    this._registerListeners();

    // console.log('instantiated app');

  }


  /**
   * Setup UI
   * @private
   */
  _initUI() {

    w.vm = new UI();

  }


  /**
   * Setup Event Listeners
   * @listens {load} Initialize UI
   * @private
   */
  _registerListeners() {

    w.addEventListener( 'load', (e) => this._initUI(e), { passive: true });

  }

}

/** hello.world */
new App();
