import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuNavComponent } from './side-menu-nav.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from '../event.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

describe('SideMenuNavComponent', () => {
  let component: SideMenuNavComponent;
  let fixture: ComponentFixture<SideMenuNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuNavComponent],
      imports: [RouterTestingModule, MatSidenavModule, MatListModule],
      providers: [EventService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
