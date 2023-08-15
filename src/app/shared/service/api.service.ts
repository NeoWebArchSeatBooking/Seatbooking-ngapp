import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAPIConfiguration } from './interfaces/i-configuration';
import { MockService } from './mock-service/mock.service';
import { UtilityService } from './utility/utility.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private environmentConfig = environment;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private utilityService: UtilityService, 
    private mockService: MockService) { }

  httpGet(url:string, params?:any, configuration?: IAPIConfiguration) {
    if(this.environmentConfig.isMock && configuration?.group && configuration.key) {
      return this.mockService.fetchData(configuration);
    }
    return this.httpClient.get(this.getBaseURL(url), params? params: {}).pipe(catchError(err => {
      if(err.status === 401 || err.status === 0) {
        this.router.navigate(['error']);
      } else {
        if(!(configuration && configuration.muteNotifyError)) {
          this.utilityService.showErrorAlert(err);
        }
      }
      return throwError(err);
  }));
  }

  httpPost(url: string, body: any, configuration: IAPIConfiguration) {
    if(this.environmentConfig.isMock && configuration?.group && configuration.key) {
      return this.mockService.fetchData(configuration);
    }
    return this.httpClient.post(this.getBaseURL(url), body).pipe(catchError(err => {
      if(err.status === 401) {
        this.utilityService.showErrorAlert('only accessible to users who are designated as a Point of Contact or Court Unit Executive. Please reach out to the Court Unit Dashboard team at ao_court_dashboard@ao.uscourts.gov with any questions.');
      } else {
        if(!(configuration && configuration.muteNotifyError)) {
          this.utilityService.showErrorAlert(err);
        }
      }
      return throwError(err);
  }));
  }

  getBaseURL(url:string) {
    return this.environmentConfig.baseURL+'/'+url;
  }

}
