import {Product} from './Product';

export interface ShoppingList{
  productList: Product[];
  cart: boolean;
  total: number;
}
