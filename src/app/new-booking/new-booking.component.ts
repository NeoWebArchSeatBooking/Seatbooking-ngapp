import { Component } from '@angular/core';
import { CompanyInfoService } from '../services/company-info.service';

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

  constructor(
    private infraService: CompanyInfoService,
  ) { }


  ngOnInit(): void {
    this.getData();
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
      this.seats = res;
    });
  }

  seatChange(y: any): void {

  }

}
