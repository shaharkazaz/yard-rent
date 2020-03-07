import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import {
  DatoButtonModule,
  DatoDialogModule,
  DatoInputModule,
  DatoSnackbarComponent,
  DatoSnackbarModule
} from '@datorama/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    TranslocoModule,
    DatoInputModule,
    CommonModule,
    ReactiveFormsModule,
    DatoButtonModule,
    DatoDialogModule,
    DatoSnackbarModule
  ],
  declarations: [LoginComponent],
  entryComponents: [LoginComponent, DatoSnackbarComponent],
  exports: [LoginComponent]
})
export class AuthModule {}
