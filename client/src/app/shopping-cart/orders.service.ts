import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URI_CONSTANTS } from '../shared/constants/uri.contants';
import { parseUrl } from '../shared/utils';

type OrderDetails = {
  rewards: number;
  products: string[];
};

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  placeOrder(details: OrderDetails) {
    return this.http.post<{ orderId: string; returnDate: Date }>(
      parseUrl(URI_CONSTANTS.orders.placeOrder),
      details
    );
  }
}
