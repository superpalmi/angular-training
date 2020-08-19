import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  gestAuth() {
    if (this.userName === 'Riccardo' && this.password === '1234'){
      this.auth = true;
      this.msg = 'complimenti ti sei autenticato';
    }else{
      this.auth = false;
    }


  }
}
