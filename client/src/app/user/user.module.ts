import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersPageComponent } from './my-orders/my-orders-page.component';
import { MyProductsPageComponent } from './my-products/my-products-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';

const routes: Routes = [
  {
    path: 'my-orders',
    component: MyOrdersPageComponent
  },
  {
    path: 'my-products',
    component: MyProductsPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
    MyOrdersPageComponent,
    MyProductsPageComponent,
    ProfilePageComponent
  ],
  exports: [MyOrdersPageComponent]
})
export class UserModule {}
