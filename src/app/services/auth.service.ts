import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) { }


  getUserDetails(token: any ,params?:any ) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
   window.alert('reached here');
    //return this.apiService.httpGet('booking/seats', , config);//
    return this.apiService.httpGet('idp/status',headers)
  }

}
