package controllers;
import play.data.Form;
import play.mvc.*;
import play.db.jpa.Transactional;
import views.html.*;
import  javax.inject.Inject;
import javax.inject.Singleton;
import play.db.jpa.JPA;
import models.usersService;
import models.users;
import play.libs.Json;
import play.data.FormFactory;
import models.Restoran;
import models.Login;
import java.util.UUID;
import play.data.*;
import javax.validation.Validator;
import play.mvc.Controller;


public class UsersController extends Controller {



    @Inject public FormFactory formFactory;

    @Inject
    public void setFormFactory(FormFactory formFactory) {
        this.formFactory = formFactory;
    }
    private usersService UsersService;

    @Inject
    public void setUsersService(usersService usersService) {
        this.UsersService = usersService;
    }

    @Transactional
    public Result create() {

        Form<users> userForm = formFactory.form(users.class);
      users User = userForm.bindFromRequest().get();

       if (userForm.hasErrors()) {
            return badRequest("form has errors");
        }

       this.UsersService.create(User);

        return ok();

    }
    @Transactional
    public  Result signin(){
        Form<Login> loginForm = formFactory.form(Login.class);
        Login login = loginForm.bindFromRequest().get();

        if (loginForm.hasErrors()) {
            return badRequest("form has errors");
        }
        session("email", login.getEmail());
        String poruka= session("email");

        System.out.println("kontroler");

        this.UsersService.signin(login);
        //session().clear();

        return ok("kontroler");
    }
    public Result authenticate (){

    }


}