define('ember-paper/mixins/color-mixin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin;
  exports.default = Mixin.create({
    classNameBindings: ['warn:md-warn', 'accent:md-accent', 'primary:md-primary']
  });
});