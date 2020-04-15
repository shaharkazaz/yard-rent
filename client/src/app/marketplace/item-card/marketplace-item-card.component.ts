import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { DatoSnackbar } from '@datorama/core';
import {Product} from "../marketplace.types";
import {ShoppingCartService} from "../../shopping-cart/state/shopping-cart.service";
import { formatNumber } from '../../shared/utils';

@Component({
  selector: 'marketplace-item-card',
  templateUrl: './marketplace-item-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-item-card.component.scss']
})
export class MarketplaceItemCardComponent implements OnInit {
  @Input() item: Product;
  constructor(private snackbar: DatoSnackbar, private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  formatNumber(rewards: number) {
    return formatNumber(rewards);
  }

  addItemToCart() {
    this.shoppingCartService.add(this.item);
    this.snackbar.success('item-added-to-cart');
  }
}
