import { Component, OnInit } from '@angular/core';
import {AuthappService} from '../services/authapp.service';
import {Reservation} from '../reservation/reservation.component';
import {User, UserService} from '../services/user.service';
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
    {key:'dataFine', label: 'dataFine'},
    {key:'plate', label: 'Plate'},
    {key:'userName', label: 'Username'}
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



function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
