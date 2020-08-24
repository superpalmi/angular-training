import {Component, OnInit, Input, Output, EventEmitter, Pipe} from '@angular/core';
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
  @Input('pagination') pagination:Pagination;
  searchText='';
  column='';
  columnIndex=0;
  currentPage=0;
  pages=0;
  @Output() notify: EventEmitter<any>=new EventEmitter<any>();
  onClick(event) {
    console.log(event)
    this.notify.emit(event);
  }


  constructor() { }

  ngOnInit(): void {
    console.log(this.search.columns)
    console.log(this.column)
    console.log(this.columnIndex)
    console.log('numero item'+ this.rowData.length)
    console.log('items per page' + this.pagination.itemPerPage)
    this.pages=( Math.ceil(this.rowData.length/this.pagination.itemPerPage));
    console.log('numero pagine' + this.pages)
  }
  setCurrentPage(page: number){
    if(page>1){
      this.currentPage=page;
    }else this.currentPage=1;


    console.log('current page setted to' + this.currentPage)
  }
  counter(i: number) {
    var arr:number[] = new Array(i)
    return arr;
  }


}

export class ColData{
  headers:HeaderData[];
}
export class Pagination{
  itemPerPage:number;
  itemPerPageOptions:number[];
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




