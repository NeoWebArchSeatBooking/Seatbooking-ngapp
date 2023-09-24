import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, delay, map } from 'rxjs/operators';
import { IAPIConfiguration } from '../interfaces/i-configuration';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(
    private httpClient: HttpClient, 
    private utilityService: UtilityService) { }

  fetchData(configuration:IAPIConfiguration, params?:any) {
    return this.httpClient.get(`/assets/mock/${configuration.group}.json`).pipe(delay(500)).pipe(map((res:any) => {
      const data = res[configuration.key];
      console.log(`${params} not used in mock`)
      return data;
    })).pipe(catchError(err => {
      if(!(configuration && configuration.muteNotifyError)) {
        this.utilityService.showErrorAlert(err);
      }
      return throwError(err);
  }))
  }
}
