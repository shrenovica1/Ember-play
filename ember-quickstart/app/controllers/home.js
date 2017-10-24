import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Controller.extend({

	/*model(){
		return RSVP.hash({
		restaurants: ['Cue', 'Metropolissss', 'Restoran', 'Metropolis', 'Montana', 'Chipas'],
		locations: 
	});
}
*/

	/*  ajax: Ember.inject.service(),
	  self: this,
	  listOfCities: null,

	  
  model() {
    // var cities;
    	 var response = this.get('ajax').request('/location',{
          contentType: 'application/json',
          dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
    // var cities= JSON.stringify(locations.city);
     // var res=cities[0];
     //var 
     success : function (odg) {
     //	 console.log(odg.city);
     //	self.listOfCities = odg.city;
        alert("The server says: " +odg.city); 
       
       // cities.push(odg.city[0]);
    // var cities=odg;
      //alert(cities);
       // document.getElementById("city").innerHTML=odg.city;  
       // document.getElementById("city").innerHTML=cities[1];  
        } //$("city").val(odg.city[0]);

      
   });
debugger
    	return RSVP.hash({
		//	home: self.listOfCities
		});

   //   alert("The server says: " +JSON.stringify(response));  
//return data;
/*response.then(() => function (odg) {
     	 data=odg;
     	
        alert("The server says: " +odg.city);  
        
        }

	)

  },*/

  /*actions: {
  	refreshModel() {
	  	debugger
	  	this.refresh();
	  }
	}*/

});
	



