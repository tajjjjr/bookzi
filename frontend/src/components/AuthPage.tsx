import React, { useState, useEffect } from "react";
import { updateMeta } from "../lib/set_metadata";
import { Button } from "./Button";
import {
  GoogleIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  UploadIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "./AuthIcons";

// --- Types ---
type AuthMode = "login" | "register";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

// --- Carousel Component ---
const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Master Modern Architectures",
      subtitle:
        "Comprehensive guides on Microservices, K8s, and Cloud Native patterns.",
      image: "https://picsum.photos/seed/arch/800/1200",
    },
    {
      id: 2,
      title: "Scale Your Agency",
      subtitle:
        "Playbooks and strategies used by top-tier dev shops to 10x revenue.",
      image: "https://picsum.photos/seed/growth/800/1200",
    },
    {
      id: 3,
      title: "Deep Dive Case Studies",
      subtitle:
        "Real-world post-mortems and success stories from the TAJJJR archives.",
      image: "https://picsum.photos/seed/code/800/1200",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(#121212)]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image with overlay */}
          <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity"
          />

          {/* Content */}
          <div className="absolute bottom-20 left-12 right-12 z-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {slide.title}
            </h2>
            <p className="text-lg text-gray-300 max-w-md">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[var(--accent)] w-8"
                : "bg-gray-500 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Input Field Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputProps> = ({
  label,
  icon,
  className,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
          {icon}
        </div>
        <input
          className="w-full bg-[#0F0F0F] text-white border border-[#2A2A2A] rounded-xl py-3 pl-12 pr-4 text-sm 
                     focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/50 
                     placeholder-gray-600 transition-all duration-200 hover:border-gray-700"
          {...props}
        />
      </div>
    </div>
  );
};

// --- Main Auth Page Component ---
const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  // Update metadata on mount
  useEffect(() => {
    const capitalized = mode === "login" ? "Login" : "Register";
    document.title = `${capitalized}`;

    updateMeta(
      "description",
      mode === "login"
        ? "Login to your TAJJJR account to access premium developer ebooks."
        : "Create your TAJJJR account to access premium developer ebooks."
    );

    updateMeta("og:title", `TAJJJR – ${capitalized}`);
  }, [mode]);

  // Trigger animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleMode = () => {
    setAnimate(false);
    setTimeout(() => {
      setMode(mode === "login" ? "register" : "login");
      setRegisterStep(1); // Reset registration step
      setAnimate(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* Left Panel - Scrollable Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col bg-[var(--background)] relative overflow-y-auto h-screen scrollbar-hide">
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
          {/* Header Animation Wrapper - Constrained Width */}
          <div
            className={`w-full max-w-[400px] transition-all duration-500 ease-out transform ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Dynamic Title */}
            {mode === "login" ? (
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                Customer <span className="text-[var(--accent)]">Login</span>.
              </h1>
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                Customer{" "}
                <span className="text-[var(--accent)]">Registration</span>.
              </h1>
            )}

            <p className="text-gray-400 mb-8 text-sm">
              {mode === "login"
                ? "Hey, enter your details to sign into your account"
                : "Join the agency community and access premium resources"}
            </p>

            {/* Google Auth Button - Width constrained by parent */}
            <button className="w-full bg-transparent border border-gray-700 hover:border-gray-500 hover:bg-[#111] text-white rounded-full py-3 px-4 flex items-center justify-center gap-3 transition-all duration-200 group mb-6">
              <GoogleIcon className="w-5 h-5" />
              <span className="font-medium text-sm">Sign in with Google</span>
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#222]"></div>
              </div>
              <div className="relative bg-[var(--background)] px-4 text-xs text-gray-500 uppercase tracking-wider">
                or {mode === "login" ? "sign in" : "sign up"} with Email
              </div>
            </div>

            {/* Forms */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {mode === "login" ? (
                // --- Login Form ---
                <>
                  <InputField
                    type="email"
                    placeholder="Enter your email"
                    icon={<MailIcon className="w-5 h-5" />}
                  />
                  <InputField
                    type="password"
                    placeholder="Enter your password"
                    icon={<LockIcon className="w-5 h-5" />}
                  />

                  <div className="flex items-center justify-between text-xs mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-700 bg-[#1A1A1A] text-[var(--accent)] focus:ring-[var(--accent)]"
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="text-[var(--accent)] hover:underline decoration-[var(--accent)]/50 underline-offset-4 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <Button variant="primary" label="Login" className="w-full" />
                </>
              ) : (
                // --- Registration Form (Paginated) ---
                <div className="space-y-4">
                  {registerStep === 1 ? (
                    /* Step 1: Personal Details */
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          placeholder="First Name"
                          icon={<UserIcon className="w-5 h-5" />}
                        />
                        <InputField
                          placeholder="Last Name"
                          icon={<UserIcon className="w-5 h-5" />}
                        />
                      </div>

                      <InputField
                        type="email"
                        placeholder="Email Address"
                        icon={<MailIcon className="w-5 h-5" />}
                      />

                      <InputField
                        type="tel"
                        placeholder="Phone Number"
                        icon={<PhoneIcon className="w-5 h-5" />}
                      />

                      {/* Step 1 Button */}
                      <button
                        onClick={() => setRegisterStep(2)}
                        className="w-full bg-[var(--accent)] hover:bg-[#bce620] text-black text-sm py-3.5 rounded-full shadow-[0_0_20px_rgba(207,255,36,0.3)] hover:shadow-[0_0_30px_rgba(207,255,36,0.5)] transition-all duration-300 mt-6 flex items-center justify-center gap-2 group"
                      >
                        Next
                        <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  ) : (
                    /* Step 2: Address & Image */
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          placeholder="City"
                          icon={<MapPinIcon className="w-5 h-5" />}
                        />
                        <InputField
                          placeholder="Country"
                          icon={<MapPinIcon className="w-5 h-5" />}
                        />
                      </div>

                      <InputField
                        placeholder="Zip Code"
                        icon={<MapPinIcon className="w-5 h-5" />}
                      />

                      {/* Image Upload Field */}
                      <div className="w-full">
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                          Profile Picture (Optional)
                        </label>
                        <div className="relative border border-dashed border-gray-700 bg-[#0F0F0F] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--accent)] hover:bg-[#151515] transition-all group">
                          <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                          />
                          <div className="p-2 bg-[#1A1A1A] rounded-full text-gray-400 group-hover:text-[var(--accent)] group-hover:bg-[#222] transition-colors mb-2">
                            <UploadIcon className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-gray-300 font-medium">
                            Click to upload image
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => setRegisterStep(1)}
                          className="w-1/3 bg-[#1A1A1A] hover:bg-[#252525] text-white font-bold text-sm py-3.5 rounded-full border border-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        </button>
                        <Button
                          variant="primary"
                          label="Create Account"
                          className="w-full"
                          onClick={() => setRegisterStep(2)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Toggle CTA */}
            <div className="mt-8 text-center text-sm text-gray-400">
              {mode === "login"
                ? "Not registered yet?"
                : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-white font-medium hover:text-[var(--accent)] transition-colors underline decoration-transparent hover:decoration-[var(--accent)] underline-offset-4"
              >
                {mode === "login" ? "Create an account" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration/Carousel Area */}
      <div className="hidden lg:flex w-1/2 relative bg-[var(#121212)]">
        {/* Vertical Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#CFFF24] via-[#7DA105] to-[#0a2e0a] opacity-30 z-0"></div> */}

        {/* Book Illustrations / Carousel Container */}
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="flex-1 w-full h-full">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
