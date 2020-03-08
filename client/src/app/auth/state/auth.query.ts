import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { User } from './auth.model';
import { Query } from '@datorama/akita';
import { UserRole } from '../auth.types';

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
}

export function getStorageToken() {
  return localStorage.getItem('token');
}

export function inStorage() {
  return !!getStorageToken();
}
