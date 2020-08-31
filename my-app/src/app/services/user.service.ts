import { Injectable } from '@angular/core';
import {USERS} from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  getUsers(){
    return USERS
  }
}
