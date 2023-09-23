import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent {
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

}
