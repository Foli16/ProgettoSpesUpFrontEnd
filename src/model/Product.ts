export interface Product
{
  priceTrendId: string;
  price: number;
  originalPrice: number;
  pricePerType: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  productId: string;
  productName: string;
  category: string;
  description: string;
  imgUrl: string;
  supermarketId: string;
  supermarketName: string;
  found: boolean;
}
