import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Benvenuto in car rental';
  user = '';

  constructor(private route: ActivatedRoute) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.user = this.route.snapshot.paramMap.get('userName');

  }

}
