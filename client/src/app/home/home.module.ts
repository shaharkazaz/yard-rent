import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DatoCarouselModule,
  DatoDirectivesModule,
  DatoIconButtonModule,
  DatoIconModule,
  DatoInputModule,
  DatoLinkButtonModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';

import { HomePageComponent } from './page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
  imports: [
    TranslocoModule,
    DatoCarouselModule,
    CommonModule,
    BrowserAnimationsModule,
    DatoInputModule,
    DatoIconModule,
    DatoIconButtonModule,
    DatoDirectivesModule,
    DatoLinkButtonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
