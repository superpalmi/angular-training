import { Injectable } from '@angular/core';
import {User, UserService} from './data/user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';



export class AuthData{
  constructor(public codice:string,
              public messaggio:string
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  current:User;
  users:User[]=[]
  server='localhost';
  port='8080';

  constructor(private userService:UserService, private httpClient:HttpClient) { }
  // tslint:disable-next-line:typedef
  authentication(userName, password) {

    // @ts-ignore
    this.checkUser(userName, password).subscribe(
      response =>{
        this.current=response;
        sessionStorage.setItem("user", this.current.userName)
      },
      error => {
        error => {
          console.log(error);
        }
      }
    )



  }

  checkUser(userName:string, password:string): Observable<User>{
    let headers=new HttpHeaders(
      { Authorization: "Basic " + window.btoa(userName+":"+password)
      }
    )
    return this.httpClient.post<User>('http://' + this.server + ':' + this.port + '/api/user/check', {headers}).pipe(
      map(
        response =>{
          sessionStorage.setItem("user", userName);
          return response;
        }
      )
    )

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
