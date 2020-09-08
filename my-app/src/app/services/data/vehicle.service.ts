import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Reservation} from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  server='localhost';
  port='8080';
  vehicles:Vehicle[]=[]
  vehicle:Vehicle;

  constructor(private httpClient:HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>('http://' + this.server + ':' + this.port + '/api/vehicle/showall')

  }

  create(vehicle:Vehicle):Observable<Vehicle>{
    return this.httpClient.post<Vehicle>('http://'+this.server+':'+this.port+'/api/vehicle/insert', vehicle)


  }
  delete(vehicle:Vehicle): Observable<{}>{
    console.log('delete service')
    return this.httpClient.delete('http://'+this.server+':'+this.port+'/api/vehicle/delete/'+vehicle.id)
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
