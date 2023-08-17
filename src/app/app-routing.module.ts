import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
const routes: Routes = [
  { path: 'new', component : NewBookingComponent, canActivate:[authGuard]},
  { path: 'login', component : LoginComponent},
  { path: 'home', component: BookingComponent, canActivate:[authGuard]},
  { path: '**', component: BookingComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
