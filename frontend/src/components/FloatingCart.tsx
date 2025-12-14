import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const FloatingCart: React.FC = () => {
  // Mock data for UI demonstration
  const cartItemCount = 3;

  return (
    <Link
      to="/shop/cart"
      className="fixed top-8 right-8 z-[60] group flex items-center justify-center transition-transform active:scale-95"
      aria-label="View Cart"
    >
      {/* Main Cart Button Container */}
      <div className="relative p-4 rounded-full bg-[var(--accent)] shadow-lg shadow-black/20 hover:shadow-[var(--accent)]/40 transition-all duration-300 hover:scale-105">
        
        {/* Cart Icon */}
        <ShoppingCart 
          size={24} 
          className="text-black" 
          strokeWidth={2.5} 
        />

        {/* Quantity Indicator Badge */}
        {cartItemCount > 0 && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-[#FF4D00] text-white text-[11px] font-bold rounded-full border-2 border-[var(--background)] shadow-sm animate-in zoom-in duration-300">
            {cartItemCount}
          </div>
        )}
      </div>

      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-[var(--accent)] blur-xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full -z-10" />
    </Link>
  );
};

export default FloatingCart;
