import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('colData') colData: any;
  @Input('rowData') rowData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
