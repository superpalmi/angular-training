import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  // @ts-ignore
  @Output() notify: EventEmitter<any>=new EventEmitter<any>();

  onClick(event){
    this.notify.emit(event);
  }

  constructor() { }

  ngOnInit(): void{
  };

}



