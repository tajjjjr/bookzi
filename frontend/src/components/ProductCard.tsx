import React from 'react';
import type { Product } from '../types/landing_page_types';
import { Star, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative w-full perspective-1000">
      {/* 
        Container for the twist effect.
        hover:-translate-y-4 -> Lifts up
        hover:scale-[1.02] -> Slight growth
        hover:-rotate-1 -> Slight twist to the left
        rounded-none -> Sharp paper edges
      */}
      <div className="
        relative 
        bg-[#0f0f0f] 
        border border-white/5 
        p-0 
        transition-all 
        duration-500 
        ease-out 
        transform-gpu
        origin-center
        group-hover:-translate-y-3
        group-hover:scale-[1.02]
        group-hover:-rotate-1
        group-hover:shadow-2xl 
        group-hover:shadow-[#CFFF24]/5
        rounded-none
      ">
        
        {/* Image Area */}
        <div className="relative w-full aspect-[4/5] overflow-hidden border-b border-white/5 bg-[#1a1a1a]">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
          />
          
          {/* Badge */}
          <div className="absolute top-4 left-4 bg-[#050505] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest border border-white/10">
            {product.category}
          </div>

          {/* Quick Action Overlay (Only visible on hover) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <button className="bg-[#CFFF24] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Quick View
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
             <div className="flex items-center space-x-1 text-[#CFFF24] text-xs">
                <Star size={12} fill="#CFFF24" />
                <span>{product.rating}</span>
                <span className="text-gray-600">({product.reviews})</span>
             </div>
             <span className="text-white font-mono text-sm">${product.price}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#CFFF24] transition-colors">
            {product.title}
          </h3>
          
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
            By {product.author}
          </p>

          <p className="text-gray-400 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
            {product.description}
          </p>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Instant PDF Download</span>
            <button className="w-8 h-8 flex items-center justify-center bg-[#222] text-white hover:bg-[#CFFF24] hover:text-black transition-colors rounded-none">
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>
      
      {/* Decorative shadow element that stays on ground to emphasize lift */}
      <div className="absolute inset-0 bg-[#CFFF24]/0 group-hover:bg-[#CFFF24]/5 blur-xl -z-10 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 scale-95" />
    </div>
  );
};

export default ProductCard;