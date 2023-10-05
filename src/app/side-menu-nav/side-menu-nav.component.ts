import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IdleService } from '../services/idle.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-side-menu-nav',
  templateUrl: './side-menu-nav.component.html',
  styleUrls: ['./side-menu-nav.component.scss']
})
export class SideMenuNavComponent implements OnInit{
  isAdmin:boolean;

  constructor(
    private router: Router,
    private idleService: IdleService,
    private eventServie: EventService,
    private authService: AuthService ) {}

  ngOnInit(): void {
    
    this.isAdmin = this.authService.isAdmin();
    console.log(`role in menu ${this.isAdmin}`);
  }

  signOut(): void { 
    // @ts-ignore
    google.accounts.id.disableAutoSelect();

    this.authService.logOut();
    this.idleService.clear();
    this.router.navigate(['login']);
    this.eventServie.showHideMenu(false);
  }
}
