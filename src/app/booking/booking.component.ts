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
      this.bookingList = this.processBookingData(res[0].items, res[1].infras);
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
        id : bData.bookingId,
        eId: bData.userId,
        date: bData.bookingDate,
        status: bData.status,
        seatingInfo: {
          seat: {
            seatId : bData.seatInformation.seatId
          } 
        }
      };

      const location = seatingInfo.find((res: any) => res.locationId === bData.seatInformation.locationId);
      if(location) {
        output.seatingInfo.location = location;
        const block = location.blocks.find((res:any) => res.blockId === bData.seatInformation.blockId);
        if(block) {
          output.seatingInfo.block = block;
          const floor = block.floors.find((res:any) => res.floorId === bData.seatInformation.floorId);
          if(floor) {
            output.seatingInfo.floor = floor;
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
        key: 'seatingInfo.location.locationName',
        header: 'Location'
      },
      {
        key: 'seatingInfo.block.blockName',
        header: 'Block'
      },
      {
        key: 'seatingInfo.floor.floorId',
        header: 'Floor'
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
