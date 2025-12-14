import React, { useState } from 'react';
import { Link } from 'react-router-dom';
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("customer_token");

  const mothersiteURL = (import.meta.env.VITE_MOTHERSITE_URL || "https://tajjj-nine.vercel.app/").replace(/\/$/, "");

  // Define the dynamic auth link
  const authLink = isLoggedIn 
    ? { name: "My Account", href: "/shop/account" } 
    : { name: "Sign In", href: "/shop/auth" };

  const navLinks = {
    left: [
      { name: "Blog", href: `${mothersiteURL}/blog`, external: true },
      { name: "Projects", href: `${mothersiteURL}/projects`, external: true },
      { name: "Shop", href: "/shop", external: false },
    ],
    right: [
      { name: "Our Story", href: `${mothersiteURL}/our-story`, external: true },
      { name: "Contact Us", href: `${mothersiteURL}/contact`, external: true },
      authLink, // Add the dynamic link here
    ],
  };

interface NavbarProps {
  scrolled: boolean;
}

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const brandColor = "#CFFF24";

  const baseHeaderClasses =
    "fixed z-50 transition-all duration-300 ease-in-out w-full font-inter top-0 flex justify-center";
  const commonInnerClasses =
    "w-full lg:w-2/3 relative grid grid-cols-3 items-center h-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out py-8";
  const blendedInnerClasses = "bg-transparent";
  const scrolledInnerClasses =
    "rounded-full shadow-2xl shadow-indigo-500/10 bg-gray-900/90 backdrop-blur-md border border-gray-700";

  const NavLinks: React.FC<{ links: NavLink[] }> = ({ links }) => (
    <div className="hidden lg:flex space-x-10">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          className="text-sm font-medium transition duration-200"
          style={{ color: brandColor }}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );

  return (
    <header className={baseHeaderClasses}>
      
      <div
        className={`
          ${commonInnerClasses}
          ${scrolled ? scrolledInnerClasses : blendedInnerClasses}
        `}
      >
        {/* LEFT LINKS */}
        <div className="justify-self-start">
          <NavLinks links={navLinks.left} />
        </div>

        {/* CENTER LOGO */}
        <div
          className="justify-self-center font-bold text-2xl tracking-wider cursor-pointer transition duration-300"
          style={{ color: "#FFFFFF" }}
        >
          <Link to="/">TAJJJR</Link>
        </div>

        {/* RIGHT LINKS */}
        <div className="justify-self-end">
          <NavLinks links={navLinks.right} />
        </div>

        {/* MOBILE MENU BUTTON - Positioned absolutely on mobile */}
        <button
          className="lg:hidden absolute right-4 sm:right-6 p-2 transition"
          style={{
            background: "transparent",
            border: "none",
            color: brandColor,
            fontSize: "1.75rem",
            lineHeight: 1,
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-screen bg-gray-900/95 backdrop-blur-sm p-8 flex flex-col items-center justify-center">
          {/* CLOSE ICON */}
          <button
            className="absolute top-6 right-6 p-2"
            style={{
              background: "transparent",
              border: "none",
              color: brandColor,
              fontSize: "2.25rem",
              lineHeight: 1,
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            ✕
          </button>

          <div className="space-y-6 text-center">
            {[...navLinks.left, ...navLinks.right].map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-3xl font-bold transition"
                style={{ color: brandColor }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
