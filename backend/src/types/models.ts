export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total?: number;
}
