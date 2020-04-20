import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthQuery} from '../../auth/state/auth.query';
import {DatoDialog, DatoSnackbar, filterDialogSuccess} from '@datorama/core';
import {LoginComponent} from '../../auth/login/login.component';
import {NavigationEnd, Router} from '@angular/router';
import {ShoppingCartQuery} from "../../shopping-cart/state/shopping-cart.query";
import {User} from "../../auth/state/auth.model";
import {AppAuthService} from "../../auth/app-auth.service";
import {combineLatest, Subject} from "rxjs";
import {formatNumber} from "../../shared/utils";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  itemsCount$ = this.shoppingCartQuery.selectCount();
  user: User;
  isLoggedIn$ = this.authQuery.isLoggedIn$;
  gettingStartedMenuItems = [
    'how-to-post',
    'how-to-rent',
    'what-are-rewards'
  ];
  viewInit = new Subject<HTMLElement>();

  @ViewChild('gettingStartedBtn', {static: false, read: ElementRef}) set gettingStartedTab(element: ElementRef) {
    element && this.viewInit.next(element.nativeElement);
  }

  constructor(
    private appAuthService: AppAuthService,
    private authQuery: AuthQuery,
    private dialog: DatoDialog,
    private snackbar: DatoSnackbar,
    private router: Router,
    private shoppingCartQuery: ShoppingCartQuery
  ) {}

  ngOnInit(): void {
    this.authQuery
      .select(state => state.user)
      .subscribe(user => {
        this.user = user;
      });
    combineLatest([this.router.events, this.viewInit.asObservable()])
    .subscribe(([event, btn]) => {
      if (event instanceof NavigationEnd) {
        const addClass = event.url.includes('getting-started');
        addClass ? btn.classList.add('active-page') : btn.classList.remove('active-page');
      }
    });
  }

  formatNumber(value: number) {
    return value ? formatNumber(value) : 0;
  }

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.dialog.open(LoginComponent, {
      data: { view },
      enableClose: true
    });
  }

  logout() {
    this.appAuthService.logout();
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
