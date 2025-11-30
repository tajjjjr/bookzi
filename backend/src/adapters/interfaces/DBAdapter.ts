import { Product, Order, OrderItem } from "../../types/models.ts"

export { Product, Order, OrderItem };

export interface DBAdapter {
  getProducts(): Promise<Product[]>;
  getProductById(_id: number): Promise<Product | null>;
  createOrder(_orderData: Omit<Order, 'id'>): Promise<Order>;
  getOrderById(_id: number): Promise<Order | null>;
  listProducts(): Promise<Product[]>;
  getProduct(_id: number): Promise<Product | null>;
  listOrdersForUser(_userId: number): Promise<Order[]>;
  decreaseInventory(_id: number, _amount: number): Promise<Product | null>;
}