import {Component, OnInit} from '@angular/core';
import {User} from './services/data/user.service';
import {AuthappService} from './services/authapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user:User

constructor(private Auth:AuthappService) {
}
ngOnInit(): void{
    if(this.Auth.getCurrentUser()!=null){
      this.user=this.Auth.getCurrentUser();
    }


}
  // tslint:disable-next-line:typedef

}
