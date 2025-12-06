import React from "react";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../types/cart_page_types";
import QuantityControl from "./QuantityControl";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const typeColors = {
    COURSE: "text-[var(--accent)]",
    "CASE STUDY": "text-[var(--accent)]",
    GUIDE: "text-[var(--accent)]",
  };

  return (
    <div className="group flex flex-col sm:flex-row gap-6 p-6 border border-white/10 bg-surface hover:border-white/20 transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full sm:w-32 aspect-[3/4] sm:aspect-square flex-shrink-0 overflow-hidden bg-surfaceHighlight">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Mobile Type Tag */}
        <div className="absolute top-2 left-2 sm:hidden px-2 py-1 bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-bold tracking-wider text-[var(--accent)]">
          {item.type}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 border border-[var(--accent)]/30 rounded-full px-2 py- w-fit">
            <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></div>
            <span className="text-[var(--accent)] text-[10px] uppercase tracking-widest font-bold">
              {item.type}
            </span>
          </div>
          <h3 className="text-xl font-medium text-white leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-sm text-gray-400">By {item.author}</p>
        </div>

        <div className="mt-6 flex items-center justify-between sm:hidden">
          <span className="text-lg font-semibold text-white">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions & Price (Desktop) */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-4 mt-4 sm:mt-0 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
        <span className="hidden sm:block text-lg font-semibold text-white tracking-wide">
          ${(item.price * item.quantity).toFixed(2)}
        </span>

        <div className="flex items-center gap-6">
          <QuantityControl
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
          />
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-500 hover:text-red-500 transition-colors p-2"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
