import React, { useState } from 'react';
import { Star, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
import type { Product } from '../types/landing_page_types';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col justify-center h-full p-4 md:p-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="inline-flex items-center space-x-2 border border-[#CFFF24]/30 rounded-full px-3 py-1 w-fit">
                        <div className="w-1.5 h-1.5 bg-[#CFFF24] rounded-full animate-pulse"></div>
                        <span className="text-[#CFFF24] text-[10px] uppercase tracking-widest font-bold">{product.category}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[#CFFF24] text-sm">
                        <Star size={14} fill="#CFFF24" />
                        <span>{product.rating}</span>
                        <span className="text-gray-500">({product.reviews} reviews)</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    {product.title}
                </h1>

                <p className="text-gray-400 text-sm uppercase tracking-widest">
                    By <span className="text-white">{product.author}</span>
                </p>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline space-x-4 border-b border-white/10 pb-8">
                <span className="text-3xl font-mono text-[#CFFF24]">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                    {product.description}
                </p>
                <p className="text-gray-400 mt-4 leading-relaxed">
                    This comprehensive resource includes full source code, documentation, and lifetime updates.
                    Perfect for engineers looking to scale their systems.
                </p>
            </div>

            {/* Actions */}
            <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-white/20 bg-[#0f0f0f] h-14 w-full sm:w-32">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-full flex items-center justify-center text-white hover:text-[#CFFF24] transition-colors text-xl"
                        >
                            -
                        </button>
                        <div className="flex-1 h-full flex items-center justify-center text-white font-mono border-x border-white/10">
                            {quantity}
                        </div>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-full flex items-center justify-center text-white hover:text-[#CFFF24] transition-colors text-xl"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full h-14 bg-[#CFFF24] rounded-full text-black font-bold uppercase tracking-widest hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(207,255,36,0.6)] hover:cursor-pointer flex items-center justify-center gap-2 group">
                        <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                        Add to Cart
                    </button>
                </div>

                {/* Features / Trust Badges */}
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 uppercase tracking-wider pt-4">
                    <div className="flex items-center gap-2">
                        <Zap size={16} className="text-[#CFFF24]" />
                        <span>Instant Download</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#CFFF24]" />
                        <span>Secure Payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
