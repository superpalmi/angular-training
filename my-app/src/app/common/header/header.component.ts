import { Component, OnInit } from '@angular/core';
import {AuthappService} from '../../services/authapp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public Auth:AuthappService) { }

  ngOnInit(): void {
  }

}
