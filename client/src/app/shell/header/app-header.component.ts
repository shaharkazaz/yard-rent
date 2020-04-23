import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthQuery} from '../../auth/state/auth.query';
import {DatoDialog, DatoSnackbar, filterDialogSuccess} from '@datorama/core';
import {LoginComponent} from '../../auth/login/login.component';
import {Router} from '@angular/router';
import {ShoppingCartQuery} from "../../shopping-cart/state/shopping-cart.query";

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
    private dialog: DatoDialog,
    private snackbar: DatoSnackbar,
    private router: Router,
    private shoppingCartQuery: ShoppingCartQuery
  ) {}

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.dialog.open(LoginComponent, {
      data: { view },
      enableClose: true
    });
  }

  addNewItem() {
    if (this.authQuery.isLoggedIn()) {
      this.navigateToAddItem();
    } else {
      this.openLoginDialog('login')
        .afterClosed()
        .pipe(filterDialogSuccess())
        .subscribe(() => this.navigateToAddItem());
      this.snackbar.info('login-to-continue', { duration: 1500 });
    }
  }

  private navigateToAddItem() {
    this.router.navigate(['marketplace/add-item']);
  }

}
