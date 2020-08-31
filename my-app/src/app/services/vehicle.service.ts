import { Injectable } from '@angular/core';
import {VehiclesComponent} from '../vehicles/vehicles.component';
import {Vehicle} from '../vehicles/vehicles.component';
import {VEHICLES} from '../vehicles/vehicles.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor() { }
  checkReservation(dataInizio:Date, dataFine:Date){

  }
  getVehicles(){
    return VEHICLES

  }
}
