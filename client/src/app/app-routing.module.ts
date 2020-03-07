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
      import('./about/page/about-page.module').then(
        ({ AboutPageModule }) => AboutPageModule
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
    path: 'contact',
    loadChildren: () =>
      import('./contact/page/contact-page.module').then(
        ({ ContactPageModule }) => ContactPageModule
      )
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
