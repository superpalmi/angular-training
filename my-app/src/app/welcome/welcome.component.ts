import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WelcomeDataService} from '../services/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Interagisci con il backend';
  user = '';
  msg:any;

  constructor(private route: ActivatedRoute, private welcomeDataService:WelcomeDataService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.user = this.route.snapshot.paramMap.get('userName');

  }



  handleResponse(response: Object){
    this.msg=response

  }
  handleError(error){
    this.msg=error.error.message;
  }




}
