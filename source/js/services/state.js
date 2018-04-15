/** Libs */
import utils, { w } from './../lib/utils';


/** State Service */
export default class StateService {

  constructor(){

    // console.log('instantiate state service');

    /** @private */
    this._$location         = w.location;
    this._utils             = new utils();
    this._currentLocation   = '';
    this._itemListViewModel = [];
    this._activeIndex       = 0;

  }


  /**
   * Store item model
   *
   * @param {Object} item - Item model
   * @param {String} item.name - Topic name of item
   * @param {String} item.optionCount - # of options
   *
   * @return {Array} Array of items
   */
  addItemModel(item){

    // console.log('added item: ', item);

    this._itemListViewModel.push(item);

    return this._itemListViewModel;

  }


  /**
   * Get item list view model
   *
   * @return {Array} List of items
   */
  getItemListViewModel(){

    return this._itemListViewModel;

  }


  /**
   * Return index of item name
   *
   * @param {String} item - Name of item
   *
   * @return {Number} Integer index of item in sequence
   * @private
   */
  getItemIndex(item){

    return parseInt( this._itemListViewModel.findIndex( (el, i) => this._itemListViewModel[i].name === item ), 10 );

  }


  /**
   * Get the active index
   *
   * @return {Number} current active index
   */
  getIndex(){

    return this._activeIndex;

  }


  /**
   * Set the active index
   *
   * @param {Number} index - Integer for index
   *
   * @return {Number} current active index
   */
  setIndex(index){

    this._activeIndex = index;

    // console.log('current index: ', this._activeIndex);

    return this._activeIndex;

  }


  /**
   * Get current item in sequence
   *
   * @return {String} The current active item name
   */
  getCurrentItem(){

    if (this._itemListViewModel[this._activeIndex]){
      return this._itemListViewModel[this._activeIndex].name;
    }

  }


  /**
   * Get next item in sequence
   *
   * @return {Object} $location object
   */
  getNextItem(){

    if (this._itemListViewModel.length - 1 !== this._activeIndex){
      this.setIndex(this._activeIndex + 1);
    }

    else {
      this.setIndex(0);
    }

  }


  /**
   * Get previous item in sequence
   *
   * @return {Object} $location object
   */
  getPreviousItem(){

    if (this._activeIndex !== 0){
      this.setIndex(this._activeIndex - 1);
    }

  }


}
