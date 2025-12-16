import React from 'react';
import { Eye } from 'lucide-react';
import { POPULAR_PRODUCTS } from '../constants/landing_page_constants';
import type { Product } from '../types/landing_page_types';

const RecentlyViewedPage: React.FC = () => {
    // Mock recently viewed using popular products (different slice)
    const recentItems = POPULAR_PRODUCTS.slice(2, 6);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-[#CFFF24] pl-4">
                Recently Viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentItems.map((product: Product) => (
                    <div key={product.id} className="bg-[#0f0f0f] border border-white/10 group hover:border-[#CFFF24]/50 transition-colors rounded-2xl">
                        <div className="relative aspect-square overflow-hidden bg-[#1a1a1a] rounded-t-2xl">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover opacity-60 rounded-t-2xl group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <Eye size={24} className="text-[#CFFF24]" />
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-bold text-sm text-white mb-1 truncate">{product.title}</h3>
                            <p className="text-xs text-gray-500">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedPage;
