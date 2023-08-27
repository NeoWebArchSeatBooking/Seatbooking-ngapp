import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private apiService: ApiService) { }

  getBooking(params?:any) {
    //return this.http.get('https://jsonblob.com/api/jsonBlob/1137717948520980480');
    //return this.http.get('https://jsonblob.com/api/jsonBlob/1140605340093374464');
    //return this.apiService.httpGet('1140605340093374464');
    const config: IAPIConfiguration = {
      group: 'booking',
      key: 'seats'
    };

    let qp:any = {};
    if(params?.filter) {
      if(params.filter.viewRole) {
        qp.viewRole = params.filter.viewRole;
      }
      if(params.filter.user) {
        qp.user = params.filter.user;
      }
      if(params.filter.fromDate) {
        qp.from = moment(params.filter.fromDate).format('D-M-yyyy');
      }
      if(params.filter.toDate) {
        qp.to = moment(params.filter.toDate).format('D-M-yyyy');
      }
    }
    return this.apiService.httpGet('seats', qp, config);
  }

 
}
