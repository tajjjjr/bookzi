import React from "react";
import { Twitter, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-dark-bg overflow-hidden pt-20 pb-10">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-0">
        {/* Call to Action Section (Replacing Email Form) */}
        {/* <div className="flex flex-col items-center justify-center text-center mb-32 space-y-8">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white drop-shadow-2xl">
            Let's Connect with <br />
            <span className="text-[#CFFF24]">TAJJJR</span>
          </h2>

          <div className="relative group">
            <div className="absolute -inset-1 bg-neon-lime rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <a href="#contact" className="inline-block">
              <Button variant="primary" label="Get in Touch" />
            </a>
          </div>
        </div> */}

        {/* Footer Links & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-10 border-t border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-bold text-[#CFFF24] tracking-wide">
              TAJJJR
            </h3>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Join us as we shape the future of software.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <FooterLink href="contact">Contact Us</FooterLink>
              <FooterLink href="#">Our Story</FooterLink>
            </div>
            <div className="space-y-4">
              <FooterLink href="#">Risk Policy</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </div>
            <div className="space-y-4">
              <FooterLink href="#">Disclaimer</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <div>All Copyright @TAJJJR</div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <SocialLink href="#">
              <Twitter className="w-4 h-4" />
            </SocialLink>
            <SocialLink href="#">
              <Linkedin className="w-4 h-4" />
            </SocialLink>
            <SocialLink href="#">
              <Facebook className="w-4 h-4" />
            </SocialLink>
            <SocialLink href="#">
              <Instagram className="w-4 h-4" />
            </SocialLink>
            <SocialLink href="#">
              <Youtube className="w-4 h-4" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="block text-xs uppercase tracking-wider text-gray-400 hover:text-[#CFFF24] transition-colors duration-200 font-medium"
  >
    {children}
  </a>
);

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="text-white hover:text-[#CFFF24] transition-colors duration-200 transform hover:scale-110"
  >
    {children}
  </a>
);
