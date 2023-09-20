import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent {
  isAdmin: boolean = false;
  role = '';
  ngOnInit(): void {
    this.role = localStorage.getItem('Role');
    this.isAdmin = this.role === 'admin';
  }

}
