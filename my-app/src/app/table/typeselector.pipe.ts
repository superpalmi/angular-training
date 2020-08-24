import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'typeselector'
})
export class TypeselectorPipe implements PipeTransform {

  transform(row:any): unknown {
    if(row instanceof Date){
      let pipe=new DatePipe('en-US')
      console.log('sono una data');
      return pipe.transform(row , 'shortDate');

    }else return row;
  }

}
