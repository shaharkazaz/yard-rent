import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseUrl } from '../../shared/utils';
import { URI_CONSTANTS } from '../../shared/constants/uri.contants';
import {Product} from "../marketplace.types";

@Injectable()
export class MarketplaceDataService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(parseUrl(URI_CONSTANTS.products.getAllProducts));
  }

  getProduct(id: string) {
    return this.http.get<Product>(parseUrl(URI_CONSTANTS.products.getProduct, {id}));
  }
}
