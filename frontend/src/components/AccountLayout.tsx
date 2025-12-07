import React from 'react';
import { Outlet } from 'react-router-dom';
import { User } from 'lucide-react';
import AccountSidebar from './AccountSidebar';

const AccountLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center gap-6 mb-12 border-b border-white/10 pb-8">
                    <div className="w-20 h-20 bg-[#CFFF24] rounded-full flex items-center justify-center text-black">
                        <User size={40} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold"><span className="text-[#CFFF24]">Welcome back,</span> Engineer</h1>
                        <p className="text-gray-400">Manage your orders and reviews</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <AccountSidebar />

                    {/* Main Content */}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountLayout;
