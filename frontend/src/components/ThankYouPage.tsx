import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedCheck from "./AnimatedCheck";
import { updateMeta } from "../lib/set_metadata";
import { Button } from "./Button";

const ThankYouPage: React.FC = () => {
  // Set page metadata
  React.useEffect(() => {
    document.title = "Thank You for Your Purchase!";

    updateMeta(
      "description",
      "Thank you for your purchase! Your eBook is on the way. Check your email for the download link and receipt."
    );
    updateMeta("og:title", "TAJJJR eBooks - Thank You");
  }, []);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow to match theme depth */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <AnimatedCheck />

        {/* Heading */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="text-[var(--accent)] block mb-2 md:inline md:mb-0 md:mr-3">
            Thank You!
          </span>
          <span className="text-white">Your eBook is on the Way.</span>
        </h1>

        {/* Explanatory Text */}
        <p
          className="mt-6 text-[#9CA3AF] text-lg md:text-xl max-w-lg leading-relaxed animate-fade-up"
          style={{ animationDelay: "1.4s" }}
        >
          We've successfully processed your order. Please check your inbox for
          an email containing your download link and purchase receipt.
        </p>

        {/* Divider / Visual Separator */}
        <div
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#9CA3AF]/30 to-transparent my-10 animate-fade-up"
          style={{ animationDelay: "1.6s" }}
        />

        {/* Action Button */}

        <Button
          variant="primary"
          label="Continue Shopping"
          onClick={handleContinueShopping}
          className="animate-fade-up"
          style={{ animationDelay: "1.8s" }}
        />

        {/* Footer Note */}
        <p
          className="mt-12 text-sm text-[#9CA3AF]/50 animate-fade-up"
          style={{ animationDelay: "2.0s" }}
        >
          Questions? Contact{" "}
          <a
            href="mailto:support@tajjjr.com"
            className="hover:text-[var(--accent)] transition-colors underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)]"
          >
            support@tajjjr.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
