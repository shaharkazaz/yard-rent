import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthQuery } from '@yr/auth/state/auth.query';

import { URI_CONSTANTS } from '../constants/uri.contants';
import { parseUrl } from '../utils';

@Injectable({ providedIn: 'root' })
export class TwitterService {
  constructor(private http: HttpClient, private authQuery: AuthQuery) {}

  post(message: string) {
    return this.http.post<void>(parseUrl(URI_CONSTANTS.twitter.postTwitt), {
      message
    });
  }

  twittOrder({ products, orderId }: { orderId: string; products: number }) {
    const user = this.authQuery.getValue();
    const msg = `${
      user.name
    } has just finished order ${orderId} and rented ${products} item${
      products > 1 ? 's' : ''
    }! check out what cool items can be found here at YardRent 👉🏼 https://yarndrent.com`;

    return this.post(msg);
  }
}
