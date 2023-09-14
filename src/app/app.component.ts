import { Component } from '@angular/core';
import { EventService } from '././event.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seatBooking';
  receivedMessage: boolean = false;
  loggedIn = false;
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
