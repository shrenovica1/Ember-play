package controllers;
import play.data.Form;
import play.mvc.*;
import play.db.jpa.Transactional;
import views.html.*;
import  javax.inject.Inject;
import javax.inject.Singleton;
import play.db.jpa.JPA;
import models.RestaurantService;
import play.libs.Json;
import play.data.FormFactory;
import models.Restoran;
import models.Login;
import java.util.UUID;
import play.data.*;
import javax.validation.Validator;
import play.mvc.Controller;
import models.JwtUtility;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import play.libs.Json;

import java.util.List;


public class RestaurantController extends Controller{

    @Inject public FormFactory formFactory;

    @Inject
    public void setFormFactory(FormFactory formFactory) {
        this.formFactory = formFactory;
    }
    private RestaurantService restaurantService;

    @Inject
    public void setRestaurantService(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @Transactional
    public Result getAllRestaurants(){
        List<String> restaurants=  this.restaurantService.getAllRestaurants();
        ObjectNode item = Json.newObject();
        ArrayNode lista=Json.newArray();
        item.put("restaurant", Json.toJson(restaurants));


        return ok(item);
    }

}