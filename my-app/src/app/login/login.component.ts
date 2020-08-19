import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';
  auth = false;
  msg = 'username o password non corrette';

  constructor(private route: Router) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  gestAuth() {
    if (this.userName === 'Riccardo' && this.password === '1234'){
      this.auth = true;
      this.route.navigate(['welcome', this.userName]);
      this.msg = 'complimenti ti sei autenticato';
    }else{
       this.auth = false;
    }


  }
}
