import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Il miglior sito di noleggio auto';

  // tslint:disable-next-line:typedef
  clickHandler() {
    alert('sono stato cliccato');
  }
}
