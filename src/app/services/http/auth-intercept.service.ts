import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthappService} from '../authapp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor{

  constructor(private Auth:AuthappService) { }
  intercept(request:HttpRequest<any>, next:HttpHandler ){
    let user = this.Auth.getCurrentUser();
    let authToken=sessionStorage.getItem("token")
    let authTokenType=sessionStorage.getItem("type")
    console.log(authToken)
    let authorization=authTokenType+" "+authToken
    console.log(authorization)
    if(authToken&&user)
    request=request.clone({
        setHeaders :
          {
          Authorization: authorization
          }
    })
    console.log(request)
    return next.handle(request)
  }
}
