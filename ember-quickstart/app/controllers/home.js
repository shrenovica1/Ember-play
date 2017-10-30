import Ember from 'ember';
import RSVP from 'rsvp';

const {
    inject: {
      service
    }
  } = Ember;

export default Ember.Controller.extend({
  
 ajax: Ember.inject.service(),
 singleRestaurantService: service('single-restaurant'),
 restaurant: null,
 id: null,
 
 self: this,
actions:{
  select(restaurant){

alert(restaurant.name);
      var response = this.get('ajax').post('/singleRestaurant', {
          contentType: 'application/json',
          dataType: "json",
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({
                              id: restaurant.id,
                              name: restaurant.name,
                              address: restaurant.address,
                              description: restaurant.description,
                              pricerange: restaurant.pricerange,
                              rating: restaurant.rating,
                              profileimagefile: restaurant.profileimagefile,
                              opentime: restaurant.opentime,
                              closetime: restaurant.closetime,
                              phone: restaurant.phone,
                              coverfile: restaurant.coverfile,
                              longitude: restaurant.longitude,
                              latitude: restaurant.latitude




                            // alert(document.getElementById("restID").value);
                              }),
         success : function (odg) {
          self.restaurant=odg.restaurant;
          // 

           //
          //  alert( odg.id);
            // alert(self.id);
          // singleRestaurantService.setCurrentRestaurant(odg);
         }

      });
      response.then( () => {
    // alert(response);
      this.get('singleRestaurantService').setCurrentRestaurant(self.restaurant);
//     alert  (this.get('singleRestaurantService').getCurrentRestaurant());


      this.transitionToRoute('restaurant')
      },
         (error) => {
          alert("Invalid form");
           
        }
         
        
      );
    
  
  },

}

});
	



