import { DBAdapter } from "../interfaces/DBAdapter.ts";
import { Product, Order } from "../../types/models.ts"

const products: Product[] = [
  { 
    id: "1", name: "Test Product", price: 100, stock: 10, currency: "USD", sku: "TEST001",
    trackInventory: true, allowBackorder: false, images: [], hasVariants: false,
    slug: "test-product", isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  { 
    id: "2", name: "Another Product", price: 50, stock: 5, currency: "USD", sku: "TEST002",
    trackInventory: true, allowBackorder: false, images: [], hasVariants: false,
    slug: "another-product", isActive: true, createdAt: new Date(), updatedAt: new Date()
  }
];

const orders: Order[] = [
  { id: 1, userId: "1", items: [{ productId: 1, quantity: 2 }] },
  { id: 2, userId: "1", items: [{ productId: 2, quantity: 1 }] }
];

const mockDbAdapter: DBAdapter = {
  listProducts: async (): Promise<Product[]> => products,
  
  getProducts: async (): Promise<Product[]> => products,
  
  getProduct: async (id: number): Promise<Product | null> => 
    products.find(p => p.id === String(id)) || null,
    
  getProductById: async (id: number): Promise<Product | null> => 
    products.find(p => p.id === String(id)) || null,
  
  createOrder: async (orderData: Omit<Order, 'id'>): Promise<Order> => {
    const newOrder: Order = { id: orders.length + 1, ...orderData };
    orders.push(newOrder);
    return newOrder;
  },
  
  getOrderById: async (id: number): Promise<Order | null> =>
    orders.find(o => o.id === id) || null,
  
  listOrdersForUser: async (userId: number): Promise<Order[]> => 
    orders.filter(o => o.userId === String(userId)),
  
  decreaseInventory: async (id: number, amount: number): Promise<Product | null> => {
    const product = products.find(p => p.id === String(id));
    if (product) product.stock -= amount;
    return product || null;
  }
};

export default mockDbAdapter;