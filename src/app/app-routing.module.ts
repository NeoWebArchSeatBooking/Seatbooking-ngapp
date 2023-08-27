import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { AllBookingComponent } from './booking/all-booking/all-booking.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'new', component : NewBookingComponent, canActivate:[authGuard]},
  { path: 'login', component : LoginComponent},
  { path: 'preferences', component: PreferencesComponent, canActivate:[authGuard]},
  { path: 'booking', component: BookingComponent, canActivate:[authGuard]},
  { path: 'booking/all', component: AllBookingComponent, canActivate:[authGuard]},
  { path: '**', component: HomeComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
