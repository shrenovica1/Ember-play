define('ember-paper/components/paper-item', ['exports', 'ember-paper/templates/components/paper-item', 'ember-paper/mixins/ripple-mixin', 'ember-composability-tools'], function (exports, _paperItem, _rippleMixin, _emberComposabilityTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed;
  exports.default = Component.extend(_rippleMixin.default, _emberComposabilityTools.ParentMixin, {
    layout: _paperItem.default,
    tagName: 'md-list-item',

    // Ripple Overrides
    rippleContainerSelector: '.md-no-style',
    // disable ripple when we have a primary action or when we don't have a proxied component
    noink: computed('hasPrimaryAction', 'hasProxiedComponent', function () {
      return this.get('hasPrimaryAction') || !this.get('hasProxiedComponent');
    }),

    center: false,
    dimBackground: true,
    outline: false,

    classNameBindings: ['hasProxiedComponent:md-proxy-focus', 'shouldBeClickable:md-clickable', 'focused:md-focused', 'hasPrimaryAction:_md-button-wrap'],
    attributeBindings: ['role', 'tabindex'],
    role: 'listitem',
    tabindex: '-1',

    proxiedComponents: computed.filter('childComponents', function (c) {
      return !c.get('skipProxy');
    }),

    hasProxiedComponent: computed.bool('proxiedComponents.length'),
    shouldBeClickable: computed.or('hasProxiedComponent', 'onClick'),

    hasPrimaryAction: computed.or('onClick', 'href'),

    noProxy: computed('hasPrimaryAction', 'hasProxiedComponent', function () {
      return !this.get('hasPrimaryAction') && !this.get('hasProxiedComponent');
    }),

    secondaryItem: computed('proxiedComponents.[]', function () {
      var proxiedComponents = this.get('proxiedComponents');
      return proxiedComponents.objectAt(0);
    }),

    click: function click() {
      var _this = this;

      this.get('proxiedComponents').forEach(function (component) {
        if (component.processProxy && !component.get('disabled') && component.get('bubbles') | !_this.get('hasPrimaryAction')) {
          component.processProxy();
        }
      });
    },
    mouseEnter: function mouseEnter(ev) {
      this.sendAction('onMouseEnter', ev);
    },
    mouseLeave: function mouseLeave(ev) {
      this.sendAction('onMouseLeave', ev);
    }
  });
});