import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { UtilityService } from 'src/app/shared/service/utility/utility.service';

@Component({
  selector: 'app-list-preference',
  templateUrl: './list-preference.component.html',
  styleUrls: ['./list-preference.component.scss']
})
export class ListPreferenceComponent implements OnInit {
  preferences:any;
  selected:any;

  constructor(
    private preferenceService: PreferenceService,
    private companyInfoService: CompanyInfoService,
    private utilityService: UtilityService,
    public dialogRef: MatDialogRef<ListPreferenceComponent>
  ) {

  }
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    forkJoin([
      this.companyInfoService.getInfraOptions(),
      this.preferenceService.getPreferences()
    ]).subscribe((res) => {
      this.preferences = this.process(res[1].preferences, res[0].items);
    })
  }

  process(preferences: any[], infra: any) {
    // const infraKeys = infra.map((ob:any)=>ob.key);
    preferences.forEach((preference:any) => {
      preference.seatDetails = preference.value.split('_'); //this.splitValue(preference.value, infraKeys);
      preference.infra = infra.find((ob: any) => ob.key === preference.key);
    });
    return preferences;
  }

  // splitValue(preferenceValue:string, infraKeys: string[]) {
  //   const preValArray = preferenceValue.split('_');
  //   return preValArray.map((val:string, index:number) => {
  //     return {
  //       [infraKeys[index]]: val
  //     };
  //   });
  // }

  onChange(event:any) {
    console.log(event.value);
    this.selected = event?.value;
  }

  onSelect() {
    if(!this.selected) {
      this.utilityService.showInfoAlert('Please select the preference');
    } else {
      this.dialogRef.close(this.selected);
    }
  }
}
