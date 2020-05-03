import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersPageComponent } from './my-orders/my-orders-page.component';
import { MyProductsPageComponent } from './my-products/my-products-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import {
  DatoButtonModule,
  DatoDirectivesModule, DatoEditableHeaderModule, DatoFileInputModule, DatoFormValidationModule,
  DatoGridV2Module, DatoIconButtonModule,
  DatoIconModule, DatoInputModule,
  DatoLinkButtonModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';
import {UserService} from "./user.service";
import {UserDataService} from "./user.data-service";
import {ReactiveFormsModule} from "@angular/forms";
import { EditUserComponent } from './edit-user/edit-user.component';
import {CommonModule} from "@angular/common";

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
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent
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
    DatoEditableHeaderModule,
    ReactiveFormsModule,
    DatoIconButtonModule,
    DatoInputModule,
    DatoFileInputModule,
    CommonModule,
    DatoFormValidationModule
  ],
  declarations: [
    MyOrdersPageComponent,
    MyProductsPageComponent,
    ProfilePageComponent,
    EditUserComponent
  ],
  providers: [UserService, UserDataService],
  exports: [MyOrdersPageComponent]
})
export class UserModule {}
