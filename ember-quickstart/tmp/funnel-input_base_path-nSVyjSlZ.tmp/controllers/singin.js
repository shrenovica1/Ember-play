import Ember from 'ember';

export default Ember.Controller.extend({


 ajax: Ember.inject.service(),


	actions:{
    
             login() {
      var response = this.get('ajax').post('/singin', {
          contentType: 'application/json',
          dataType: "json",
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({email: this.get('email'), 
                              password: this.get('password')}),
      });
      this.transitionToRoute('home');
      response.then(
        () => this.transitionToRoute('home'),
        (error) => {
          this.set('hasError', true);
          
        }
      );
    },
  
  }
});
