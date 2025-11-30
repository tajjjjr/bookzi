import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants/landing_page_constants';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-20 pb-20 md:pb-0 overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#CFFF24]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col md:flex-row items-center relative z-20">
        
        {/* Left: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-12 mb-12 md:mb-0">
            <div className="inline-flex items-center space-x-2 border border-[#CFFF24]/30 rounded-full px-3 py-1 w-fit mb-8">
                <div className="w-1.5 h-1.5 bg-[#CFFF24] rounded-full animate-pulse"></div>
                <span className="text-[#CFFF24] text-[10px] uppercase tracking-widest font-bold">New Release</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 transition-all duration-500 ease-in-out">
                {slide.headline}
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mb-10 transition-opacity duration-500">
                {slide.subheadline}
            </p>

            <div className="flex items-center space-x-6">
                <button className="bg-[#CFFF24] text-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center group">
                    {slide.ctaText}
                    <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </div>

        {/* Right: Image Slider & Controls */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center">
            {/* Image Container with Paper Effect */}
            <div className="relative w-full h-full bg-[#111] border border-white/5 overflow-hidden group">
               <img 
                 src={slide.image} 
                 alt={slide.headline}
                 className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-in-out grayscale group-hover:grayscale-0"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Navigation Controls - Absolute Positioned on top of image area or bottom right */}
            <div className="absolute -bottom-6 right-0 flex space-x-4 z-30">
                <button 
                    onClick={() => {
                        setIsAutoPlaying(false);
                        prevSlide();
                    }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#CFFF24] hover:text-[#CFFF24] transition-all bg-[#050505]"
                >
                    <ArrowLeft size={18} />
                </button>
                <button 
                    onClick={() => {
                        setIsAutoPlaying(false);
                        nextSlide();
                    }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#CFFF24] hover:text-[#CFFF24] transition-all bg-[#050505]"
                >
                    <ArrowRight size={18} />
                </button>
            </div>
            
             {/* Slide indicators */}
             <div className="absolute -bottom-6 left-0 flex space-x-2 items-center h-12 z-30">
                {HERO_SLIDES.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1 transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-[#CFFF24]' : 'w-2 bg-white/20'}`}
                    ></div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;