import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';
import { SharedModule } from '../../shared.module';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UtilityService], imports: [SharedModule] });
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
