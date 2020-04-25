import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'marketplace-filters',
  templateUrl: './marketplace-filters.component.html',
  styleUrls: ['./marketplace-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceFiltersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
