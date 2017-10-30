import Ember from 'ember';
import RSVP from 'rsvp';

const {
    inject: {
      service
    }
  } = Ember;

export default Ember.Route.extend({
	singleRestaurantService: service('single-restaurant'),

	model(){
		return RSVP.hash({
  	 	 restaurant:  this.get('singleRestaurantService').getCurrentRestaurant()
                                        .then(data => {
                                        	alert(data);
                                            return data;
                                        })              
                                        .catch(error => {
                                            return null;
                                        }),
         


  	 });

	}
	
});
