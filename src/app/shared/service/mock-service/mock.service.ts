import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { IAPIConfiguration } from '../interfaces/i-configuration';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(
    private httpClient: HttpClient, 
    private utilityService: UtilityService) { }

  fetchData(configuration:IAPIConfiguration) {
    return this.httpClient.get(`/assets/mock/${configuration.group}.json`).pipe(map((res:any) => {
      return res[configuration.key];
    })).pipe(catchError(err => {
      if(!(configuration && configuration.muteNotifyError)) {
        this.utilityService.showErrorAlert(err);
      }
      return throwError(err);
  }))
  }
}
