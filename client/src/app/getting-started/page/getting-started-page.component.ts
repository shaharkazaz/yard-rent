import {AfterViewInit, Component, ElementRef, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {untilDestroyed} from "ngx-take-until-destroy";
import {DatoDialog, DatoSnackbar, filterDialogSuccess} from "@datorama/core";
import {AuthQuery} from "../../auth/state/auth.query";
import {ShoppingCartQuery} from "../../shopping-cart/state/shopping-cart.query";
import {LoginComponent} from "../../auth/login/login.component";

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started-page.component.html',
  styleUrls: ['./getting-started-page.component.scss']
})
export class GettingStartedPageComponent implements OnDestroy, AfterViewInit {

  itemsCount$ = this.shoppingCartQuery.selectCount();
  isLoggedIn$ = this.authQuery.isLoggedIn$;
  private readonly generalPath = '../../../assets/images/getting-started/'
  private readonly canvas = document.getElementById('myCanvas');


  sections = [
      {
        name:'how-to-post',
        description: 'how-to-post-description'
      },
      {
        name:'how-to-rent',
        description: 'how-to-rent-description'
      },
      {
        name:'what-are-rewards',
        description: 'what-are-rewards-description'
      }
    ];

  getSectionImage(name){
    return this.generalPath + name + '.jpg';
  }

  getIconImage(name){
    return this.generalPath + name + '.png';
  }

  constructor(
    private router: Router,
    private host: ElementRef,
    private dialog: DatoDialog,
    private authQuery: AuthQuery,
    private snackbar: DatoSnackbar,
    private shoppingCartQuery: ShoppingCartQuery
  ) { }

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

  openLoginDialog(view: 'login' | 'sign-up') {
    return this.dialog.open(LoginComponent, {
      data: { view },
      enableClose: true
    });
  }

  ngOnDestroy(): void {}



  ngAfterViewInit() {

    this.scrollToHash();
    this.router.events.pipe(untilDestroyed(this)).subscribe(e => {
      if (e instanceof NavigationEnd) {
        setTimeout(() => this.scrollToHash(), 300);
      }
    });
  }


  private scrollToHash() {
    const {hash} = window.location;
    if (hash) {
      const elementId = hash.slice(1);
      const element = document.getElementById(elementId);
      if (element) {
        this.host.nativeElement.scrollTo({ behavior: 'smooth', top: element.offsetTop });
      }
    }
  }
}
