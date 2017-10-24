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
import models.JwtUtility;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;
/*import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;*/



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
        System.out.println("kontroler "+ login.getPassword());

        String result= authenticate(login);
        JwtUtility jwt= new JwtUtility();
        String token=jwt.makeToken();

        ObjectNode item = Json.newObject();
        item.put("token", token);
        if(result.equals("Invalid user or password")) {
            ObjectNode valid = Json.newObject();
            valid.put("token", "Invalid user or password");
            return badRequest(valid);
        }
        return ok(item);
    }
    public String authenticate (Login login){

        String validate= validate(login);

        return validate;
    }

    public String validate(Login login){

        if(login.getEmail()==null || login.getEmail().equals("") ||login.getPassword().equals("") || login.getPassword()==null ){
            return "Invalid user or password";
        }
        return "You're logged in";
    }

    @Transactional
    public Result logout(){
        session().clear();
    return ok();
    }


}