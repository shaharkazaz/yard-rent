import {BrowserModule, EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeModule} from './home/home.module';
import {
  APP_TRANSLATE,
  DATO_CORE_LOGGER, DATO_FORM_ERRORS,
  DATO_GRID_STORAGE_API,
  DatoCoreModule,
  EventModifiersPlugin
} from '@datorama/core';
import {TranslatePipe} from './shared/pipes/translate.pipe';
import {ShellModule} from './shell/shell.module';
import {AuthModule} from './auth/auth.module';
import {AppInitService} from './app-init.service';
import {gridStorageAPI} from './app-grid-storage-api';
import {appLogger} from './app-event-logger';
import {ErrorsInterceptor} from "./shared/interceptors/errors.interceptor";
import {TranslocoRootModule} from "./transloco-root.module";
import {formErrors} from "./app-form-errors";

export function initApp(appInitService: AppInitService) {
  return () => {
    return appInitService.init();
  };
}

@NgModule({
  declarations: [AppComponent, TranslatePipe],
  imports: [
    HomeModule,
    ShellModule,
    AuthModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    DatoCoreModule.forRoot({
      appSelector: 'app-root',
      sidenavSelector: '.sidenav',
      paths: {
        editor: '',
        richText: '',
        staticImages: '/assets/images'
      }
    }),
  ],
  providers: [
    AppInitService,
    TranslatePipe,
    { provide: DATO_FORM_ERRORS, useValue: formErrors },
    {
      provide: DATO_GRID_STORAGE_API,
      useValue: gridStorageAPI
    },
    {
      provide: DATO_CORE_LOGGER,
      useValue: appLogger
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: EventModifiersPlugin,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppInitService],
      multi: true
    },
    { provide: APP_TRANSLATE, useExisting: TranslatePipe },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
