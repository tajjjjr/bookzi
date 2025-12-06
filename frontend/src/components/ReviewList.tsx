import React, { useState } from 'react';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Review } from '../types/landing_page_types';

interface ReviewListProps {
    reviews: Review[];
    onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onClose }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentReviews = reviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#050505] border border-white/10 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                        All Reviews ({reviews.length})
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {currentReviews.map((review) => (
                        <div key={review.id} className="bg-[#0f0f0f] p-6 border border-white/10 rounded-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {review.avatar ? (
                                        <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">
                                            {review.author.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-bold text-white">{review.author}</div>
                                        <div className="text-xs text-gray-500">{review.date}</div>
                                    </div>
                                </div>
                                <div className="flex text-[#CFFF24]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < review.rating ? "#CFFF24" : "none"} className={i < review.rating ? "" : "text-gray-600"} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {review.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-white/10 flex items-center justify-between bg-[#0f0f0f]">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 text-white disabled:text-gray-600 hover:text-[#CFFF24] transition-colors disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className="text-sm text-gray-400">
                            Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 text-white disabled:text-gray-600 hover:text-[#CFFF24] transition-colors disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewList;
