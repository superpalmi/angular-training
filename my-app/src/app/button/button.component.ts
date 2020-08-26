import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableActions} from '../table/table.component';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  // @ts-ignore
  @Input() buttonConfig:MyButtonConfig;
  @Input() buttonActions:TableActions[];
  @Output() notify: EventEmitter<any>=new EventEmitter<any>();
  private action:string;


  onClick(event){
    switch (this.buttonConfig.text){
      case('New Row'):{
        this.emitAction(event, this.buttonActions[0])
      }
      case('Edit'):{
        console.log("ediiiit")
        this.emitAction(event, this.buttonActions[1])
      }
      case('Delete'):{
        this.emitAction(event, this.buttonActions[2])
      }
      case('Login'):{
        this.notify.emit(event);
      }
      case('Register Vehicle'):{
        console.log('ora Register Vehicle')
        this.notify.emit(event);
      }

      default:{
        console.log('buttonconfig.text error')
        break
      }
    }

  }

  emitAction(event, action:string){
    console.log('sono button component e questa è action ' + action)
    this.notify.emit({event, action});

  }

  constructor() { }

  ngOnInit(): void{

  };




}

export class MyButtonConfig {
  customCssClass : string ;
  text : string ;
  icon : string ;

};



