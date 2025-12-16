import React from 'react';
import { CreditCard, Trash2 } from 'lucide-react';

const PaymentSettingsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide">
                <span className="text-[#CFFF24]">Payment</span> Settings
            </h2>
            <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-none">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-white">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                    </div>
                    <button className="text-red-500 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
                <div className="mt-6">
                    <button className="px-6 py-3 bg-[#CFFF24] text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(207,255,36,0.6)] hover:cursor-pointer hover:!text-black transition-colors">
                        Add New Card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSettingsPage;
