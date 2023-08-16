import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComponent } from './booking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../shared/service/api.service';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingComponent],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [ApiService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
