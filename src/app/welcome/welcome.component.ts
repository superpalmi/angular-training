import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WelcomeDataService} from '../services/data/welcome-data.service';
import {AuthappService} from '../services/authapp.service';
import {User} from '../services/data/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Interagisci con il backend';
  user:User
  msg:any;

  constructor(private route: ActivatedRoute, private welcomeDataService:WelcomeDataService, private Auth:AuthappService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.user = this.Auth.getCurrentUser()

  }



  handleResponse(response: Object){
    this.msg=response

  }
  handleError(error){
    this.msg=error.error.message;
  }




}
