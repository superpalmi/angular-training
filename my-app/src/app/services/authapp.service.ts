import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor() { }
  // tslint:disable-next-line:typedef
  authentication(userName, password) {
    if (userName === 'Riccardo' && password === '1234'){
      sessionStorage.setItem('user', userName);
      return true;

    } else {
      return false;
    }
  }
  // tslint:disable-next-line:typedef
  loggedUser(){
    let utente = sessionStorage.getItem('user');
    return (sessionStorage.getItem('user') != null) ? utente : "";

  }

  isLogged(){
    return (sessionStorage.getItem('user')!=null)? true:false;
  }

  clearAll(){
    sessionStorage.removeItem("user");
  }
}
