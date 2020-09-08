import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Reservation} from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server='localhost';
  port='8080';
  users:User[]=[]
  user:User;

  constructor(private httpClient:HttpClient) { }
  getUsers() {
    this.fetchServer();
    console.log(this.users)
    return this.users;
  }
  fetchServer(){
    this.httpClient.get<User[]>('http://' + this.server + ':' + this.port + '/api/user/showall').subscribe( response => {
      this.users = response

    })

  }

  create(user:User):Observable<User>{
    return this.httpClient.post<User>('http://'+this.server+':'+this.port+'/api/user/insert', user)


  }
  delete(user:User): Observable<{}>{
    console.log('delete service')
    return this.httpClient.delete('http://'+this.server+':'+this.port+'/api/user/delete/'+user.id)
  }
  getUserById(id:number){
    this.httpClient.get<User>('http://'+this.server+':'+this.port+'/api/user/detail/'+id).subscribe(response =>{
      this.user=response;
    })
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
