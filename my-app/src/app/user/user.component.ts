import { Component, OnInit } from '@angular/core';
import {AuthappService} from '../services/authapp.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(public Auth:AuthappService) { }

  ngOnInit(): void {
  }

}
export class User{
  id: number;
  userName: string;
  password: string;
  email: string;
  city: string;
  role: string;

  constructor(id: number, userName: string, password: string, email: string, city: string, role:string) {
    this.id=id;
    this.userName=userName;
    this.password=password;
    this.email=email;
    this.city=city;
    this.role=role;
  }

}
