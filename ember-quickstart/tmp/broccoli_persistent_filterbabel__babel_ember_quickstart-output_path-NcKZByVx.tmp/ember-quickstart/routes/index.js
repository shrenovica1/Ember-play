define('ember-quickstart/routes/index', ['exports'], function (exports) {
     'use strict';

     Object.defineProperty(exports, "__esModule", {
          value: true
     });
     exports.default = Ember.Route.extend({
          beforeModel: function beforeModel() {
               this.replaceWith('home');
          }
     });
});