import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EventService } from './services/event.service';
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';
import { UtilityService } from './shared/service/utility/utility.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';

@Injectable()
export class MockIdleService {
  public idleSubject = new Subject<void>();
  idle$: Observable<void> = this.idleSubject.asObservable();

  // Other methods and logic in your service
}
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let eventService: jasmine.SpyObj<EventService>;
  // let idleService: IdleService; // Use the actual IdleService
  let utilityService: jasmine.SpyObj<UtilityService>;
  let router: Router;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getUSerDetails', 'isAdmin', 'logOut']);
    eventService = jasmine.createSpyObj('EventService', ['message$']);
    // idleService = new IdleService(); // Use the actual IdleService
    utilityService = jasmine.createSpyObj('UtilityService', ['showConfirmation']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: EventService, useValue: eventService },
        { provide: IdleService, useClass: MockIdleService }, // Use the mock service
        { provide: UtilityService, useValue: utilityService },
      ],
      imports: [RouterTestingModule,MatToolbarModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values correctly', () => {
    authService.isLoggedIn.and.returnValue(false);
    authService.getUSerDetails.and.returnValue(null);

    fixture.detectChanges();

    expect(component.loggedIn).toBe(false);
    expect(component.isAdmin).toBe(false);
    expect(component.displayLogin).toBe(true);
  });

  it('should update displayLogin when the route changes', fakeAsync(() => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getUSerDetails.and.returnValue({});

    fixture.detectChanges();

    router.navigate(['/login']); // Simulate navigation to '/login'
    tick();

    expect(component.displayLogin).toBe(false);

    router.navigate(['/other']); // Simulate navigation to '/other'
    tick();

    expect(component.displayLogin).toBe(true);
  }));
  it('should handle idle check', fakeAsync(() => {
    authService.isLoggedIn.and.returnValue(true);
    authService.isAdmin.and.returnValue(false);
    authService.getUSerDetails.and.returnValue({});
  
    // Get the instance of the MockIdleService
    const mockIdleService = TestBed.inject(MockIdleService);
  
    // Simulate idle event by emitting on mockIdleService.idleSubject
    mockIdleService.idleSubject.next();
    tick();
  
    expect(utilityService.showConfirmation).toHaveBeenCalled();
  
    utilityService.showConfirmation.and.returnValue(of(false));
  
    // Simulate another idle event by emitting on mockIdleService.idleSubject
    mockIdleService.idleSubject.next();
    tick();
  
    expect(authService.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
});
