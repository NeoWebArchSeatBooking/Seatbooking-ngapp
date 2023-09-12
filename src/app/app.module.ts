import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    // SocialLoginModule,
    // GoogleSigninButtonModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(`${environment.clientKey}.apps.googleusercontent.com`,
    //         {
    //                       oneTapEnabled: false, // <===== default is true
    //                      }
    //         ) 
    //       }
    //     ],
    //     onError: (err:any) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig,
    // },GoogleSigninButtonDirective
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
