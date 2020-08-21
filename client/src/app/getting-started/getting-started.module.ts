import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatoButtonModule } from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';

import { GettingStartedPageComponent } from './page/getting-started-page.component';

const routes: Routes = [
  {
    path: '',
    component: GettingStartedPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslocoModule,
    CommonModule,
    DatoButtonModule
  ],
  declarations: [GettingStartedPageComponent]
})
export class GettingStartedModule {}
