const products = [
  { id: 1, name: "Test Product", price: 100, stock: 10 },
  { id: 2, name: "Another Product", price: 50, stock: 5 }
];

const orders = [];

const mockDbAdapter = {
  listProducts: async () => products,
  getProductById: async (id) => products.find(p => p.id === parseInt(id)),
  createOrder: async (orderData) => {
    const newOrder = { id: orders.length + 1, ...orderData };
    orders.push(newOrder);
    return newOrder;
  },
  getOrdersForUser: async (userId) => orders.filter(o => o.userId === userId),
  decreaseInventory: async (id, amount) => {
    const product = products.find(p => p.id === id);
    if (product) product.stock -= amount;
    return product;
  }
};

export default mockDbAdapter;
