import { ChangeDetectionStrategy, Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { DatoDialog, DatoSnackbar } from '@datorama/core';

import { AuthDialogService } from '@yr/auth/state/auth-dialog.service';
import { ShoppingCartQuery } from '@yr/shopping-cart/state/shopping-cart.query';
import { AuthQuery } from '@yr/auth/state/auth.query';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {
  itemsCount$ = this.shoppingCartQuery.selectCount();
  isLoggedIn$ = this.authQuery.isLoggedIn$;

  constructor(
    private authQuery: AuthQuery,
    private authDialogService: AuthDialogService,
    private dialog: DatoDialog,
    private snackbar: DatoSnackbar,
    private router: Router,
    private shoppingCartQuery: ShoppingCartQuery
  ) {}

  addNewItem() {
    this.authDialogService.verifyLoggedIn(() =>
      this.router.navigate(['marketplace/add-item'], {
        queryParams: { backTo: this.router.url }
      })
    );
  }

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.authDialogService.openLoginDialog(view);
  }

  isDevMode() {
    return isDevMode();
  }
}
