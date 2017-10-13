import Ember from 'ember';

export default Ember.Route.extend({
ajax: service('ajax'),


     beforeModel(){
     this.replaceWith('home');}
});
