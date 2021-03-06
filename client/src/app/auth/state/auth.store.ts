import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { createEmptyUser, User } from './auth.model';
export const initialState: User = createEmptyUser();

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'auth'
})
export class AuthStore extends Store<User> {
  constructor() {
    super(initialState);
  }
}

export function saveInStorage(token: string) {
  localStorage.setItem('token', token);
}

export function clearStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('shopping-cart');
}
