import {Component, Input, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {DatePipe, formatDate} from '@angular/common';
import {UserService} from '../services/data/user.service';
import {AuthappService} from '../services/authapp.service';
import {Vehicle, VehicleService} from '../services/data/vehicle.service';
import {Reservation, ReservationService} from '../services/data/reservation.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  rowData: Vehicle[]=[]
  vehicles: Vehicle[]=[];
  newVehicle:Vehicle;
  oldVehicle:Vehicle;
  editVehicle:Vehicle;
  isCreation=false;
  isEditing=false;
  reserve:string="RESERVE";
  msg:string='';
  @Input('reservation') reservation: Reservation;


  headerData = [
    {key: 'id', label: 'Id' },
    {key: 'brand', label: 'Brand'},
    {key: 'immdate', label: 'DataImm'},
    {key: 'model', label: 'Model'},
    {key: 'plate', label: 'Plate'},
    {key: 'type', label: 'Type'}
  ];


  constructor(public route:Router,public Auth:AuthappService, private vehicleService:VehicleService, private reservationService:ReservationService ) { }
  getVehicles() {
    this.vehicleService.getVehicles().subscribe(response=>{this.vehicles=response;
      console.log(this.vehicles);
      this.checkReservation();
      this.newVehicle=new Vehicle(0, '', '', '',new Date("2020/09/30"), '' , null)
      this.oldVehicle=new Vehicle(0, '', '', '',new Date("2020/09/30"), '' , null)
      this.editVehicle=new Vehicle(0, '', '', '',new Date("2020/09/30"), '' , null)
    });

  }
  ngOnInit(): void {

    this.getVehicles();
    console.log("questo è vehicles" + this.vehicles);

    console.log("questa è una data " + new Date("2020/09/10"))

  }
  isBooked(vehicle:Vehicle){
    var isBooked:boolean = false;
    if(vehicle.reservations!=null ){
      if( vehicle.reservations.length>0) {
        for (let reservation of Object.values(vehicle.reservations)) {
          if (((this.reservation.dataInizio < reservation.dataInizio && this.reservation.dataFine < reservation.dataInizio) || (this.reservation.dataInizio > reservation.dataFine && this.reservation.dataFine > reservation.dataFine))) {
            console.log(this.reservation.dataInizio + ' < ' + reservation.dataInizio)
            isBooked = false;
          } else {
            console.log('prenotazione già esistente' + vehicle.model+ '' +  reservation.dataInizio + ' prenotazione inserita :' + this.reservation.dataInizio )
            isBooked = true;

          }


        }
    }

    }else return isBooked
    return isBooked;

  }


  checkReservation(){
    if(this.reservation!=null){
      for( let vehicle of Object.values(this.vehicles))
      {
        if(!this.isBooked(vehicle)){
          console.log('veicolo prenotabile')
          this.rowData.push(vehicle);
        }

      }
    }else{
      this.rowData=this.vehicles;
      console.log("rowData" + this.rowData)
    }

  }

  eventHandler(event){
    var action=event.action;
    var item=event.item;
    console.log('sono event handler ' + action)
    switch(action){
      case 'CUSTOM':{
        console.log('reservation')
        this.reserveVehicle(item);
        break
      }
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
  //prenota il veicolo usando la reservation in input
  reserveVehicle(vehicle:Vehicle){

    console.log("sto riservando")
    for(let v of this.rowData){
      if(v==vehicle){
        this.reservation.user=this.Auth.getCurrentUser();
        this.reservation.vehicle=v;
        this.reservationService.create(this.reservation).subscribe()
        //this.vehicleService.create(v).subscribe();
        this.msg="Veicolo prenotato, torna nell'area riservata per vedere la prenotazione";
        console.log(this.reservation)

        break;
      }
    }

  }
  //prepara il componente alla creazione
  create(){
   // this.vehicles.push(new Vehicle(16, 'BMW', new Date('2020-06-01'), 'Serie 3', 'GL666AA', 'berlina'));
    if(this.Auth.getCurrentUser().role=='superuser'){
      console.log('aperta crazione veicolo')
      this.isCreation=true;
      this.isEditing=false;

      this.newVehicle=new Vehicle(0, '', '', '',new Date("2020/09/30"), '' , null )
      this.rowData=this.vehicles.slice();

    }


  }
  //inserisce il nuovo veicolo
  insert(){
    console.log(this.newVehicle.plate)
    this.vehicleService.create(this.newVehicle).subscribe()
    this.getVehicles();
    this.rowData=this.vehicles
    this.isCreation=false;
  }
  //prepara il componente alla modifica di un elemento
  edit(vehicle:Vehicle){

    if(this.rowData.includes(vehicle) && this.Auth.getCurrentUser().role=='superuser'){
      this.isEditing=true;
      this.isCreation=false;
      console.log('sto modificandoooo' + vehicle.plate);
      this.oldVehicle=vehicle
      this.editVehicle=this.oldVehicle

    }

  }
  //modifica il veicolo
  modify(){
    var index = this.vehicles.indexOf(this.oldVehicle);
    this.vehicleService.create(this.editVehicle).subscribe();

    if (index !== -1) {
      this.vehicles[index] = this.editVehicle;
      this.rowData=this.vehicles
    }
    this.isEditing=false;
  }

 //elimina il veicolo
  delete(vehicle:Vehicle){
    if(this.rowData.includes(vehicle) && this.Auth.getCurrentUser().role=='superuser'){
      this.vehicleService.delete(vehicle).subscribe();
      console.log('sto cancellandooo');
      var index=this.rowData.indexOf(vehicle);
       this.rowData.splice(index, 1 );
    }

  }
  //ordina l'array di veicoli
  sortData(sort: Sort) {
    console.log('im sorting')

    const data = this.vehicles.slice();
    if (!sort.active || sort.direction === '') {

      this.rowData = data;
      return;
    }

    this.rowData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Id': return compare(a.id,b.id, isAsc);
        case 'Brand': return compare(a.brand, b.brand, isAsc);
        case 'DataImm': return compare(a.immdate, b.immdate, isAsc);
        case 'Model': return compare(a.model, b.model, isAsc);
        case 'Plate': return compare(a.plate, b.plate, isAsc);
        case 'Type': return compare(a.type, b.type, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



