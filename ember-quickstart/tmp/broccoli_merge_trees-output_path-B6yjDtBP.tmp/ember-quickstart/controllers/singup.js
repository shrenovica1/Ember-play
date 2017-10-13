import Ember from 'ember';


export default Ember.Controller.extend({

 ajax: Ember.inject.service(),


	actions:{
      /*   create() {
               $.ajax( {

               type: "POST",
               url: "http://localhost:4200/singup",
               data: {firstname: "Sanja"}

          })
          this.transitionToRoute('singin');
          

            
            },*/
             create() {
      var response = this.get('ajax').post('/singup', {
        xhrFields: {
          withCredentials: true,
        },
        data: {
          firstName: this.get('firstname'),
          
        },
      });
      response.then(
        () => this.transitionToRoute('home'),
        (error) => {
          this.set('hasError', true);
          
        }
      );
    },
  
  }
});
