import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { BookingService } from '../services/booking.service';
import { CompanyInfoService } from '../services/company-info.service';
import { TableViewComponent } from '../shared/components/table-view/table-view.component';
import { UtilityService } from '../shared/service/utility/utility.service';
import { schema } from './schema/booking.schema';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingList: any;
  seatingInfo: any;
  columnInfo: any = [];
  displayedColumns: any = [];

  @ViewChild('tableView') tableView!: TableViewComponent;
  columnDefinition: any;
  configuration: any;
  constructor(
    private bookingService: BookingService,
    private companyInfoService: CompanyInfoService,
    private utilityService: UtilityService,
    public dialog: MatDialog,
    public router: Router) {
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
    const cols = [...schema.tableSchema];
    this.columnDefinition = cols;
  }

  getConfiguration() {
    return {
      add: true,
      addConfig: {
        label: 'Book a Seat'
      },
      serverRender: false,
      disableFullTextSearch: false,
      actionConfig: [
        {
          id: 'cancel',
          iconName: 'cancel',
          tooltip: 'Cancel Booking',
          disableOptions: {
            field: 'status',
            value: 'cancelled',
            label: 'Cancelled',           
          },
          actionEnableField: 'status',
          action: (item:any) => {
            this.utilityService.showConfirmation({
              data: {
                title: 'Do you want to cancel Booking?'
              }
            }).subscribe((res: any) => {
              console.log(res);
              console.log(item);
              if(res) {
                this.cancelBooking(item?.id);
              }
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
    ]).subscribe((res: any) => {
      const data = this.processBookingData(res[0].items, res[1].infras);
      this.tableView?.setData(data);
      this.tableView?.setTotalSize(data.length);
    });
  }


  processBookingData(bookingData: any, seatingInfo: any) {
    return bookingData.map((bData: any) => {
      const output:any = {
        id : bData.bookingId,
        eId: bData.userId,
        date: bData.bookingDate,
        status: bData.status,
        seatingInfo: {
          seat: {
            seatId: bData.seatInformation.seatId
          }
        }
      };

      const location = seatingInfo.find((res: any) => res.locationId === bData.seatInformation.locationId);
      if (location) {
        output.seatingInfo.location = location;
        const block = location.blocks.find((res: any) => res.blockId === bData.seatInformation.blockId);
        if (block) {
          output.seatingInfo.block = block;
          const floor = block.floors.find((res: any) => res.floorId === bData.seatInformation.floorId);
          if (floor) {
            output.seatingInfo.floor = floor;
          }

        }
      }
      return output;
    });
  }

  cancelBooking(id) {
    this.bookingService.cancelBooking(id).subscribe(() => {
      this.utilityService.showSuccessAlert('Booking got canceled successfully');
      this.getData();
    })
  }

  addNew() {
    this.router.navigate(['booking/new']);
  }
}
