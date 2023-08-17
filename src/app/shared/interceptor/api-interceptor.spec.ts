import { TestBed } from '@angular/core/testing';
import { ApiInterceptor } from './api-interceptor';
import { UtilityService } from '../service/utility/utility.service';
import { SharedModule } from '../shared.module';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ApiInterceptor', () => {
  let service: ApiInterceptor;
  let utilityService: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ApiInterceptor, UtilityService], imports: [SharedModule] });
    service = TestBed.inject(ApiInterceptor);
    utilityService = TestBed.inject(UtilityService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept the request when intercept is called', () => {
    const spy = spyOn(utilityService, 'showLoader');
    const req = { clone: () => { }, headers: { set: (c, d) => { console.log(c, d); } } } as HttpRequest<any>;
    const handler = { handle: () => { return of({} as HttpEvent<any>); } } as HttpHandler;
    service.intercept(req, handler).subscribe((res) => {
      console.log(res);
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should intercept the request when intercept is called', () => {
    const spy = spyOn(utilityService, 'showLoader');
    const req = { clone: () => { }, headers: { set: (c, d) => { console.log(c, d); } } } as HttpRequest<any>;
    const handler = { handle: () => { return throwError(() => new Error('error')); } } as HttpHandler;
    service.intercept(req, handler).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
    expect(spy).toHaveBeenCalled();
  });
});
