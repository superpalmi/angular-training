import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(rowData: any[], searchText: string, col: string): any[] {
    if(!rowData) return [];
    if(!searchText||!col) return rowData;

    if(_.isNumber(+searchText)){
      return rowData.filter(it=>{
        return it[col]==searchText;
      })
    }else {
      return rowData.filter(it=>{
        return it[col.toLowerCase()].toLowerCase().includes(searchText.toLowerCase())
      })

    }

  }

}


