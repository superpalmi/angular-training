import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor{

  constructor() { }
  intercept(request:HttpRequest<any>, next:HttpHandler){
    let userName = "admin";
    let password = "1234";
    let AuthHeader="Basic " + window.btoa(userName+":"+password)
    request=request.clone({
        setHeaders :
          {
          Authorization: AuthHeader
          }
    })
    return next.handle(request)
  }
}
