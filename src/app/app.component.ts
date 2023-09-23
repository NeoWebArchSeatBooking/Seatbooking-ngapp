import { Component } from '@angular/core';
import { EventService } from '././event.service';
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';
import { UtilityService } from './shared/service/utility/utility.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Seat Booking';
  user:any;
  loggedIn = false;
ō
  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private idleService: IdleService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.idleCheck();
   
   }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUSerDetails();

    this.eventService.message$.subscribe((isLoggedIn:boolean) => {
      this.loggedIn =isLoggedIn;
      this.user = this.authService.getUSerDetails();
    });
  }

  idleCheck() {
    this.idleService.idle$.subscribe((s) => {
      this.idleService.clear();
      this.utilityService.showConfirmation({
        data : {
          title: 'You are inactive for last 10 minutes, Do you want to stay in same session?'
        },
        disableClose: true 
      }).subscribe(res => {
        if(res) {
          this.idleService.restart();
        } else {
          this.authService.logOut();
          this.router.navigate(['login']);
        }
      });
    });
  }
}

