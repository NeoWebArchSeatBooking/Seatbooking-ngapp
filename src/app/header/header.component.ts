import { Component, OnInit } from "@angular/core";
import { SocialUser, SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: SocialUser;

  constructor(private authService: SocialAuthService,    private router: Router) {}

  ngOnInit() {
    const button = document.getElementById('signout_button');
    // // @ts-ignore
    // button.c
    // button.click = () => { google.accounts.id.disableAutoSelect();
    //   this.router.navigate(['login'])

  // }
  }

   signOut(): void {
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['login']);
  }
}