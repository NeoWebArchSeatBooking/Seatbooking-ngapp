import { TestBed } from '@angular/core/testing';

import { CompanyInfoService } from './company-info.service';
import { ApiService } from '../shared/service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';

describe('CompanyInfoService', () => {
  let service: CompanyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CompanyInfoService, ApiService], imports: [HttpClientTestingModule, SharedModule] });
    service = TestBed.inject(CompanyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
