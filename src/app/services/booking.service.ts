import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private apiService: ApiService) { }

  getBooking() {
    //return this.http.get('https://jsonblob.com/api/jsonBlob/1137717948520980480');
    //return this.http.get('https://jsonblob.com/api/jsonBlob/1140605340093374464');
    return this.apiService.httpGet('1140605340093374464');
  }

 
}
