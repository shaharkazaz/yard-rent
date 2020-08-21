import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { tapOnce } from '@datorama/core';
import { format, isThisYear, isToday } from 'date-fns';

import { AuthQuery } from '../../auth/state/auth.query';

import { MessageCenterService } from './message-center.service';
import { ClientMessage, ServerMessage } from './message-center.types';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageCenterComponent implements OnInit {
  messages: ClientMessage[];
  selectedMessage: ClientMessage;
  view: 'archive' | 'inbox' = 'inbox';
  private sortDir = -1; // desc

  constructor(
    private messagesService: MessageCenterService,
    private authQuery: AuthQuery,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.messagesService
      .getAllMessages(this.authQuery.getUserInfo()._id)
      .pipe(
        tapOnce(messages => {
          this.selectedMessage = messages.find(m => !m.isArchived);
        })
      )
      .subscribe(messages => {
        this.messages = messages;
        this.cdr.detectChanges();
      });
  }

  get viewMessages() {
    return this.messages.filter(
      ({ isArchived }) => isArchived === (this.view === 'archive')
    );
  }

  selectMessage(message: ServerMessage) {
    this.markAs(message, true);
    this.selectedMessage = message;
    this.cdr.detectChanges();
  }

  changeSort() {
    this.sortDir = this.sortDir * -1;
    this.messages = this.messages.sort(
      (a, b) => a.date.localeCompare(b.date) * this.sortDir
    );
  }

  getSortIcon() {
    const dir = this.sortDir === 1 ? 'asc' : 'desc';
    return `sort-${dir}-arrow`;
  }

  getDate(raw: string) {
    const date = new Date(raw);
    let dateFormat = isToday(date) ? 'HH:mm' : 'MMM D';
    if (!isThisYear(date)) {
      dateFormat = ' YYYY';
    }
    return format(date, dateFormat);
  }

  getUnreadLength() {
    return this.view === 'inbox'
      ? this.messages.filter(
          ({ isOpened, isArchived }) => !isOpened && !isArchived
        ).length
      : this.viewMessages.length;
  }

  markAs(message: ServerMessage, isOpened: boolean) {
    message.isOpened = isOpened;
    this.messagesService
      .setMessageOpenStatus(message._id, isOpened)
      .subscribe();
  }

  archive(message: ServerMessage, isArchived) {
    message.isArchived = isArchived;
    this.messagesService
      .setMessageArchiveStatus(message._id, isArchived)
      .subscribe();
    const nextMessage = this.messages.indexOf(message) + 1;
    this.selectedMessage =
      nextMessage === this.messages.length ? null : this.messages[nextMessage];
  }

  changeView() {
    this.view = this.view === 'inbox' ? 'archive' : 'inbox';
    this.selectedMessage = this.messages.find(({ isArchived }) =>
      this.view === 'archive' ? isArchived : !isArchived
    );
  }
}
