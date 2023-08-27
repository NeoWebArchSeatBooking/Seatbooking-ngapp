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

  public environmentConfig = environment;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private utilityService: UtilityService,
    private mockService: MockService) { }

  httpGet(url: string, params?: any, configuration?: IAPIConfiguration) {
    if (this.environmentConfig.isMock && configuration?.group && configuration.key) {
      return this.mockService.fetchData(configuration, params);
    }
    return this.httpClient.get(this.getURL(url, configuration), {params : params ? params : {}}).pipe(catchError(err => {
      if (err.status === 401 || err.status === 0) {
        //this.router.navigate(['error']);
      } else {
        if (!(configuration && configuration.muteNotifyError)) {
          this.utilityService.showErrorAlert(err.message);
        }
      }
      return throwError(err);
    }));
  }

  httpPost(url: string, body: any, configuration: IAPIConfiguration) {
    if (this.environmentConfig.isMock && configuration?.group && configuration.key) {
      return this.mockService.fetchData(configuration);
    }
    return this.httpClient.post(this.getURL(url, configuration), body).pipe(catchError(err => {
      if (err.status === 401) {
        this.utilityService.showErrorAlert("You don't have permission to access");
      } else {
        if (!(configuration && configuration.muteNotifyError)) {
          this.utilityService.showErrorAlert(err.message);
        }
      }
      return throwError(err);
    }));
  }

  httpPatch(url: string, body: any, configuration: IAPIConfiguration) {
    if (this.environmentConfig.isMock && configuration?.group && configuration.key) {
      return this.mockService.fetchData(configuration);
    }
    return this.httpClient.patch(this.getURL(url, configuration), body).pipe(catchError(err => {
      if (err.status === 401) {
        this.utilityService.showErrorAlert("You don't have permission to access");
      } else {
        if (!(configuration && configuration.muteNotifyError)) {
          this.utilityService.showErrorAlert(err.message);
        }
      }
      return throwError(err);
    }));
  }

  getURL(endpoint: string, configuration: IAPIConfiguration) {
    let baseURL = this.environmentConfig.baseURL;
    let resourcePath = this.environmentConfig.resourcePath;

    if (configuration?.overrideBaseURL) {
      baseURL = configuration.overrideBaseURL;
    }
    if (configuration?.overrideResourcePath) {
      resourcePath = configuration.overrideResourcePath;
    }
    return `${baseURL}/${resourcePath}/${endpoint}`;
  }

}
