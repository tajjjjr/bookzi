import React from 'react';
import { Mail, Bell } from 'lucide-react';

const InboxPage: React.FC = () => {
    const messages = [
        { id: 1, title: 'Order Shipped', date: 'Oct 25, 2024', preview: 'Your order #ORD-12345 has been shipped!', read: false },
        { id: 2, title: 'Flash Sale Alert', date: 'Oct 20, 2024', preview: 'Don\'t miss out on our 24-hour flash sale.', read: true },
        { id: 3, title: 'Review Request', date: 'Oct 15, 2024', preview: 'How did you like your recent purchase?', read: true },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-[#CFFF24] pl-4">
                Inbox
            </h2>
            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`bg-[#0f0f0f] p-6 border ${msg.read ? 'border-white/10' : 'border-[#CFFF24]/30'} rounded-none flex items-start gap-4 hover:bg-white/5 transition-colors cursor-pointer`}>
                        <div className={`mt-1 ${msg.read ? 'text-gray-500' : 'text-[#CFFF24]'}`}>
                            {msg.read ? <Mail size={20} /> : <Bell size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-bold ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.title}</h3>
                                <span className="text-xs text-gray-500">{msg.date}</span>
                            </div>
                            <p className="text-sm text-gray-400">{msg.preview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InboxPage;
