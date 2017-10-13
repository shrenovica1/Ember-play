package models;
import  javax.inject.Inject;
import javax.inject.Singleton;
import  models.users;
import  models.usersRepository;


@Singleton
public  class usersService{

    @Inject
    private usersRepository usersRepository;

    @Inject
    public usersRepository getUsersRepository() {
        return usersRepository;
    }

    public users create(users user){
        System.out.println( user.getId());
        return usersRepository.create(user);
 }
    public Login signin(Login login){
        System.out.println("servis");
        return usersRepository.signin(login);
    }

}