import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent {

  // features = [
  //   {
  //     title: 'Feature 1: Booking Seats',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
  //   },
  //   {
  //     title: 'Feature 2: Managing Reservations',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
  //   },
  //   // Add more features as needed
  // ];


  ngOnInit(): void { }

}
