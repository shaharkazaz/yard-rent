import { Injectable } from '@angular/core';
import { MarketplaceDataService } from './marketplace.data-service';
import {NewProduct} from "../marketplace.types";

@Injectable()
export class MarketplaceService {
  constructor(private dataService: MarketplaceDataService) {}

  getAllProducts(filter) {
    return this.dataService.getAllProducts(filter);
  }

  getProduct(id: string) {
    return this.dataService.getProduct(id);
  }

  addProduct(newProduct: NewProduct) {
    return this.dataService.addProduct(newProduct);
  }

  updateProduct(id: string, product: Partial<NewProduct>) {
    return this.dataService.updateProduct(id, product);
  }

  getAllCategories() {
    return this.dataService.getAllCategories();
  }

  getSubCategories(id: string) {
    return this.dataService.getSubCategories(id);
  }

  getProductRecommendation(id: string) {
    return this.dataService.getProductRecommendation(id);
  }
}
