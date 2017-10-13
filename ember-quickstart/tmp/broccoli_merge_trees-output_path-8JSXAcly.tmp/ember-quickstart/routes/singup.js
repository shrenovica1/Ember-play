define('ember-quickstart/routes/singup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var service = Ember.inject.service;
  exports.default = Ember.Route.extend({
    ajax: service('ajax'),

    model: function model() {
      alert("bavo");
      return Ember.Object.create();
    }
  });
});