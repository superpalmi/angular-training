import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthappService} from '../services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = '';
  password = '';
  auth = true;
  msg = 'username o password non corrette';

  constructor(private route: Router, public Auth: AuthappService) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  gestAuth() {
    /*
    if (this.userName === 'Riccardo' && this.password === '1234'){
      this.auth = true;
      this.route.navigate(['welcome', this.userName]);
      this.msg = 'complimenti ti sei autenticato';
    }else{
       this.auth = false;
    }
    */
     if (this.Auth.authentication(this.userName, this.password)){

       this.route.navigate(['welcome', this.userName]);
       this.msg = 'complimenti ti sei autenticato';
     }else{
       this.auth = false;
     }


  }
}
