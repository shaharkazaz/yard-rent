import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { BingMapModule } from '../shared/components/bing-map/bing-map.module';

import { ContactPageComponent } from './page/contact-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslocoModule,
    BingMapModule,
    CommonModule
  ],
  declarations: [ContactPageComponent]
})
export class ContactModule {}
