import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthappService, JwtResponse} from '../services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response:JwtResponse
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
    this.authentication(this.userName, this.password)
  }







  authentication(username, password) {

    console.log("sono authentication")

    this.Auth.login(username, password).subscribe(
      response => {
        this.response = response
        this.Auth.setCurrentUser(this.response.user);
        this.Auth.setCurrentToken(this.response.token, this.response.type)
        console.log(this.response, this.Auth.getCurrentUser())
        this.route.navigate(['welcome', this.userName]);
        this.msg = 'complimenti ti sei autenticato';



      },
      error => {
        error => {
          console.log(error);
          console.log("username e password sbagliate")
          this.auth = false;

        }
      }
    )

  }
}
