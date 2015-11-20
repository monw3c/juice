'use strict';

// # Render a list of results
//
//   - publishes an event when a list item is clicked 'selected'
//

// css
require('./styles.css');

// html
const listViewTmpl = require('./listView.dot');

// scripts
const $             = require('jquery');
const BaseComponent = require('../BaseComponent');
const assert        = require('../assert');

class ListView extends BaseComponent {
  constructor(el, opts={}) {
    super(el);
    this.results = opts.results || [];
    this.fetch = opts.fetch;
    this.renderItem = opts.renderItem || this.renderItem;
    assert(typeof this.fetch === 'function');
  }

  render() {
    this.$el.html(listViewTmpl(this));
    this.$el.find('li').click((evt) => {
      this.set(this.results[$(evt.target).attr('data-index')]);
    });
    return this.$el.html();
  }

  renderItem(item) {
    return item.toString();
  }

  refresh() {
    this.publish('refresh');
    this.fetch((results) => {
      this.results = results;
      this.render();
    });
  }
};

module.exports = ListView;