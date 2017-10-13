define('ember-quickstart/controllers/singup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    ajax: Ember.inject.service(),

    actions: {
      /*   create() {
               $.ajax( {
                type: "POST",
               url: "http://localhost:4200/singup",
               data: {firstname: "Sanja"}
           })
          this.transitionToRoute('singin');
          
             
            },*/
      create: function create() {
        var _this = this;

        var response = this.get('ajax').post('/singup', {
          xhrFields: {
            withCredentials: true
          },
          data: {
            firstName: this.get('firstname')

          }
        });
        response.then(function () {
          return _this.transitionToRoute('home');
        }, function (error) {
          _this.set('hasError', true);
        });
      }
    }
  });
});