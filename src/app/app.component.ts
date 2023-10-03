import { Component } from '@angular/core';
import { EventService } from '././event.service';
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';
import { UtilityService } from './shared/service/utility/utility.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Seat Booking';
  user:any;
  loggedIn = false;
  isAdmin = false;
  displayLogin = false;
  
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
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe((route:any) => {
      this.displayLogin = route.url !== "/login";      
    });

    this.eventService.message$.subscribe((isLoggedIn:boolean) => {
      this.isAdmin = this.authService.isAdmin()
      this.loggedIn =isLoggedIn;
      this.user = this.authService.getUSerDetails();
    });
  }

  idleCheck() {
    this.idleService.idle$.subscribe(() => {
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

