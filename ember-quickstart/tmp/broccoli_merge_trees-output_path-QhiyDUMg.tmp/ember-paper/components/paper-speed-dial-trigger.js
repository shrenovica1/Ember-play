define('ember-paper/components/paper-speed-dial-trigger', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    tagName: 'md-fab-trigger',

    click: function click() {
      this.get('speedDial').toggle();
    },
    focusOut: function focusOut() {
      this.get('speedDial').close();
    }
  });
});