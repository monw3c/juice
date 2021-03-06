const BaseComponent = require('../BaseComponent');
const debounce = require('debounce');
const Utils = require('../Utils.js');

/**
 * Class for implementing infinite scroll triggers and logic
 * @author Robbie Wagner
 */
class InfiniteScroll extends BaseComponent {
  /**
   * Creates a new InfiniteScroll component
   * @param {string} el - The selector for the element to apply InfiniteScroll to
   * @param {function} onScrollToBottom - The function to call when you have scrolled to the bottom of the container
   * @param {object} opts - The options for the component
   * @param {number} [opts.debounceWait] - The time in milliseconds to debounce the scroll
   * @param {number} [opts.scrollTrigger] - A decimal bewteen 0-1 to indicate the offset percentage of the trigger from the bottom
   * @param {boolean} [opts.windowScroll] True for window scroll, false for scrolling in div
   */
  constructor(el, onScrollToBottom, opts = {}) {
    super(el, {
      preserveChildElements: true
    });

    if ($.isFunction(onScrollToBottom)) {
      this.onScrollToBottom = onScrollToBottom;
    } else {
      throw new Error('You must provide an onScrollToBottom function');
    }

    const debounceWait = opts.debounceWait || 500;
    const $scrollTarget = opts.windowScroll ? $(window) : this.$el;
    $scrollTarget.on('scroll', debounce(() => {
      const scrollTop = opts.windowScroll ? document.body.scrollTop : $scrollTarget[0].scrollTop;
      const scrollTrigger = opts.scrollTrigger || 0.95;
      let height;
      if (opts.windowScroll) {
        height = Utils.getDocumentHeight() * scrollTrigger;
        if (scrollTop + window.innerHeight >= height) {
          this.onScrollToBottom();
        }
      }
      else {
        height = (this.$el[0].scrollHeight - this.$el.height()) * scrollTrigger;
        if (scrollTop >= height) {
          this.onScrollToBottom();
        }
      }
    }, debounceWait, false));
  }

  /**
   * Renders the html for infinite scroll
   * @returns {string} The html for the component
   */
  render() {
    return this.$el.html();
  }
}

module.exports = InfiniteScroll;
