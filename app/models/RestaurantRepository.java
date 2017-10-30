package models;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import javax.inject.*;
import javax.persistence.*;
import java.util.concurrent.*;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import models.RestaurantService;
import models.Restoran;
import org.hibernate.cfg.Configuration;
import play.libs.Json;
import java.util.List;
import java.util.ArrayList;
import play.data.FormFactory;
import models.Restoran;
import models.Login;
import java.util.UUID;
import play.data.*;
import javax.validation.Validator;
//import org.hibernate.Query;
import org.hibernate.jpa.HibernateEntityManager;
import models.HibernateUtil;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;

public class RestaurantRepository{

    @Transactional
    public List<Object[]> getAllRestaurants(){
        String hql = "select r from Restoran r";
        // session("email", login.getEmail());
        // ObjectNode item = Json.newObject();
        //item.put("token", token);

        Query query = JPA.em().createQuery("select id,name, address,description, priceRange ,rating,imageFile,openTime,closeTime,phone,coverFile,longitude,latitude from Restoran");
        List<Object[]> list=query.getResultList();
        // Restoran r= list.get(0);
         for(Object[] r: list)
        System.out.println(r[7]);

      //  List<Restoran>r = new ArrayList<Restoran>();


        return list;
       // return list;
    }
}


