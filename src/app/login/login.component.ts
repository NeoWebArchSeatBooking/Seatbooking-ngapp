import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventService } from './../event.service';
import { JwtService } from './../jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loggedIn: boolean

  constructor(
   private jwtService: JwtService,
   private eventService: EventService,
   private authService: AuthService,
   private ngZone: NgZone,
    private router: Router) { }
      ngOnInit() {
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
        // @ts-ignore
        // google.accounts.id.prompt((notification: PromptMomentNotification) => {});
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
            const eventData = { loggedIn: true, user: decodedToken['name'], role: ''};
            this.authService.getUserDetails().subscribe((res)=>{
                const role = res.profile.role ?? 'user'
                localStorage.setItem('role', role);
                eventData.role = role
                this.eventService.emitEvent(eventData);
                this.router.navigate(['/home'])
            })
          });
        } else {
          console.log('Token not found.');
          this.router.navigate(['/login'])
        }
        
      }
}
