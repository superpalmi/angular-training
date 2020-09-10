import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Reservation} from './reservation.service';
import {AuthappService} from '../authapp.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server='localhost';
  port='8080';
  current:User;
  users:User[]=[]
  notLoggedUser:User;
  logged=false;

  constructor(private httpClient:HttpClient) { }

  authentication(userName, password) {
    this.getUserByUsername(userName, password)
    // @ts-ignore
    return this.logged;



  }
  getCurrentUser(){
    return this.current;
  }
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
  getUserByUsername(userName:string, password:string){
    this.getUserByUserName(userName).subscribe(response=>{
      this.notLoggedUser=response;
      if(password==this.notLoggedUser.password){
        sessionStorage.setItem('user', userName);
        this.current=this.notLoggedUser;
        this.logged=true;

      }else this.logged=false;

    });
  }
  getBasicAuthHeader(userName:string, password:string){
    let retval = "Basic "+window.btoa(userName + ":"+ password);
    return retval;
  }

  getUsers(): Observable<any[]> {

    return this.httpClient.get<User[]>('http://' + this.server + ':' + this.port + '/api/user/showall')
  }

  create(user:User):Observable<User>{
    return this.httpClient.post<User>('http://'+this.server+':'+this.port+'/api/user/insert', user)


  }
  delete(user:User): Observable<{}>{
    let headers = new HttpHeaders(

      {Authorization: this.getBasicAuthHeader(this.current.userName, this.current.password)}
    )
    console.log('delete service')
    return this.httpClient.delete('http://'+this.server+':'+this.port+'/api/user/delete/'+user.id, {headers})
  }
  getUserByUserName(userName:string): Observable<any>{
    // @ts-ignore
    return this.httpClient.get<User>('http://'+this.server+':'+this.port+'/api/user/extract/', userName)
  }

}

export class User{
  id: number;
  userName: string;
  password: string;
  email: string;
  phone: string;
  city: string;

  role: string;
  reservations: Reservation[];

  constructor(id: number, userName: string, password: string, email: string,phone:string , city: string,role:string, reservations:Reservation[]) {
    this.id=id;
    this.userName=userName;
    this.password=password;
    this.email=email;
    this.phone=phone
    this.city=city;

    this.role=role;
    this.reservations=reservations
  }

}
