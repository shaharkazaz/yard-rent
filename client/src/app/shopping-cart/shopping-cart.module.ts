import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DatoButtonModule,
  DatoDialogModule,
  DatoDirectivesModule,
  DatoGridV2Module,
  DatoIconModule,
  DatoLinkButtonModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';

import { AuthGuard } from '@yr/shared/route-gurds';

import { OrdersService } from './orders.service';
import { ShoppingCartPageComponent } from './page/shopping-cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DatoGridV2Module,
    DatoButtonModule,
    TranslocoModule,
    DatoDirectivesModule,
    CommonModule,
    DatoIconModule,
    DatoLinkButtonModule,
    DatoDialogModule
  ],
  declarations: [ShoppingCartPageComponent],
  providers: [OrdersService]
})
export class ShoppingCartModule {}
