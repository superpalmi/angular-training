import {Component, OnInit, Input, Output, EventEmitter, Pipe, ChangeDetectorRef} from '@angular/core';
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
  @Output('notify') notify: EventEmitter<any>=new EventEmitter<any>();
  @Output('action') action: EventEmitter<any>=new EventEmitter<any>();
  tableAction = [TableActions.NEW_ROW, TableActions.EDIT, TableActions.DELETE];
  searchText='';
  column='';
  columnIndex=0;
  currentPage=0;
  pages=0;

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

  setTableAction(event, item:any){
    console.log('sono entrato in set table action con azione ');
    console.log('event action '+ event.action)
    if(event.action==TableActions.NEW_ROW){
      console.log('inserisco nuova riga')
      this.create(event, event.action, item);
    }else if(event.action==TableActions.EDIT){
      console.log('modifico riga')
      this.edit(event,event.action, item);
    }else if(event.action==TableActions.DELETE){
      console.log('elimino riga')
      this.delete(event,event.action, item);
    }



  }

  create(event,action:string, item:any){
    this.action.emit({event,action, item});
  }
  edit(event,action:string, item:any){
    console.log("ediiiiit 2")
    this.action.emit({event,action, item});

  }
  delete(event,action:string, item:any){
    this.action.emit({event,action, item});
    this.rowData=this.rowData.filter(it => it.id!=item.id)
  }






}


export enum TableActions{
  NEW_ROW="NEW_ROW",
  EDIT="EDIT",
  DELETE="DELETE"


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




