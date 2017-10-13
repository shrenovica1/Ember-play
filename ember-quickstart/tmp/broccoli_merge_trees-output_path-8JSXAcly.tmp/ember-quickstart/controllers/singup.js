define('ember-quickstart/controllers/singup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    ajax: Ember.inject.service(),
    actions: {
      create: function create() {
        var _this = this;

        var response = this.get('ajax').post('api/singup', {
          xhrFields: {
            withCredentials: true
          },
          data: {
            firstname: this.get('firstname')

          }
        });
        alert(response);
        response.then(function () {
          return _this.transitionToRoute('singin');
        }, function (error) {
          _this.set('hasError', true);
          _this.set('errorMessage', error.errors[0].title);
        });
      }
    }
  });
});