export interface User {
  id: string; // UUID
  name: string;
  email: string;
  password: string; // Should be hashed
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
  isActive?: boolean;
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
  userId: string;
  items: OrderItem[];
  total?: number;
}
