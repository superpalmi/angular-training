import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor{

  constructor() { }
  intercept(request:HttpRequest<any>, next:HttpHandler){
    
  }
}
