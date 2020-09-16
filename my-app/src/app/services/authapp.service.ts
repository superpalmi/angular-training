import { Injectable } from '@angular/core';
import {User, UserService} from './data/user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
export class JwtResponse{
  token:string
  type:string
  user:User
  constructor(token:string,type:string,user:User){
    this.token=token
    this.type=type
    this.user=user

  }
}

export class JwtToken{
  token:string;
  type:string;
  constructor(token:string, type:string) {
    this.token=token
    this.type=type
  }
}



@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  private current:any;
  private token:JwtToken
  server='localhost';
  port='8080';

  constructor(private userService:UserService, private httpClient:HttpClient) { }




  setCurrentUser(user:User){
    sessionStorage.setItem('user', user.userName)
    this.current=user;
  }

  setCurrentToken(token:string, type:string){
    this.token=new JwtToken(token, type)
    console.log("sono set current token")
    sessionStorage.setItem('token', this.token.token);
    sessionStorage.setItem('type', this.token.type);

  }

  getCurrentToken(){
    return this.token;
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
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post('http://'+this.server+':'+this.port+'/api/auth/signin', {username, password})

  }
}
