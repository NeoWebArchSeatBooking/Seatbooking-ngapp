import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AllBookingComponent } from './all-booking.component';
import { BookingService } from 'src/app/services/booking.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { TableViewComponent } from 'src/app/shared/components/table-view/table-view.component';
import { UtilityService } from 'src/app/shared/service/utility/utility.service';
import { of } from 'rxjs';
import * as moment from 'moment';

describe('AllBookingComponent', () => {
  let fixture: ComponentFixture<AllBookingComponent>;
  let component: AllBookingComponent;
  let bookingService: jasmine.SpyObj<BookingService>;
  let companyInfoService: jasmine.SpyObj<CompanyInfoService>;
  let utilityService: jasmine.SpyObj<UtilityService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    bookingService = jasmine.createSpyObj('BookingService', ['getBooking']);
    companyInfoService = jasmine.createSpyObj('CompanyInfoService', ['fetchSeatingInformation']);
    utilityService = jasmine.createSpyObj('UtilityService', ['showConfirmation']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [AllBookingComponent],
      providers: [
        { provide: BookingService, useValue: bookingService },
        { provide: CompanyInfoService, useValue: companyInfoService },
        { provide: UtilityService, useValue: utilityService },
        { provide: MatDialog, useValue: dialog },
      ],
    });

    fixture = TestBed.createComponent(AllBookingComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values correctly', () => {
    // Simulate initial values from services
    bookingService.getBooking.and.returnValue(of({ items: [], _meta: { count: 0 } }));
    companyInfoService.fetchSeatingInformation.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.bookingList).toEqual([]);
    expect(component.displayedColumns).toEqual([]);
    // Add more expectations for other properties as needed
  });

  it('should load data when ngOnInit is called', fakeAsync(() => {
    // Simulate data from services
    bookingService.getBooking.and.returnValue(of({ items: [], _meta: { count: 0 } }));
    companyInfoService.fetchSeatingInformation.and.returnValue(of([]));

    fixture.detectChanges();
    tick(0); // Wait for ngOnInit to complete

    expect(bookingService.getBooking).toHaveBeenCalledWith({ filter: { viewRole: 'admin' } });
    expect(companyInfoService.fetchSeatingInformation).toHaveBeenCalled();
    // Add more expectations for data processing and setting properties
  }));

  it('should handle searchAction', () => {
    // Simulate a search action
    const searchParams = {
      viewRole: 'admin',
      to: moment('2023-10-10').toDate(), // Simulate a date value
      // Add other search parameters as needed
    };

    // Set initial values for testing
    bookingService.getBooking.and.returnValue(of({ items: [], _meta: { count: 0 } }));
    companyInfoService.fetchSeatingInformation.and.returnValue(of([]));

    fixture.detectChanges();

    // Call the searchAction method
    component.search = searchParams;
    component.searchAction();

    // Assert that the service methods were called with the correct parameters
    expect(bookingService.getBooking).toHaveBeenCalledWith({ filter: searchParams });
    expect(companyInfoService.fetchSeatingInformation).toHaveBeenCalled();
    // Add more expectations for data processing and setting properties based on search results
  });
});
