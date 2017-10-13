define('ember-paper/components/paper-option', ['exports', 'ember-paper/templates/components/paper-option', 'ember-paper/components/paper-menu-item', 'ember-paper/mixins/ripple-mixin'], function (exports, _paperOption, _paperMenuItem, _rippleMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed;
  exports.default = _paperMenuItem.default.extend(_rippleMixin.default, {
    layout: _paperOption.default,
    tagName: 'md-option',
    attributeBindings: ['aria-selected', 'aria-disabled', 'aria-current', 'data-option-index', 'role', 'selected', 'tabindex'],
    rippleContainerSelector: null,
    tabindex: '0',
    fitRipple: computed.readOnly('isIconButton'),
    center: computed.readOnly('isIconButton'),
    dimBackground: computed.not('isIconButton')
  });
});