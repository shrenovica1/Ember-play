define('ember-quickstart/controllers/singup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    //  ajax: Ember.inject.service(),


    /*actions:{
            create() {
             return this.get('ajax').request('/singup',{
               method: 'POST',
               data: {
                 firstname: 'Sanja'
               }
             })
    /*          $.ajax( {
                   type: "POST",
                  url: "http://localhost:4200/singup",
                  data: {firstname: "Sanja"}
             })
             this.transitionToRoute('singin');
             
                  
               },
     }*/
  });
});