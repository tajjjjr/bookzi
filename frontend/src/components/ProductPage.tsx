import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProductById } from '../hooks/useProductHooks';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ReviewSnippet from './ReviewSnippet';
import ReviewList from './ReviewList';

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [showAllReviews, setShowAllReviews] = React.useState(false);
    const { product, loading, error } = useProductById(id || null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
                <div className="animate-pulse">
                    <div className="w-16 h-16 border-4 border-[#CFFF24] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-400">Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <p className="text-gray-400 mb-6">{error || 'The product you are looking for does not exist.'}</p>
                <Link to="/shop" className="text-[#CFFF24] hover:underline">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 mt-20">
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

                {/* Reviews Section */}
                {product.reviewsList && product.reviewsList.length > 0 && (
                    <div className="mt-20 border-t border-white/10 pt-12">
                        <div className="w-full">
                            <ReviewSnippet
                                reviews={product.reviewsList}
                                onSeeAll={() => setShowAllReviews(true)}
                            />
                        </div>
                    </div>
                )}

                {/* All Reviews Modal */}
                {showAllReviews && product.reviewsList && (
                    <ReviewList
                        reviews={product.reviewsList}
                        onClose={() => setShowAllReviews(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductPage;
