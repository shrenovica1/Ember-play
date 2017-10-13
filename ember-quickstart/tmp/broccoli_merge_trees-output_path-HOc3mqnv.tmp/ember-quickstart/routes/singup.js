import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service('ajax'),

model(){

   return Ember.Object.create();
}

});
