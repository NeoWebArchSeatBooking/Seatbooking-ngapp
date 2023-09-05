import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
//import { saveToSession } from "../auth/auth.guard";
import { EventService } from './../event.service';
import { saveToSession } from '../auth/auth.guard';
import {JwtService} from './../jwt.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  loggedIn: boolean

  constructor(
   private jwtService: JwtService,
   private eventService: EventService,
   private ngZone: NgZone,
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
        const token = response.credential;
        this.jwtService.setToken(response.credential);
        if (token) {
          const decodedToken = this.jwtService.decodeToken(token);
          this.ngZone.run(() => {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('Name', decodedToken['name']?decodedToken['name']:'NA');
            console.log('Decoded Token:', decodedToken);
            const eventData = { loggedIn: true, user: decodedToken['name']};
            this.eventService.emitEvent(eventData);
            this.router.navigate(['home'])
          });
        } else {
          console.log('Token not found.');
        }
        
      }
}
