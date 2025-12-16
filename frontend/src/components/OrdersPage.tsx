import React from 'react';
import { Package, ArrowRight } from 'lucide-react';

const OrdersPage: React.FC = () => {
    const orders = [
        { id: 'ORD-12345', date: 'Oct 24, 2024', total: '$124.50', status: 'Delivered', items: 3 },
        { id: 'ORD-12344', date: 'Sep 12, 2024', total: '$45.00', status: 'Delivered', items: 1 },
        { id: 'ORD-12343', date: 'Aug 05, 2024', total: '$210.00', status: 'Delivered', items: 5 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide">
                <span className="text-[#CFFF24]">My</span> Orders
            </h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-[#0f0f0f] p-6 border border-white/10 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-[#CFFF24]/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-[#CFFF24]">
                                <Package size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{order.id}</h3>
                                <p className="text-sm text-gray-500">{order.date} • {order.items} Items</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="font-mono font-bold text-white">{order.total}</p>
                                <p className="text-xs text-[#CFFF24] uppercase tracking-wider">{order.status}</p>
                            </div>
                            <button className="p-2 hover:bg-[#CFFF24] hover:text-black transition-colors rounded-full">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
