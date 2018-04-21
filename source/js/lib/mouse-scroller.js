/**
 * A UI util class to detect mouse scrolling.
 */
export default class MouseScroller {

  /**
   * @param config Configuration options for mouse scroller.
   *     - scrollUpCallback (function)
   *     - scrollDownCallback (function)
   */
  constructor(config) {

    this.config = config;

    /**
     * Whether if mouse scroll is allowed.
     * @type {boolean}
     */
    this.canScroll = true;

    /**
     * The callback for scrolling up.
     * @type {Function}
     */
    this.scrollUpCallback = config.scrollUpCallback;

    /**
     * The callback for scrolling down.
     * @type {Function}
     */
    this.scrollDownCallback = config.scrollDownCallback;

    this.mouseListener = (e) => {
      this.onMouseWheel_(e);
    };

    // Mouse wheel events.
    window.addEventListener('mousewheel', this.mouseListener, { passive: true });

    // Firefox
    window.addEventListener('DOMMouseScroll', this.mouseListener, { passive: true });
  }


  onMouseWheel_(event) {
    if (this.config.preventDefault) {
      event.preventDefault();
    }

    if (!this.canScroll) {
      return;
    }

    // Normalize scroll speed differences between browers.
    var scrollSpeed;
    var w = event.wheelDelta;
    var d = event.detail;
    if (d) {
      if (w) { // Opera
        scrollSpeed = w / d / 40 * d > 0 ? 1 : -1;
      } else { // Firefox;
        scrollSpeed = -d / 4;
      }
    } else {
      scrollSpeed = w / 120;
    }

    // Threshold for scroll motion to be detected in mousewheel.
    // Edge case: caution with setting this above 0.3 as people remoting into a
    // linux machine have higher latency and mousewheel events don't fire as
    // quickly.
    var scrollThreshold = this.config.scrollThreshold || 0.1;

    // Debounce the next and previous in order to ensure we don't change
    // more than two pages at once.
    // Additionally, mousepads gets a little tricker because they can continue
    // to produce scroll events.  Add enough buffer.
    var debounceTime = this.config.debounceTime || 810;

    if (Math.abs(scrollSpeed) >= scrollThreshold && this.canScroll) {
      this.canScroll = false;

      if (scrollSpeed <= 0) {
        this.scrollDownCallback();
      } else {
        this.scrollUpCallback();
      }

      // Deboucing. Disallow any scrolling for a set period.
      window.setTimeout(()=> {
        this.canScroll = true;
      }, debounceTime);
    }
  }

  /**
   * Disposes the instance of the mouse scroller.
   */
  dispose() {
    window.removeEventListener('mousewheel', this.mouseListener);
    window.removeEventListener('DOMMouseScroll', this.mouseListener);
  }
}
