import { TestBed } from '@angular/core/testing';
import { ApiInterceptor } from './api-interceptor';
import { UtilityService } from '../service/utility/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../service/busy-loader/api/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';

describe('ApiInterceptor', () => {
  let service: ApiInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ApiInterceptor, UtilityService], imports: [SharedModule] });
    service = TestBed.inject(ApiInterceptor);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
