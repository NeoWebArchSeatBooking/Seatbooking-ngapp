import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private subject = new Subject();
  public message$:Observable<any> = this.subject;

  showHideMenu(isLoggedIn:boolean) {
    this.subject.next(isLoggedIn);
  }
}