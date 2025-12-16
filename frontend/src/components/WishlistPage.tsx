import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { POPULAR_PRODUCTS } from '../constants/landing_page_constants';
import type { Product } from '../types/landing_page_types';

const WishlistPage: React.FC = () => {
    // Mock wishlist using popular products
    const wishlistItems = POPULAR_PRODUCTS.slice(0, 4);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-[#CFFF24] pl-4">
                Wishlist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((product: Product) => (
                    <div key={product.id} className="bg-[#0f0f0f] border border-white/10 group hover:border-[#CFFF24]/50 transition-colors rounded-2xl">
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a] rounded-t-2xl">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <button className="absolute top-2 right-2 p-2 bg-black/50 text-[#CFFF24] hover:bg-[#CFFF24] hover:text-black transition-colors rounded-full">
                                <Heart size={16} fill="#CFFF24" />
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-white mb-1 truncate">{product.title}</h3>
                            <p className="text-sm text-gray-400 mb-4">${product.price}</p>
                            {/* rounded-full text-black font-bold uppercase tracking-widest hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(207,255,36,0.6)] hover:cursor-pointer */}
                            <button className="w-full py-2 bg-[#CFFF24] rounded-full text-black text-xs font-bold uppercase tracking-widest transition-colors hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(207,255,36,0.6)] hover:cursor-pointer flex items-center justify-center gap-2">
                                <ShoppingCart size={14} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
