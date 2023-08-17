import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveToSession } from "../auth/auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit{
  
  loggedIn: boolean
  user: SocialUser;

  constructor(
    private authService: SocialAuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        saveToSession("userName",user.name)
        saveToSession("userId",user.email)
        saveToSession("token",user.idToken)
        this.router.navigate([''])
      }      
    });
  }
  
}
