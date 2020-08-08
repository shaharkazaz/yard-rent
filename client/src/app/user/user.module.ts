import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersPageComponent } from './my-orders/my-orders-page.component';
import { MyProductsPageComponent } from './my-products/my-products-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import {
  DatoButtonModule,
  DatoDirectivesModule,
  DatoEditableHeaderModule,
  DatoFileInputModule,
  DatoFormValidationModule,
  DatoGridV2Module,
  DatoIconButtonModule,
  DatoIconModule,
  DatoInfiniteScrollModule,
  DatoInputModule,
  DatoLinkButtonModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CommonModule } from '@angular/common';
import { MessageCenterComponent } from './message-center/message-center.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { MarketplaceModule } from '../marketplace/marketplace.module';
import { ReturnReminderComponent } from './message-center/messages/return-reminder/return-reminder.component';
import { MyRentedProductsComponent } from './my-rented-products/my-rented-products.component';

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
    path: 'my-rented-products',
    component: MyRentedProductsComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  },
  {
    path: 'messages',
    component: MessageCenterComponent
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
    DatoFormValidationModule,
    DatoInfiniteScrollModule,
    MarketplaceModule
  ],
  declarations: [
    MyOrdersPageComponent,
    MyProductsPageComponent,
    ProfilePageComponent,
    EditUserComponent,
    MessageCenterComponent,
    WatchlistComponent,
    ReturnReminderComponent,
    MyRentedProductsComponent
  ],
  providers: [],
  exports: [MyOrdersPageComponent]
})
export class UserModule {}
