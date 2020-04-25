import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseUrl } from '../../shared/utils';
import { URI_CONSTANTS } from '../../shared/constants/uri.contants';
import {Categories, NewProduct, Product, SubCategory} from "../marketplace.types";

@Injectable()
export class MarketplaceDataService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(parseUrl(URI_CONSTANTS.products.getAll));
  }

  getProduct(id: string) {
    return this.http.get<Product>(parseUrl(URI_CONSTANTS.products.get, {id}));
  }

  addProduct(newProduct: NewProduct) {
    return this.http.post<Product>(parseUrl(URI_CONSTANTS.products.add), newProduct);
  }

  updateProduct(id: string, product: Partial<NewProduct>) {
    return this.http.patch<Product>(parseUrl(URI_CONSTANTS.products.update, {id}), product);
  }

  getAllCategories() {
    return this.http.get<Categories>(parseUrl(URI_CONSTANTS.categories.getAll));
  }

  getSubCategories(id: string) {
    return this.http.get<SubCategory[]>(parseUrl(URI_CONSTANTS.categories.getSubCategories, {id}));
  }
}
