import React from 'react';
import { AlertTriangle } from 'lucide-react';

const CloseAccountPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide">
                <span className="text-red-500">Close</span> Account
            </h2>
            <div className="bg-[#0f0f0f] border border-red-500/20 p-8 rounded-none">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Are you sure you want to close your account?</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Closing your account is permanent and cannot be undone. You will lose access to:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1 ml-2">
                            <li>Order history and invoices</li>
                            <li>Saved addresses and payment methods</li>
                            <li>Wishlist and recently viewed items</li>
                            <li>Pending reviews and vouchers</li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="px-6 py-3 border border-red-500 text-red-500 font-bold uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-colors rounded-full">
                        Yes, Close My Account
                    </button>
                    <button className="px-6 py-3 bg-white/5 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors rounded-full">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CloseAccountPage;
