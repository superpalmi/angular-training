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
