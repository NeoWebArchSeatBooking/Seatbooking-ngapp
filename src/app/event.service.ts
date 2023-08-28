import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  emitEvent(eventData: any): void {
    this.eventEmitter.emit(eventData);
  }
}