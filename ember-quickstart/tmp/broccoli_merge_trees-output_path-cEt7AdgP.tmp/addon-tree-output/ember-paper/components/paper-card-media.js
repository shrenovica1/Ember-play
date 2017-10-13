define('ember-paper/components/paper-card-media', ['exports', 'ember-paper/templates/components/paper-card-media'], function (exports, _paperCardMedia) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    layout: _paperCardMedia.default,
    tagName: '',
    size: 'md'
  });
});