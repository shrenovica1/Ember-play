define('ember-paper/components/paper-radio-base', ['exports', 'ember-paper/templates/components/paper-radio-base', 'ember-paper/mixins/focusable-mixin', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/color-mixin'], function (exports, _paperRadioBase, _focusableMixin, _rippleMixin, _colorMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      assert = Ember.assert;
  exports.default = Component.extend(_focusableMixin.default, _rippleMixin.default, _colorMixin.default, {
    layout: _paperRadioBase.default,
    tagName: 'md-radio-button',
    classNames: ['md-default-theme'],
    classNameBindings: ['checked:md-checked'],

    tabindex: null,

    toggle: false,

    /* Ripple Overrides */
    rippleContainerSelector: '.md-container',
    center: true,
    dimBackground: false,
    fitRipple: true,

    /* FocusableMixin Overrides */
    focusOnlyOnKey: true,

    // Lifecycle hooks
    init: function init() {
      assert('{{paper-radio}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
      this._super.apply(this, arguments);
    },


    checked: computed('groupValue', 'value', function () {
      return this.get('groupValue') === this.get('value');
    }),

    click: function click() {
      if (!this.get('disabled')) {
        if (this.get('toggle')) {
          this.sendAction('onChange', this.get('checked') ? null : this.get('value'));
        } else {
          this.sendAction('onChange', this.get('value'));
        }
      }
      // Prevent bubbling, if specified. If undefined, the event will bubble.
      return this.get('bubbles');
    }
  });
});