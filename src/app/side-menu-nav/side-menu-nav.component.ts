import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IdleService } from '../services/idle.service';
@Component({
  selector: 'app-side-menu-nav',
  templateUrl: './side-menu-nav.component.html',
  styleUrls: ['./side-menu-nav.component.scss']
})
export class SideMenuNavComponent implements OnInit{
  @Input() isAdmin:boolean;

  constructor( private router: Router,   private idleService: IdleService, private authService: AuthService ) {}

  ngOnInit(): void {
    console.log(`role in menu ${this.isAdmin}`)
    //this.isAdmin = this.authService.isAdmin();
  }

  signOut(): void { 
    // @ts-ignore
    google.accounts.id.disableAutoSelect();

    this.authService.logOut();
    this.idleService.clear();
    this.router.navigate(['login']);
  }
}
