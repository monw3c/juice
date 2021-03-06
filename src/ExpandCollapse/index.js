require('./styles.css');

const BaseComponent = require('../BaseComponent');
const Toggle = require('../Toggle/');
const collapseTmpl = require('./expandCollapseContent.tmpl');

/**
 * Class for creating an expandable/collapsible component
 * @author Robbie Wagner
 */
class ExpandCollapse extends BaseComponent {
  /**
   * Create an ExpandCollapse component
   * @param {string} el - The selector for the element wrapping the content you want to expand/collapse
   * @param {string} toggleSelector - The selector for the element to click to expand/collapse the content
   * @param {object} [opts] - The options for the component
   * @param {string} [opts.toggledClass] The class to apply when toggled is true
   * @param {string} [opts.untoggledClass] The class to apply when toggled is false
   */
  constructor(el, toggleSelector, opts = {}) {
    super(el, {
      parentElement: opts.parentElement,
      preserveChildElements: true
    });

    if (typeof toggleSelector === 'string') {
      this.toggleSelector = toggleSelector;
      this.opts = opts;
    }
    else {
      throw new Error('You must provide a toggleSelector');
    }
  }

  /**
   * Expand/collapse the content
   * @param {boolean} isToggled - A boolean indicating toggled or not
   */
  expandCollapse(isToggled) {
    if (isToggled) {
      const wrapperHeight = this.$el.find('.measuringWrapper')[0].clientHeight;
      this.$el.find('.grow').css('height', wrapperHeight + 'px');
    } else {
      this.$el.find('.grow').css('height', '0');
    }
  }

  /**
   * Render the html for the expand/collapse container and toggle and apply event listeners
   * @returns {string} The html for the ExpandCollapse container component
   */
  render() {
    if (this.$el.find('.grow').length === 0) {
      const innerContent = this.$el.html();
      this.$el.html(collapseTmpl(innerContent));
    }

    const toggle = new Toggle(this.toggleSelector, this.opts);
    toggle.render();

    toggle.subscribe((isToggled) => {
      this.expandCollapse(isToggled);
    });
    return this.$el[0].outerHTML;
  }
}

module.exports = ExpandCollapse;
