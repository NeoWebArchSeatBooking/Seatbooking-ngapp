import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './../event.service';
@Component({
  selector: 'app-side-menu-nav',
  templateUrl: './side-menu-nav.component.html',
  styleUrls: ['./side-menu-nav.component.scss']
})
export class SideMenuNavComponent {


  constructor( private eventService: EventService, private router: Router) {}
  signOut(): void {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('Name', 'NA');
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
    const eventData = { loggedIn: false, user: 'NA'};
    this.eventService.emitEvent(eventData);
    this.router.navigate(['login']);
  }
}
