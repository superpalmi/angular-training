import { Injectable } from '@angular/core';
import {Reservation} from '../reservation/reservation.component';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server='localhost';
  port='8080';
  users:User[]=[]

  constructor(private httpClient:HttpClient) { }
  getUsers() {
    this.httpClient.get<User[]>('http://' + this.server + ':' + this.port + '/api/user/showall').subscribe( response => {
      this.users = response

    })
    return this.users;
  }

  create(user:User){
    this.httpClient.post('http://'+this.server+':'+this.port+'/api/user/insert', user)


  }
}

export class User{
  id: number;
  userName: string;
  password: string;
  email: string;
  city: string;
  phone: string;
  role: string;
  reservations: Reservation[];

  constructor(id: number, userName: string, password: string, email: string, city: string,phone:string ,role:string, reservations:Reservation[]) {
    this.id=id;
    this.userName=userName;
    this.password=password;
    this.email=email;
    this.city=city;
    this.phone=phone
    this.role=role;
    this.reservations=reservations
  }

}
export const USERS=[
  new User(1, "superpalmi", "1234", "palmi@eri.it", "Milano", "1234", "superuser", [{'id':1,'dataInizio': new Date("2020/09/15"), 'dataFine': new Date("2020/09/17"), plate: 'FA666MA', userName:'superpalmi'}] ),
  new User(2, "nomonecognomone", "1234", "nomone@cognomone.it", "Napoli","1234", "user", [{'id':3,'dataInizio':new Date("2020/12/24"), 'dataFine': new Date("2020/12/31"), plate:'CA444CA', userName:'nomonecognomone'}]),
  new User(3, "richipalmi", "1234", "email@email.it", "Roma","1234", "user", []),
  new User(4, "Riccardo", "1234", "riccardo@email.it", "Roma", "1234","superuser", [{'id':4,'dataInizio':new Date("2020/11/24"), 'dataFine': new Date("2020/11/31"),  plate: 'FA666MA', userName:'Riccardo'}, {'id':5,'dataInizio': new Date("2020/10/15"), 'dataFine': new Date("2020/10/17"), plate:'CA444CA', userName: 'Riccardo'}])

]
