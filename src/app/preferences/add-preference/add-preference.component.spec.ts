import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreferenceComponent } from './add-preference.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { UtilityService } from 'src/app/shared/service/utility/utility.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'

describe('AddPreferenceComponent', () => {
  let component: AddPreferenceComponent;
  let fixture: ComponentFixture<AddPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPreferenceComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule, FormsModule],
      providers: [PreferenceService, CompanyInfoService, UtilityService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
