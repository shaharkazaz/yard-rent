import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DatoButtonModule,
  DatoDialogModule,
  DatoDirectivesModule,
  DatoIconModule,
  DatoLinkButtonModule,
  DatoMenuModule,
  DatoPopoverModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';

import { SharedModule } from '../shared/components/shared.module';
import { AuthModule } from '../auth/auth.module';

import { AppFooterComponent } from './footer/app-footer.component';
import { AppHeaderComponent } from './header/app-header.component';
import { DeveloperOptionsComponent } from './header/developer-options/developer-options.component';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';
import { NavComponent } from './header/nav/nav.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';

@NgModule({
  imports: [
    DatoDialogModule,
    DatoIconModule,
    TranslocoModule,
    DatoDirectivesModule,
    CommonModule,
    DatoButtonModule,
    DatoMenuModule,
    RouterModule,
    DatoLinkButtonModule,
    AuthModule,
    DatoPopoverModule,
    SharedModule
  ],
  declarations: [
    AppHeaderComponent,
    AppFooterComponent,
    DeveloperOptionsComponent,
    UserMenuComponent,
    NavComponent,
    LanguageSelectorComponent
  ],
  exports: [AppHeaderComponent, AppFooterComponent]
})
export class ShellModule {}
