import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilityService } from './utility/utility.service';
import { SharedModule } from '../shared.module';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ApiService, UtilityService], imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule] });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post the request when httpPost is called', () => {
    service.environmentConfig = { isMock: true } as any;
    service.httpPost('', {}, { group: 'abc', key: '123' }).subscribe((res) => {
      console.log(res);
    });
  });

  it('should handle 401 error when httpPost is called', () => {
    service.environmentConfig = { isMock: false } as any;
    const error = { status: 401 };
    const spy = spyOn(http, 'post').and.returnValue(throwError(() => error));
    service.httpPost('', {}, { group: 'abc', key: '123' }).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
      expect(err.status).toBe(401);
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should handle other errors when httpPost is called', () => {
    service.environmentConfig = { isMock: false } as any;
    const error = { status: 403 };
    const spy = spyOn(http, 'post').and.returnValue(throwError(() => error));
    service.httpPost('', {}, { group: 'abc', key: '123', muteNotifyError: false }).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
      expect(err.status).toBe(403);
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should patch the request when httpPatch is called', () => {
    service.environmentConfig = { isMock: true } as any;
    service.httpPatch('', {}, { group: 'abc', key: '123' }).subscribe((res) => {
      console.log(res);
    });
  });

  it('should handle 401 error when httpPatch is called', () => {
    service.environmentConfig = { isMock: false } as any;
    const error = { status: 401 };
    const spy = spyOn(http, 'patch').and.returnValue(throwError(() => error));
    service.httpPatch('', {}, { group: 'abc', key: '123' }).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
      expect(err.status).toBe(401);
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should handle other errors when httpPatch is called', () => {
    service.environmentConfig = { isMock: false } as any;
    const error = { status: 403 };
    const spy = spyOn(http, 'patch').and.returnValue(throwError(() => error));
    service.httpPatch('', {}, { group: 'abc', key: '123', muteNotifyError: false }).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
      expect(err.status).toBe(403);
    });
    expect(spy).toHaveBeenCalled();
  });
});
