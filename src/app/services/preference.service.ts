import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(
    private apiService: ApiService
  ) { }

  getPreferences() {
    const config:IAPIConfiguration = {
      group: 'preference',
      key: 'preferences'
    };
    return this.apiService.httpGet('preferences',null, config);
  }

  addPreference(preference:any) {
    const body = {
      key: preference.key,
      value: preference.selected.value  
    };
    
    const config:IAPIConfiguration = {
      group: 'preference',
      key: 'post-preferences'
    };
    return this.apiService.httpPost('preferences', body, config);
  }
}
