import React, { useState, useEffect } from "react";

const AnimatedCheck: React.FC = () => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Trigger a re-render every 30 seconds to restart the animation
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      key={animationKey}
      className="relative w-32 h-32 flex items-center justify-center mb-6"
    >
      <svg
        className="w-full h-full text-[var(--accent)] drop-shadow-[0_0_10px_rgba(207,255,36,0.3)]"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle Path */}
        <circle
          cx="26"
          cy="26"
          r="24" // Circumference approx 150
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={100}
          className="animate-draw-circle"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            transformOrigin: "center",
            transform: "rotate(-90deg)", // Start drawing from top
          }}
        />

        {/* Checkmark Path */}
        <path
          d="M16 26 L24 34 L36 20" // Path length approx 30-40
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={40}
          className="animate-draw-check"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: 40,
          }}
        />
      </svg>

      {/* Optional: Glow pulsing effect behind the tick */}
      <div className="absolute inset-0 bg-[var(--accent)] rounded-full opacity-0 animate-[ping_2s_ease-out_1s_infinite] scale-75 blur-xl pointer-events-none" />
    </div>
  );
};

export default AnimatedCheck;
