import { Injectable } from '@angular/core';
import {User, UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  current:User;
  users:User[]=[]

  constructor(private userService:UserService) { }
  // tslint:disable-next-line:typedef
  authentication(userName, password) {
    this.getUsers()
    // @ts-ignore
    for(let user of this.users) {
      if (userName ===  user.userName && password === user.password){
        sessionStorage.setItem('user', userName);
        this.current=user;
        return true;

      }

    }



  }

  getUsers(){
    this.users=this.userService.getUsers()





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
