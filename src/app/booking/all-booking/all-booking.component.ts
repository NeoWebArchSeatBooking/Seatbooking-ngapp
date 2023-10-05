import { Component, ViewChild, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { TableViewComponent } from 'src/app/shared/components/table-view/table-view.component';
import { UtilityService } from 'src/app/shared/service/utility/utility.service';
import { schema } from '../all-booking/schema/all-booking.schema';
import * as moment from 'moment';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrls: ['./all-booking.component.scss']
})

@NgModule({
  imports: [FormsModule,MatExpansionModule],
  // ...
})
export class AllBookingComponent {
  search:any = {
    viewRole: 'admin'
  };
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
    public dialog: MatDialog) {
  }
  ngOnInit(): void {
    
    this.setColumnDefinitions();
    this.configuration = this.getConfiguration();
    setTimeout(() => {
      //this.getData(0, this.tableView.getPaginationPageSize());
      this.getData();
    }, 0);

  }

  setColumnDefinitions() {
    const cols = [...schema.tableSchema];
    this.columnDefinition = cols;
  }

  getConfiguration() {
    return {
      serverRender: false,
      disableFullTextSearch: true,
    };
  }

  loadData(event:any) {
    console.log(event);
    this.getData();
  }

  getData() {
    forkJoin([
      this.bookingService.getBooking({filter: this.search}),
      this.companyInfoService.fetchSeatingInformation()
    ]).subscribe((res: any) => {
      const data = this.processBookingData(res[0].items, res[1].infras);
      this.tableView?.setData(data);
      this.tableView?.setTotalSize(res[0]._meta.count);
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

  searchAction() {
    console.log(this.search);
    console.log(moment(this.search.to).format('D/M/yyyy'));
    this.getData();
  }
}
