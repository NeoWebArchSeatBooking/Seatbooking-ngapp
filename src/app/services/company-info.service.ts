import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(private apiService: ApiService) { }

  fetchSeatingInformation() {
    //return this.http.get('https://jsonblob.com/api/jsonBlob/1137747996019908608');
    //return this.http.get('https://jsonblob.com/api/jsonBlob/1140606227507437568');
    return this.apiService.httpGet('/1140606227507437568');
  }
}
