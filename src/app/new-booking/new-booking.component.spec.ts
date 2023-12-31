import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CompanyInfoService } from '../services/company-info.service';
import { SharedModule } from '../shared/shared.module';
import { NewBookingComponent } from './new-booking.component';

describe('NewBookingComponent', () => {
  let component: NewBookingComponent;
  let fixture: ComponentFixture<NewBookingComponent>;
  let companyInfoService: CompanyInfoService;

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
    companyInfoService = TestBed.inject(CompanyInfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data onInit', () => {
    const spy = spyOn(component, 'getData');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call fetchSeatingInformation when getData is called', () => {
    const spy = spyOn(companyInfoService, 'fetchSeatingInformation').and.returnValue(of({}));
    component.getData();
    expect(spy).toHaveBeenCalled();
  });

  it('should filter blocks when location is changed', () => {
    const blocks1 = [
      { blockId: 1, blockName: 'Test1' },
      { blockId: 2, blockName: 'Test2' }
    ];
    const blocks2 = [
      { blockId: 3, blockName: 'Test3' },
      { blockId: 4, blockName: 'Test4' }
    ];
    component.searchParams = {};
    component.locations = [{
      locationId: 1,
      blocks: blocks1
    }, {
      locationId: 2,
      blocks: blocks2
    }];
    component.locationChange({ value: 1 });
    expect(component.blocks).toBe(blocks1);
  });

  it('should filter floors when block is changed', () => {
    const floors1 = [
      { floorId: 1 },
      { floorId: 2 }
    ];
    const floors2 = [
      { floorId: 3 },
      { floorId: 4 }
    ];
    component.searchParams = { location: 1 };
    component.blocks = [{
      blockId: 1,
      floors: floors1
    }, {
      blockId: 2,
      floors: floors2
    }];
    component.blockChange({ value: 2 });
    expect(component.floors).toBe(floors2);
  });

  it('should call fetch seats when floor is changed', () => {
    const spy = spyOn(companyInfoService, 'fetchAvailableSeats').and.returnValue(of({seats:[]}));
    component.searchParams = {date:'12/12/2023',locationId:'l1',blockId:'b1'}
    component.floorChange();
    expect(spy).toHaveBeenCalled();
  });
});
