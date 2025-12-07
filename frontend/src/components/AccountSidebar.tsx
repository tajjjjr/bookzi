import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Package,
    Mail,
    Star,
    Ticket,
    Heart,
    Clock,
    CreditCard,
    MapPin,
    Bell,
    XCircle,
    LogOut,
    User
} from 'lucide-react';

const AccountSidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const menuItems = [
        {
            title: 'My Jumia Account',
            items: [
                { label: 'Overview', icon: User, path: '/shop/account' },
                { label: 'Orders', icon: Package, path: '/shop/account/orders' },
                { label: 'Inbox', icon: Mail, path: '/shop/account/inbox' },
                { label: 'Pending Reviews', icon: Star, path: '/shop/account/pending-reviews' },
                { label: 'Vouchers', icon: Ticket, path: '/shop/account/vouchers' },
                { label: 'Wishlist', icon: Heart, path: '/shop/account/wishlist' },
                { label: 'Recently Viewed', icon: Clock, path: '/shop/account/recently-viewed' },
            ]
        },
        {
            title: 'Account Management',
            items: [
                { label: 'Payment Settings', icon: CreditCard, path: '/shop/account/payment' },
                { label: 'Address Book', icon: MapPin, path: '/shop/account/address' },
                { label: 'Newsletter Preferences', icon: Bell, path: '/shop/account/newsletter' },
                { label: 'Close Account', icon: XCircle, path: '/shop/account/close', className: 'text-red-500 hover:text-red-400' },
                { label: 'Logout', icon: LogOut, path: '/logout', className: 'text-red-500 hover:text-red-400' },
            ]
        }
    ];

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-[#0f0f0f] border border-white/10 rounded-none overflow-hidden">
                {menuItems.map((section, index) => (
                    <div key={index} className={index !== 0 ? 'border-t border-white/10' : ''}>
                        <div className="px-5 py-4 bg-white/[0.02] border-b border-white/5">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#CFFF24] flex items-center gap-2">
                                {index === 0 ? <User size={14} /> : null}
                                {section.title}
                            </h3>
                        </div>
                        <div className="py-2">
                            {section.items.map((item, itemIndex) => (
                                <Link
                                    key={itemIndex}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-5 py-3 text-sm transition-all duration-300 group ${isActive(item.path)
                                        ? 'text-[#CFFF24] bg-white/[0.02] border-l-2 border-[#CFFF24]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/[0.02] border-l-2 border-transparent'
                                        } ${item.className || ''}`}
                                >
                                    <item.icon size={16} className={`transition-transform duration-300 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    <span className="tracking-wide">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountSidebar;
