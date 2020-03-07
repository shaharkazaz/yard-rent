import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplacePageComponent } from './page/marketplace-page.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplacePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [MarketplacePageComponent],
  exports: [MarketplacePageComponent]
})
export class MarketplaceModule {}
