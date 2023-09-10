import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookingComponent } from './new-booking.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyInfoService } from '../services/company-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms';

describe('NewBookingComponent', () => {
  let component: NewBookingComponent;
  let fixture: ComponentFixture<NewBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBookingComponent],
      imports: [SharedModule, BrowserAnimationsModule, HttpClientTestingModule, FormsModule],
      providers: [CompanyInfoService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
