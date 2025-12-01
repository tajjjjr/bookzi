import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ALL_PRODUCTS } from '../constants/landing_page_constants';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = ALL_PRODUCTS.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Link to="/shop" className="text-[#CFFF24] hover:underline">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb / Back Link */}
                <div className="mb-8">
                    <Link
                        to="/shop"
                        className="inline-flex items-center text-gray-400 hover:text-[#CFFF24] transition-colors text-sm uppercase tracking-widest group"
                    >
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Products
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Gallery */}
                    <div className="w-full">
                        <ProductGallery image={product.image} title={product.title} />
                    </div>

                    {/* Right Column: Details */}
                    <div className="w-full">
                        <ProductDetails product={product} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductPage;
