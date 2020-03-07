import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { translocoLoader } from './transloco-loader';
import {
  TranslocoModule,
  translocoConfig,
  TRANSLOCO_CONFIG
} from '@ngneat/transloco';
import { HomeModule } from './home/home.module';
import {
  APP_TRANSLATE,
  DatoButtonModule,
  DatoThemesModule
} from '@datorama/core';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { ShellModule } from './shell/shell.module';

@NgModule({
  declarations: [AppComponent, TranslatePipe],
  imports: [
    HomeModule,
    ShellModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoModule,
    DatoButtonModule,
    DatoThemesModule
  ],
  providers: [
    TranslatePipe,
    { provide: APP_TRANSLATE, useExisting: TranslatePipe },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production
      })
    },
    translocoLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
