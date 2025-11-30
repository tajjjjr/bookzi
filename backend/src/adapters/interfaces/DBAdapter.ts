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