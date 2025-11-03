import {Product} from './Product';

export interface ShoppingList{
  products: Product[];
  cart: boolean;
  total: number;
}
