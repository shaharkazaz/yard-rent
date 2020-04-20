import {Injectable} from '@angular/core';
import {ShoppingCartStore} from './shopping-cart.store';
import {Product} from "../../marketplace/marketplace.types";

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  constructor(private shoppingCartStore: ShoppingCartStore) {
  }

  add(product: Product) {
    this.shoppingCartStore.add(product);
  }

  delete(ids: string | string[]) {
    this.shoppingCartStore.remove(ids);
  }

  clearCart() {
    this.shoppingCartStore.reset();
    localStorage.removeItem('shopping-cart');
  }
}
