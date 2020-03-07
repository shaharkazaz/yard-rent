import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URI_CONSTANTS } from '../shared/constants/uri.contants';
import { LoginParams, LoginResponse, SignupParams } from './auth.types';
import { parseUrl } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
  constructor(private http: HttpClient) {}

  login(params: LoginParams) {
    return this.http.post<LoginResponse>(
      parseUrl(URI_CONSTANTS.auth.login),
      params
    );
  }

  signup(params: SignupParams) {
    return this.http.post(parseUrl(URI_CONSTANTS.auth.signup), params, {
      withCredentials: true
    });
  }
}
