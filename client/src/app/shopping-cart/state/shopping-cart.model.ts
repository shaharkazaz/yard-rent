import { Product } from '@yr/marketplace/marketplace.types';

export interface ShoppingCartItem extends Product {
  count: number;
}
