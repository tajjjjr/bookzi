import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginCustomer } from "../hooks/auth/use_login_customer";
import { useRegisterCustomer } from "../hooks/auth/use_register_customer";
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
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  // Toggle between 'text' and 'password' if it's a password field
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {/* Left Icon (Custom Icon) */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
          {icon}
        </div>

        <input
          {...props}
          type={inputType}
          className={`w-full bg-[#0F0F0F] text-white border border-[#2A2A2A] rounded-xl py-3 pl-12 text-sm 
                     focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/50 
                     placeholder-gray-600 transition-all duration-200 hover:border-gray-700
                     ${isPassword ? "pr-12" : "pr-4"}`}
        />

        {/* Right Icon (Password Toggle) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff size={18} color="#CFFF24" strokeWidth={2} />
            ) : (
              <Eye size={18} strokeWidth={2} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Auth Page Component ---
const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [animate, setAnimate] = useState(false);
  const {
    login,
    isLoading: isLoginLoading,
    error: loginError,
  } = useLoginCustomer();

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

  const {
    register,
    isLoading: isRegisterLoading,
    error: registerError,
  } = useRegisterCustomer();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const handleRegisterSubmit = async () => {
    // 1. Client-side Check: Password Match
    if (formData.password !== formData.confirmPassword) {
      // You can use a local state 'setError' or use the hook's error mechanism if accessible
      alert("Passwords do not match!");
      return;
    }

    // 2. Client-side Check: Basic Strength
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // 3. Call the Hook
    const result = await register(formData);
    if (result) {
      window.location.href = "/shop";
    }
  };

  // Function to handle login form submission
  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result) {
      // Redirect to home or dashboard on success
      window.location.href = "/shop";
    }
  };

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
                  {/* Display Error Message if login fails */}
                  {loginError && (
                    <div className="text-red-500 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-in fade-in zoom-in duration-200">
                      {loginError}
                    </div>
                  )}

                  <InputField
                    type="email"
                    placeholder="Enter your email"
                    icon={<MailIcon className="w-5 h-5" />}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <InputField
                    type="password"
                    placeholder="Enter your password"
                    icon={<LockIcon className="w-5 h-5" />}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />

                  <div className="flex items-center justify-between text-xs mt-2">
                    {/* ... keep your Remember me / Forgot password code ... */}
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    label={isLoginLoading ? "Authenticating..." : "Login"}
                    className="w-full"
                    onClick={handleLoginSubmit}
                    disabled={isLoginLoading}
                  />
                </>
              ) : (
                // --- Registration Form (Paginated) ---
                <>
                  {/* Display Error Message if login fails */}
                  {registerError && (
                    <div className="text-red-500 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-in fade-in zoom-in duration-200">
                      {registerError}
                    </div>
                  )}
                  <div className="space-y-4">
                    {registerStep === 1 ? (
                      /* Step 1: Personal Details */
                      <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            placeholder="First name"
                            icon={<UserIcon className="w-5 h-5" />}
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstName: e.target.value,
                              })
                            }
                          />
                          <InputField
                            placeholder="Last name"
                            icon={<UserIcon className="w-5 h-5" />}
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>

                        <InputField
                          type="email"
                          placeholder="Email address"
                          icon={<MailIcon className="w-5 h-5" />}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            type="password"
                            placeholder="Enter password"
                            icon={<LockIcon className="w-5 h-5" />}
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                          />
                          <InputField
                            type="password"
                            placeholder="Confirm password"
                            icon={<LockIcon className="w-5 h-5" />}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                          />
                        </div>

                        <InputField
                          type="tel"
                          placeholder="Phone number"
                          icon={<PhoneIcon className="w-5 h-5" />}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />

                        {/* Step 1 Button */}
                        <Button
                          variant="primary"
                          label="Next"
                          icon={ArrowRightIcon}
                          className="w-full"
                          onClick={() => setRegisterStep(2)}
                        />
                      </div>
                    ) : (
                      /* Step 2: Address & Image */
                      <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            placeholder="City"
                            icon={<MapPinIcon className="w-5 h-5" />}
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                          />
                          <InputField
                            placeholder="Country"
                            icon={<MapPinIcon className="w-5 h-5" />}
                            value={formData.country}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                country: e.target.value,
                              })
                            }
                          />
                        </div>

                        <InputField
                          placeholder="Zip Code"
                          icon={<MapPinIcon className="w-5 h-5" />}
                          value={formData.zipCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              zipCode: e.target.value,
                            })
                          }
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
                          <Button
                            variant="secondary"
                            label=""
                            icon={ArrowLeftIcon}
                            iconPlacement="left"
                            onClick={() => setRegisterStep(1)}
                          />
                          <Button
                            variant="primary"
                            label={
                              isRegisterLoading
                                ? "Creating Account..."
                                : "Create Account"
                            }
                            className="w-full"
                            onClick={handleRegisterSubmit}
                            disabled={isRegisterLoading}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
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
