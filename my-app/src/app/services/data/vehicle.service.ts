import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user.service';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Reservation} from './reservation.service';
import {AuthappService} from '../authapp.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  server='localhost';
  port='8080';
  vehicles:Vehicle[]=[]
  vehicle:Vehicle;

  constructor(private httpClient:HttpClient, private Auth:AuthappService) { }
  getBasicAuthHeader(userName:string, password:string){
    let retval = "Basic "+window.btoa(userName + ":"+ password);
    return retval;
  }

  getVehicles(): Observable<Vehicle[]> {
    let headers = new HttpHeaders(

      {Authorization: this.getBasicAuthHeader(this.Auth.current.userName, this.Auth.current.password)}
    )
    return this.httpClient.get<Vehicle[]>('http://' + this.server + ':' + this.port + '/api/vehicle/showall', {headers})

  }

  create(vehicle:Vehicle):Observable<Vehicle>{
    let headers = new HttpHeaders(

      {Authorization: this.getBasicAuthHeader(this.Auth.current.userName, this.Auth.current.password)}
    )
    return this.httpClient.post<Vehicle>('http://'+this.server+':'+this.port+'/api/vehicle/insert', vehicle, {headers})


  }
  delete(vehicle:Vehicle): Observable<{}>{
    let headers = new HttpHeaders(

      {Authorization: this.getBasicAuthHeader(this.Auth.current.userName, this.Auth.current.password)}
    )
    console.log('delete service')
    return this.httpClient.delete('http://'+this.server+':'+this.port+'/api/vehicle/delete/'+vehicle.id, {headers})
  }

  getBookableVehicles(res: Reservation): Observable<any>{
    // @ts-ignore
    let headers = new HttpHeaders(

      {Authorization: this.getBasicAuthHeader(this.Auth.current.userName, this.Auth.current.password)}
    )
    // @ts-ignore
    return this.httpClient.get<Vehicle[]>('http://'+this.server+':'+this.port+'/api/vehicle/bookable', res, {headers})

  }
  getVehicleById(id:number){
    this.httpClient.get<Vehicle>('http://'+this.server+':'+this.port+'/api/vehicle/detail/'+id).subscribe(response =>{
      this.vehicle=response;
    })
  }
}

export class Vehicle{
  id: number;
  plate: string;
  brand: string;
  model: string;
  immdate: Date;


  type: string;
  reservations: Reservation[];

  constructor(
    id: number,
    plate: string,
    brand: string,
    model: string,
    immdate: Date,
    type: string,
    reservations: Reservation[],
  ) {
    this.id=id;
    this.plate=plate;
    this.brand=brand;
    this.model=model;
    this.immdate=immdate;


    this.type=type;
    this.reservations=reservations;
  }




}
