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
import models.usersService;
import models.users;
import org.hibernate.cfg.Configuration;
import play.libs.Json;
import java.util.List;
import play.data.FormFactory;
import models.Restoran;
import models.Login;
import java.util.UUID;
import play.data.*;
import javax.validation.Validator;
//import org.hibernate.Query;
import org.hibernate.jpa.HibernateEntityManager;
import models.HibernateUtil;




public  class usersRepository{
   // SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
  //  SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    //Session session = sessionFactory.openSession();
  //  session.beginTransaction();
    //session.save(myObject);
   // HibernateUtil hibernateUtil = new HibernateUtil();
    //Session session=hibernateUtil.getSessionFactory().openSession();
  // EntityManagerFactory emfdb = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
    //EntityManager em;
    //Session session=(Session)em.getDelegate();
    //Session session=factory.openSession();
    @Transactional
    public users create(users user){
        JPA.em().persist(user);
        JPA.em().flush();
        return user;
    }

    @Transactional
    public Login signin(Login login){
        System.out.println("repository");


    //  session.beginTransaction();
       String hql = "select city from users where email = '"+login.getEmail()+"'";
       // session("email", login.getEmail());
        Query query = JPA.em().createQuery(hql);
        List list=query.getResultList();

        if(list.size()==0) {

            System.out.println("ne postoji user");
        }


       // System.out.println("heeeeeeeej" +list.get(0));

        return login;
    }
   /* private Class<T> getParametrizedClass() {
        return (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }*/

    /*protected Criteria getBaseCriteria() {
        Session session = ((HibernateEntityManager) JPA.em()).getSession();
        return session.createCriteria();
    }*/

}