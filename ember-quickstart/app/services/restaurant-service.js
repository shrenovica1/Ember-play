import CustomAjax from './ajax';

export default CustomAjax.extend({
   
   
    getLocations() {
        return new Promise((resolve, reject) => {
            this.request('/location')
                .then(data => {
                    resolve(data);
                    //alert(data.city);
                })
                .catch(error => {
                    this.set('errorMessage', error);
                    reject(error);
                });
        });
    },

     getRestaurants() {
        return new Promise((resolve, reject) => {
            this.request('/restaurants')
                .then(data => {
                    resolve(data);
                    alert(data.city);
                })
                .catch(error => {
                    this.set('errorMessage', error);
                    reject(error);
                });
        });
    }
  
    // Rest of the methods
  });