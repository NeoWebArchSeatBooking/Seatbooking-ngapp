import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';

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
        qp.fromDate = moment(params.filter.fromDate).format('DD-MM-yyyy');
      }
      if(params.filter.toDate) {
        qp.toDate = moment(params.filter.toDate).format('DD-MM-yyyy');
      }
    }
    return this.apiService.httpGet('booking/seats', qp, config);
  }

 
}
