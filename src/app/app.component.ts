import { Component } from '@angular/core';
import { EventService } from '././event.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seatBooking';
  receivedMessage: boolean = false;
  loggedIn= false;
  user = 'NA'
  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    this.eventService.eventEmitter.subscribe((eventData: any) => {
      this.receivedMessage = eventData.loggedIn;
      this.user = eventData.user;
    });
  }
}
