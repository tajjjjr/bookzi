import React, { useState, useEffect } from 'react';
import { ALL_PRODUCTS } from '../constants/landing_page_constants';
import ProductCard from './ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const MostPopular: React.FC = () => {
  // Use a subset of products for the "Popular" section
  const popularProducts = ALL_PRODUCTS.slice(0, 6);
  const itemsPerPage = 3;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % popularProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      (prev - itemsPerPage + popularProducts.length) % popularProducts.length
    );
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000); // Swaps every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Determine visible products based on current index
  // Handle wrapping if the last page has fewer items (though with 6 items and page of 3 it's perfect)
  const visibleProducts = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (currentIndex + i) % popularProducts.length;
    visibleProducts.push(popularProducts[index]);
  }

  return (
    <section className="py-32 relative z-10 bg-gradient-to-b from-[#050505] from-50% to-[#CFFF24]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
              <span className="text-[#CFFF24]">Trending</span> Now
            </h2>
            <p className="text-gray-300 max-w-lg text-lg drop-shadow-sm">
              Our most sought-after resources this week.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex space-x-4">
            <button 
                onClick={() => {
                    setIsAutoPlaying(false);
                    prevSlide();
                }}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-black hover:border-[#CFFF24] hover:text-[#CFFF24] transition-all bg-[#050505]/50 backdrop-blur-sm"
            >
                <ArrowLeft size={18} />
            </button>
            <button 
                onClick={() => {
                    setIsAutoPlaying(false);
                    nextSlide();
                }}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-black hover:border-[#CFFF24] hover:text-[#CFFF24] transition-all bg-[#050505]/50 backdrop-blur-sm"
            >
                <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Row */}
        <div className="relative overflow-hidden min-h-[500px]">
           {/* 
             We animate the 'key' to force a re-render animation when the set changes, 
             or we can use a transition group. For simplicity and robustness with the "swap" 
             requirement, we will render the grid.
           */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in key-{currentIndex}">
             {visibleProducts.map((product) => (
               <div key={`${currentIndex}-${product.id}`} className="animate-in fade-in slide-in-from-right-4 duration-700 fill-mode-both">
                 <ProductCard product={product} />
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default MostPopular;
