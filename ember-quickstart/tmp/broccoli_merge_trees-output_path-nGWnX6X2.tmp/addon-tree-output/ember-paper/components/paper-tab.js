define('ember-paper/components/paper-tab', ['exports', 'ember-paper/templates/components/paper-tab', 'ember-composability-tools', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/focusable-mixin'], function (exports, _paperTab, _emberComposabilityTools, _rippleMixin, _focusableMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed,
      Component = Ember.Component,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend(_emberComposabilityTools.ChildMixin, _rippleMixin.default, _focusableMixin.default, {
    layout: _paperTab.default,
    tagName: 'md-tab-item',
    classNames: ['md-tab'],
    classNameBindings: ['isSelected:md-active'],
    attributeBindings: ['isSelected:aria-selected', 'href', 'style'],

    rippleContainerSelector: null,

    // <a> tags have brower styles or are usually styled by the user
    // this makes sure that tab item still looks good with an anchor tag
    style: computed('href', function () {
      if (this.get('href')) {
        return htmlSafe('text-decoration: none; border: none;');
      }
    }),

    isSelected: computed('selected', 'value', function () {
      return this.get('selected') === this.get('value');
    }),

    init: function init() {
      this._super.apply(this, arguments);
      if (this.get('href')) {
        this.set('tagName', 'a');
      }
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var width = this.element.offsetWidth;
      // this is the initial tab width
      // it is used to calculate if we need pagination or not
      this.set('width', width);
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);
      this.updateDimensions();
    },


    // this method is also called by the parent
    updateDimensions: function updateDimensions() {
      var left = this.element.offsetLeft;
      // this is the true current width
      // it is used to calculate the ink bar position
      var currentWidth = this.element.offsetWidth;
      this.setProperties({ left: left, currentWidth: currentWidth });
    },
    click: function click() {
      this.sendAction.apply(this, ['onClick'].concat(Array.prototype.slice.call(arguments)));
      this.sendAction('onSelect', this);
    }
  });
});