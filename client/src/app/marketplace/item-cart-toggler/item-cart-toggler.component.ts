import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ShoppingCartService} from "../../shopping-cart/state/shopping-cart.service";
import {ShoppingCartQuery} from "../../shopping-cart/state/shopping-cart.query";
import {DatoSnackbar} from "@datorama/core";
import {Product} from "../marketplace.types";

@Component({
  selector: 'marketplace-item-cart-toggler',
  templateUrl: './item-cart-toggler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCartTogglerComponent {
  inCart = false;
  @Input() set product(product: Product) {
    this._product = product;
    this.inCart = this.shoppingCartQuery.hasEntity(product._id);
  }

  private _product: Product;
  constructor(private shoppingCartService: ShoppingCartService, private shoppingCartQuery: ShoppingCartQuery, private snackbar: DatoSnackbar) { }

  toggleItemInCart() {
    if (this.inCart) {
      this.shoppingCartService.delete(this._product._id);
    } else {
      this.shoppingCartService.add(this._product);
    }
    const msg = this.inCart ? 'item-removed-from-cart' : 'item-added-to-cart';
    this.snackbar.info(msg);
    this.inCart = !this.inCart;
  }
}