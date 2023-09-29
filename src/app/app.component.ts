import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { EventService } from '././event.service';
<<<<<<< HEAD
<<<<<<< Updated upstream
import { Subscription } from 'rxjs';
=======
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';
import { UtilityService } from './shared/service/utility/utility.service';
>>>>>>> Stashed changes
=======
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';
import { UtilityService } from './shared/service/utility/utility.service';
import { Router } from '@angular/router';
>>>>>>> f00dac81b4aba502e1b3dbef3c4fb0a5721d2cfb
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Seat Booking';
  user:any;
  loggedIn = false;
<<<<<<< HEAD
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
    
=======
  isAdmin = false;
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
>>>>>>> f00dac81b4aba502e1b3dbef3c4fb0a5721d2cfb
    this.eventService.message$.subscribe((isLoggedIn:boolean) => {
      this.isAdmin = this.authService.isAdmin()
      this.loggedIn =isLoggedIn;
      this.user = this.authService.getUSerDetails();
    });
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> f00dac81b4aba502e1b3dbef3c4fb0a5721d2cfb
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

