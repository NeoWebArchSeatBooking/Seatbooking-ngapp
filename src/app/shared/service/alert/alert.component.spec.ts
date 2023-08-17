import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs'; // Import Subject

import { AlertComponent } from './alert.component';
import { AlertService } from '../alert/alert.service';
import { Alert, AlertType } from '../alert/alert.model';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import RouterTestingModule
      declarations: [AlertComponent],
      providers: [AlertService],
    }) .compileComponents();;
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should clear alerts on route change', () => {
  //   const spy = spyOn(alertService, 'clear');
  //   const navigationStart = new NavigationStart(1, 'test'); // Mock NavigationStart event
  //   router.events.next(navigationStart);
  //   expect(spy).toHaveBeenCalledWith('default-alert');
  // });

  it('should add an alert', () => {
    const alert: Alert = new Alert({
      type: AlertType.Success,
      message: 'Test Alert',
    });
    const mockSubject = new Subject<Alert>(); // Create a mock Subject
    spyOn(alertService, 'onAlert').and.returnValue(mockSubject); // Mock the onAlert method
    component.ngOnInit(); // Initialize the component
    mockSubject.next(alert); // Emit the alert through the mockSubject
    expect(component.alerts.length).toBe(1);
  });

  // it('should remove an alert', () => {
  //   const alert: Alert = new Alert({
  //     type: AlertType.Success,
  //     message: 'Test Alert',
  //   });
  //   component.alerts.push(alert);
  //   component.removeAlert(alert);
  //   expect(component.alerts.length).toBe(0);
  // });

  it('should generate CSS class for alert', () => {
    const alert: Alert = new Alert({
      type: AlertType.Success,
      message: 'Test Alert',
    });
    const cssClass = component.cssClass(alert);
    expect(cssClass).toContain('alert');
    expect(cssClass).toContain('alert-success');
  });

  it('should generate CSS class with fade', () => {
    const alert: Alert = new Alert({
      type: AlertType.Success,
      message: 'Test Alert',
      fade: true,
    });
    const cssClass = component.cssClass(alert);
    expect(cssClass).toContain('fade');
  });

  it('should generate CSS class without fade after 2000ms', (done) => {
    const alert: Alert = new Alert({
      type: AlertType.Success,
      message: 'Test Alert',
      fade: false,
    });
    const cssClass = component.cssClass(alert);
    expect(cssClass).not.toContain('fade');
    setTimeout(() => {
      fixture.detectChanges();
      const updatedCssClass = component.cssClass(alert);
      expect(updatedCssClass).toContain('fade');
      done();
    }, 2500);
  });
});
