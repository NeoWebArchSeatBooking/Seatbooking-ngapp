import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MockService } from './mock.service';
import { SharedModule } from '../../shared.module';

describe('MockService', () => {
  let service: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MockService], imports: [HttpClientTestingModule, SharedModule] });
    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
