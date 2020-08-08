import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplacePageComponent } from './page/marketplace-page.component';
import { TranslocoModule } from '@ngneat/transloco';
import {
  DatoButtonModule,
  DatoCoreModule,
  DatoDirectivesModule,
  DatoFileInputModule,
  DatoFormValidationModule,
  DatoIconModule,
  DatoInfiniteScrollModule,
  DatoInputModule,
  DatoInputNumberModule,
  DatoPipesModule,
  DatoSelectModule
} from '@datorama/core';
import { MarketplaceFiltersComponent } from './filters/marketplace-filters.component';
import { MarketplaceItemCardComponent } from './item-card/marketplace-item-card.component';
import { MarketplaceDataService } from './state/marketplace.data-service';
import { MarketplaceService } from './state/marketplace.service';
import { CommonModule } from '@angular/common';
import { MarketplaceItemPageComponent } from './item-page/marketplace-item-page.component';
import { MarketplaceAllItemsComponent } from './all-items/marketplace-all-items.component';
import { BingMapModule } from '../shared/components/bing-map/bing-map.module';
import { MarketplaceAddItemComponent } from './add-item/marketplace-add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { ItemCardLoaderComponent } from './item-card/item-card-loader/item-card-loader.component';
import { ItemCartTogglerComponent } from './item-cart-toggler/item-cart-toggler.component';
import { SharedModule } from '../shared/components/shared.module';
import { ItemPageLoaderComponent } from './item-page/item-page-loader/item-page-loader.component';

@NgModule({
  imports: [
    TranslocoModule,
    DatoIconModule,
    CommonModule,
    DatoDirectivesModule,
    DatoButtonModule,
    BingMapModule,
    DatoFileInputModule,
    ReactiveFormsModule,
    DatoInputModule,
    DatoInputNumberModule,
    DatoSelectModule,
    DatoPipesModule,
    ContentLoaderModule,
    DatoInfiniteScrollModule,
    DatoFormValidationModule,
    DatoCoreModule,
    SharedModule,
    BingMapModule,
    RouterModule
  ],
  declarations: [
    MarketplacePageComponent,
    MarketplaceFiltersComponent,
    MarketplaceItemCardComponent,
    MarketplaceItemPageComponent,
    MarketplaceAllItemsComponent,
    MarketplaceAddItemComponent,
    ItemCardLoaderComponent,
    ItemCartTogglerComponent,
    ItemPageLoaderComponent
  ],
  exports: [
    MarketplacePageComponent,
    MarketplaceFiltersComponent,
    MarketplaceItemCardComponent,
    ItemCardLoaderComponent
  ],
  providers: [MarketplaceDataService, MarketplaceService]
})
export class MarketplaceModule {}
