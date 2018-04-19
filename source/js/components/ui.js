/**
 *  User Interface
 */

// Libs
import Vue from 'vue';
import VueTouch from 'vue-touch';
import LazyLoad from 'vanilla-lazyload';
import utils, { $ } from './../lib/utils';

// Services
import StateService from './../services/state';

// Components
import PageTransitions from './pageTransitions';

// Pages
import HomePage from './pages/home';
import CaseStudyPage from './pages/caseStudy';

// Case study page config
import GoHawaii from './pages/case-studies/gohawaii';
import TourAloha from './pages/case-studies/touraloha';
import Teacup from './pages/case-studies/teacup';

const _stateService = new StateService();
Vue.use(VueTouch);

export default class UI extends Vue {

  constructor (){

    let _utils = new utils();

    /** Options */
    let _options = {
      el: '.container',
      delimiters: ['[[', ']]'],
      data: {
        isActive: false,
        isMobileMenuActive: false,
        stateService: _stateService
      }
    };

    _options.methods = {
      onSwipeUp: function(){
        this.stateService.getNextItem();
        // console.log('swiped up');
      },
      onSwipeDown: function(){
        this.stateService.getPreviousItem();
        // console.log('swiped down');
      }
    };

    /** Options - Custom Directives */
    _options.directives = {
      init: {
        // directive definition
        inserted: function (el, binding) {
          binding.value();
        }
      }
    };

    /** Options - Lifecycle Methods */
    _options.mounted = function() {
      let $preloader = $('.preloader')[0];
      let $body = $('body')[0];
      let $logo = $preloader.querySelectorAll('.preloader__logo')[0];

      _utils
      .delay(() => {
        $logo.classList.remove('fade-in-up');
        $logo.classList.add('fade-out-up');
      }, 1000)
      .delay(() => {
        this.isActive = true;
        $preloader.classList.add('fade-out');

        _utils.delay(() => {
          if ($body.classList.contains('home')) {
            new HomePage(this.stateService);
          }

          else if ($body.classList.contains('case-study')) {
            let caseStudy = $body.classList.item(1);
            let caseStudySettings = {};

            switch (caseStudy) {
              case 'gohawaii':
                caseStudySettings = new GoHawaii();
                break;
              case 'tour-aloha':
                caseStudySettings = new TourAloha();
                break;
              case 'teacup-analytics':
                caseStudySettings = new Teacup();
                break;
              case 'clearstream':
              case 'mobipcs':
              default:
                console.log('No case study settings available for this page!');
            }

            new CaseStudyPage(caseStudySettings);
          }
        }, 0);

      }, 500)
      .delay(() => {
        $preloader.classList.remove('active');
        new LazyLoad();
        new PageTransitions();
      }, 0);
    };

    super(_options);

  }

}
