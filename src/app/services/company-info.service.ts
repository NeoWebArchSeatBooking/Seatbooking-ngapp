import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';
import { map, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
// import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  seatInformation: any;
  constructor(private apiService: ApiService) { }

  fetchSeatingInformation() {
    /*const config:IAPIConfiguration = {
      overrideBaseURL: 'https://jsonblob.com',
      overrideResourcePath: 'api/jsonBlob'
    };
    return this.apiService.httpGet('1140606227507437568', null, config);
    */

    const config: IAPIConfiguration = {
      group: 'infra',
      key: 'facilities',
      overrideResourcePath: 'idp'
    };
    if (this.seatInformation) {
      return of(this.seatInformation);
    }
    return this.apiService.httpGet('facilities', null, config).pipe((map(res => {
      this.seatInformation = res;
      return this.seatInformation;
    })));
  }

  fetchAvailableSeats(seatFilters: { locationId: any, blockId: any, floorId: any }) {
    const config: IAPIConfiguration = {
      group: 'seats',
      key: 'seats',
      overrideResourcePath: 'idp'
    };
    const params = new HttpParams();
    params.append('locationId', seatFilters.locationId);
    params.append('blockId', seatFilters.blockId);
    params.append('floorId', seatFilters.floorId);
    return this.apiService.httpGet('seats', params, config);
  }


  getInfraOptions() {
    return of({
      "items": [
        {
          "key": "infras",
          "displayValue": "Locations"
        },
        {
          "key": "blocks",
          "displayValue": "Block"
        },
        {
          "key": "floors",
          "displayValue": "Floor"
        }
      ]
    });
  }
}
