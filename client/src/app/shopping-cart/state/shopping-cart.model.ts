import { ID } from '@datorama/akita';
import {Product} from "../../marketplace/marketplace.types";

export interface ShoppingCartItem extends Product {
  count: number;
}
