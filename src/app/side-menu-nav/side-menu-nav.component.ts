import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './../event.service';
import { JwtService } from '../jwt.service';
@Component({
  selector: 'app-side-menu-nav',
  templateUrl: './side-menu-nav.component.html',
  styleUrls: ['./side-menu-nav.component.scss']
})
export class SideMenuNavComponent {
  constructor( private eventService: EventService, private router: Router,   private jwtService: JwtService,) {}
  showAllBooking: boolean = false;
  role ='';
  ngOnInit(): void {
      this.role = localStorage.getItem('Role');
      if (this.role == 'admin'){
        this.showAllBooking = true;
      }
      else this.showAllBooking = false;
  }

  signOut(): void {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('Name', 'NA');
    localStorage.setItem('Role', 'NA');
    localStorage.setItem('ProfilePic', 'NA');
    this.jwtService.removeToken();
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
    const eventData = { loggedIn: false, user: 'NA', role: 'NA'};
    this.eventService.emitEvent(eventData);
    this.router.navigate(['login']);
  }
}
