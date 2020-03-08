import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './header/app-header.component';
import {
  DatoButtonModule,
  DatoDialogModule,
  DatoDirectivesModule,
  DatoIconModule,
  DatoLinkButtonModule,
  DatoMenuModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './footer/app-footer.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';

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
    AuthModule
  ],
  declarations: [AppHeaderComponent, AppFooterComponent],
  exports: [AppHeaderComponent, AppFooterComponent]
})
export class ShellModule {}
