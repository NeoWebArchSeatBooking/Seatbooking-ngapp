import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { EventService } from '././event.service';
<<<<<<< Updated upstream
import { Subscription } from 'rxjs';
=======
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';
import { UtilityService } from './shared/service/utility/utility.service';
>>>>>>> Stashed changes
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seatBooking';
  receivedMessage: boolean = false;
  loggedIn = false;
<<<<<<< Updated upstream
  user = 'NA';
  role ='';
  subscriptions: Subscription[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.eventService.eventEmitter.subscribe((eventData: any) => {
      this.receivedMessage = eventData.loggedIn;
      this.user = eventData.user;
      this.role = eventData.role;
    }));
=======
  isAdmin = false;
  displayLogin;
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
>>>>>>> Stashed changes
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
