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
    this.emitAction(event, this.buttonConfig.text)

  }

  emitAction(event, action:string){
    console.log('sono button component e questa è action ' + action)
    if(action!=null){
      this.notify.emit({event, action});
    }else this.notify.emit(event);


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



