import { Injectable } from '@angular/core';
import {VehiclesComponent} from '../vehicles/vehicles.component';
import {Vehicle} from '../vehicles/vehicles.component';
import {Reservation} from '../reservation/reservation.component';
import {VEHICLES} from '../vehicles/vehicles.component';

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
