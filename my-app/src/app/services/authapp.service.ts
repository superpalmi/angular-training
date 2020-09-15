import { Injectable } from '@angular/core';
import {User, UserService} from './data/user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  current:User=new User(0, '',"","","","","",null)
  users:User[]=[]
  server='localhost';
  port='8080';

  constructor(private userService:UserService, private httpClient:HttpClient) { }
  authentication(userName, password) {
    let authenticated=false;

    this.login(userName, password).subscribe(
      response =>{
        this.current=response
        authenticated=true;
      },
      error => {
        error => {
          console.log(error);
          authenticated=false;
        }
      }
    )
    return authenticated



  }



  getAuthToken(){
    if(this.getCurrentUser()){
      return sessionStorage.getItem("AuthToken")
    }else return '';
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

  private login(userName: string, password: string): Observable<any> {
    return this.httpClient.post('http://'+this.server+':'+this.port+'/api/auth/signin', {userName, password})

  }
}
