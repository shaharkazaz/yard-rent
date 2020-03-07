import { Injectable } from '@angular/core';
import { DatoDialog, DatoDialogRef } from '@datorama/core';
import { LoginComponent } from './login/login.component';
import { AuthDataService } from './auth.data-service';
import { LoginParams, SignupParams } from './auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private dialog: DatoDialog,
    private authDataService: AuthDataService
  ) {}

  openDialog(view: 'login' | 'sign-up'): DatoDialogRef {
    return this.dialog.open(LoginComponent, {
      data: { view },
      enableClose: true
    });
  }

  login(params: LoginParams) {
    return this.authDataService.login(params);
  }

  signup(params: SignupParams) {
    return this.authDataService.signup(params);
  }
}
