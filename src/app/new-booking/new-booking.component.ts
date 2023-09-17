import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { CompanyInfoService } from '../services/company-info.service';
import { TableViewComponent } from '../shared/components/table-view/table-view.component';
import { UtilityService } from '../shared/service/utility/utility.service';
import { schema } from "./schema/booking.schema";
import { ITableConfiguration } from '../shared/components/table-view/interfaces/itable-configuration';
import { ActionType } from '../shared/components/table-view/enums/column-type';
import { MatDialog } from '@angular/material/dialog';
import { ListPreferenceComponent } from '../preferences/list-preference/list-preference.component';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent {
  searchParams: any = {};
  locations: any;
  blocks: any;
  floors: any;

  @ViewChild('tableView') tableView!: TableViewComponent;
  columnDefinition: any;
  configuration: any;
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private infraService: CompanyInfoService,
    private utilityService: UtilityService,
    public dialog: MatDialog
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

  getConfiguration(): ITableConfiguration {
    return {
      add: false,
      serverRender: false,
      disableFullTextSearch: true,
      actionConfig: [
        {
          id: 'book',
          type: ActionType.BUTTON,
          label: 'Book',
          tooltip: 'Book a Seat',
          disableOptions: {
            field: 'available',
            value: false,
            label: 'Booked',
           
          },
          actionEnableField: 'available',
          action: (elem:any) => {
            this.utilityService.showConfirmation({
              data: {
                title: 'shall we confirm the Booking?'
              }
            }).subscribe((res: boolean) => {
              if(res){
                this.bookASeat({
                  date:this.searchParams.date,
                  locationId:elem.locationId,
                  blockId:elem.blockId,
                  floorId:elem.floorId,
                  seatId:elem.seatId
                })
              }
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

  locationChange(selection: any): void {
    this.blocks = this.locations.find((loc: any) => loc.locationId === selection.value).blocks;
    this.searchParams.blockId = null;
    this.searchParams.floorId = null;
    this.floors = [];
  }

  blockChange(selection: any) {
    this.floors = this.blocks.find((bloc: any) => bloc.blockId === selection.value).floors;
    this.searchParams.floorId = null;
  }

  floorChange() {
    //this.fetchSeats()
  }

  fetchSeats(){
    if(!this.searchParams.date || this.searchParams.date === ""){
      this.utilityService.showErrorAlert('booking date is mandatory');
      return;
    }
    if(!this.searchParams.locationId || this.searchParams.locationId === ""){
      this.utilityService.showErrorAlert('location is mandatory to search');
      return;
    }
    // if(!this.searchParams.blockId || this.searchParams.blockId === ""){
    //   this.utilityService.showErrorAlert('block is mandatory to search');
    //   return;
    // }
    this.infraService.fetchAvailableSeats(this.searchParams).subscribe((res: any) => {
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

  bookASeat(req: SeatBookReq): void {
    this.bookingService.bookASeat(req).subscribe(()=>{
      this.utilityService.showSuccessAlert('Seat Booked successfully');
      this.router.navigate(['/booking']);
    })
  }

  openPreferences() {
    const dialogRef = this.dialog.open(ListPreferenceComponent, {width: '33%', height: '60%'});
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        res.seatDetails.forEach((ob, index) => {
          if(index === 0){
            this.searchParams.locationId = ob;
            this.locationChange({value: ob});
          } else if(index === 1) {
            this.searchParams.blockId = ob;
            this.blockChange({value: ob})
          } else if(index === 2) {
            this.searchParams.floorId = ob;
          }
        })
      }
    });
  }

  onCancel() {
    this.router.navigate(['/booking']);
  }

}



interface SeatBookReq {
  date: string
  locationId: string
  blockId: string
  floorId: string
  seatId: string
}
