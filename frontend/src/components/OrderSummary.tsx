import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from './Button';

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, tax, discount, total }) => {
  return (
    <div className="bg-surface border border-white/10 p-6 lg:p-8 sticky top-6">
      <h2 className="text-xl font-medium text-white mb-8">Order Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Tax (Estimated)</span>
          <span className="text-white">${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[var(--accent)]">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="pt-6 mt-6 border-t border-white/10">
          <div className="flex justify-between items-end">
            <span className="text-gray-400 font-medium">Total</span>
            <div className="text-right">
              <span className="text-3xl font-bold text-[var(--accent)] tracking-tight">${total.toFixed(2)}</span>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">USD</p>
            </div>
          </div>
        </div>
      </div>

    <Button 
    variant='primary'
    label='Proceed to Checkout'
    className='mx-auto mt-8 block' />
      {/* <button className="w-full mt-8 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold h-14 flex items-center justify-center gap-2 transition-all duration-300 group">
        <span>Proceed to Checkout</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button> */}

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
        <Lock size={12} />
        <span>Secure Encrypted Payment</span>
      </div>
      
      {/* Coupon Input */}
      {/* <div className="mt-8 pt-6 border-t border-white/10">
        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Promo Code</label>
        <div className="flex">
          <input 
            type="text" 
            placeholder="ENTER CODE" 
            className="flex-1 bg-transparent border border-white/20 px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button className="px-4 border border-l-0 border-white/20 text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
            APPLY
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default OrderSummary;
