import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';
// import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(private apiService: ApiService) { }

  fetchSeatingInformation() {
    /*const config:IAPIConfiguration = {
      overrideBaseURL: 'https://jsonblob.com',
      overrideResourcePath: 'api/jsonBlob'
    };
    return this.apiService.httpGet('1140606227507437568', null, config);
    */

    const config:IAPIConfiguration = {
      group: 'infra',
      key: 'facilities'
    };
    return this.apiService.httpGet('facilities', null, config);
  }
}
