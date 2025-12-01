import React, { useState } from 'react';
import { ALL_PRODUCTS } from '../constants/landing_page_constants';
import ProductCard from './ProductCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Recommended' | 'Search'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Simulate filtering based on tabs
  const getFilteredProducts = () => {
    if (activeTab === 'Recommended') {
        // Just return a subset for demo
        return ALL_PRODUCTS.filter((_, idx) => idx % 2 === 0);
    }
    if (activeTab === 'Search') {
        // Simulate a search result
        return ALL_PRODUCTS.filter(p => p.category === 'Case Study');
    }
    return ALL_PRODUCTS;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleTabChange = (tab: 'All' | 'Recommended' | 'Search') => {
      setActiveTab(tab);
      setCurrentPage(1);
  }

  return (
    <section className="py-24 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Tabs Container */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-white/10 pb-6 gap-6">
            
            {/* Tabs */}
            <div className="flex space-x-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {['All', 'Recommended', 'Search'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab as any)}
                        className={`text-sm font-bold uppercase tracking-widest transition-colors relative py-2 ${
                            activeTab === tab ? 'text-[#CFFF24]' : 'text-gray-500 hover:text-white'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CFFF24]"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Search Bar (Visual only for now if tab is not Search, or functional) */}
            <div className="relative w-full md:w-64">
                <input 
                    type="text" 
                    placeholder="Search resources..." 
                    className="w-full bg-[#111] border border-white/10 px-4 py-2 pl-10 text-sm text-white focus:outline-none focus:border-[#CFFF24] transition-colors rounded-none placeholder-gray-600"
                    onFocus={() => handleTabChange('Search')}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-20">
            {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-3 text-center py-20 text-gray-500">
                    No products found.
                </div>
            )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-[#CFFF24] hover:text-[#CFFF24] disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white transition-colors"
                >
                    <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 border flex items-center justify-center text-sm font-bold transition-colors ${
                            currentPage === i + 1 
                            ? 'bg-[#CFFF24] border-[#CFFF24] text-black' 
                            : 'border-white/10 text-white hover:border-[#CFFF24] hover:text-[#CFFF24]'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-[#CFFF24] hover:text-[#CFFF24] disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white transition-colors"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        )}

      </div>
    </section>
  );
};

export default ProductGrid;
