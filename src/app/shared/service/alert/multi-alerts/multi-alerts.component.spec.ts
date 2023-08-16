import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAlertsComponent } from './multi-alerts.component';

describe('MultiAlertsComponent', () => {
  let component: MultiAlertsComponent;
  let fixture: ComponentFixture<MultiAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
