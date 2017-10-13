import Ember from 'ember';


export default Ember.Controller.extend({
 ajax: Ember.inject.service(),
	actions:{
         create() {
              var response = this.get('ajax').post('/singup', {
                xhrFields: {
                  withCredentials: true,
                },
                data: {
                  firstname: this.get('firstname'),


                },
              });
alert(response);
response.then();
              
            },
  }
});
