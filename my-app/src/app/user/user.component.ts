import { Component, OnInit } from '@angular/core';
import {AuthappService} from '../services/authapp.service';
import {Reservation} from '../reservation/reservation.component';
import {UserService} from '../services/user.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  rowData: User[]
  users: User[];
  currentReservations: Reservation[]

  headerData = [

    {key:'id', label:'Id'},
    {key:'userName', label:'Username'},
    {key:'email', label: 'Email' },
    {key:'city' , label: 'City'},
    {key:'role', label: 'Role'},
    ]

  reservationHeaderData = [
    {key:'id', label:'Id'},
    {key:'dataInizio', label: 'dataInizio'},
    {key:'dataFine', label: 'dataFine'}
  ]


  constructor(private Auth: AuthappService, private userService: UserService) {

  }
  getUsers(){
    this.users=this.userService.getUsers()
  }


  ngOnInit(): void {
    this.getUsers();
    this.rowData=this.users;
    this.currentReservations=this.Auth.getCurrentUser().reservations
  }

  sortData(sort: Sort) {

    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {

      this.rowData = data;
      return;
    }

    this.rowData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Id': return compare(a.id,b.id, isAsc);
        case 'Username': return compare(a.userName, b.userName, isAsc);
        case 'Email': return compare(a.email, b.email, isAsc);
        case 'City': return compare(a.city, b.city, isAsc);
        case 'Role': return compare(a.role, b.role, isAsc);
        default: return 0;
      }
    });
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
  new User(1, "superpalmi", "1234", "palmi@eri.it", "Milano", "superusers", [{'id':1,'dataInizio': new Date("2020/09/15"), 'dataFine': new Date("2020/09/17")}] ),
  new User(2, "nomonecognomone", "1234", "nomone@cognomone.it", "Napoli", "user", [{'id':3,'dataInizio':new Date("2020/12/24"), 'dataFine': new Date("2020/12/31")}]),
  new User(3, "richipalmi", "1234", "email@email.it", "Roma", "user", []),
  new User(4, "Riccardo", "1234", "riccardo@email.it", "Roma", "superuser", [{'id':4,'dataInizio':new Date("2020/11/24"), 'dataFine': new Date("2020/11/31")}, {'id':5,'dataInizio': new Date("2020/10/15"), 'dataFine': new Date("2020/10/17")}])

]

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
