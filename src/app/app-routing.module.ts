import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { AllBookingComponent } from './booking/all-booking/all-booking.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { ListPreferenceComponent } from './preferences/list-preference/list-preference.component';
import { HelpComponent } from './help/help.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'user', component: UserProfileComponent, canActivate:[authGuard]},
  { path: 'booking/new', component : NewBookingComponent, canActivate:[authGuard]},
  { path: 'login', component : LoginComponent},
  { path: 'preferences', component: PreferencesComponent, canActivate:[authGuard]},
  { path: 'list-preferences', component: ListPreferenceComponent, canActivate:[authGuard]},
  { path: 'booking', component: BookingComponent, canActivate:[authGuard]},
  { path: 'booking/all', component: AllBookingComponent, canActivate:[authGuard]},
  { path: 'home', component: HomeComponent, canActivate:[]},
  { path: 'help', component: HelpComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
