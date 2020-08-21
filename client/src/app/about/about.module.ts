import { DatoStaticImagesSrcModule } from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './page/about-page.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    DatoStaticImagesSrcModule
  ],
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent]
})
export class AboutModule {}
