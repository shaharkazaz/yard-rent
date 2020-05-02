import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersPageComponent } from './my-orders/my-orders-page.component';
import { MyProductsPageComponent } from './my-products/my-products-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import {
    DatoButtonModule,
    DatoDirectivesModule, DatoFileInputModule,
    DatoGridV2Module,
    DatoIconModule,
    DatoLinkButtonModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';
import {UserService} from "./user.service";
import {UserDataService} from "./user.data-service";
import {ReactiveFormsModule} from "@angular/forms";

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
  imports: [
    RouterModule.forChild(routes),
    DatoGridV2Module,
    DatoIconModule,
    DatoDirectivesModule,
    TranslocoModule,
    DatoLinkButtonModule,
    DatoButtonModule,
    DatoFileInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    MyOrdersPageComponent,
    MyProductsPageComponent,
    ProfilePageComponent
  ],
  providers: [UserService, UserDataService],
  exports: [MyOrdersPageComponent]
})
export class UserModule {}
