import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewComponent } from './table-view.component';
import { SharedModule } from '../../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableViewComponent],
      imports: [SharedModule, BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
