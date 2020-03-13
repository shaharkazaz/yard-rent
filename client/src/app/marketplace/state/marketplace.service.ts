import { Injectable } from '@angular/core';
import { MarketplaceDataService } from './marketplace.data-service';

@Injectable()
export class MarketplaceService {
  constructor(private dataService: MarketplaceDataService) {}

  getAllProducts() {
    return this.dataService.getAllProducts();
  }
}
