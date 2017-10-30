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
import models.SingleRestaurant;
import java.util.UUID;
import play.data.*;
import javax.validation.Validator;
import play.mvc.Controller;
import models.JwtUtility;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import play.libs.Json;

import java.util.List;
import java.util.ArrayList;


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
        List<Object[]> restaurants=  this.restaurantService.getAllRestaurants();

        ArrayNode lista=Json.newArray();

     List<String> restorani= new ArrayList();
       // Restoran rest;
        for(int i=0; i<restaurants.size(); i++){
          //  rest= new Restoran (restaurants.get(i)[1].toString(),restaurants.get(i)[2].toString(),restaurants.get(i)[3].toString(),Double.parseDouble(restaurants.get(i)[4].toString()),Double.parseDouble(restaurants.get(i)[5].toString()),restaurants.get(i)[6].toString(),restaurants.get(i)[7].toString(),restaurants.get(i)[8].toString(),restaurants.get(i)[9].toString(),restaurants.get(i)[10].toString(),Double.parseDouble(restaurants.get(i)[11].toString()),Double.parseDouble(restaurants.get(i)[].toString()));
            Restoran rest= new Restoran();
            ObjectNode item = Json.newObject();
           rest.setName(restaurants.get(i)[1].toString());
           rest.setImageFile(restaurants.get(i)[6].toString());
         //  UUID id= new UUID();
           rest.setId(UUID.fromString(restaurants.get(i)[0].toString()));
           rest.setRating(Double.parseDouble(restaurants.get(i)[5].toString()));
           System.out.println(restaurants.get(i)[1].toString());
           // item.put("restaurant", Json.toJson(rest));
           lista.add(Json.toJson(rest));
            System.out.println(lista.get(0).toString());
           // restorani.add(restaurants.get(i))
        }
        ObjectNode restoraniVracam = Json.newObject();
        restoraniVracam.put("restaurants", lista);
        //System.out.println(lista.get(0).toString());
       // System.out.println(lista.get(0).toString());


        return ok(restoraniVracam);
    }
    @Transactional
    public Result getSingleRestaurant(){
        Form<SingleRestaurant> single = formFactory.form(SingleRestaurant.class);
        SingleRestaurant restaurant = single.bindFromRequest().get();

        if (single.hasErrors()) {
            return badRequest("form has errors");
        }
        System.out.println(restaurant.getId());
        ObjectNode item = Json.newObject();
        ArrayNode lista=Json.newArray();

      /*  item.put("id", Json.toJson(restaurant.getId()));
        item.put("name",Json.toJson(restaurant.getName()));
        item.put("address",Json.toJson(restaurant.getId()));
        item.put("description",Json.toJson(restaurant.getId()));
        item.put("priceranfe",Json.toJson(restaurant.getId()));
        item.put("name",Json.toJson(restaurant.getId()));
        item.put("name",Json.toJson(restaurant.getId()));
        item.put("name",Json.toJson(restaurant.getId()));
        item.put("name",Json.toJson(restaurant.getId()));
        item.put("name",Json.toJson(restaurant.getId()));
        */
      System.out.println(restaurant.getName());
       item.put("restaurant", Json.toJson(restaurant));
       System.out.println(item.toString());
        return ok(item);
    }

}