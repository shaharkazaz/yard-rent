import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../../auth/state/auth.service';
import { AuthQuery } from '../../auth/state/auth.query';
import { tap } from 'rxjs/operators';
import { User } from '../../auth/state/auth.model';
import { DatoSnackbar, filterDialogSuccess } from '@datorama/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  // TODO connect to cart store
  itemsCount$ = of(0);
  user: User;
  isLoggedIn$ = this.authQuery.isLoggedIn$.pipe(
    tap(() => {
      this.user = this.authQuery.getValue();
    })
  );

  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private snackbar: DatoSnackbar
  ) {}

  ngOnInit(): void {}

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.authService.openDialog(view);
  }

  logout() {
    this.authService.logout();
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

  private navigateToAddItem() {}
}
