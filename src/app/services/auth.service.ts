import { Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { IAPIConfiguration } from '../shared/service/interfaces/i-configuration';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { EventService } from '../event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token;
  private userDetails;
  
  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private eventService: EventService,
    ) { }

  fetchUserDetails() {
    const config:IAPIConfiguration = {
      group : 'idp',
      key: 'status'
    }
    return this.apiService.httpGet('idp/profile',null,config).pipe((map(res => {
      this.userDetails = res?.profile;
      return res;
    })));
  }

  getUSerDetails() {
    return this.userDetails;
  }

  isLoggedIn() {
    return this.token !== undefined;
  }

  isAdmin() {
    return this.userDetails?.role === 'admin';
  }

  checkIfAlreadyLoggedIn() {
    if(this.cookieService.get('token')) {
      this.token = this.cookieService.get('token');
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return this.token;
  }

  setToken(token:string) {
    this.cookieService.set('token', token, { expires: new Date(new Date().getTime() +  1000 * 60 * 60) });
    this.token = token;
  }

  clearToken() {
    this.cookieService.delete('token');
    this.token = undefined;
  }

  logOut() {
    this.clearToken();
    this.eventService.showHideMenu(false);
  }

}
