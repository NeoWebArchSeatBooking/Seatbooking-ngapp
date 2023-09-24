import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  public idle$: Subject<boolean> = new Subject();
  private idleAfterSeconds = 600; //10 mins
  private countDown;
  private active :boolean = true;

  constructor(
    private authService: AuthService
  ) {
    // Setup events
    fromEvent(document, 'mousemove').subscribe(() => this.onInteraction());
    fromEvent(document, 'touchstart').subscribe(() => this.onInteraction());
    fromEvent(document, 'keydown').subscribe(() => this.onInteraction());
    this.onInteraction();
  }

 
  onInteraction() {
    if(!this.authService.isLoggedIn() || !this.active) {
      return;
    }

    // User interaction, reset start-idle-timer
    clearTimeout(this.countDown);
    this.countDown = setTimeout(() => {
      // Countdown done without interaction - emit Idle
      // this.isIdle = true;
      this.idle$.next(true);
    }, this.idleAfterSeconds * 1_000)
  }

  clear() {
    clearTimeout(this.countDown);
    this.active = false;
  }

  restart() {
    this.active = true;
    this.onInteraction();
  }
}
