import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketplaceAddItemComponent } from './add-item/marketplace-add-item.component';
import { MarketplaceAllItemsComponent } from './all-items/marketplace-all-items.component';
import { MarketplaceItemPageComponent } from './item-page/marketplace-item-page.component';
import { MarketplaceModule } from './marketplace.module';
import { MarketplacePageComponent } from './page/marketplace-page.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplacePageComponent,
    children: [
      {
        path: 'add-item',
        component: MarketplaceAddItemComponent
      },
      {
        path: 'edit-item/:id',
        component: MarketplaceAddItemComponent
      },
      {
        path: 'all-items',
        component: MarketplaceAllItemsComponent
      },

      {
        path: ':id',
        component: MarketplaceItemPageComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all-items'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MarketplaceModule]
})
export class MarketplaceRoutingModule {}
