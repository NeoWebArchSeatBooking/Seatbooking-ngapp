import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllBookingComponent } from './booking/all-booking/all-booking.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { AddPreferenceComponent } from './preferences/add-preference/add-preference.component';
import { ListPreferenceComponent } from './preferences/list-preference/list-preference.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ApiInterceptor } from './shared/interceptor/api-interceptor';
import { SharedModule } from './shared/shared.module';
import { SideMenuNavComponent } from './side-menu-nav/side-menu-nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HelpComponent } from './help/help.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    NewBookingComponent,
    LoginComponent,
    AllBookingComponent,
    SideMenuNavComponent,
    PreferencesComponent,
    HomeComponent,
    AddPreferenceComponent,
    ListPreferenceComponent,
    UserProfileComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    MatToolbarModule,
    // SocialLoginModule,
    // GoogleSigninButtonModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    CookieService,
    {
			provide: APP_INITIALIZER,
			useFactory: tokenProviderFactory,
			deps: [AuthService],
			multi: true
		}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenProviderFactory(authService: AuthService) {
  return () => {
    return new Promise<void>((resolve) => {
      if(authService.checkIfAlreadyLoggedIn()) {
        authService.fetchUserDetails().subscribe(res => {
          console.log(res);
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  };
} 
