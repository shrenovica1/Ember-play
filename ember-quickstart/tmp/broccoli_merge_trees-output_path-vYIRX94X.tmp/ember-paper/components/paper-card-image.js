define('ember-paper/components/paper-card-image', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    tagName: 'img',
    classNames: ['md-card-image'],
    attributeBindings: ['src', 'title', 'alt']
  });
});