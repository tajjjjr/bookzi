import React, { useEffect } from 'react';
import Hero from './Hero';
import MostPopular from './MostPopular';

const LandingPage: React.FC = () => {
  // Use useEffect to run code after the component renders
  useEffect(() => {
    // Set the title property
    document.title = 'Shop';
  }, []); 

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white selection:bg-[#CFFF24] selection:text-black">
      <main className="flex flex-col">
        <Hero />
        <MostPopular />
      </main>
    </div>
  );
};

export default LandingPage;