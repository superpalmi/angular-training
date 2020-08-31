import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {User} from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor(private userService:UserService) { }
  // tslint:disable-next-line:typedef
  authentication(userName, password) {
    var users=this.userService.getUsers();
    for(let user of users) {
      if (userName ===  user.userName && password === user.password){
        sessionStorage.setItem('user', userName);
        return true;

      } else {
        return false;
      }

    }



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
