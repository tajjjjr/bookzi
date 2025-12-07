import React from 'react';
import { Link } from 'react-router-dom';
import type { PendingReview } from '../types/landing_page_types';

interface PendingReviewItemProps {
    review: PendingReview;
}

const PendingReviewItem: React.FC<PendingReviewItemProps> = ({ review }) => {
    return (
        <div className="bg-[#0f0f0f] p-6 border border-white/10 flex flex-col sm:flex-row items-center gap-6 group transition-colors rounded-none">
            <img
                src={review.productImage}
                alt={review.productTitle}
                className="w-20 h-20 object-cover bg-gray-800"
            />
            <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg mb-1">{review.productTitle}</h3>
                <p className="text-sm text-gray-500">Purchased on {review.purchaseDate}</p>
            </div>
            <Link
                to={`/shop/account/review/${review.productId}`}
                className="px-6 py-3 bg-[#CFFF24] text-black font-bold uppercase tracking-widest text-sm hover:bg-white hover:!text-black transition-colors"
            >
                Write Review
            </Link>
        </div>
    );
};

export default PendingReviewItem;
