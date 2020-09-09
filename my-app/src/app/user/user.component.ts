import { Component, OnInit } from '@angular/core';
import {AuthappService} from '../services/authapp.service';
import {User, UserService} from '../services/data/user.service';
import {Sort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {Reservation} from '../services/data/reservation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  rowData: User[]
  users: User[]=[]
  currentReservations: Reservation[]
  private isCreation: boolean;
  private isEditing: boolean;
  private newUser: User;


  headerData = [

    {key:'id', label:'Id'},
    {key:'userName', label:'Username'},
    {key:'email', label: 'Email' },
    {key:'city' , label: 'City'},
    {key:'phone' , label: 'Phone'},
    {key:'role', label: 'Role'},
    ]


  private oldUser: User;
  private editUser: User;
  public router:string=''
  role: string;


  constructor(private Auth: AuthappService, private userService: UserService, private _router: Router) {
    this.router = _router.url;
    this.role=Auth.getCurrentUser().role

  }
  getUsers(){
    this.userService.getUsers().subscribe(response=>{this.users=response;
      this.rowData=this.users;
      this.newUser=new User(0, "", "", "", "","1234", "", null)
      if(this.Auth.getCurrentUser()!=null){
        this.currentReservations=this.Auth.getCurrentUser().reservations
      }
  })



  }


  ngOnInit(): void {
    this.getUsers();



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
        case 'Phone': return compare(a.phone, b.phone, isAsc);
        case 'Role': return compare(a.role, b.role, isAsc);
        default: return 0;
      }
    });
  }


  eventHandler(event){
    var action=event.action;
    var item=event.item;
    console.log('sono event handler ' + action)
    switch(action){
      case 'NEW_ROW':{
        this.create();
        break
      }
      case 'EDIT':{
        this.edit(item);
        break
      }
      case 'DELETE':{
        this.delete(item);
        break
      }

      default:{
        console.log('switch error');
        break;
      }
    }
  }

  private create() {

    console.log('aperta crazione utente')
    this.isCreation=true;
    this.isEditing=false;

    this.newUser=new User(0, "", "", "", "","1234", "user", null)
    this.rowData=this.users.slice();

  }
  insert(){
    console.log(this.newUser.userName)
    if(this.newUser.reservations!=null){
      if(this.newUser.reservations.length==0){
        console.log("new user" + this.newUser)
        this.editUser.reservations=null;
      }
    }

    this.userService.create(this.newUser).subscribe()
    //this.getUsers();
    this.rowData=this.users
    this.isCreation=false;
  }

  private edit(user: User) {
    if(this.rowData.includes(user) && this.Auth.getCurrentUser().role=='superuser'){
      this.isEditing=true;
      this.isCreation=false;
      console.log('sto modificandoooo' + user.userName);
      this.oldUser=user;
      this.editUser=this.oldUser

    }

  }
  modify(){
    var index = this.users.indexOf(this.oldUser);
    if(this.editUser.reservations.length==0){
      console.log("edit user" + this.editUser)
      this.editUser.reservations=null;
    }
    this.userService.create(this.editUser).subscribe();
    //this.getUsers();


    if (index !== -1) {
      this.users[index] = this.editUser;
      this.rowData=this.users
    }
    this.isEditing=false;
  }

  private delete(user: User) {
    console.log("sto per entrare nell'useeer")
    if(this.rowData.includes(user) && this.Auth.getCurrentUser().role=='superuser'){
      this.userService.delete(user).subscribe();

      console.log('sto cancellandooo');
      var index=this.rowData.indexOf(user);
      this.rowData.splice(index, 1 );
    }

  }
}



function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
