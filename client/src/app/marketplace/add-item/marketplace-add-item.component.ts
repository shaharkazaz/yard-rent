import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './marketplace-add-item.component.html',
  styleUrls: ['./marketplace-add-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceAddItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
