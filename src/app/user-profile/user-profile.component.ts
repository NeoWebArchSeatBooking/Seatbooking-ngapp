import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user;
  profilePic ='';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUSerDetails();
    this.profilePic = this.user.profilePic? this.user.profilePic : '../../assets/images/user2.jpeg';
  }
}
