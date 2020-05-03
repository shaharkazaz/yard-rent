import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/page/home-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then(
        ({ AboutModule }) => AboutModule
      )
  },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./marketplace/marketplace.module').then(
        ({ MarketplaceModule }) => MarketplaceModule
      )
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then(({ UserModule }) => UserModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(({ AdminModule }) => AdminModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(({ ContactModule }) => ContactModule)
  },
  {
    path: 'getting-started',
    loadChildren: () => import('./getting-started/getting-started.module').then(({ GettingStartedModule }) => GettingStartedModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(({ ShoppingCartModule }) => ShoppingCartModule)
  },
  {
    path: 'order-complete',
    loadChildren: () => import('./order-complete/order-complete.module').then(({ OrderCompleteModule }) => OrderCompleteModule)
  },
  {
    path: 'no-results',
    loadChildren: () => import('./contact/contact.module').then(({ ContactModule }) => ContactModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
