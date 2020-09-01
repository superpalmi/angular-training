import {Component, Input, OnInit} from '@angular/core';

import {Vehicle, VehicleReservationService} from '../services/vehicle-reservation.service';
import {User} from '../services/user.service';
import {AuthappService} from '../services/authapp.service';


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
  @Input("isShow") isShow:boolean = false;
  @Input("reservationHeaderData") reservationHeaderData:any[]
  @Input("rowData") rowData:any[]
  reservations:Reservation[]
  private isCreation: boolean;
  private isEditing: boolean;
  private newReservation: Reservation;
  private oldReservation: Reservation;
  private editReservation: Reservation;
  constructor(public vehicleReserved:VehicleReservationService, private Auth:AuthappService){

  }

  ngOnInit(): void {
    this.reservation=new Reservation(0, new Date(), new Date(0), "", "")
    this.getReservations()
    if(this.isShow==false){
      this.rowData=this.reservations;
    }
  }
  getReservations(){
    this.reservations=this.vehicleReserved.getReservations()
  }
  listVehicles(event) {
    this.reservation.dataInizio=this.parseDate(this.dataInizio);
    this.reservation.dataFine=this.parseDate(this.dataFine);

    console.log("inserendo prenotazione: " + this.reservation.dataInizio + this.reservation.dataFine)
    this.reserving=true;

  }
  eventHandler(event){
    var action=event.action;
    var item=event.item;
    console.log('sono event handler ' + action)
    switch(action){
      case 'NEW_ROW':{
        this.create();
        break
      }
      case 'EDIT':{
        this.edit(item);
        break
      }
      case 'DELETE':{
        this.delete(item);
        break
      }

      default:{
        console.log('switch error');
        break;
      }
    }
  }

  private create() {

    console.log('aperta crazione reservation')
    this.isCreation=true;
    this.isEditing=false;

    this.newReservation=new Reservation(0,new Date(), new Date(), "", "");
    this.rowData=this.reservations.slice();

  }
  insert(){
    this.isCreation=false;
  }

  private edit(reservation:Reservation) {
    if(this.rowData.includes(reservation) && this.Auth.getCurrentUser().role=='superuser'){
      this.isEditing=true;
      this.isCreation=false;
      console.log('sto modificandoooo' + reservation.userName);
      this.oldReservation=reservation;
      this.editReservation=this.oldReservation

    }

  }
  modify(){
    var index = this.reservations.indexOf(this.oldReservation);

    if (index !== -1) {
      this.reservations[index] = this.editReservation;
      this.rowData=this.reservations
    }
    this.isEditing=false;
  }

  private delete(user: User) {
    console.log("sto per entrare nell'useeer")
    if(this.rowData.includes(user) && this.Auth.getCurrentUser().role=='superuser'){
      console.log('sto cancellandooo');
      var index=this.rowData.indexOf(user);
      this.rowData.splice(index, 1 );
    }

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
