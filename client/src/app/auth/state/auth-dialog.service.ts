import {Injectable} from "@angular/core";
import {LoginComponent} from "../login/login.component";
import {DatoDialog, DatoSnackbar, filterDialogSuccess} from "@datorama/core";
import {AuthQuery} from "./auth.query";

@Injectable({providedIn: 'root'})
export class AuthDialogService {

  constructor(private dialog: DatoDialog, private snackbar: DatoSnackbar, private authQuery: AuthQuery) {}

  verifyLoggedIn(cb: Function) {
    if (this.authQuery.isLoggedIn()) {
      cb();
    } else {
      this.openLoginDialog('login')
        .afterClosed()
        .pipe(filterDialogSuccess())
        .subscribe(() => {
          cb();
        });
      this.snackbar.info('login-to-continue', { duration: 1500 });
    }
  }

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.dialog.open(LoginComponent, {
      data: { view },
      enableClose: true
    });
  }
}
