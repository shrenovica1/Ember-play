define('ember-paper/components/paper-sidenav-container', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend({
    classNames: ['flex', 'layout-row'],
    attributeBindings: ['style'],
    style: htmlSafe('overflow: hidden')
  });
});