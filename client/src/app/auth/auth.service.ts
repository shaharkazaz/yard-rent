import { Injectable } from '@angular/core';
import { DatoDialog, DatoDialogRef } from '@datorama/core';
import { LoginComponent } from './login/login.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private dialog: DatoDialog) {}

  openDialog(view: 'login' | 'sign-up'): DatoDialogRef {
    return this.dialog.open(LoginComponent, {
      data: { view },
      enableClose: true
    });
  }
}
