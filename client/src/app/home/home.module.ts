import { NgModule } from '@angular/core';
import { HomePageComponent } from './page/home-page.component';
import { TranslocoModule } from '@ngneat/transloco';
import {
  DatoCarouselModule,
  DatoIconButtonModule,
  DatoIconModule,
  DatoInputModule
} from '@datorama/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    DatoIconButtonModule
  ]
})
export class HomeModule {}
