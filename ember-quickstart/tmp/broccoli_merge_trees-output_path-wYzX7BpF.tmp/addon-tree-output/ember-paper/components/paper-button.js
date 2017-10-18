define('ember-paper/components/paper-button', ['exports', 'ember-paper/templates/components/paper-button', 'ember-paper/mixins/focusable-mixin', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/color-mixin', 'ember-paper/mixins/proxiable-mixin'], function (exports, _paperButton, _focusableMixin, _rippleMixin, _colorMixin, _proxiableMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed;
  exports.default = Component.extend(_focusableMixin.default, _rippleMixin.default, _colorMixin.default, _proxiableMixin.default, {
    layout: _paperButton.default,
    tagName: 'button',
    classNames: ['md-default-theme', 'md-button'],
    raised: false,
    iconButton: false,
    fab: computed.reads('mini'), // circular button
    mini: false,
    type: 'button',
    href: null,
    target: null,
    attributeBindings: ['type', 'href', 'target', 'title'],
    classNameBindings: ['raised:md-raised', 'iconButton:md-icon-button', 'fab:md-fab', 'mini:md-mini'],

    // Ripple Overrides
    rippleContainerSelector: null,
    fitRipple: computed.readOnly('iconButton'),
    center: computed.readOnly('iconButton'),
    dimBackground: computed.not('iconButton'),

    init: function init() {
      this._super.apply(this, arguments);
      if (this.get('href')) {
        this.setProperties({
          tagName: 'a',
          type: null
        });
      }
    },
    click: function click(event) {
      this.sendAction('onClick', event);
      // Prevent bubbling, if specified. If undefined, the event will bubble.
      return this.get('bubbles');
    }
  });
});