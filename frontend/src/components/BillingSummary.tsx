
import { HelpCircle } from 'lucide-react';
import type { Product } from '../types/checkout_types';
import { Button } from './Button';

interface BillingSummaryProps {
  items: Product[];
  subtotal: number;
  taxes: number;
  total: number;
}

export const BillingSummary = ({ 
  items, 
  subtotal,
  taxes, 
  total,
}: BillingSummaryProps) => {
  return (
    <div className="lg:w-[400px] xl:w-[440px] flex-shrink-0">
      <div className="bg-[#0A0A0A] border border-[#111] rounded-2xl p-6 lg:p-8 sticky top-24">
        <h3 className="text-xl font-bold text-white mb-6"><span className='text-[var(--accent)]'>Order</span> Summary</h3>

        {/* Items List */}
        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#111] border border-[#222] flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-medium text-gray-200 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-white">${item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discount Code */}
        {/* <div className="flex gap-2 mb-8">
          <input 
            type="text" 
            placeholder="Discount code" 
            className="flex-1 bg-[#111] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#CFFF24]"
          />
          <button className="bg-[#222] hover:bg-[#333] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-[#333]">
            Apply
          </button>
        </div> */}

        {/* Totals */}
        <div className="space-y-3 pt-6 border-t border-[#222] mb-8">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <span>Estimated taxes</span>
              <HelpCircle className="w-3 h-3 text-gray-600" />
            </div>
            <span className="text-white">${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-[#222] mt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Primary Action */}
        <Button 
          variant='primary'
          label='Complete Order'
          className='w-full mb-4'
        />
        {/* <button className="w-full bg-[#CFFF24] hover:bg-[#bce619] text-black font-bold py-4 rounded-xl transition-all transform active:scale-[0.99] flex items-center justify-center gap-2">
          Complete Order
          <ArrowRight className="w-5 h-5" />
        </button> */}
        
        <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
          Secure 256-bit SSL encrypted payment
        </p>
      </div>
    </div>
  );
};
