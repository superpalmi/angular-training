import {Component, Input, OnInit} from '@angular/core';
import {User} from '../services/data/user.service';
import {AuthappService} from '../services/authapp.service';
import {Reservation, ReservationService} from '../services/data/reservation.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  msg:string;
  dataInizio=new Date();
  dataFine=new Date();
  reservation:Reservation;
  reserving=false;
  userRowData:any[]
  customKey1='vehicle';
  customKey2='user';
  customChild1='plate';
  customChild2='userName';
  @Input("isShow") isShow:boolean = false;

  rowData:any[]
  reservations:Reservation[]
  private isCreation: boolean;
  private isEditing: boolean;
  private newReservation: Reservation;
  private oldReservation: Reservation;
  private editReservation: Reservation;
  role:string=''
   router:string = ''
  reservationHeaderData = [
    {key:'id', label:'Id'},
    {key:'dataInizio', label: 'dataInizio'},
    {key:'dataFine', label: 'dataFine'},
    {key:'vehicle', label: 'Vehicle'},
    {key:'user', label: 'User'}

  ]
  constructor(private reservationService:ReservationService, private Auth:AuthappService, private _router: Router, private datePipe:DatePipe){
    this.router=_router.url
    this.role=Auth.getCurrentUser().role

  }

  ngOnInit(): void {
    this.reservation=new Reservation(0, this.datePipe.transform(this.dataInizio,'yyyy-dd-MM'),this.datePipe.transform(this.dataFine,'yyyy-dd-MM'), null, null)
    this.getReservations()
    this.getUserReservations(this.Auth.getCurrentUser())

  }


  getReservations(){
    this.reservationService.getReservations().subscribe(response=>{
      this.reservations=response;

      //this.userRowData=this.reservations.filter(reservation => reservation.user = this.Auth.getCurrentUser());
      this.rowData=this.reservations;


    })

  }
  getUserReservations(user:User){
    this.reservationService.getUserReservations(user).subscribe(response=>{
      this.userRowData=response;





    })
  }
  listVehicles(event) {
    /*
    this.reservation.dataInizio=this.parseDate(this.dataInizio.toString());
    this.reservation.dataFine=this.parseDate(this.dataFine.toString());
    */



    //this.reservation.dataInizio=this.datePipe.transform(this.reservation.dataInizio,"yyyy-MM-dd")
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

    this.newReservation=new Reservation(0,'', '', null, null);
    this.rowData=this.reservations.slice();

  }
  insert(){
    this.isCreation=false;
  }

  private edit(reservation:Reservation) {
    if(this.rowData.includes(reservation) && this.Auth.getCurrentUser().role=='superuser'){
      this.isEditing=true;
      this.isCreation=false;
      console.log('sto modificandoooo' + reservation.user.userName);
      this.oldReservation=reservation;
      this.editReservation=this.oldReservation

    }

  }
  modify(){
    var index = this.reservations.indexOf(this.oldReservation);
    this.reservationService.create(this.newReservation).subscribe()

    if (index !== -1) {
      this.reservations[index] = this.editReservation;
      this.rowData=this.reservations
    }
    this.isEditing=false;
  }

  private delete(reservation: Reservation) {
    console.log("sono prima dell'if")
    if( this.Auth.getCurrentUser().role=='superuser'){
      console.log('sto cancellandooo');
      this.reservationService.delete(reservation).subscribe()
      var index=this.rowData.indexOf(reservation);
      this.rowData.splice(index, 1 );
      this.Auth.getCurrentUser().reservations.splice(index,1);
    }

  }

  parseDate(value:string){


      if ((typeof value === 'string') && (value.includes('/'))) {
        const str = value.split('/');

        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const date = Number(str[0]);
        console.log(new Date(year,month, date))
        console.log(new Date())
        const timestamp=Date.parse(value);
        console.log(new Date(timestamp))

        return new Date(year, month, date);
      } else if((typeof value === 'string') && value === '') {

        return new Date();
      }
      const timestamp = typeof value === 'number' ? value : Date.parse(value);
      return isNaN(timestamp) ? null : new Date(timestamp);



  }

}


