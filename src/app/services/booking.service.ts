import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBooking() {
    return this.http.get('https://jsonblob.com/api/jsonBlob/1137717948520980480');
  }

 
}
