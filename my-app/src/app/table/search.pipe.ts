import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(rowData: any[], searchText: string, col: string): any[] {
    if(!rowData) return [];
    if(!searchText||!col) return rowData;
    col=col.toLowerCase();
    searchText=searchText.toLowerCase();
    console.log(col);
    searchText=searchText.toLowerCase();
    return rowData.filter(it=>{
      return it[col].toLowerCase().includes(searchText.toLowerCase())
    })
  }

}
