import React from 'react';

const NewsletterPreferencesPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide">
                <span className="text-[#CFFF24]">Newsletter</span> Preferences
            </h2>
            <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-none">
                <p className="text-gray-400 mb-6">Manage your email subscription preferences.</p>

                <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#CFFF24] bg-transparent border-white/20 rounded-none cursor-pointer" />
                        <div>
                            <span className="block font-bold text-white group-hover:text-[#CFFF24] transition-colors">Daily Newsletter</span>
                            <span className="text-sm text-gray-500">Get the latest tech news and updates every morning.</span>
                        </div>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#CFFF24] bg-transparent border-white/20 rounded-none cursor-pointer" />
                        <div>
                            <span className="block font-bold text-white group-hover:text-[#CFFF24] transition-colors">Promotions & Offers</span>
                            <span className="text-sm text-gray-500">Be the first to know about sales and special deals.</span>
                        </div>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 accent-[#CFFF24] bg-transparent border-white/20 rounded-none cursor-pointer" />
                        <div>
                            <span className="block font-bold text-white group-hover:text-[#CFFF24] transition-colors">Partner Offers</span>
                            <span className="text-sm text-gray-500">Receive offers from our trusted partners.</span>
                        </div>
                    </label>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                    <button className="bg-[#CFFF24] text-black px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(207,255,36,0.6)] hover:cursor-pointer transition-colors">
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsletterPreferencesPage;
