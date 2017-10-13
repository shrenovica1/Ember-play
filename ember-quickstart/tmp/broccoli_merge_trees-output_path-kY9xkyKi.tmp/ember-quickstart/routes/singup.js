define('ember-quickstart/routes/singup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    ajax: Ember.inject.service('ajax'),

    model: function model() {

      return Ember.Object.create();
    }
  });
});