import {Component, OnInit, Input, Output, EventEmitter, Pipe, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {AuthappService} from '../services/authapp.service';
import * as _ from "lodash";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input("id") id: string;
  @Input('colData') colData: ColData;
  @Input('rowData') rowData: any[];
  @Input('order') order: Order;
  @Input('search') search: Search;
  @Input('pagination') pagination: Pagination;
  @Input('reusableButton') reusableButton: string;
  @Input('customKeys') customKeys:any[];
  @Output('notify') notify: EventEmitter<any>=new EventEmitter<any>();
  @Output('action') action: EventEmitter<any>=new EventEmitter<any>();

  tableAction = [TableActions.NEW_ROW, TableActions.EDIT, TableActions.DELETE];
  filterData:any;
  searchText=''
  column='';
  currentPage=1;
  pages:number=1
  role=''


  onClick(event) {
    console.log(event)
    this.notify.emit(event);
  }


  constructor(private Auth:AuthappService) {
    if(sessionStorage.getItem('role')!=null){
      this.role=sessionStorage.getItem('role')
    }

  }


  ngOnInit(): void {
    /*
    console.log(this.search.columns)
    console.log(this.column)
    console.log(this.columnIndex)
    console.log('numero item'+ this.rowData.length)
    console.log('items per page' + this.pagination.itemPerPage)
    */
    this.pages=2
    this.refreshPages()



  }
  ngAfterViewInit(){



  }
  getNestedObject(data:any, row:string){
    if(this.customKeys!=null){
      for(let key in this.customKeys){
        if(row==this.customKeys[key].key){
          return _.get(data, [row, this.customKeys[key].child])
        }
      }
    }

    return _.get(data, row);

  }


  refreshPages(){



    if(this.rowData!=null){
      if(this.rowData.length>1){
        console.log("row data: "+ this.rowData.length + "items per page " + this.pagination.itemPerPage)
        let p= Math.ceil(this.rowData.length/this.pagination.itemPerPage)
        if(p>1){
          console.log(p)
          this.pages=p;
        }

      }else this.pages=2;

      console.log('numero pagine' + this.pages)
    }

  }
  setCurrentPage(page: number){
    if(page>1){
      this.currentPage=page;
      console.log("current page: " + this.currentPage)
      console.log("number of pages: "+ this.pages)
    }else this.currentPage=1;

    this.refreshPages()


    console.log('current page setted to' + this.currentPage)
  }

  setTableAction(event, item:any){
    //console.log('sono entrato in set table action con azione ');
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
    }else if(event.action==this.reusableButton){
      console.log('azione custom ' + event.action);
      this.customEvent(event, TableActions.CUSTOM, item);
    }



  }
  customEvent(event,action:string, item:any){
    this.action.emit({event,action, item});
  }

  create(event,action:string, item:any){
    this.action.emit({event,action, item});
  }
  edit(event,action:string, item:any){
    //console.log("ediiiiit 2")
    if(this.Auth.getCurrentUser().role=="superuser") {
      this.action.emit({event, action, item});
    }

  }
  delete(event,action:string, item:any){
    if(this.Auth.getCurrentUser().role=="superuser"){
      this.action.emit({event,action, item});

    }

  }






}


export enum TableActions{
  NEW_ROW="NEW_ROW",
  EDIT="EDIT",
  DELETE="DELETE",
  CUSTOM="CUSTOM"


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




