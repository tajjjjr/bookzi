import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { PENDING_REVIEWS } from '../constants/landing_page_constants';

const CreateReviewPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const reviewItem = PENDING_REVIEWS.find(r => r.productId === productId);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    if (!reviewItem) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
                <h2 className="text-2xl font-bold mb-4">Review Item Not Found</h2>
                <Link to="/shop/account" className="text-[#CFFF24] hover:underline">
                    Return to Account
                </Link>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would submit to backend
        console.log({ productId, rating, comment });
        alert('Review submitted successfully!');
        navigate('/shop/account');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link to="/shop/account" className="inline-flex items-center text-gray-400 hover:text-[#CFFF24] mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Account
                </Link>

                <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-sm">

                    {/* Product Info */}
                    <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                        <img
                            src={reviewItem.productImage}
                            alt={reviewItem.productTitle}
                            className="w-24 h-32 object-cover bg-gray-800 shadow-lg"
                        />
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Write a Review</h1>
                            <p className="text-gray-400 text-sm uppercase tracking-widest">
                                {reviewItem.productTitle}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Rating */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">
                                Overall Rating
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            size={32}
                                            fill={(hoverRating || rating) >= star ? "#CFFF24" : "none"}
                                            className={(hoverRating || rating) >= star ? "text-[#CFFF24]" : "text-gray-600"}
                                        />
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-[#CFFF24] h-5">
                                {rating > 0 ? ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1] : ''}
                            </p>
                        </div>

                        {/* Comment */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">
                                Your Review
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={6}
                                className="w-full bg-black border border-white/20 p-4 text-white focus:border-[#CFFF24] focus:outline-none transition-colors resize-none placeholder-gray-700"
                                placeholder="What did you like or dislike? What did you use this product for?"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={rating === 0}
                            className="w-full py-4 bg-[#CFFF24] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Review
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default CreateReviewPage;
