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

    @Transactional
    public users create(users user){
        JPA.em().persist(user);
        JPA.em().flush();
        return user;
    }

    @Transactional
    public Login signin(Login login){
        System.out.println("repository");

       String hql = "select city from users where email = '"+login.getEmail()+"'";
       // session("email", login.getEmail());
        Query query = JPA.em().createQuery(hql);
        List list=query.getResultList();

        boolean aut= validate(login);
        if(list.size()==0 || aut==false) {
            login.setPassword("");
            System.out.println("ne postoji user");

        }

        return login;
    }
    @Transactional
    public boolean validate(Login login){
        String hql = "select email from users where email = '"+login.getEmail()+"'";
        Query query = JPA.em().createQuery(hql);
        List list=query.getResultList();

        if(list.size()==0) {
           return false;
        }

            hql = "select passwor from users where email ='" + login.getEmail() + "'";
            query = JPA.em().createQuery(hql);
            String pass = query.getSingleResult().toString();
            if (pass.equals(login.getPassword())) return true;


        return false;
    }
   /* private Class<T> getParametrizedClass() {
        return (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }*/

    /*protected Criteria getBaseCriteria() {
        Session session = ((HibernateEntityManager) JPA.em()).getSession();
        return session.createCriteria();
    }*/

}