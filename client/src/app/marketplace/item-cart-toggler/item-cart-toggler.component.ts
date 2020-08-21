import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { DatoSnackbar } from '@datorama/core';

import { ShoppingCartService } from '@yr/shopping-cart/state/shopping-cart.service';

import { AuthDialogService } from '../../auth/state/auth-dialog.service';
import { AuthQuery } from '../../auth/state/auth.query';
import { ShoppingCartQuery } from '../../shopping-cart/state/shopping-cart.query';
import { Product } from '../marketplace.types';

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

  _product: Product;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private shoppingCartQuery: ShoppingCartQuery,
    private snackbar: DatoSnackbar,
    private authQuery: AuthQuery,
    private authDialogService: AuthDialogService,
    private cdr: ChangeDetectorRef
  ) {}

  toggleItemInCart() {
    this.authDialogService.verifyLoggedIn(() => {
      if (this.inCart) {
        this.shoppingCartService.delete(this._product._id);
      } else {
        this.shoppingCartService.add(this._product);
      }
      const msg = this.inCart ? 'item-removed-from-cart' : 'item-added-to-cart';
      this.snackbar.info(msg);
      this.inCart = !this.inCart;
      this.cdr.detectChanges();
    });
  }
}
