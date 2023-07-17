import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SSEService {
  private eventSubject = new Subject<MessageEvent>();

  pushEvent(event: MessageEvent) {
    this.eventSubject.next(event);
  }

  sse(): Observable<MessageEvent> {
    return this.eventSubject.asObservable();
  }
}
