define('ember-quickstart/routes/index', ['exports'], function (exports) {
     'use strict';

     Object.defineProperty(exports, "__esModule", {
          value: true
     });
     exports.default = Ember.Route.extend({
          ajax: service('ajax'),

          beforeModel: function beforeModel() {
               this.replaceWith('home');
          }
     });
});