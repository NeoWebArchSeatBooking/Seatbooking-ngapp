import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreferenceComponent } from './list-preference.component';

describe('ListPreferenceComponent', () => {
  let component: ListPreferenceComponent;
  let fixture: ComponentFixture<ListPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPreferenceComponent ]
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
