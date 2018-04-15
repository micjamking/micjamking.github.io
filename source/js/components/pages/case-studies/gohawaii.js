/**
 * GoHawaii Page Settings
 */
import { $ } from './../../../lib/utils';

export default class GoHawaii {
  constructor(){
    this.parallaxer = {};
    this.parallaxer.baseEl = $('.section--custom-animation')[0];
    this.parallaxer.els = $('.section--custom-animation .section__element');
    this.parallaxer.baseRotationSensitivity = {
      x: 0,
      y: 0,
      increment: 0
    };
    this.parallaxer.baseTranslateSensitivity = {
      x: 0.25,
      y: 0.35,
      increment: 0.15
    };
  }
}
