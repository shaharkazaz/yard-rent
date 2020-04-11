import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { DatoSnackbar } from '@datorama/core';
import {Product} from "../marketplace.types";

@Component({
  selector: 'marketplace-item-card',
  templateUrl: './marketplace-item-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-item-card.component.scss']
})
export class MarketplaceItemCardComponent implements OnInit {
  @Input() item: Product;
  private numberFormatter = Intl.NumberFormat();
  constructor(private snackbar: DatoSnackbar) {}

  ngOnInit() {}

  formatNumber(rewards: number) {
    return this.numberFormatter.format(rewards);
  }

  addItemToCart() {
    this.snackbar.success('item-added-to-cart');
  }
}
