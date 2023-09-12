import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreferenceComponent } from './list-preference.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'

describe('ListPreferenceComponent', () => {
  let component: ListPreferenceComponent;
  let fixture: ComponentFixture<ListPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPreferenceComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [CompanyInfoService, PreferenceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
