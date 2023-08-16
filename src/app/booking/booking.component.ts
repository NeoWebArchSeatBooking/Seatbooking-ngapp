import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { NewBookingComponent } from '../new-booking/new-booking.component';
import { BookingService } from '../services/booking.service';
import { CompanyInfoService } from '../services/company-info.service';
import { TableViewComponent } from '../shared/components/table-view/table-view.component';
import { UtilityService } from '../shared/service/utility/utility.service';

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

  @ViewChild('tableView') tableView!: TableViewComponent;
  columnDefinition: any;
  configuration: any;

  constructor(
    private bookingService: BookingService,
    private companyInfoService: CompanyInfoService,
    private utilityService: UtilityService,
    public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.setColumnDefinitions();    
    this.configuration = this.getConfiguration();
    setTimeout(() => {
      //this.fetchData(0, this.tableView.getPaginationPageSize());
      this.getData();
    }, 0);
    
  }

  setColumnDefinitions() {
    const definitions = require('./schema/booking.schema.json');
    const cols = [...definitions.tableSchema];
    this.columnDefinition = cols;
  }

  getSchema() {
    return ;
  }

  getConfiguration() {
    return {
      add: true,
      addConfig: {
        label : 'Add new Booking'
      },
      serverRender: false,
      disableFullTextSearch: false,
      actionConfig: [
        {
          id: 'cancel',
          iconName: 'cancel',
          tooltip: 'Cancel Booking',
          action: (item:any) => {
            this.utilityService.showConfirmation({
              data: {
                title : 'Do you want to cancel Booking?'
              }
            }).subscribe((res:any) => {
              console.log(res);
              console.log(item);
            });
          }
        }
      ]
    };
  }

  getData() {
    forkJoin([
      this.bookingService.getBooking(),
      this.companyInfoService.fetchSeatingInformation()
    ]).subscribe((res:any)=> {
      const data = this.processBookingData(res[0].items, res[1].infras);
      this.tableView?.setData(data);
      this.tableView?.setTotalSize(data.length);
    });
  }


  processBookingData(bookingData:any, seatingInfo:any) {
    return bookingData.map((bData:any) => {

      const output:any = {
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
