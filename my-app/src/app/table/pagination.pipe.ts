import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(rowData: any[], itemsPerPage: number,currentPage: number, pages:number): any[] {
    if(!rowData) return [];
    if(!itemsPerPage) return rowData.slice(0,5);
    if(currentPage>1 && pages>1 &&rowData.length>itemsPerPage){
      var from=((currentPage-1)*itemsPerPage);
      var to= (currentPage * itemsPerPage);
      console.log('from'+ from);
      console.log('to'+ to);
      return rowData.slice(from, to);

    }else return rowData.slice(0, itemsPerPage);

  }

}
