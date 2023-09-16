import { Component } from '@angular/core';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  name ='';
  userID ='';
  role ='';
  profilePic ='';
  ngOnInit(): void {
    this.name =localStorage.getItem('Name');
    this.role =localStorage.getItem('Role');
    this.profilePic =localStorage.getItem('ProfilePic');
  }
}
