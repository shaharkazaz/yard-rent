import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationType,
  DatoActionType,
  DatoDialog,
  DialogResultStatus
} from '@datorama/core';
import { translate } from '@ngneat/transloco';
import { filter } from 'rxjs/operators';

import { ShoppingCartQuery } from '../shopping-cart/state/shopping-cart.query';
import { ShoppingCartService } from '../shopping-cart/state/shopping-cart.service';

import { AuthService } from './state/auth.service';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
  constructor(
    private authService: AuthService,
    private shoppingCartQuery: ShoppingCartQuery,
    private router: Router,
    private dialog: DatoDialog,
    private shoppingCart: ShoppingCartService
  ) {}

  logout(force = false) {
    const itemsInCart = this.shoppingCartQuery.getCount();
    if (force || itemsInCart === 0) {
      this._logout();
    } else if (itemsInCart > 0) {
      this.dialog
        .confirm({
          confirmationType: ConfirmationType.DISRUPTIVE_WARNING,
          title: 'perform-logout',
          actions: [
            {
              type: DatoActionType.DISMISSED,
              caption: 'Logout',
              data: true
            },
            {
              type: DatoActionType.SUCCESS,
              caption: 'Cancel'
            }
          ],
          content: translate('logout-clear-cart')
        })
        .afterClosed()
        .pipe(
          filter(result => {
            return (
              result.status === DialogResultStatus.DISMISSED && result.data
            );
          })
        )
        .subscribe(() => this._logout());
    }
  }

  private _logout() {
    this.shoppingCart.clearCart();
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
