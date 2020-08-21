import { Injectable } from '@angular/core';
import { DatoSnackbar } from '@datorama/core';
import { tap } from 'rxjs/operators';

import { Credentials, SignupParams } from '../auth.types';

import { AuthDataService } from './auth.data-service';
import { createEmptyUser, UserInfo } from './auth.model';
import { AuthStore, clearStorage, saveInStorage } from './auth.store';

@Injectable()
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

  sendVerificationEmail(email: string) {
    return this.authDataService.sendVerificationEmail(email);
  }

  verifyEmailCode(info: { code: string; id: string }) {
    return this.authDataService.verifyEmailCode(info);
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

  updateUserInfo(userInfo: UserInfo) {
    this.authStore.update({
      user: userInfo
    });
  }
}
