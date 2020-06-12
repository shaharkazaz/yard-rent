import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import {
  DatoButtonModule,
  DatoDialogModule, DatoDirectivesModule, DatoFormValidationModule, DatoIconModule,
  DatoInputModule, DatoLinkButtonModule,
  DatoSnackbarComponent,
  DatoSnackbarModule
} from '@datorama/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './auth.interceptor';
import { AuthService } from './state/auth.service';
import { IsLoggedInDirective } from './directives/isLoggedIn.directive';
import { HasRoleDirective } from './directives/hasRole.directive';
import {MailVerificationComponent} from "./login/mail-verification/mail-verification.component";

const api = [MailVerificationComponent, LoginComponent, IsLoggedInDirective, HasRoleDirective];

@NgModule({
  imports: [
    TranslocoModule,
    DatoInputModule,
    CommonModule,
    ReactiveFormsModule,
    DatoButtonModule,
    DatoDialogModule,
    DatoSnackbarModule,
    DatoFormValidationModule,
    DatoLinkButtonModule,
    DatoIconModule,
    DatoDirectivesModule,
  ],
  declarations: api,
  entryComponents: [MailVerificationComponent, LoginComponent, DatoSnackbarComponent],
  exports: api,
  providers: [AuthService]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
      ]
    };
  }
}
