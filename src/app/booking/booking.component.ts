import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { NewBookingComponent } from '../new-booking/new-booking.component';

export interface PeriodicElement {
  date: string;
  building_name: string;
  floor: number;
  seat_number: string;
  status: string
};

const ELEMENT_DATA: PeriodicElement[] = [
  {date : '28/07/2023', building_name: 'cnc', floor: 3, seat_number: 'C121', status: 'Active'},
  {date : '29/07/2023', building_name: 'cnc', floor: 4, seat_number: 'C124', status: 'Active'},
  {date : '01/08/2023', building_name: 'cnc', floor: 8, seat_number: 'C155', status: 'Active'},
];
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  constructor(
    public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['date', 'building_name', 'floor', 'seat_number', 'status'];
  dataSource = ELEMENT_DATA;


  addNew() {
    let dialogRef = this.dialog.open(NewBookingComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
