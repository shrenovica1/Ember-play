import Ember from 'ember';


export default Ember.Controller.extend({
 ajax: Ember.inject.service(),
	actions:{
         create() {
              var response = this.get('ajax').post('api/singup', {
                xhrFields: {
                  withCredentials: true,
                },
                data: {
                  firstname: this.get('firstname'),


                },
              });
alert(response);
              response.then(

                () => this.transitionToRoute('singin'),
                (error) => {
                  this.set('hasError', true);
                  this.set('errorMessage', error.errors[0].title);
                }
              );
            },
  }
});
