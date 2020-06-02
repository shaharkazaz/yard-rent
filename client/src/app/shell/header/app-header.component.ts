import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthQuery} from '../../auth/state/auth.query';
import {DatoDialog, DatoSnackbar} from '@datorama/core';
import {Router} from '@angular/router';
import {ShoppingCartQuery} from "../../shopping-cart/state/shopping-cart.query";
import {AuthDialogService} from "../../auth/state/auth-dialog.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent  {
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
      this.router.navigate(['marketplace/add-item'], {queryParams: {backTo: this.router.url}})
    );
  }

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.authDialogService.openLoginDialog(view);
  }
}
