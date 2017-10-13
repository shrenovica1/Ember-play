import Ember from 'ember';

export default Ember.Controller.extend({
	action:{
		addTask: function(){
			var firstName =this.get('create');
			alert(firstName);
		}
	}
});
