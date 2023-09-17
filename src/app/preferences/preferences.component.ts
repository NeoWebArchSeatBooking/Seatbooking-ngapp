import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CompanyInfoService } from '../services/company-info.service';
import { PreferenceService } from '../services/preference.service';
import { TableViewComponent } from '../shared/components/table-view/table-view.component';
import { schema } from './schema/preferences.schema';
import { UtilityService } from '../shared/service/utility/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPreferenceComponent } from './add-preference/add-preference.component';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  @ViewChild('tableView') tableView!: TableViewComponent;
  columnDefinition: any;
  configuration: any;
  constructor(
    private preferenceService : PreferenceService,
    private infraService: CompanyInfoService, 
    private utilityService : UtilityService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.setColumnDefinitions();
    this.configuration = this.getConfiguration();
    setTimeout(() => {
      //this.fetchData(0, this.tableView.getPaginationPageSize());
      this.getData();
    }, 0);
  }

  setColumnDefinitions() {
    const cols = [...schema.tableSchema];
    this.columnDefinition = cols;
  }

  getConfiguration() {
    return {
      add: true,
      addConfig: {
        label: 'Add new Preference'
      },
      serverRender: false,
      disableFullTextSearch: true,
      actionConfig: [
        {
          id: 'cancel',
          iconName: 'cancel',
          tooltip: 'Cancel Preference',
          action: (item) => {
            this.utilityService.showConfirmation({
              data: {
                title: 'Do you want to cancel Preference?'
              }
            }).subscribe((res: any) => {
              if(res) {
                this.cancelPreference(item.id);
              }
            });
          }
        }
      ]
    };
  }

  getData() {
    forkJoin([
      this.infraService.getInfraOptions(),
      this.preferenceService.getPreferences()
    ]).subscribe(res => {
      const data = this.processData(res[1].preferences, res[0].items);
      this.tableView?.setData(data);
      this.tableView?.setTotalSize(data.length);
    })
  }

  processData(preferences:any, infraOptions:any) {
    preferences.forEach((pre:any) => {
      pre.infra = infraOptions.find((infra: any) => infra.key === pre.key);
    });
    return preferences;
  }

  cancelPreference(id) {
    this.preferenceService.cancelPreference(id).subscribe(() => {
      this.utilityService.showSuccessAlert('Preference got canceled successfully');
      this.getData();
    })
  }

  addNew() {
    const dialogRef = this.dialog.open(AddPreferenceComponent, {
      height: '50%',
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.getData();
    });
  }
}
