import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  const SCROLL_THRESHOLD = 75;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const isPastThreshold = window.scrollY > SCROLL_THRESHOLD;
    if (isPastThreshold !== isScrolled) {
      setIsScrolled(isPastThreshold);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-[#CFFF24] selection:text-black">
      <Navbar scrolled={isScrolled} />
      <Outlet />
      <Footer />
    </div>
  );
}
