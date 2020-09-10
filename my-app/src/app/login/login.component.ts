import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthappService} from '../services/authapp.service';
import {User, UserService} from '../services/data/user.service';

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
  isLogged=false;
  role:string='';

  constructor(private route: Router,private userService:UserService) {
    if(userService.getCurrentUser()!=null){
      this.isLogged=userService.isLogged();
      this.role=userService.getCurrentUser().role
    }

  }

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
     if (this.userService.authentication(this.userName, this.password)){

       this.route.navigate(['welcome', this.userName]);
       this.msg = 'complimenti ti sei autenticato';
     }else{
       console.log("username e password sbagliate")
       this.auth = false;
     }


  }
}
