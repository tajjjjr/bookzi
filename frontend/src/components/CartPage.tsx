import React, { useState, useEffect } from "react";
import CartItemRow from "./CartItemRow";
import OrderSummary from "./OrderSummary";
import type { CartItem } from "../types/cart_page_types";
import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";
import ProductGrid from "./ProductGrid";
import { updateMeta } from "../lib/set_metadata";

const INITIAL_CART: CartItem[] = [
    {
      id: '1',
      title: 'Nexus Custody Vault',
      type: 'COURSE',
      author: 'Security Team',
      price: 129.00,
      quantity: 1,
      image: 'https://picsum.photos/400/400?grayscale&random=1'
    },
    {
      id: '2',
      title: 'Global Liquidity Engine',
      type: 'CASE STUDY',
      author: 'Tajjjr Engineering',
      price: 49.00,
      quantity: 1,
      image: 'https://picsum.photos/400/400?grayscale&random=2'
    },
    {
      id: '3',
      title: 'Zero-Knowledge Proofs',
      type: 'GUIDE',
      author: 'Cryptography Unit',
      price: 59.00,
      quantity: 2,
      image: 'https://picsum.photos/400/400?grayscale&random=3'
    }
];

const CartPage: React.FC = () => {
      useEffect(() => {
    document.title = "Cart";

    updateMeta("description", "Review your selected TAJJJR ebooks—expert-crafted courses, guides, and case studies for developers. Secure your cart and continue learning with premium, real-world tech insights.");
    updateMeta("og:title", "TAJJJR eBooks - Your Cart");
  }, []);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax example
  const discount = 0; // Logic for discount code could go here
  const total = subtotal + tax - discount;

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-white selection:bg-[var(--accent)] selection:text-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <a
            href="/shop"
            className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--accent)] mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Shop
          </a>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Shopping <span className="text-[var(--accent)]">Cart</span>
          </h1>
          <p className="mt-2 text-gray-400">
            You have {cartItems.length} items in your cart.
            <span className="hidden sm:inline">
              {" "}
              Free shipping on digital orders over $150.
            </span>
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                discount={discount}
                total={total}
              />
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 border border-dashed border-white/10 bg-surface/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surfaceHighlight mb-6">
              <ArrowLeft size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Looks like you haven't added any guides or courses yet.
            </p>
            <Button
              variant="primary"
              label="Continue Shopping"
              className="mx-auto block"
            />
          </div>
        )}

        <ProductGrid />
      </main>
    </div>
  );
};

export default CartPage;
