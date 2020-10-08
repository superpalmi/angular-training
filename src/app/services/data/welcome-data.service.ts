import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private httpClient:HttpClient) { }

  getSaluti(user:string){
    //console.log("sono il servizio welcome")
    return this.httpClient.get('http://localhost:8050/api/welcome/'+user)
  }
}
