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
   * Get the window.location.pathname (ie. current item)
   *
   * @return current page hash
   * @private
   */
  _getLocationPath(){

    return this._$location.path().replace(/\//g, '');

  }


  /**
   * Set window.location.pathname (ie. current item)
   *
   * @param {String} pathname - String of element ID
   *
   * @return $location object
   * @private
   */
  _setLocationPath(pathname){

    return this._$location.path(pathname);

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

    console.log('added item: ', item);

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

    console.log('current index: ', this._activeIndex);

    return this._activeIndex;

  }


  /**
   * Get current window.location.pathname
   *
   * @param {String} hash - String of element ID
   *
   * @return $location object
   * @private
   */
  getCurrentLocation(){

    return this._currentLocation;

  }


  /**
   * Set window.location.pathname (ie. current item)
   *
   * @param {String} pathname - String of element ID
   *
   * @return $location object
   * @private
   */
  setCurrentLocation(pathname){

    console.log(`set active item: ${ pathname.replace(/\//g, '') }`);

    this._currentLocation = pathname;

    return this._currentLocation;

  }


  /**
   * Checks if the url matches the first item
   *
   * @return {Boolean} true|false if current view is first item
   */
  isFirstItem(){

    return this._getLocationPath() === '' || this._getLocationPath() === this._itemListViewModel[0].name;

  }


  /**
   * Checks if the url matches the last item
   *
   * @return {Boolean} true|false if current view is last item
   */
  isLastItem(){

    return this._getLocationPath() === this._itemListViewModel[ this._itemListViewModel.length - 1 ].name;

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
      // return this._setLocationPath(this._itemListViewModel[this._activeIndex].name);
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
      // return this._setLocationPath(this._itemListViewModel[this._activeIndex].name);
    }

  }


}
