define('ember-quickstart/controllers/singin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    ajax: Ember.inject.service(),

    actions: {
      login: function login() {
        var _this = this;

        var response = this.get('ajax').post('/singin', {
          contentType: 'application/json',
          dataType: "json",
          xhrFields: {
            withCredentials: true
          },
          data: JSON.stringify({ email: this.get('email'),
            password: this.get('password') })
        });
        this.transitionToRoute('home');
        response.then(function () {
          return _this.transitionToRoute('home');
        }, function (error) {
          _this.set('hasError', true);
        });
      }
    }
  });
});