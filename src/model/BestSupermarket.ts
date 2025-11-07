import {Product} from './Product';

export interface BestSupermarket{
  supermarketName:string,
  productsNotFound:Product[],
  products:Product[]
}
