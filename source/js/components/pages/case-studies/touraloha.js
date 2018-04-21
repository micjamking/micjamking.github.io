/**
 * Tour Aloha Page Settings
 */
import utils, { $ } from './../../../lib/utils';

export default class TourAloha {
  constructor(){
    this._utils = new utils();
    this._$section = $('.section--custom-animation')[0];
    this._$markers = $('.section__element--map-marker')
    this._$popup = $('.section__element--map-popup')[0]
    console.log('Tour Aloha instantiated.');
    this._top = 0;
    this._left = 0;
    this._right = this._$section.offsetWidth;
    this._bottom = this._$section.offsetHeight;

    this._popupOffsetTop  = '125';
    this._popupOffsetLeft = '32';

    let bg = this._$section.querySelectorAll('.section__elements')[0];
    bg.addEventListener('click', () => {
      this._$popup.classList.remove('active');
    }, { capture: true, passive: true });
  }

  callback() {
    this._scatterMarkers();
  }

  /**
   * Callback to create popup effect
   * @param {Event} e - Event object
   */
  _markerPopup(e){
    console.log('clicked marker: ', el);

    let target = e.target || e.srcElement;
    let el = target.parentNode.parentNode;
    let top = parseInt(el.style.top.replace('px', ''), 10) - this._popupOffsetTop;
    let left = parseInt(el.style.left.replace('px', ''), 10) - this._popupOffsetLeft;

    this._$popup.style.top  = `${top}px`;
    this._$popup.style.left = `${left}px`;

    this._$popup.classList.add('active');
  }

  /**
   * Scatter
   */
  _scatterMarkers(){
    this._$markers.forEach(($marker) => {
      let y_pos = this._utils.randInt(this._top, this._bottom);
      let x_pos = this._utils.randInt(this._left, this._right);
      $marker.style.top  = `${y_pos}px`;
      $marker.style.left = `${x_pos}px`;

      $marker.addEventListener('click', (e) => this._markerPopup(e), { capture: true, passive: true });

      // console.log('set marker position', $marker);
    });
  }
}
