import { Injectable } from '@angular/core';
import { ServerMessage } from './message-center.types';
import { parseUrl } from '../../shared/utils';
import { URI_CONSTANTS } from '../../shared/constants/uri.contants';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessageCenterDataService {
  constructor(private http: HttpClient) {}

  getNewMessages(id: string) {
    return this.http.get<ServerMessage[]>(
      parseUrl(URI_CONSTANTS.messages.newMessages, { id })
    );
  }

  getAllMessages(id: string) {
    return this.http.get<ServerMessage[]>(
      parseUrl(URI_CONSTANTS.messages.messages, { id })
    );
  }

  setMessageOpenStatus(messageId: string, isOpened: boolean) {
    return this.http.post<void>(
      parseUrl(URI_CONSTANTS.messages.updateOpen, { id: messageId }),
      { isOpened }
    );
  }

  setMessageArchiveStatus(messageId: string, isArchived: boolean) {
    return this.http.post<void>(
      parseUrl(URI_CONSTANTS.messages.updateArchive, { id: messageId }),
      { isArchived }
    );
  }
}
