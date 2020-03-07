import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { User } from './auth.model';
import { Query } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class AuthQuery extends Query<User> {
  isLoggedIn$ = this.select(user => !!user.token || inStorage());

  constructor(protected store: AuthStore) {
    super(store);
  }

  isLoggedIn() {
    return !!this.getValue().token || inStorage();
  }
}

export function inStorage() {
  return !!localStorage.getItem('token');
}
