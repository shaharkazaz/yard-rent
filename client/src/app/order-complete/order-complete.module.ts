import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatoButtonModule, DatoIconModule } from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';

import { AuthGuard } from '@yr/shared/route-gurds';

import { OrderCompletePageComponent } from './page/order-complete-page.component';

const routes: Routes = [
  {
    path: '',
    component: OrderCompletePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslocoModule,
    DatoIconModule,
    DatoButtonModule,
    CommonModule
  ],
  declarations: [OrderCompletePageComponent]
})
export class OrderCompleteModule {}
