import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './auth.interceptor';
import { AuthService } from './state/auth.service';
import { IsLoggedInDirective } from './directives/isLoggedIn.directive';
import { HasRoleDirective } from './directives/hasRole.directive';

const api = [LoginComponent, IsLoggedInDirective, HasRoleDirective];

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
  declarations: api,
  entryComponents: [LoginComponent, DatoSnackbarComponent],
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
