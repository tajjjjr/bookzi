import React, { useEffect} from "react";
import Hero from './Hero';
import MostPopular from './MostPopular';
import ProductGrid from './ProductGrid';
import { updateMeta } from "../lib/set_metadata";

const LandingPage: React.FC = () => {
    useEffect(() => {
      document.title = "Shop";
      updateMeta("description", "Explore TAJJJR’s collection of premium ebooks, including developer courses, guides, and case studies designed to help teams build better software. Shop expert content and level up your skills.");
      updateMeta("og:title", "TAJJJR Shop – Expert Ebooks for Modern Developers");
    }, []);
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
