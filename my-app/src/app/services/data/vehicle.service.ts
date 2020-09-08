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

  getVehicles() {
    this.fetchServer();
    console.log(this.vehicles)
    return this.vehicles;
  }
  fetchServer(){
    this.httpClient.get<Vehicle[]>('http://' + this.server + ':' + this.port + '/api/vehicle/showall').subscribe( response => {
      this.vehicles = response

    })

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
  brand: string;
  immdate: Date;
  model: string;
  plate: string;
  type: string;
  reservations: Reservation[];

  constructor(
    id: number,
    brand: string,
    immdate: Date,
    model: string,
    plate: string,
    type: string,
    reservations: Reservation[],
  ) {
    this.id=id;
    this.brand=brand;
    this.immdate=immdate;
    this.model=model;
    this.plate=plate;
    this.type=type;
    this.reservations=reservations;
  }




}
