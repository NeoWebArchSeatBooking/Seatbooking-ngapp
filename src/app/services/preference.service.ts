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
}
