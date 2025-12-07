import React from 'react';
import { Link } from 'react-router-dom';
import { PENDING_REVIEWS } from '../constants/landing_page_constants';

const PendingReviewsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-[#CFFF24] pl-4">
                Pending Reviews
            </h2>

            <div className="space-y-4">
                {PENDING_REVIEWS.map((review) => (
                    <div key={review.id} className="bg-[#0f0f0f] p-6 border border-white/10 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#CFFF24]/50 transition-colors rounded-none">
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
                ))}

                {PENDING_REVIEWS.length === 0 && (
                    <div className="text-gray-500 text-center py-12 bg-[#0f0f0f] border border-white/10 border-dashed rounded-none">
                        No pending reviews. You're all caught up!
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingReviewsPage;
