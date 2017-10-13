define('ember-paper/components/paper-sidenav', ['exports', 'ember-paper/templates/components/paper-sidenav'], function (exports, _paperSidenav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed;
  exports.default = Component.extend({
    layout: _paperSidenav.default,
    tagName: '',

    name: 'default',
    position: 'left',
    lockedOpen: 'gt-sm',
    open: false,
    closed: computed.not('open'),
    closeOnClick: true,

    actions: {
      onToggle: function onToggle() {
        this.sendAction.apply(this, ['onToggle'].concat(Array.prototype.slice.call(arguments)));
      },
      onBackdropTap: function onBackdropTap() {
        this.sendAction('onToggle', false);
      }
    }
  });
});