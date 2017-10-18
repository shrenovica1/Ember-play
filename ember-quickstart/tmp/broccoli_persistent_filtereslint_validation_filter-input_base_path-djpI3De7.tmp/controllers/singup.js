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
          contentType: 'application/json',
          dataType: "json",
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({lastname: this.get('lastname'), 
                              firstname: this.get('firstname'),
                             email: this.get('email'), 
                             phone: this.get('phone'),
                             city: document.getElementById("exampleFormControlSelect1").value,
                             country: document.getElementById("exampleFormControlSelect2").value,
                             passwor:this.get('password'),
                             isAdmin: false}),
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
