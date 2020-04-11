import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {of} from 'rxjs';
import {AuthService} from '../../auth/state/auth.service';
import {AuthQuery} from '../../auth/state/auth.query';
import {DatoDialog, DatoSnackbar, filterDialogSuccess} from '@datorama/core';
import {LoginComponent} from '../../auth/login/login.component';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  // TODO connect to cart store
  itemsCount$ = of(0);
  // TODO user interface
  user: any;
  isLoggedIn$ = this.authQuery.isLoggedIn$;
  gettingStartedMenuItems = [
    'how-to-post',
    'how-to-rent',
    'what-are-rewards'
  ];

  @ViewChild('gettingStartedBtn', {static: false, read: ElementRef}) gettingStartedBtn: ElementRef;

  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private dialog: DatoDialog,
    private snackbar: DatoSnackbar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authQuery
      .select(state => state.user)
      .subscribe(user => {
        this.user = user;
      });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const element = this.gettingStartedBtn.nativeElement;
        const addClass = event.url.includes('getting-started');
        addClass ? element.classList.add('active-page') : element.classList.remove('active-page');
      }
    });
  }

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.dialog.open(LoginComponent, {
      data: { view },
      enableClose: true
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
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
