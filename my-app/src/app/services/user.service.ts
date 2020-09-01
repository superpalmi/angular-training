import { Injectable } from '@angular/core';
import {Reservation} from '../reservation/reservation.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  getUsers(){
    return USERS
  }
}

export class User{
  id: number;
  userName: string;
  password: string;
  email: string;
  city: string;
  role: string;
  reservations: Reservation[];

  constructor(id: number, userName: string, password: string, email: string, city: string, role:string, reservations:Reservation[]) {
    this.id=id;
    this.userName=userName;
    this.password=password;
    this.email=email;
    this.city=city;
    this.role=role;
    this.reservations=reservations
  }

}
export const USERS=[
  new User(1, "superpalmi", "1234", "palmi@eri.it", "Milano", "superuser", [{'id':1,'dataInizio': new Date("2020/09/15"), 'dataFine': new Date("2020/09/17")}] ),
  new User(2, "nomonecognomone", "1234", "nomone@cognomone.it", "Napoli", "user", [{'id':3,'dataInizio':new Date("2020/12/24"), 'dataFine': new Date("2020/12/31")}]),
  new User(3, "richipalmi", "1234", "email@email.it", "Roma", "user", []),
  new User(4, "Riccardo", "1234", "riccardo@email.it", "Roma", "superuser", [{'id':4,'dataInizio':new Date("2020/11/24"), 'dataFine': new Date("2020/11/31")}, {'id':5,'dataInizio': new Date("2020/10/15"), 'dataFine': new Date("2020/10/17")}])

]
