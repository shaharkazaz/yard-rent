import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URI_CONSTANTS } from '@yr/shared/constants/uri.contants';
import { parseUrl } from '@yr/shared/utils';

import {
  Categories,
  NewProduct,
  Product,
  SubCategory
} from '../marketplace.types';

@Injectable()
export class MarketplaceDataService {
  constructor(private http: HttpClient) {}

  getAllProducts(filter = {}) {
    return this.http.post<Product[]>(parseUrl(URI_CONSTANTS.products.getAll), {
      ...filter
    });
  }

  getProduct(id: string) {
    return this.http.get<Product>(parseUrl(URI_CONSTANTS.products.get, { id }));
  }

  addProduct(newProduct: NewProduct) {
    return this.http.post<Product>(
      parseUrl(URI_CONSTANTS.products.add),
      newProduct
    );
  }

  updateProduct(id: string, product: Partial<NewProduct>) {
    return this.http.patch<Product>(
      parseUrl(URI_CONSTANTS.products.update, { id }),
      product
    );
  }

  getAllCategories() {
    return this.http.get<Categories>(parseUrl(URI_CONSTANTS.categories.getAll));
  }

  getSubCategories(id: string) {
    return this.http.get<SubCategory[]>(
      parseUrl(URI_CONSTANTS.categories.getSubCategories, { id })
    );
  }

  getProductRecommendation(id: string) {
    return this.http.get<Product[]>(
      parseUrl(URI_CONSTANTS.products.getRecommendations, { id })
    );
  }
}
