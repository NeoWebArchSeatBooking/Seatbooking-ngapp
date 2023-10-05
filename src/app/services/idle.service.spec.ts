import { TestBed } from '@angular/core/testing';
import { IdleService } from './idle.service';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
describe('IdleService', () => {
  let service: IdleService;
  let authService: AuthService;
  let dialog: jasmine.SpyObj<MatDialog>;
 
  beforeEach(() => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      providers: [IdleService, AuthService,MatSnackBar, { provide: MatDialog, useValue: dialog },],
     imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(IdleService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start the idle timer when there is user interaction', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(service, 'onInteraction').and.callThrough();

    // Simulate user interaction
    service.onInteraction();

    expect(service.onInteraction).toHaveBeenCalled();
  });

  it('should not start the idle timer when the user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(service, 'onInteraction').and.callThrough();

    // Simulate user interaction
    service.onInteraction();

    expect(service.onInteraction).not.toHaveBeenCalled();
  });

  it('should clear the idle timer', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(window, 'clearTimeout').and.callThrough();

    service.clear();

    expect(window.clearTimeout).toHaveBeenCalled();
    expect(service['active']).toBeFalse(); // Checking a private property, not ideal but sometimes necessary
  });

  it('should restart the idle timer', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(service, 'onInteraction').and.callThrough();

    service.restart();

    expect(service.onInteraction).toHaveBeenCalled();
    expect(service['active']).toBeTrue(); // Checking a private property, not ideal but sometimes necessary
  });
});
