import { Component, Input, OnInit } from '@angular/core';
import { ClientMessage } from '../../message-center.types';

@Component({
  selector: 'return-reminder-message',
  templateUrl: './return-reminder.component.html',
  styleUrls: ['./return-reminder.component.scss']
})
export class ReturnReminderComponent implements OnInit {
  @Input() message: ClientMessage;

  constructor() {}

  ngOnInit() {}
}
