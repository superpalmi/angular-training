import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../vehicles/vehicles.component';
import {VehicleReservationService} from '../services/vehicle-reservation.service';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  msg:string;
  reservation:Reservation;
  reserving=false;
  constructor(public vehicleReserved:VehicleReservationService){

  }
  ngOnInit(): void {
    this.reservation=new Reservation(0, new Date(0), new Date(0))
  }

  listVehicles(event) {
    this.reserving=true;

  }
}

export class Reservation {
    public id: number;
    public dataInizio: Date;
    public dataFine: Date;
    constructor(id: number,
                dataInizio: Date,
                dataFine: Date,
    ){
      this.id=id;
      this.dataInizio=dataInizio;
      this.dataFine=dataFine;
    }

}
