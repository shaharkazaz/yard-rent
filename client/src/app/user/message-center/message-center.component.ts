import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageCenterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
