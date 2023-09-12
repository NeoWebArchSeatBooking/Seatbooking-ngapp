import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  seatInformation: any;
  constructor(private apiService: ApiService) { }

  fetchSeatingInformation() {
    const config: IAPIConfiguration = {
      group: 'infra',
      key: 'facilities',
    };
    if (this.seatInformation) {
      return of(this.seatInformation);
    }
    return this.apiService.httpGet('facilities', null, config).pipe((map(res => {
      this.seatInformation = res;
      return this.seatInformation;
    })));
  }

  fetchAvailableSeats(seatSearchParams: { date: string, locationId: string, blockId: string, floorId?: string}) {
    const config: IAPIConfiguration = {
      group: 'seats',
      key: 'seats',
    };
    const params = new HttpParams();
    params.append('date', seatSearchParams.date);
    params.append('locationId', seatSearchParams.locationId);
    params.append('blockId', seatSearchParams.blockId);
    params.append('floorId', seatSearchParams.floorId);
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
