import React from 'react';
import { Ticket, Copy } from 'lucide-react';

const VouchersPage: React.FC = () => {
    const vouchers = [
        { id: 'WELCOME20', value: '20% OFF', desc: 'Welcome discount for new users', expiry: 'Dec 31, 2024' },
        { id: 'FREESHIP', value: 'Free Shipping', desc: 'On orders over $50', expiry: 'Nov 30, 2024' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-[#CFFF24] pl-4">
                My Vouchers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vouchers.map((voucher) => (
                    <div key={voucher.id} className="bg-[#0f0f0f] border border-white/10 p-6 relative overflow-hidden group hover:border-[#CFFF24]/50 transition-colors rounded-none">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#CFFF24]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#CFFF24]/10 transition-colors" />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-[#CFFF24]">
                                <Ticket size={20} />
                            </div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Expires {voucher.expiry}</span>
                        </div>

                        <div className="mb-6 relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-1">{voucher.value}</h3>
                            <p className="text-sm text-gray-400">{voucher.desc}</p>
                        </div>

                        <div className="flex items-center gap-2 bg-black/30 p-2 border border-white/5 border-dashed relative z-10">
                            <code className="flex-1 font-mono text-[#CFFF24] text-center font-bold">{voucher.id}</code>
                            <button className="p-2 hover:text-white text-gray-500 transition-colors">
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VouchersPage;
