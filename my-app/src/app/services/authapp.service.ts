import { Injectable } from '@angular/core';
import {User, UserService} from './data/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  current:User;
  users:User[]=[]
  notLoggedUser:User;
  logged=false;

  constructor(private userService:UserService) { }
  // tslint:disable-next-line:typedef
  authentication(userName, password) {
    this.getUserByUsername(userName, password)
    // @ts-ignore
    return this.logged;



  }

 getUserByUsername(userName:string, password:string){
    this.userService.getUserByUserName(userName).subscribe(response=>{
      this.notLoggedUser=response;
      if(password==this.notLoggedUser.password){
        sessionStorage.setItem('user', userName);
        this.current=this.notLoggedUser;
        this.logged=true;

      }else this.logged=false;

    });
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
