define('ember-paper/components/paper-card-title', ['exports', 'ember-paper/templates/components/paper-card-title'], function (exports, _paperCardTitle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    layout: _paperCardTitle.default,
    tagName: 'md-card-title'
  });
});