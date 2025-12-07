import React from 'react';
import Hero from './Hero';
import MostPopular from './MostPopular';
import ProductGrid from './ProductGrid';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white selection:bg-[var(--accent)] selection:text-black">
      <main className="flex flex-col">
        <Hero />
        <MostPopular />
        <ProductGrid />
      </main>
    </div>
  );
};

export default LandingPage;
