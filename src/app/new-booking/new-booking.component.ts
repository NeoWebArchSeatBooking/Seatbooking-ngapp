import { Component } from '@angular/core';
import { CompanyInfoService } from '../services/company-info.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent {
  selectedSeat: any = {};
  availableSeats: any;
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

  private getData() {
    this.infraService.fetchSeatingInformation().subscribe((res) => {
      this.availableSeats = res.seats;
      this.locations = res.infras;
      console.log(this.locations);
    });
  }

  locationChange(x: any): void {
    this.blocks = this.locations.find((loc: any) => loc.locationId === x.value).blocks;
    this.floors = [];
    this.seats = [];
  }

  blockChange(y: any) {
    this.floors = this.blocks.find((bloc: any) => bloc.blockId === y.value).floors;
    this.seats = [];
  }

  floorChange(y: any) {
    this.infraService.fetchAvailableSeats(this.selectedSeat).subscribe((res: any) => {
      this.seats = res;
    });
    // this.seats = this.availableSeats.filter((seat: any) => {
    //   return seat.locationId === this.selectedSeat.location &&
    //     seat.blockId === this.selectedSeat.block &&
    //     seat.floorId === y.value;
    // });
  }

  seatChange(y: any): void {

  }

}
