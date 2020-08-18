import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';
import {RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: RentalComponent},
  {path: 'user', component: UserComponent}


];
// qui dichiaro i moduli appena creati
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RentalComponent,
    UserComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
