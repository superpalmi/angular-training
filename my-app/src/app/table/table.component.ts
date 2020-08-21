import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('colData') colData: ColData;
  @Input('rowData') rowData: any;
  @Input('order') order:Order;
  @Input('search') search:Search;
  @Output() notify: EventEmitter<any>=new EventEmitter<any>();
  onClick(event) {
    console.log(event)
    this.notify.emit(event);
  }

  constructor() { }

  ngOnInit(): void {
  }


}

export class ColData{
  headers:HeaderData[];
}

export class HeaderData{
  key:string;
  label:string;
}

export class Order{
  defaultColumn:string;
  orderType:string;
}
export class Search{
  columns:string[];

}
