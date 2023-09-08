import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IColumnDefinition } from './interfaces/icolumn-definition';
import { ColumnDefintionModel } from './models/column-defintion-model';
import { get } from 'lodash';
import { ITableConfiguration } from './interfaces/itable-configuration';
import { IColumnFilter } from './interfaces/icolumn-filter';
import { columnFilterConditon } from './enums/table-view';
import { ColumnType } from './enums/column-type';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() columnDefinition: IColumnDefinition[]  = [];
  @Input() configuration: ITableConfiguration = {};
  @Output() action = new EventEmitter();
  @Output() onAdd = new EventEmitter();
  @Output() paginationChange = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  paginationOptions = {
    pageSize : 10,
    pageSizeOptions : [5, 10, 25, 100],
    totalDataSize : 0
  };

  dataSource: any;
  //totalDataSize = 0;
  customFilter: any;
  displayedColumns: string[] | any;

  COLUMN_TYPE = ColumnType;

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.sortingDataAccessor = this.customSort();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Get the value from nested object
   * @param obj 
   * @param key 
   * @returns 
   */
  getValue(obj:any, key:any) {
    return get(obj, key);
  }

  /**
   * Life cycle hook to catch input value changes
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columnDefinition'].currentValue !== undefined) {
      if(this.columnDefinition) {
        this.displayedColumns = this.columnDefinition.map((columnDefinition: ColumnDefintionModel| any) => {
          if(columnDefinition) {
            return columnDefinition.field;
          }
        })
      }
    }
  }

  /**
   * Set the data
   * @param data : Array of data object
   */
  setData(data:any) {
    this.dataSource.data = data;
    if(!this.configuration.serverRender) {
      this.setTotalSize(data.length);
    }
  }

  /**
   * Set the total data size
   * @param size 
   */
  setTotalSize(size:any) {
    this.paginationOptions.totalDataSize = size;
  }

  getPaginationPageSize() {
    return this.paginationOptions.pageSize;
  }

  /**
   * On click of hyperlink 
   * @param item 
   * @param columnId 
   * @param index 
   */
  onClick(item:any, columnId:any, index:any) {
    this.action.emit({ item, columnId, index });
  }

  add() {
    this.onAdd.emit();
  }

  /**
   * Overide custom sort for supporting nested object.
   * @returns sortFunction
   */
  private customSort() {
    const sortFn = (item:any, property:any) => {
      return this.getValue(item, property);
    };
    return sortFn;
  }

  /**
   * Full text search of columns
   * @param data 
   * @param filter 
   * @returns 
   */
  private compareAll(data:any, filter:any) {
    if(this.displayedColumns) {
      const dataStr = this.displayedColumns.reduce((currentTerm:any, key:any) => {
        return currentTerm + this.getValue(data, key) + '◬';
      }, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    }
    return false;
    
  }

  /**
   * Filter for specific attribute
   * @param data 
   * @param filterObj 
   * @returns 
   */
  private compareColumns(data:any, filterObj: IColumnFilter) {
    let isEqual = true;
    const columnData = String(this.getValue(data, filterObj.key)).trim().toLowerCase();
    const filterData = String(filterObj.value).trim().toLowerCase();
    switch (filterObj.condition) {
      case columnFilterConditon.eq:
        if (columnData !== filterData) {
          isEqual = false;
        }
        break;

      default:
        if (columnData.indexOf(filterData) === -1) {
          isEqual = false;
        }
        break;
    }
    return isEqual;
  }

  /**
   * Overide default filter to support nested objects
   * @returns filterFunction
   */
  private createFilter() {
    const filterFunction = (data:any, filter:any): any => {
      let isEqual = true;
      if (this.customFilter) {
        const filterObjects: IColumnFilter[] = JSON.parse(filter);
        filterObjects.forEach(filterObj => {
          if (!this.compareColumns(data, filterObj)) {
            isEqual = false;
          }
        });
      } else {
        isEqual = this.compareAll(data, filter);
      }
      return isEqual;
    }
    return filterFunction;
  }

  /**
   * Event triggered onchange of textbox
   * @param event 
   */
  applyFilter(event: Event) {
    this.customFilter = false;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Apply custom column filter
   * @param filterObject : Array of columFilter objects
   */
  applyColumnFilter(filterObject: IColumnFilter[]) {
    this.customFilter = true;
    this.dataSource.filter = JSON.stringify(filterObject);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPaginationChange(event:any) {
    console.log(event);
    this.paginationChange.emit(event);
  }
}
