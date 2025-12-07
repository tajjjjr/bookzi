import React from 'react';
import { User } from 'lucide-react';

const AccountHeader: React.FC = () => {
    return (
        <div className="flex items-center gap-6 mb-12 border-b border-white/10 pb-8">
            <div className="w-20 h-20 bg-[#CFFF24] rounded-full flex items-center justify-center text-black">
                <User size={40} />
            </div>
            <div>
                <h1 className="text-3xl font-bold"><span className="text-[#CFFF24]">Welcome back,</span> Engineer</h1>
                <p className="text-gray-400">Manage your orders and reviews</p>
            </div>
        </div>
    );
};

export default AccountHeader;
