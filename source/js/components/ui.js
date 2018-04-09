/**
 *  User Interface
 */


import utils, { $ } from './../lib/utils';
import MouseScroller from './../lib/mouse-scroller';
import Parallaxer from './../lib/parallaxer';
import StateService from './../services/state';
import ParticleCanvas from './particleCanvas';
import Vue from 'vue';

export default class UI extends Vue {

  constructor (){

    console.log('initialized user interface');

    /** External utilities */
    const _utils        = new utils();
    const _stateService = new StateService();

    /** DOM References */
    let $preloader = $('.preloader')[0];
    let $body = $('body')[0];
    let parallaxers_ = [];

    /** Options */
    let _options = {
      el: '.container',
      delimiters: ['[[', ']]'],
      data: {
        isActive: false,
        stateService: _stateService
      }
    };

    let introState = function(){
      new ParticleCanvas();

      new MouseScroller({
        debounceTime: 1000,
        scrollThreshold: 0.4,
        scrollDownCallback: () => _stateService.getNextItem(),
        scrollUpCallback:   () => _stateService.getPreviousItem()
      });

      // On desktop-only...
      if (!_utils.allowDeviceOrientation()){

        if(!parallaxers_.length) {
          parallaxers_ = [
            // Case study wrapper element
            new Parallaxer(
              $('.main'),
              { x: 0.1, y: 0.1}, { x: 0.25, y: 0.25}
            ),
            // Case study background offset
            new Parallaxer(
              $('.background-images__image--offset'),
              { x: 0.1, y: 0.1}, { x: 1.5, y: 1.25}
            ),
            // Case study title, subtitle, and cta button
            new Parallaxer(
              $('.case-study__inner-content'),
              { x: 0.1, y: 0.1}, { x: 0.2, y: 0.2}
            )
          ];

          // Run parallaxers.
          parallaxers_.forEach((parallaxer) => {
            parallaxer.run();
          });
        }

      }
    }

    /** Options - Custom Directives */
    _options.directives = {
      init: {
        // directive definition
        inserted: function (el, binding) {
          binding.value();
        }
      }
    };

    /** Options - Computed Properties */
    _options.computed = {

    };

    /** Options - Methods */
    _options.methods = {

    };

    /** Options - Lifecycle Methods */
    _options.mounted = function() {
      let $logo = $preloader.querySelectorAll('.preloader__logo')[0];

      _utils
      .delay(() => {
        $logo.classList.remove('fade-in-up');
        $logo.classList.add('fade-out-up');
      }, 1000)
      .delay(() => {
        $preloader.classList.add('fade-out');
        this.isActive = true;

        if ($body.classList.contains('home')) {
          introState()
        }
      }, 500)
      .delay(() => {
        $preloader.classList.remove('active');
      }, 0);
    };

    super(_options);

  }

}
