import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URI_CONSTANTS } from '@yr/shared/constants/uri.contants';
import { parseUrl } from '@yr/shared/utils';

@Injectable()
export class MyProductsService {
  constructor(private http: HttpClient) {}

  returnItems(products: string[]) {
    return this.http.post(parseUrl(URI_CONSTANTS.products.returnItems), {
      products
    });
  }

  deleteItems(products: string[]) {
    return this.http.post(parseUrl(URI_CONSTANTS.products.delete), {
      products
    });
  }
}
