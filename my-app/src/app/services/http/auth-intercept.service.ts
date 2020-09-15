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
    let authToken=this.Auth.getAuthToken();
    if(authToken&&user)
    request=request.clone({
        setHeaders :
          {
          Authorization: authToken
          }
    })
    return next.handle(request)
  }
}
