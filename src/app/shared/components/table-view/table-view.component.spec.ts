import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewComponent } from './table-view.component';
import { SharedModule } from '../../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IColumnFilter } from './interfaces/icolumn-filter';

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

  it('should set data when setData is called', () => {
    const data = [{}];
    component.configuration = { serverRender: true };
    component.dataSource = { data: [] };
    component.setData(data);
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should set total size when serverRenderer is false on calling setData', () => {
    const data = [{}];
    component.dataSource = { data: [] };
    component.paginationOptions = { totalDataSize: 0 } as any;
    component.setData(data);
    expect(component.dataSource.data.length).toBe(1);
    expect(component.paginationOptions.totalDataSize).toBe(1);
  });

  it('should return page size when getPaginationPageSize is called', () => {
    component.paginationOptions = { pageSize: 2 } as any;
    expect(component.getPaginationPageSize()).toBe(2);
  });

  it('should emit action when onClick is called', () => {
    const spy = spyOn(component.action, 'emit');
    component.onClick({}, 1, 1);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onAadd when add is called', () => {
    const spy = spyOn(component.onAdd, 'emit');
    component.add();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit event when onPaginationChange is called', () => {
    const spy = spyOn(component.paginationChange, 'emit');
    component.onPaginationChange({});
    expect(spy).toHaveBeenCalled();
  });

  it('should apply filter when applyColumnFilter is called', () => {
    component.dataSource = { paginator: { firstPage: () => { } } };
    const spy = spyOn(component.dataSource.paginator, 'firstPage');
    component.applyColumnFilter([] as IColumnFilter[]);
    expect(spy).toHaveBeenCalled();
    expect(component.customFilter).toBe(true);
  });

  it('should apply filter when applyFilter is called', () => {
    component.dataSource = { paginator: { firstPage: () => { } } };
    const spy = spyOn(component.dataSource.paginator, 'firstPage');
    component.applyFilter({ target: { value: '123' } } as any as Event);
    expect(spy).toHaveBeenCalled();
    expect(component.customFilter).toBe(false);
  });
});
