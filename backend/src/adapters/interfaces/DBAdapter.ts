import { Product, Order, OrderItem } from "../../types/models.ts"

export { Product, Order, OrderItem };

export interface DBAdapter {
  getProducts(): Promise<Product[]>;
  getProductById(_id: string): Promise<Product | null>;
  createOrder(_orderData: Omit<Order, 'id'>): Promise<Order>;
  getOrderById(_id: string): Promise<Order | null>;
  listProducts(): Promise<Product[]>;
  getProduct(_id: string): Promise<Product | null>;
  listOrdersForUser(_userId: string): Promise<Order[]>;
  decreaseInventory(_id: string, _amount: number): Promise<Product | null>;
}