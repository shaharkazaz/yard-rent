import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from '@yr/auth/state/auth.query';
import { DatoSnackbar } from '@datorama/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authQuery: AuthQuery,
    private router: Router,
    private snackbar: DatoSnackbar
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.verifyLoggedIn();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verifyLoggedIn();
  }

  private verifyLoggedIn() {
    if (!this.authQuery.isLoggedIn()) {
      this.snackbar.info('must-login');
      this.router.navigate(['home']);

      return false;
    }

    return true;
  }
}
