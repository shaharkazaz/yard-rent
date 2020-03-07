import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders-page',
  templateUrl: './my-orders-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./my-orders-page.component.scss']
})
export class MyOrdersPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
