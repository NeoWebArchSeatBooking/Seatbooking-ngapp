import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'new', component : NewBookingComponent},
  { path: 'login', component : LoginComponent},
  { path: '', component: BookingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
