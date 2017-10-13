define('ember-paper/components/paper-checkbox', ['exports', 'ember-paper/templates/components/paper-checkbox', 'ember-paper/mixins/focusable-mixin', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/color-mixin', 'ember-paper/mixins/proxiable-mixin'], function (exports, _paperCheckbox, _focusableMixin, _rippleMixin, _colorMixin, _proxiableMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      inject = Ember.inject,
      assert = Ember.assert,
      computed = Ember.computed;
  exports.default = Component.extend(_focusableMixin.default, _rippleMixin.default, _colorMixin.default, _proxiableMixin.default, {
    layout: _paperCheckbox.default,
    tagName: 'md-checkbox',
    classNames: ['md-checkbox', 'md-default-theme'],
    classNameBindings: ['isChecked:md-checked', 'indeterminate:md-indeterminate'],

    /* RippleMixin Overrides */
    rippleContainerSelector: '.md-container',
    center: true,
    dimBackground: false,
    fitRipple: true,

    /* FocusableMixin Overrides */
    focusOnlyOnKey: true,

    constants: inject.service(),

    value: false,

    notIndeterminate: computed.not('indeterminate'),
    isChecked: computed.and('notIndeterminate', 'value'),

    init: function init() {
      this._super.apply(this, arguments);
      assert('{{paper-checkbox}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
    },
    click: function click() {
      if (!this.get('disabled')) {
        this.sendAction('onChange', !this.get('value'));
      }
      // Prevent bubbling, if specified. If undefined, the event will bubble.
      return this.get('bubbles');
    },
    keyPress: function keyPress(ev) {
      if (ev.which === this.get('constants.KEYCODE.SPACE') || ev.which === this.get('constants.KEYCODE.ENTER')) {
        ev.preventDefault();
        this.click();
      }
    },
    processProxy: function processProxy() {
      this.sendAction('onChange', !this.get('value'));
    }
  });
});