import Ember from 'ember';

  const {
    inject: {
      service
    }
  } = Ember;



export default Ember.Controller.extend({

 ajax: Ember.inject.service(),
 session: Ember.inject.service('login'),
// tokenCurrentUser: null,

//  grad=null,


	actions:{
   // var token=null;
    
             login() {
              var token="";
      var response = this.get('ajax').post('/singin', {
          contentType: 'application/json',
          dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({email: this.get('email'), 
                              password: this.get('password')}),
        success : function (odg) {
          token=odg.token;
         // tokenCurrentUser=token
         // alert(response);
          //this.get('session').setToken(email,  password, odg.token);
         //this.get('session').setToken(email,  password, odg.token);
         // this.get('loginService').set('token', odg.token);
          //  alert("The server says: " + odg.token);
        
        }
        


      });
  
      response.then( () => {
        this.get('session').setToken(token);
           //alert(token);
        this.transitionToRoute('home')},
         (error) => {
          alert("Invalid username or password");
           //alert("The server says: " + odg.token);
        
        }
         
        
      );
    },
  
  }


});
