import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
//import { RentalComponent } from './rental/rental.component';
import {RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ButtonComponent } from './button/button.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { TableComponent } from './table/table.component';

// qui dichiaro il routing delle pagine associate ai relativi componenti
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'welcome/:userName', component: WelcomeComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ErrorComponent}


];

@NgModule({
  // qui dichiaro i moduli appena creati
  declarations: [
    AppComponent,
    HeaderComponent,
    // RentalComponent,
    UserComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    VehiclesComponent,
    ButtonComponent,
    JumbotronComponent,
    TableComponent
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
