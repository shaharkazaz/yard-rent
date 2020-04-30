import { NgModule } from '@angular/core';
import { HomePageComponent } from './page/home-page.component';
import { TranslocoModule } from '@ngneat/transloco';
import {
    DatoCarouselModule, DatoDirectivesModule,
    DatoIconButtonModule,
    DatoIconModule,
    DatoInputModule, DatoLinkButtonModule
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
        DatoIconButtonModule,
        DatoDirectivesModule,
        DatoLinkButtonModule
    ]
})
export class HomeModule {}
