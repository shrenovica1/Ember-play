define('ember-quickstart/controllers/singup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    ajax: Ember.inject.service(),
    actions: {
      create: function create() {
        var response = this.get('ajax').post('/singup', {
          xhrFields: {
            withCredentials: true
          },
          data: {
            firstname: this.get('firstname')

          }
        });
        alert(response);
        response.then();
      }
    }
  });
});