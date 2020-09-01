import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
//import { RentalComponent } from './rental/rental.component';
import { CommonModule } from '@angular/common';
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
import { LogoutComponent } from './logout/logout.component';
import {RouteGuardService} from './services/route-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatEndDate} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FooterComponent } from './common/footer/footer.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchPipe } from './table/search.pipe';
import { PaginationPipe } from './table/pagination.pipe';
import { TypeselectorPipe } from './table/typeselector.pipe';
import { ReservationComponent } from './reservation/reservation.component';

// qui dichiaro il routing delle pagine associate ai relativi componenti
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path:'register', component: UserComponent},
  {path: 'reservations', component:ReservationComponent, canActivate:[RouteGuardService]},
  {path: 'welcome/:userName', component: WelcomeComponent, canActivate:[RouteGuardService]},
  {path: 'vehicles', component: VehiclesComponent, canActivate:[RouteGuardService]},
  {path: 'vehicles/register', component: VehiclesComponent, canActivate:[RouteGuardService]},
  {path: 'user', component: UserComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent},
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
    TableComponent,
    LogoutComponent,
    FooterComponent,
    SearchPipe,
    PaginationPipe,
    TypeselectorPipe,
    ReservationComponent,
    //VehicleComponent
  ],
  // qui importo i moduli per angular
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    OverlayModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
