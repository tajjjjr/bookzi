import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  label: string;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  label,
  icon = true,
  className = "",
  ...props
}) => {
  const baseStyles =
    "group relative flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ease-out";

  const variants = {
    primary:
      "bg-[#CFFF24] text-black hover:bg-accent-dark hover:shadow-[0_0_20px_rgba(207,255,36,0.4)]",
    secondary:
      "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm",
  };

  const iconStyles =
    "ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {label}
      {icon && (
        <span
          className={
            variant === "primary"
              ? "bg-black/10 rounded-full p-0.5 ml-2"
              : "ml-1"
          }
        >
          <ArrowUpRight
            className={
              variant === "primary"
                ? "w-4 h-4 text-black"
                : "w-4 h-4 text-white"
            }
          />
        </span>
      )}
    </button>
  );
};