import { NgModule } from '@angular/core';
import {OnlineUsersComponent} from './footer/online-users/online-users.component'
import { AppHeaderComponent } from './header/app-header.component';
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
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './footer/app-footer.component';
import { PollutionIndicatorComponent } from './footer/pollution-indicator/pollution-indicator.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { DeveloperOptionsComponent } from './header/developer-options/developer-options.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';
import { NavComponent } from './header/nav/nav.component';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';

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
        DatoPopoverModule
    ],
  declarations: [AppHeaderComponent, AppFooterComponent, DeveloperOptionsComponent, UserMenuComponent, NavComponent, LanguageSelectorComponent,PollutionIndicatorComponent, OnlineUsersComponent],
  exports: [AppHeaderComponent, AppFooterComponent]
})
export class ShellModule {}
