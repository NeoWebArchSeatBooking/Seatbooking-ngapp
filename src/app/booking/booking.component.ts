import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { NewBookingComponent } from '../new-booking/new-booking.component';
import { BookingService } from '../services/booking.service';
import { CompanyInfoService } from '../services/company-info.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingList:any;
  seatingInfo:any;
  columnInfo:any = [];
  displayedColumns:any = [];

  constructor(
    private bookingService: BookingService,
    private companyInfoService: CompanyInfoService,
    public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getData();
    this.columnInfo = this.getColumnInfo();
    
  }

  getData() {
    forkJoin([
      this.bookingService.getBooking(),
      this.companyInfoService.fetchSeatingInformation()
    ]).subscribe((res:any)=> {
      console.log(res);
      this.bookingList = this.processBookingData(res[0].items, res[1].items);
      this.displayedColumns = this.columnInfo.map((obj:any) => obj.key);
      console.log(this.bookingList);
    });
  }

  getValue(obj:any, key:any) {
    return _.get(obj, key);
  }

  processBookingData(bookingData:any, seatingInfo:any) {
    return bookingData.map((bData:any) => {

      let output:any = {
        id : bData.id,
        eId: bData.eId,
        date: bData.date,
        status: bData.status,
        seatingInfo: {}
      };
      const building = seatingInfo.find((res: any) => res.id === bData.seatInformation.buildingId);
      if(building) {
        output.seatingInfo.building = building;
        const floor = building.floors.find((res:any) => res.id === bData.seatInformation.floorId);
        if(floor) {
          output.seatingInfo.floor = floor;
          const seat = floor.seats.find((res:any) => res.id === bData.seatInformation.seatId);
          if(seat) {
            output.seatingInfo.seat =seat;
          }
        }
      }
      return output;
    });
  }

  getColumnInfo() {
    return [
      {
        key: 'id',
        header: 'Booking Id'
      },
     
      {
        key: 'date',
        header: 'Date'
      },
      {
        key: 'seatingInfo.building.name',
        header: 'Building'
      },
      {
        key: 'seatingInfo.floor.name',
        header: 'Floor'
      },
      {
        key: 'seatingInfo.seat.id',
        header: 'Seat Id'
      },
      {
        key: 'status',
        header: 'Status'
      }
    ]
  }

  addNew() {
    const dialogRef = this.dialog.open(NewBookingComponent, {
      height: '100%',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`); 
    });
  }
}
