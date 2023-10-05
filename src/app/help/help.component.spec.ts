import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './help.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let authService: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpComponent],
      providers: [AuthService,  { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatGridListModule, MatCardModule], // Include HttpClientTestingModule
    });

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isAdmin to false if user is not admin', () => {
    spyOn(authService, 'isAdmin').and.returnValue(false);
    component.ngOnInit();
    expect(component.isAdmin).toBeFalse();
  });

  it('should initialize isAdmin to true if user is admin', () => {
    spyOn(authService, 'isAdmin').and.returnValue(true);
    component.ngOnInit();
    expect(component.isAdmin).toBeTrue();
  });

  // Add more test cases as needed
});
