import { Injectable } from '@angular/core';
import {User, UserService} from './data/user.service';


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
        console.log("utente loggato " + user);
        sessionStorage.setItem('user', userName);
        this.current=user;
        return true;

      }

    }



  }

  getUsers(){
    this.userService.getUsers().subscribe(response=>this.users=response)
    console.log(this.users)





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
