import { Injectable } from '@angular/core';
import {User, UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  current:User;

  constructor(private userService:UserService) { }
  // tslint:disable-next-line:typedef
  authentication(userName, password) {
    var users=this.userService.getUsers();
    for(let user of users) {
      if (userName ===  user.userName && password === user.password){
        sessionStorage.setItem('user', userName);
        this.current=user;
        return true;

      }

    }



  }

  getCurrentUser(){
    return this.current;
  }
  // tslint:disable-next-line:typedef
  loggedUser(){
    let utente = sessionStorage.getItem('user');
    return (sessionStorage.getItem('user') != null) ? utente : "";

  }


  isLogged(){
    return (sessionStorage.getItem('user')!=null)? true:false;
  }

  clearAll(){
    sessionStorage.removeItem("user");
  }
}
