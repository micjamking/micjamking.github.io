/**
 *  Page Transitions
 */

// Libs
import utils, { w, $ } from './../lib/utils';


export default class PageTransitions {

  constructor(){
    this._utils = new utils();
    this._$w    = w;
    this._$     = $;
    this._$ctas = Array.from(this._$('.delay-transition'));
    this._$body = $('body')[0];
    this._exitTransitionClass = 'exit-page-transition';

    this._setupListeners();
  }

  /**
   * Setup listeners for page transitions
   */
  _setupListeners() {
    if (this._$ctas.length > 0){
      this._$ctas.forEach(($cta) => {
        $cta.addEventListener('click', (e) => this._delayPageTransition(e, $cta), { passive: false });
      });
    }
  }

  /**
   * Delay page transitions using utils.delay
   * @param {Event} e - Event object
   * @param {HTMLElement} cta - Element clicked
   */
  _delayPageTransition (e, cta) {
    e.preventDefault();

    // console.log('clicked a delayed link!', _linkURL);

    let _linkURL = cta.getAttribute('href');
    let _delayTimeout = cta.dataset.delay || 3000;

    this._utils
    .delay(() => {
      this._$body.classList.add(this._exitTransitionClass);
    }, 0)
    .delay(() => {
      this._$w.location = _linkURL;
    }, _delayTimeout);

  }

}
