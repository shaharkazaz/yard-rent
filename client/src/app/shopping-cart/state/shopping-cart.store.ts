import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {Product} from "../../marketplace/marketplace.types";

export interface ShoppingCartState extends EntityState<Product> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'shoppingCart', idKey: '_id', resettable: true })
export class ShoppingCartStore extends EntityStore<ShoppingCartState> {

  constructor() {
    super();
  }

}

