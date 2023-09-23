import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventService } from './../event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loggedIn: boolean

  constructor(
   private eventService: EventService,
   private authService: AuthService,
   private ngZone: NgZone,
    private router: Router) { }

    ngOnInit(): void {
      if(!this.authService.isLoggedIn()) {
        this.showLoginSection();
      } else {
        this.router.navigate(['home']);
      }
    }

    showLoginSection() {
       // @ts-ignore
       google.accounts.id.initialize({
        client_id: "601004974015-n3jgfmkijvivhsdc5ajusln88k819bmj.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
      async handleCredentialResponse(response: any) {
        // Here will be your response from Google.
        console.log(response);
        const token = response.credential;
        this.ngZone.run(() => {
          this.authService.setToken(token);
          this.authService.fetchUserDetails().subscribe(res => {
            this.eventService.showHideMenu(true);
            this.router.navigate(['home']);
          });
        });
      }
}
