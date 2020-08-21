import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthQuery } from '../auth/state/auth.query';
import { AuthService } from '../auth/state/auth.service';

import { UserDataService } from './user.data-service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private dataService: UserDataService,
    private authService: AuthService,
    private authQuery: AuthQuery
  ) {}

  updateUser(id: string, user) {
    return this.dataService.updateProfile(id, user);
  }

  getProductsList() {
    return this.dataService.getProductsList();
  }

  getRentedProductsList() {
    return this.dataService.getRentedProductsList();
  }

  getOrdersList() {
    return this.dataService.getOrdersList();
  }

  getUser(id: string) {
    return this.dataService.getUserById(id);
  }

  getWatchlistProducts() {
    return this.dataService.getWatchlist();
  }

  addToWatchlist(productId: string) {
    return this.dataService.addToWatchlist(productId).pipe(
      tap(() => {
        const info = this.authQuery.getUserInfo();
        const favorites = [...info.favorites, productId];
        this.authService.updateUserInfo({ ...info, favorites });
      })
    );
  }

  removeFromWatchlist(productId: string) {
    return this.dataService.removeFromWatchlist(productId).pipe(
      tap(() => {
        const info = this.authQuery.getUserInfo();
        const favorites = info.favorites.filter(pid => pid !== productId);
        this.authService.updateUserInfo({ ...info, favorites });
      })
    );
  }

  selectWatchlistIds() {
    return this.authQuery.select(auth => auth.user.favorites);
  }
}
