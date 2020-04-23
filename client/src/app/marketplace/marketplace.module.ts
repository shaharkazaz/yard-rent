import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplacePageComponent } from './page/marketplace-page.component';
import { TranslocoModule } from '@ngneat/transloco';
import {
  DatoButtonModule,
  DatoDirectivesModule, DatoFileInputModule,
  DatoIconModule, DatoInputModule
} from '@datorama/core';
import { MarketplaceFiltersComponent } from './filters/marketplace-filters.component';
import { MarketplaceItemCardComponent } from './item-card/marketplace-item-card.component';
import { MarketplaceDataService } from './state/marketplace.data-service';
import { MarketplaceService } from './state/marketplace.service';
import { CommonModule } from '@angular/common';
import { MarketplaceItemPageComponent } from './item-page/marketplace-item-page.component';
import { MarketplaceAllItemsComponent } from './all-items/marketplace-all-items.component';
import {BingMapModule} from "../shared/components/bing-map/bing-map.module";
import { MarketplaceAddItemComponent } from './add-item/marketplace-add-item.component';
import {ReactiveFormsModule} from "@angular/forms";

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
  imports: [
    RouterModule.forChild(routes),
    TranslocoModule,
    DatoIconModule,
    CommonModule,
    DatoDirectivesModule,
    DatoButtonModule,
    BingMapModule,
    DatoFileInputModule,
    ReactiveFormsModule,
    DatoInputModule,
  ],
  declarations: [
    MarketplacePageComponent,
    MarketplaceFiltersComponent,
    MarketplaceItemCardComponent,
    MarketplaceItemPageComponent,
    MarketplaceAllItemsComponent,
    MarketplaceAddItemComponent
  ],
  exports: [MarketplacePageComponent],
  providers: [MarketplaceDataService, MarketplaceService]
})
export class MarketplaceModule {}
