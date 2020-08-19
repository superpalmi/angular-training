import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  msg = 'spiacente, la pagina cercata non esiste';
  constructor() { }

  ngOnInit(): void {
  }

}
