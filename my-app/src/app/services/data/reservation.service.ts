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
  getReservations(){
    this.fetchServer();
    return this.reservations;

  }

  fetchServer(){
    this.httpClient.get<Reservation[]>('http://' + this.server + ':' + this.port + '/api/reservation/showall').subscribe( response => {
      this.reservations = response

    })

  }
  create(reservation:Reservation):Observable<Reservation>{
    return this.httpClient.post<Reservation>('http://'+this.server+':'+this.port+'/api/reservation/insert', reservation)


  }
  delete(reservation:Reservation): Observable<{}>{
    console.log('delete service')
    return this.httpClient.delete('http://'+this.server+':'+this.port+'/api/reservation/delete/'+reservation.id)
  }
  getReservationById(id:number){
    this.httpClient.get<Reservation>('http://'+this.server+':'+this.port+'/api/reservation/detail/'+id).subscribe(response =>{
      this.reservation=response;
    })
  }



}

export class Reservation {
  id: number;
  dataInizio: Date;
  dataFine: Date;
  vehicle: Vehicle;
  user: User

  constructor(id: number,
              dataInizio: Date,
              dataFine: Date,
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
