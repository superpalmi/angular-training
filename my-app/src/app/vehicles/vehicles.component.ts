import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicles = [
    new Vehicle(13, 'Fiat', new Date('2020-07-30'), 'punto' , 'FA585MA', 'berlina'),
    new Vehicle(14, 'Fiat', new Date('2020-07-28'), 'Freemont' , 'CA444CA', 'suv'),
    new Vehicle(15, 'Fiat', new Date('2020-07-01'), 'Panda' , 'EA666PA', 'berlina')


  ];

  constructor() { }

  ngOnInit(): void {
  }

}

export class Vehicle{

  constructor(
    public id: number,
    public brand: string,
    public immdate: Date,
    public model: string,
    public plate: string,
    public type: string
  ) {}




}