import React from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../types/landing_page_types';

interface ReviewSnippetProps {
    reviews: Review[];
    onSeeAll: () => void;
}

const ReviewSnippet: React.FC<ReviewSnippetProps> = ({ reviews, onSeeAll }) => {
    // Show only the first 3 reviews
    const displayedReviews = reviews.slice(0, 3);

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                Reviews
            </h3>

            <div className="space-y-4">
                {displayedReviews.map((review) => (
                    <div key={review.id} className="bg-[#0f0f0f] p-4 border border-white/10 rounded-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {review.avatar ? (
                                    <img src={review.avatar} alt={review.author} className="w-8 h-8 rounded-full" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                                        {review.author.charAt(0)}
                                    </div>
                                )}
                                <span className="font-bold text-sm text-white">{review.author}</span>
                            </div>
                            <div className="flex text-[#CFFF24]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill={i < review.rating ? "#CFFF24" : "none"} className={i < review.rating ? "" : "text-gray-600"} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            "{review.content}"
                        </p>
                        <span className="text-xs text-gray-600 mt-2 block">{review.date}</span>
                    </div>
                ))}
            </div>

            {reviews.length > 3 && (
                <button
                    onClick={onSeeAll}
                    className="text-[#CFFF24] text-sm font-bold uppercase tracking-widest hover:underline hover:text-white transition-colors"
                >
                    See All {reviews.length} Reviews
                </button>
            )}
        </div>
    );
};

export default ReviewSnippet;
