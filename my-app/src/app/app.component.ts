import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Io sono il titolo di app component';

  // tslint:disable-next-line:typedef
  clickHandler() {
    alert('sono stato cliccato');
  }
}
