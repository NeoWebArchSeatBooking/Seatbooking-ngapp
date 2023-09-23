import { Component } from '@angular/core';
import { EventService } from '././event.service';
import { AuthService } from './services/auth.service';
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
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUSerDetails();

    this.eventService.message$.subscribe((isLoggedIn:boolean) => {
      this.loggedIn =isLoggedIn;
      this.user = this.authService.getUSerDetails();
    });
  }
}
function isLoggedIn(value: any): void {
  throw new Error('Function not implemented.');
}

