import {Component, Input, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {Reservation} from '../reservation/reservation.component';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  rowData: Vehicle[]=[];
  newVehicle:Vehicle;
  oldVehicle:Vehicle;
  editVehicle:Vehicle;
  isCreation=false;
  isEditing=false;
  @Input('reservation') reservation: Reservation;


  headerData = [
    {key: 'id', label: 'Id' },
    {key: 'brand', label: 'Brand'},
    {key: 'immdate', label: 'DataImm'},
    {key: 'model', label: 'Model'},
    {key: 'plate', label: 'Plate'},
    {key: 'type', label: 'Type'}
  ];

  vehicles = [
    new Vehicle(13, 'Fiat', new Date(2020,7,30) , 'punto' , 'FA585MA', 'berlina', [{'id':1,'dataInizio': new Date(2020,7,30), 'dataFine': new Date(2020,7,31)}]),
    new Vehicle(14, 'Fiat', new Date(2020,7,28), 'Freemont' , 'CA444CA', 'suv', [{'id':2,'dataInizio':new Date(2020,9,28), 'dataFine': new Date(2020,9,30)},{'id':3,'dataInizio':new Date(2020,10,1), 'dataFine': new Date(2020,10,5)}]),
    new Vehicle(15, 'Fiat', new Date('2020-07-01'), 'Panda' , 'EA666PA', 'berlina', [])


  ];

  constructor(private route:Router) { }

  ngOnInit(): void {
    console.log("la reservation inserita è " + this.reservation.dataInizio)
    this.checkReservation();
    this.newVehicle=new Vehicle(0, '',new Date(2020,7,30), '', '', '' , [])
    this.oldVehicle=new Vehicle(0, '', new Date(2020,7,30), '', '', '' , [])
    this.editVehicle=new Vehicle(0, '', new Date(2020,7,30), '', '', '' , [])
  }
  isBooked(vehicle:Vehicle){
    var isBooked:boolean = false;
    for(let reservation of vehicle.reservations)
    {
      if(((this.reservation.dataInizio<reservation.dataInizio && this.reservation.dataFine<reservation.dataInizio)||(this.reservation.dataInizio>reservation.dataFine && this.reservation.dataFine>reservation.dataFine))){
          console.log(this.reservation.dataInizio + ' < ' + reservation.dataInizio)
        isBooked=false;
      }else{
        console.log('prenotazione già esistente' + reservation.dataInizio + ' prenotazione inserita :' + this.reservation.dataInizio)
        isBooked=true;

      }


    }
    return isBooked;

  }


  checkReservation(){

    if(this.reservation!=null){
      for( let vehicle of this.vehicles)
      {
        if(!this.isBooked(vehicle)){
          console.log('veicolo prenotabile')
          this.rowData.push(vehicle);
        }

      }
    }else{
      this.rowData=this.vehicles;
    }

  }

  eventHandler(event){
    var action=event.action;
    var item=event.item;
    console.log('sono event handler ' + action)
    switch(action){
      case 'NEW_ROW':{
        this.create();
      }
      case 'EDIT':{
        this.edit(item);
      }
      case 'DELETE':{
        this.delete(item);
      }
      default:{
        console.log('error');
        break;
      }
    }
  }
  //prepara il componente alla creazione
  create(){
   // this.vehicles.push(new Vehicle(16, 'BMW', new Date('2020-06-01'), 'Serie 3', 'GL666AA', 'berlina'));
    console.log('aperta crazione veicolo')
    this.isCreation=true;
    this.isEditing=false;

    this.newVehicle=new Vehicle(0, '', new Date('2020-07-30'), '', '', '', [] )
    this.rowData=this.vehicles.slice();

  }
  //inserisce il nuovo veicolo
  insert(){
    console.log(this.newVehicle.plate)
    this.vehicles.push(this.newVehicle)
    this.rowData=this.vehicles
    this.isCreation=false;
  }
  //prepara il componente alla modifica di un elemento
  edit(vehicle:Vehicle){

    if(this.rowData.includes(vehicle)){
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

    if (index !== -1) {
      this.vehicles[index] = this.editVehicle;
      this.rowData=this.vehicles
    }
    this.isEditing=false;
  }

 //elimina il veicolo
  delete(vehicle:Vehicle){
    if(this.rowData.includes(vehicle)){
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

export class Vehicle{
  public id: number;
  public brand: string;
  public immdate: Date;
  public model: string;
  public plate: string;
  public type: string;
  public reservations: Reservation[];

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

