import Ember from 'ember';


export default Ember.Controller.extend({

	actions:{
         create() {

          $.ajax( {

               type: "POST",
               url: "http://localhost:4200/singup",
               data: {firstname: "Sanja"}
          })
          this.transitionToRoute('singin');
          

              
            },
  }
});
