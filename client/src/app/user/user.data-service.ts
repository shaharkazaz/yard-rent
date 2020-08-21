import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserInfo } from '../auth/state/auth.model';
import { Product } from '../marketplace/marketplace.types';
import { URI_CONSTANTS } from '../shared/constants/uri.contants';
import { parseUrl } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private http: HttpClient) {}

  updateProfile(id: string, user) {
    return this.http.patch(parseUrl(URI_CONSTANTS.users.updateUser, { id }), {
      ...user
    });
  }

  getProductsList() {
    return this.http.get<Product[]>(parseUrl(URI_CONSTANTS.users.productsList));
  }

  getRentedProductsList() {
    return this.http.get<(Product & { isInReturnProcess: boolean })[]>(
      parseUrl(URI_CONSTANTS.users.rentedProductsList)
    );
  }

  getOrdersList() {
    return this.http.get<any[]>(parseUrl(URI_CONSTANTS.users.ordersList));
  }

  getUserById(id: string) {
    return this.http.get<Partial<UserInfo>>(
      parseUrl(URI_CONSTANTS.users.getUserById, { id })
    );
  }

  getWatchlist() {
    return this.http.get<any>(parseUrl(URI_CONSTANTS.users.getWatchlist));
  }

  removeFromWatchlist(productId: string) {
    return this.http.post(
      parseUrl(URI_CONSTANTS.products.removeFromWatchlist),
      { products: [productId] }
    );
  }

  addToWatchlist(productId: string) {
    return this.http.post(parseUrl(URI_CONSTANTS.products.addToWatchlist), {
      products: [productId]
    });
  }
}
