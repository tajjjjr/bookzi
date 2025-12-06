import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onDecrease}
        className="w-10 h-10 flex items-center justify-center border border-white/20 bg-transparent text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <div className="w-12 h-10 flex items-center justify-center border-t border-b border-white/20 text-sm font-medium">
        {quantity}
      </div>
      <button
        onClick={onIncrease}
        className="w-10 h-10 flex items-center justify-center border border-white/20 bg-transparent text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantityControl;
