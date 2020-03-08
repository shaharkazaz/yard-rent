import { Injectable } from '@angular/core';
import { DatoSnackbar } from '@datorama/core';
import { AuthDataService } from './auth.data-service';
import { Credentials, SignupParams } from '../auth.types';
import { tap } from 'rxjs/operators';
import { AuthStore, clearStorage, saveInStorage } from './auth.store';
import { createEmptyUser } from './auth.model';
import { inStorage } from './auth.query';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authDataService: AuthDataService,
    private snackbar: DatoSnackbar,
    private authStore: AuthStore
  ) {}

  login(params: Credentials) {
    return this.authDataService.login(params).pipe(
      tap(({ success, message, token, user }) => {
        if (success) {
          saveInStorage(token);
          this.updateStoreFromUser(user);
        } else {
          this.snackbar.error(message);
        }
      })
    );
  }

  signup(params: SignupParams) {
    return this.authDataService.signup(params).pipe(
      tap(({ success, message, token, user }) => {
        if (success) {
          saveInStorage(token);
          this.updateStoreFromUser(user);
        } else {
          this.snackbar.error(message);
        }
      })
    );
  }

  logout() {
    clearStorage();
    this.authStore.update(createEmptyUser());
  }

  getUserByToken() {
    return this.authDataService.getUserByToken();
  }

  updateStoreFromUser(user) {
    this.authStore.update({
      id: user.id,
      name: user.name,
      user,
      token: user.token
    });
  }
}
