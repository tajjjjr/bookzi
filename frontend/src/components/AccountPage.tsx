import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Clock } from 'lucide-react';
import { PENDING_REVIEWS } from '../constants/landing_page_constants';

const AccountPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center gap-6 mb-12 border-b border-white/10 pb-8">
                    <div className="w-20 h-20 bg-[#CFFF24] rounded-full flex items-center justify-center text-black">
                        <User size={40} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, Engineer</h1>
                        <p className="text-gray-400">Manage your orders and reviews</p>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-[#0f0f0f] p-6 border border-white/10 rounded-sm">
                        <div className="flex items-center gap-3 mb-2 text-[#CFFF24]">
                            <Package size={24} />
                            <span className="text-2xl font-bold font-mono">12</span>
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest">Total Orders</div>
                    </div>
                    <div className="bg-[#0f0f0f] p-6 border border-white/10 rounded-sm">
                        <div className="flex items-center gap-3 mb-2 text-[#CFFF24]">
                            <Clock size={24} />
                            <span className="text-2xl font-bold font-mono">{PENDING_REVIEWS.length}</span>
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest">Pending Reviews</div>
                    </div>
                </div>

                {/* Pending Reviews Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-[#CFFF24] pl-4">
                        Pending Reviews
                    </h2>

                    <div className="space-y-4">
                        {PENDING_REVIEWS.map((review) => (
                            <div key={review.id} className="bg-[#0f0f0f] p-6 border border-white/10 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#CFFF24]/50 transition-colors">
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
                                    className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#CFFF24] transition-colors"
                                >
                                    Write Review
                                </Link>
                            </div>
                        ))}

                        {PENDING_REVIEWS.length === 0 && (
                            <div className="text-gray-500 text-center py-12 bg-[#0f0f0f] border border-white/10 border-dashed">
                                No pending reviews. You're all caught up!
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountPage;
