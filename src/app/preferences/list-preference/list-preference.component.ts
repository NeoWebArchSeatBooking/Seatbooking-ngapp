import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { PreferenceService } from 'src/app/services/preference.service';

@Component({
  selector: 'app-list-preference',
  templateUrl: './list-preference.component.html',
  styleUrls: ['./list-preference.component.scss']
})
export class ListPreferenceComponent implements OnInit {
  preferences:any;

  constructor(
    private preferenceService: PreferenceService,
    private companyInfoService: CompanyInfoService
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
      this.preferences = this.process(res[1].items, res[0].items);
    })
  }

  process(preferences: any[], infra: any) {
    const infraKeys = infra.map((ob:any)=>ob.key);
    preferences.forEach((preference:any) => {
      preference.seatDetails = this.splitValue(preference.value, infraKeys);
      preference.infra = infra.find((ob: any) => ob.key === preference.key);
    });
    return preferences;
  }

  splitValue(preferenceValue:string, infraKeys: string[]) {
    const preValArray = preferenceValue.split('_');
    return preValArray.map((val:string, index:number) => {
      return {
        [infraKeys[index]]: val
      };
    });
  }

  onChange(event:any) {
    console.log(event.value);
    
  }
}
