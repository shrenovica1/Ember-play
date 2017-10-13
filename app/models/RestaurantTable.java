package models;
import play.data.Form;
import play.data.FormFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.jpa.HibernateEntityManager;
import play.db.jpa.JPA;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Base64;
import java.util.UUID;
import java.lang.Object;
import javax.persistence.EntityManager;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.Constraint;
import play.data.Form.*;
import play.db.jpa.JPAApi;


@Entity
@Table(name="\"restaurant_table\"")
public class RestaurantTable {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private  UUID id;

    @Column(name = "restaurant_id")
    private UUID restaurantId;

    @Column (name="chairs")
    private Integer chairs;
    public UUID getId() {
        return id;
    }


    public RestaurantTable(){

    }
    public void setId(UUID id) {
        this.id=id;
    }

    public UUID getRestaurantId(){
        return restaurantId;
    }
    public void setRestaurntId(UUID restaurantId){
        this.restaurantId=restaurantId;
    }
    public Integer getChairs(){
        return chairs;
    }
    public void setChairs(Integer chairs){
        this.chairs=chairs;
    }
}