import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
<<<<<<< Updated upstream
import { EventService } from './../event.service';
import { JwtService } from '../jwt.service';
=======
import { AuthService } from '../services/auth.service';
import { IdleService } from '../services/idle.service';
import { EventService } from '../event.service';
>>>>>>> Stashed changes
=======
import { AuthService } from '../services/auth.service';
import { IdleService } from '../services/idle.service';
>>>>>>> f00dac81b4aba502e1b3dbef3c4fb0a5721d2cfb
@Component({
  selector: 'app-side-menu-nav',
  templateUrl: './side-menu-nav.component.html',
  styleUrls: ['./side-menu-nav.component.scss']
})
<<<<<<< HEAD
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
=======
export class SideMenuNavComponent implements OnInit{
  isAdmin:boolean;

  constructor( private router: Router,   private idleService: IdleService, private authService: AuthService ) {}

>>>>>>> f00dac81b4aba502e1b3dbef3c4fb0a5721d2cfb
  ngOnInit(): void {
    
    this.isAdmin = this.authService.isAdmin();
    console.log(`role in menu ${this.isAdmin}`);
  }

  signOut(): void { 
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
<<<<<<< HEAD
<<<<<<< Updated upstream
    const eventData = { loggedIn: false, user: 'NA', role: 'NA'};
    this.eventService.emitEvent(eventData);
=======

    this.authService.logOut();
    this.idleService.clear();
    this.eventServie.showHideMenu(false);
>>>>>>> Stashed changes
=======

    this.authService.logOut();
    this.idleService.clear();
>>>>>>> f00dac81b4aba502e1b3dbef3c4fb0a5721d2cfb
    this.router.navigate(['login']);
  }
}
