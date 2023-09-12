import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingComponent } from './all-booking.component';
import { BookingService } from 'src/app/services/booking.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { UtilityService } from 'src/app/shared/service/utility/utility.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AllBookingComponent', () => {
  let component: AllBookingComponent;
  let fixture: ComponentFixture<AllBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBookingComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      providers: [BookingService, CompanyInfoService, UtilityService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
