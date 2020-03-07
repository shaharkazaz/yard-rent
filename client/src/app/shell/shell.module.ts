import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './header/app-header.component';
import {
  DatoButtonModule,
  DatoDialogModule,
  DatoDirectivesModule,
  DatoIconModule,
  DatoMenuModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './footer/app-footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    DatoDialogModule,
    DatoIconModule,
    TranslocoModule,
    DatoDirectivesModule,
    CommonModule,
    DatoButtonModule,
    DatoMenuModule,
    RouterModule
  ],
  declarations: [AppHeaderComponent, AppFooterComponent],
  exports: [AppHeaderComponent, AppFooterComponent]
})
export class ShellModule {}
