define('ember-paper/components/paper-card-header', ['exports', 'ember-paper/templates/components/paper-card-header'], function (exports, _paperCardHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    layout: _paperCardHeader.default,
    tagName: 'md-card-header'
  });
});