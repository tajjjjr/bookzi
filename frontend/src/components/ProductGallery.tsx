import React from 'react';

interface ProductGalleryProps {
    image: string;
    title: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ image, title }) => {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full max-w-md aspect-[4/5] group perspective-1000">
                {/* 
          Main Image Container
          Uses similar styling to ProductCard for consistency
        */}
                <div className="
          relative 
          w-full 
          h-full 
          bg-[#0f0f0f] 
          border border-white/5 
          overflow-hidden
          transition-all 
          duration-500 
          ease-out 
          transform-gpu
          group-hover:scale-[1.02]
          group-hover:-rotate-1
          group-hover:shadow-2xl 
          group-hover:shadow-[#CFFF24]/10
        ">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                </div>

                {/* Decorative shadow element */}
                <div className="absolute inset-0 bg-[#CFFF24]/0 group-hover:bg-[#CFFF24]/5 blur-2xl -z-10 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-8 scale-90" />
            </div>
        </div>
    );
};

export default ProductGallery;
