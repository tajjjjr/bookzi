import { useEffect } from 'react';

import { BillingForm } from './BillingForm';
import { BillingSummary } from './BillingSummary';
import { CART_ITEMS } from '../constants/checkout_constants';
import ProductGrid from './ProductGrid';
import { updateMeta } from '../lib/set_metadata';

const CheckoutPage = () => {
      useEffect(() => {
        document.title = "Checkout";
    
        updateMeta(
          "description",
          "Complete your TAJJJR ebook purchase securely. Finalize checkout for premium developer courses, guides, and case studies designed to sharpen your software skills."
        );
        updateMeta("og:title", "TAJJJR eBooks - Checkout");
      }, []);

  const subtotal = CART_ITEMS.reduce((acc, item) => acc + item.price, 0);
  const taxes = 0.00;
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-[#CFFF24] selection:text-black">
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          <BillingForm />
          <BillingSummary 
            items={CART_ITEMS}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
          />
        </div>
          <ProductGrid />
      </main>
    </div>
  );
};

export default CheckoutPage;
