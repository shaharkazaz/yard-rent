import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseUrl } from '../../shared/utils';
import { URI_CONSTANTS } from '../../shared/constants/uri.contants';

@Injectable()
export class MarketplaceDataService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<any>(parseUrl(URI_CONSTANTS.products.getAllProducts));
  }
}
