import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { UserRole } from '../auth.types';

import { User, UserInfo } from './auth.model';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthQuery extends Query<User> {
  isLoggedIn$ = this.select(user => !!user.token || inStorage());

  constructor(protected store: AuthStore) {
    super(store);
  }

  isLoggedIn(): boolean {
    return !!this.getValue().token || inStorage();
  }

  getToken(): string {
    return this.getValue().token || getStorageToken();
  }

  getUserRole(): UserRole {
    return this.getValue().user.role;
  }

  selectUserRole(): Observable<UserRole> {
    return this.select(state => state.user.role);
  }

  getUserInfo(): UserInfo {
    return this.getValue().user;
  }
}

export function getStorageToken() {
  return localStorage.getItem('token');
}

export function inStorage() {
  return !!getStorageToken();
}
