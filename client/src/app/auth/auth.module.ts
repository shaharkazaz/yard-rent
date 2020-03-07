import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import {
  DatoButtonModule,
  DatoDialogModule,
  DatoInputModule
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
    DatoDialogModule
  ],
  declarations: [LoginComponent],
  entryComponents: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {}
