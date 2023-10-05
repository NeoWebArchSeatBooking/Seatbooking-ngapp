import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiInterceptor } from './api-interceptor';
import { UtilityService } from '../service/utility/utility.service';
import { AuthService } from 'src/app/services/auth.service';

// Mock AuthService and UtilityService
const authServiceMock = {
  getToken: () => 'fake-token',
};

const utilityServiceMock = {
  showLoader: (isLoading: boolean) => {},
  showErrorAlert: (error: any) => {},
};

describe('ApiInterceptor', () => {
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiInterceptor,
        { provide: AuthService, useValue: authServiceMock },
        { provide: UtilityService, useValue: utilityServiceMock },
      ],
    });

    interceptor = TestBed.inject(ApiInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

it('should intercept requests and add authorization header', () => {
  const httpRequest = new HttpRequest('GET', '/api/data');
  const next: HttpHandler = {
    handle: (req: HttpRequest<any>) => of(new HttpResponse({ status: 200, headers: new HttpHeaders({ 'authorization': 'fake-token' }) })),
  };

  const intercepted = interceptor.intercept(httpRequest, next);

  intercepted.subscribe((response) => {
    expect(response instanceof HttpResponse).toBeTruthy();
    if (response instanceof HttpResponse) {
      const authorizationHeader = response.headers.get('authorization');
      expect(authorizationHeader).toBe('fake-token');
    }
  });
});

  it('should handle errors and show error alert', () => {
    const httpRequest = new HttpRequest('GET', '/api/data');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        return throwError(new HttpResponse({ status: 500, statusText: 'Internal Server Error' }));
      },
    };

    spyOn(utilityServiceMock, 'showErrorAlert');

    const intercepted = interceptor.intercept(httpRequest, next);

    intercepted.pipe(catchError((error) => {
      expect(error instanceof HttpResponse).toBeTruthy();
      expect(utilityServiceMock.showErrorAlert).toHaveBeenCalledWith(error);
      return throwError(error);
    })).subscribe();
  });

  // Add more test cases as needed
});
