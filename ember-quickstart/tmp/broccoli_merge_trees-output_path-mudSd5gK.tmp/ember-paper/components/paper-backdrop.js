define('ember-paper/components/paper-backdrop', ['exports', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _transitionMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend(_transitionMixin.default, {

    tagName: 'md-backdrop',
    classNames: ['md-default-theme'],
    classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],
    attributeBindings: ['backdropStyle:style'],

    // TransitionMixin:
    transitionName: 'ng',
    shouldTransition: computed.bool('opaque'),

    backdropStyle: computed('fixed', function () {
      return this.get('fixed') ? htmlSafe('position:fixed;') : null;
    }),

    addDestroyedElementClone: function addDestroyedElementClone(original, clone) {
      original.parent().append(clone);
    },
    sendClickAction: function sendClickAction(e) {
      e.preventDefault();
      this.sendAction('onClick', e);
    },
    click: function click(e) {
      this.sendClickAction(e);
    },


    // needed for iOS
    // iOS doesn't trigger a click event on normal divs
    // unless we use `cursor: pointer` css
    touchEnd: function touchEnd(e) {
      this.sendClickAction(e);
    }
  });
});