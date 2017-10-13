define('ember-paper/mixins/parent-mixin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin,
      computed = Ember.computed,
      A = Ember.A;
  exports.default = Mixin.create({
    childComponents: computed(function () {
      return A();
    }),

    register: function register(child) {
      this.get('childComponents').pushObject(child);
    },
    unregister: function unregister(child) {
      this.get('childComponents').removeObject(child);
    }
  });
});