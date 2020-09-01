import { Component, OnInit } from '@angular/core';

import {Vehicle, VehicleReservationService} from '../services/vehicle-reservation.service';
import {DatePipe, formatDate} from '@angular/common';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  msg:string;
  dataInizio='';
  dataFine='';
  reservation:Reservation;
  reserving=false;
  constructor(public vehicleReserved:VehicleReservationService){

  }
  ngOnInit(): void {
    this.reservation=new Reservation(0, new Date(), new Date(0), "", "")
  }

  listVehicles(event) {
    this.reservation.dataInizio=this.parseDate(this.dataInizio);
    this.reservation.dataFine=this.parseDate(this.dataFine);

    console.log("inserendo prenotazione: " + this.reservation.dataInizio + this.reservation.dataFine)
    this.reserving=true;

  }

  parseDate(value:string){


      if ((typeof value === 'string') && (value.includes('/'))) {
        const str = value.split('/');

        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const date = Number(str[0]);

        return new Date(year, month, date);
      } else if((typeof value === 'string') && value === '') {
        return new Date();
      }
      const timestamp = typeof value === 'number' ? value : Date.parse(value);
      return isNaN(timestamp) ? null : new Date(timestamp);



  }

}

export class Reservation {
     id: number;
     dataInizio: Date;
    dataFine: Date;
    plate:string;
    userName:string;

    constructor(id: number,
                dataInizio: Date,
                dataFine: Date,
                plate:string,
                userName:string
    ){
      this.id=id;
      this.dataInizio=dataInizio;
      this.dataFine=dataFine;
      this.plate=plate;
      this.userName=userName;
    }

}
