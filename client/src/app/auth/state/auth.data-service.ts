import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URI_CONSTANTS } from '@yr/shared/constants/uri.contants';
import { parseUrl } from '@yr/shared/utils';

import { Credentials, LoginResponse, SignupParams } from '../auth.types';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
  constructor(private http: HttpClient) {}

  login(params: Credentials) {
    return this.http.post<LoginResponse>(
      parseUrl(URI_CONSTANTS.auth.login),
      params
    );
  }

  signup(params: SignupParams) {
    return this.http.post<LoginResponse>(
      parseUrl(URI_CONSTANTS.auth.signup),
      params
    );
  }

  getUserByToken() {
    return this.http.get<any>(parseUrl(URI_CONSTANTS.auth.getUser));
  }

  sendVerificationEmail(email: string) {
    return this.http.post<string>(
      parseUrl(URI_CONSTANTS.auth.sendVerification),
      { email }
    );
  }

  verifyEmailCode(info: { code: string; id: string }) {
    return this.http.post<void>(parseUrl(URI_CONSTANTS.auth.verifyCode), info);
  }
}
