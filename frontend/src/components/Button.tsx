import React from "react";
// Import any icon you use, e.g., for demonstration or if you decide to keep a default
// import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  label: string;
  icon?: React.FC<React.ComponentProps<"svg">>;
  // New prop to determine icon position
  iconPlacement?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  label,
  icon: Icon,
  // Set default to 'right'
  iconPlacement = "right",
  className = "",
  ...props
}) => {
  const baseStyles =
    // The group class is crucial for detecting hover on the button and applying transforms to the children (icon)
    "group relative flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ease-out";

  const variants = {
    primary:
      // UPDATED: Increased shadow for a more prominent glow
      "bg-[#CFFF24] text-black hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(207,255,36,0.6)] hover:cursor-pointer",
    secondary:
      "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 hover:cursor-pointer backdrop-blur-sm",
  };

  // New style for the icon wrapper to handle the 360 rotation
  const iconWrapperStyles =
    "transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]";

  // Function to render the icon wrapper, handling the specific spacing for each variant and placement
  const renderIcon = () => {
    if (!Icon) return null;

    // Apply conditional margin based on variant and placement
    const marginClass =
      variant === "primary"
        ? (iconPlacement === "right" ? "ml-2" : "mr-2")
        : (iconPlacement === "right" ? "ml-1" : "mr-1");
        
    const primaryBgClass = variant === "primary" ? "bg-black/10 rounded-full p-0.5" : "";
    
    return (
      <span
        className={`${primaryBgClass} ${marginClass} ${iconWrapperStyles}`}
      >
        <Icon
          className={
            variant === "primary"
              ? "w-4 h-4 text-black"
              : "w-4 h-4 text-white"
          }
        />
      </span>
    );
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* 1. Render Icon on the left if placement is 'left' */}
      {iconPlacement === "left" && renderIcon()}
      
      {/* 2. Render the label */}
      {label}
      
      {/* 3. Render Icon on the right (default) if placement is 'right' */}
      {iconPlacement === "right" && renderIcon()}
    </button>
  );
};