import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ShoppingCartState, ShoppingCartStore} from './shopping-cart.store';

@Injectable({ providedIn: 'root' })
export class ShoppingCartQuery extends QueryEntity<ShoppingCartState> {

  constructor(protected store: ShoppingCartStore) {
    super(store);
  }

}
