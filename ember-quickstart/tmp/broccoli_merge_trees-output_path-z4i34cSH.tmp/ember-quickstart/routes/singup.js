import Ember from 'ember';

const {
  inject: {
    service,
  },
} = Ember;


export default Ember.Route.extend({
  ajax: service('ajax'),

model(){
	alert("bavo");
   return Ember.Object.create();
}

});
