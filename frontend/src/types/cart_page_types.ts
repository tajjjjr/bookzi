export type ProductType = 'COURSE' | 'CASE STUDY' | 'GUIDE';

export interface Product {
  id: string;
  title: string;
  type: ProductType;
  author: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
