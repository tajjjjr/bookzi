import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';
import AccountHeader from './AccountHeader';

const AccountLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <AccountHeader />

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
