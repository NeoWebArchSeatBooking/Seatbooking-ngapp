import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComponent } from './booking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../shared/service/api.service';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityService } from '../shared/service/utility/utility.service';
import { of } from 'rxjs';
import { BookingService } from '../services/booking.service';
import { CompanyInfoService } from '../services/company-info.service';
import { TableViewComponent } from '../shared/components/table-view/table-view.component';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let utilityService: UtilityService;
  let bookingService: BookingService;
  let companyInfoService: CompanyInfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingComponent],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [ApiService, UtilityService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    utilityService = TestBed.inject(UtilityService);
    bookingService = TestBed.inject(BookingService);
    companyInfoService = TestBed.inject(CompanyInfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show confirmation dialog when action is called', () => {
    const spy = spyOn(utilityService, 'showConfirmation').and.returnValue(of(true));
    component.configuration.actionConfig[0].action();
    expect(spy).toHaveBeenCalled();
  });

  it('should fetch booking data and seating info when getData is called', () => {
    const bookingSpy = spyOn(bookingService, 'getBooking').and.returnValue(of({ items: [] }));
    const companySpy = spyOn(companyInfoService, 'fetchSeatingInformation').and.returnValue(of({ infras: [] }));
    const processSpy = spyOn(component, 'processBookingData').and.returnValue([{}]);
    component.tableView = { setData: (x) => { console.log(x); }, setTotalSize: (x) => { console.log(x); } } as TableViewComponent;
    component.getData();
    expect(bookingSpy).toHaveBeenCalled();
    expect(companySpy).toHaveBeenCalled();
    expect(processSpy).toHaveBeenCalled();
  });

  it('should return mapped booking data when processBookingData is called', () => {
    const bookingData = { items: [{ seatInformation: { locationId: 123, blockId: 1, floorId: 5 } }] };
    const seatingInfo = { infras: [{ locationId: 123, blocks: [{ blockId: 1, floors: [{ floorId: 5 }] }] }] };
    const data = component.processBookingData(bookingData.items, seatingInfo.infras);
    expect(data[0].seatingInfo.location.locationId).toBe(123);
    expect(data[0].seatingInfo.block.blockId).toBe(1);
    expect(data[0].seatingInfo.floor.floorId).toBe(5);
  });
});
