import React from 'react';
import { CreditCard, Trash2 } from 'lucide-react';

const PaymentSettingsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-[#CFFF24] pl-4">
                Payment Settings
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
                <button className="w-full py-3 border border-[#CFFF24] text-[#CFFF24] font-bold uppercase tracking-widest text-sm hover:bg-[#CFFF24] hover:text-black transition-colors">
                    Add New Card
                </button>
            </div>
        </div>
    );
};

export default PaymentSettingsPage;
