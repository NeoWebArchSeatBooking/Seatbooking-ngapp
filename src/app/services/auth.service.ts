import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) { }

  getUserDetails() {
    const config:IAPIConfiguration = {
      group : 'idp',
      key: 'status'
    }
    return this.apiService.httpGet('idp/status',null,config)
  }

}
