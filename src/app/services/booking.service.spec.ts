import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';
import { ApiService } from '../shared/service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BookingService, ApiService], imports: [HttpClientTestingModule, SharedModule] });
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
