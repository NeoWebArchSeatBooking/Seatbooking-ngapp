import { Component } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< Updated upstream
import { EventService } from './../event.service';
import { JwtService } from '../jwt.service';
=======
import { AuthService } from '../services/auth.service';
import { IdleService } from '../services/idle.service';
import { EventService } from '../event.service';
>>>>>>> Stashed changes
@Component({
  selector: 'app-side-menu-nav',
  templateUrl: './side-menu-nav.component.html',
  styleUrls: ['./side-menu-nav.component.scss']
})
<<<<<<< Updated upstream
export class SideMenuNavComponent {
  constructor( private eventService: EventService, private router: Router,   private jwtService: JwtService,) {}
  showAllBooking: boolean = false;
  role ='';
=======
export class SideMenuNavComponent implements OnInit{
  isAdmin:boolean;

  constructor( 
    private router: Router,
    private idleService: IdleService,
    private authService: AuthService,
    private eventServie: EventService ) {}

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const eventData = { loggedIn: false, user: 'NA', role: 'NA'};
    this.eventService.emitEvent(eventData);
=======

    this.authService.logOut();
    this.idleService.clear();
    this.eventServie.showHideMenu(false);
>>>>>>> Stashed changes
    this.router.navigate(['login']);
  }
}
