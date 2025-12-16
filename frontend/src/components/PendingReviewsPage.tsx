import React from 'react';

import { PENDING_REVIEWS } from '../constants/landing_page_constants';
import PendingReviewItem from './PendingReviewItem';

const PendingReviewsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide">
                <span className="text-[#CFFF24]">Pending</span> Reviews
            </h2>

            <div className="space-y-4">
                {PENDING_REVIEWS.map((review) => (
                    <PendingReviewItem key={review.id} review={review} />
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
