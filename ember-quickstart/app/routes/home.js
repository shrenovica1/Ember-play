import Ember from 'ember';
import RSVP from 'rsvp';
const {
    inject: {
      service
    }
  } = Ember;


export default Ember.Route.extend({
	/*model(){
		return RSVP.hash({
		restaurants: ['Cue', 'Metropolissss', 'Restoran', 'Metropolis', 'Montana', 'Chipas'],
		locations: 
	});
}
*/
restaurantService: service('restaurant-service'),
	  ajax: Ember.inject.service(),
	  self: this,
	  listOfCities: null,

	  
  model() {   

  	 return RSVP.hash({
  	 	 locations:  this.get('restaurantService').getLocations()
                                        .then(data => {
                                            return data.city;
                                        })              
                                        .catch(error => {
                                            return null;
                                        }),
         restaurants: this.get('restaurantService').getRestaurants()
                                        .then(data => {
                                            return data.restaurants.slice(0,7);
                                        })              
                                        .catch(error => {
                                            return null;
                                        }),


  	 });
    // var promise= new Promise (
    	
    	/*	var response= this.get('ajax').request('/location',{
          contentType: 'application/json',
          dataType: 'json',

        xhrFields: {
          withCredentials: true
        },
    
     success : function (odg) {
     	 console.log(odg.city);
     	self.listOfCities = odg.city;
      
        } 
    
       

});
    	
debugger
    	return RSVP.hash({
			home: self.listOfCities
		});*/
 },

  actions: {
  	refreshModel() {
	  	debugger
	  	this.refresh();
	  }
	}

});
	


