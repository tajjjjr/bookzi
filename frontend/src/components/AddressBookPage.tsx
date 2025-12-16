import React from 'react';
import { MapPin, Edit2 } from 'lucide-react';

const AddressBookPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wide">
                <span className="text-[#CFFF24]">Address</span> Book
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f0f0f] border border-[#CFFF24] p-6 relative rounded-none">
                    <div className="absolute top-0 right-0 bg-[#CFFF24] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        Default
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                        <MapPin className="text-[#CFFF24] mt-1" size={20} />
                        <div>
                            <h3 className="font-bold text-white">John Doe</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                123 Tech Street<br />
                                Silicon Valley, CA 94000<br />
                                United States<br />
                                +1 (555) 123-4567
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                        <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                            <Edit2 size={14} /> Edit
                        </button>
                    </div>
                </div>

                <button className="border border-white/10 border-dashed flex flex-col items-center justify-center p-6 text-gray-500 hover:text-[#CFFF24] hover:border-[#CFFF24] transition-colors min-h-[200px] rounded-none">
                    <MapPin size={32} className="mb-2" />
                    <span className="font-bold uppercase tracking-widest text-sm">Add New Address</span>
                </button>
            </div>
        </div>
    );
};

export default AddressBookPage;
