import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'marketplace-filters',
  templateUrl: './marketplace-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-filters.component.scss']
})
export class MarketplaceFiltersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
