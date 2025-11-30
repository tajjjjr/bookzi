import React from 'react';
import { POPULAR_PRODUCTS } from '../constants/landing_page_constants';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

const MostPopular: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-[#CFFF24]">Popular</span> Resources
            </h2>
            <p className="text-gray-400 max-w-lg text-lg">
              Explore our highest-rated engineering breakdowns and financial infrastructure guides.
            </p>
          </div>
          
          <a href="#" className="flex items-center space-x-2 text-white hover:text-[#CFFF24] transition-colors group">
             <span className="text-sm font-bold uppercase tracking-widest">View Full Catalog</span>
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {POPULAR_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MostPopular;