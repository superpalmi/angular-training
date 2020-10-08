import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.service';

import {Observable} from 'rxjs';
import {Vehicle} from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  server='localhost';
  port='8080';
  reservations:Reservation[]=[]
  reservation:Reservation;

  constructor(private httpClient:HttpClient) { }
  getReservations(): Observable<any[]>{
    return this.httpClient.get<Reservation[]>('http://' + this.server + ':' + this.port + '/api/reservation/showall')
  }

  getUserReservations(user: User): Observable<any[]>{
    return this.httpClient.get<Reservation[]>('http://' + this.server + ':' + this.port + '/api/reservation/personal/'+user.id)

  }

  getVehicleReservations(vehicle: Vehicle): Observable<any[]>{
    return this.httpClient.get<Reservation[]>('http://' + this.server + ':' + this.port + '/api/reservation/vehicle/'+vehicle.id)

  }





  create(reservation:Reservation):Observable<Reservation>{
    return this.httpClient.post<Reservation>('http://'+this.server+':'+this.port+'/api/reservation/insert', reservation)


  }
  delete(reservation:Reservation): Observable<Reservation>{
    console.log('delete service')
    return this.httpClient.delete<Reservation>('http://'+this.server+':'+this.port+'/api/reservation/delete/'+reservation.id)
  }



}

export class Reservation {
  id: number;
  dataInizio: string
  dataFine: string;
  vehicle: Vehicle;
  user: User

  constructor(id: number,
              dataInizio: string,
              dataFine: string,
              vehicle: Vehicle,
              user: User
  ){
    this.id=id;
    this.dataInizio=dataInizio;
    this.dataFine=dataFine;
    this.vehicle=vehicle;
    this.user=user;
  }

}
