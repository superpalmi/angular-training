import { Injectable } from '@angular/core';
import {VehiclesComponent} from '../vehicles/vehicles.component';
import {Reservation} from '../reservation/reservation.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleReservationService {

  constructor() { }
  getVehicles(){
    return VEHICLES
  }
  checkReservation(reservation: Reservation){

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

export const VEHICLES = [
  new Vehicle(13, 'Fiat',new Date(2020,7,30) , 'punto' , 'FA585MA', 'berlina', [{'id':1,'dataInizio': new Date("2020/09/15"), 'dataFine': new Date("2020/09/17"), plate: 'FA585MA', userName:'superpalmi'}]),
  new Vehicle(14, 'Fiat', new Date(2020,7,28), 'Freemont' , 'CA444CA', 'suv', [{'id':2,'dataInizio':new Date("2020/10/11"), 'dataFine': new Date("2020/10/20"), plate:'CA444CA', userName:'nomonecognomone'},{'id':3,'dataInizio':new Date("2020/12/24"), 'dataFine': new Date("2020/12/31"),plate: 'FA585MA', userName:'superpalmi'}]),
  new Vehicle(15, 'Fiat', new Date('2020-07-01'), 'Panda' , 'EA666PA', 'berlina', [])


];
