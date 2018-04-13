/**
 *  User Interface
 */

// Libs
import Vue from 'vue';
import utils, { $ } from './../lib/utils';
import MouseScroller from './../lib/mouse-scroller';
import Parallaxer from './../lib/parallaxer';

// Services
import StateService from './../services/state';

// Components
import ParticleCanvas from './particleCanvas';

export default class UI extends Vue {

  constructor (){

    // console.log('initialized user interface');

    /** External utilities */
    const _utils        = new utils();
    const _stateService = new StateService();

    /** DOM References */
    let $preloader = $('.preloader')[0];
    let $body = $('body')[0];
    let $canvas_color_lightblue = '#D6E9F1';
    let $canvas_color_darkblue = '#2C4050';
    let $canvas_color_darkblue2 = '#374650';

    /** Options */
    let _options = {
      el: '.container',
      delimiters: ['[[', ']]'],
      data: {
        isActive: false,
        stateService: _stateService
      }
    };

    let caseStudyState = () => {
      let $sections = $('.section:not(.section--process):not(.section--intro), .section__phases__header, .section__phases__phase');
      let $footer__canvas = $('.footer__canvas')[0];
      let $process__canvas = $('.section--process__canvas')[0];
      // let parallaxers_ = [];

      // Add class when element enters viewport
      _utils.addClassOnScrollInToView({
        elements: $sections,
        threshold: 0.25,
        removeClassOnExit: false
      });

      if ($process__canvas){
        new ParticleCanvas({
          canvasEL: $process__canvas,
          canvasBackground: $canvas_color_darkblue2,
          particleColors: [$canvas_color_darkblue],
          particleLineWidth: 4,
          maxHeight: $process__canvas.parentNode.offsetHeight,
          numOfParticles: 300,
          particleOpacity: 1.0
        });
      }

      if ($footer__canvas){
        new ParticleCanvas({
          canvasEL: $footer__canvas,
          canvasBackground: $canvas_color_darkblue2,
          particleColors: [$canvas_color_darkblue],
          particleLineWidth: 4,
          maxHeight: 400,
          respondToMouse: false,
          numOfParticles: 75,
          particleOpacity: 1.0
        });
      }

      // On desktop-only...
      // if (!_utils.allowDeviceOrientation()){
      //
      //   if(!parallaxers_.length) {
      //     parallaxers_ = [
      //       new Parallaxer(
      //         $('.section--custom-animation')[0],
      //         $('.section__element--alert-1'),
      //         { x: 0.1, y: 0.1}, { x: 0.15, y: 0.15}
      //       ),
      //       new Parallaxer(
      //         $('.section--custom-animation')[0],
      //         $('.section__element--alert-2'),
      //         { x: 0.1, y: 0.1}, { x: 0.25, y: 0.25}
      //       ),
      //       new Parallaxer(
      //         $('.section--custom-animation')[0],
      //         $('.section__element--alert-3'),
      //         { x: 0.1, y: 0.1}, { x: 0.35, y: 0.35}
      //       )
      //     ];
      //
      //     // Run parallaxers.
      //     parallaxers_.forEach((parallaxer) => {
      //       parallaxer.run();
      //     });
      //   }
      //
      // }
    };

    let introState = () => {
      let $canvas = $('.canvas')[0];
      let parallaxers_ = [];

      if ($canvas){
        new ParticleCanvas({
          canvasEL: $canvas,
          particleColors: [$canvas_color_lightblue]
        });
      }

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
        this.isActive = true;
        $preloader.classList.add('fade-out');

        setTimeout(() => {
          if ($body.classList.contains('home')) {
            introState();
          }
          else if ($body.classList.contains('case-study')) {
            caseStudyState();
          }
        }, 0);
      }, 500)
      .delay(() => {
        $preloader.classList.remove('active');
      }, 0);
    };

    super(_options);

  }

}
