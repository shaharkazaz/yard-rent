import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'marketplace-item-page',
  templateUrl: './marketplace-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-item-page.component.scss']
})
export class MarketplaceItemPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
