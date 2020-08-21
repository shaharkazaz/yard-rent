import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { MessageCenterDataService } from './message-center.data-service';
import { ClientMessage, ServerMessage } from './message-center.types';

@Injectable({ providedIn: 'root' })
export class MessageCenterService {
  constructor(private dataService: MessageCenterDataService) {}

  setMessageOpenStatus(messageId: string, isOpened: boolean) {
    return this.dataService.setMessageOpenStatus(messageId, isOpened);
  }

  setMessageArchiveStatus(messageId: string, isArchived: boolean) {
    return this.dataService.setMessageArchiveStatus(messageId, isArchived);
  }

  getAllMessages(id: string) {
    return this.dataService
      .getAllMessages(id)
      .pipe(map(this.mapToClientMessages));
  }

  getNewMessages(id: string) {
    return this.dataService.getNewMessages(id);
  }

  private mapToClientMessages(messages: ServerMessage[]): ClientMessage[] {
    return messages.map(message => message);
  }
}
