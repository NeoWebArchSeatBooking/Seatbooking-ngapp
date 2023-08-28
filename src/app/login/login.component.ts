import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { saveToSession } from "../auth/auth.guard";
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { saveToSession } from '../auth/auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  loggedIn: boolean
  user: SocialUser;

  constructor(
   private authService: SocialAuthService, 
    private router: Router) { }
      ngOnInit() {
        // @ts-ignore
        google.accounts.id.initialize({
          client_id: "977119794798-6ive73s71laua0pq4nt0eq3jgs1chiq5.apps.googleusercontent.com",
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
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      } 
      async handleCredentialResponse(response: any) {
        // Here will be your response from Google.
        console.log(response);
        this.router.navigate(['home'])
      }
}
