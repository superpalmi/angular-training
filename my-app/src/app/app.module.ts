import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';
import {RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
// qui dichiaro il routing delle pagine associate ai relativi componenti
const routes: Routes = [
  {path: '', component: RentalComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent}


];

@NgModule({
  // qui dichiaro i moduli appena creati
  declarations: [
    AppComponent,
    HeaderComponent,
    RentalComponent,
    UserComponent,
    LoginComponent
  ],
  // qui importo i moduli per angular
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
