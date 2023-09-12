import { Component, ViewChild } from '@angular/core';
import { CompanyInfoService } from '../services/company-info.service';
import { TableViewComponent } from '../shared/components/table-view/table-view.component';
import { UtilityService } from '../shared/service/utility/utility.service';
import { schema } from "./schema/booking.schema";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent {
  selectedSeat: any = {};
  locations: any;
  blocks: any;
  floors: any;
  seats: any;

  @ViewChild('tableView') tableView!: TableViewComponent;
  columnDefinition: any;
  configuration: any;
  constructor(
    private infraService: CompanyInfoService,
    private utilityService: UtilityService
  ) { }


  ngOnInit(): void {
    this.setColumnDefinitions();
    this.configuration = this.getConfiguration();
    this.getData();
  }

  setColumnDefinitions() {
    const cols = [...schema.tableSchema];
    this.columnDefinition = cols;
  }

  getConfiguration() {
    return {
      add: false,
      serverRender: false,
      disableFullTextSearch: true,
      actionConfig: [
        {
          id: 'book',
          iconName: 'check',
          tooltip: 'Book a Seat',
          action: () => {
            this.utilityService.showConfirmation({
              data: {
                title: 'shall we confirm the Booking?'
              }
            }).subscribe((res: any) => {
              console.log(res);
            });
          }
        }
      ]
    };
  }

  getData() {
    this.infraService.fetchSeatingInformation().subscribe((res) => {
      this.locations = res.infras;
    });
  }

  locationChange(x: any): void {
    this.blocks = this.locations.find((loc: any) => loc.locationId === x.value).blocks;
    this.selectedSeat.block = null;
    this.selectedSeat.floor = null;
    this.selectedSeat.seat = null;
    this.floors = [];
    this.seats = [];
  }

  blockChange(y: any) {
    this.floors = this.blocks.find((bloc: any) => bloc.blockId === y.value).floors;
    this.selectedSeat.floor = null;
    this.selectedSeat.seat = null;
    this.seats = [];
  }

  floorChange(y: any) {
    this.selectedSeat.seat = null;
    this.seats = [];
    this.infraService.fetchAvailableSeats(this.selectedSeat).subscribe((res: any) => {
      // this.seats = res;
      this.mapToSeatTable(res.seats)
    });
  }

  mapToSeatTable(seats:any[]){
    const data = seats.map((seat)=>{
      return {
        ... seat, 
        status: seat.available ? 'Available' : 'Booked'
      }
    });
    this.tableView?.setData(data);
    this.tableView?.setTotalSize(data.length);
  }

  seatChange(y: any): void {

  }

}
