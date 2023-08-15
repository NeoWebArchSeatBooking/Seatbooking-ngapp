import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(private http: HttpClient) { }

  fetchSeatingInformation() {
    //return this.http.get('https://jsonblob.com/api/jsonBlob/1137747996019908608');
    return this.http.get('https://jsonblob.com/api/jsonBlob/1140606227507437568')
  }
}
