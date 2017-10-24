package models;
import  javax.inject.Inject;
import javax.inject.Singleton;
import  models.Restoran;
import  models.RestaurantRepository;
import java.util.List;


@Singleton
public  class RestaurantService {

    @Inject
    private RestaurantRepository restaurantRepository;

    @Inject
    public RestaurantRepository getRestaurantRepository() {
        return restaurantRepository;
    }

    /* public Restoran create(Restoran restaurant){

         return restaurantRepository.create(restaurant);
     }*/
    public List<String> getAllRestaurants() {
        //  System.out.println( user.getId());
        return restaurantRepository.getAllRestaurants();
    }

}
