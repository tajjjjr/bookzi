import {
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import React from "react";

type Direction =
  | "up-right"
  | "up-left"
  | "down-right"
  | "down-left"
  | "up"
  | "down"
  | "left"
  | "right";

interface ShinyButtonProps {
  label: string;
  direction?: Direction;
  onClick?: () => void;
  className?: string;
}

export const ActiveSquareButton: React.FC<ShinyButtonProps> = ({
  label,
  direction = "up-right",
  onClick,
  className = "",
}) => {
  const Icon = {
    "up-right": ArrowUpRight,
    "up-left": ArrowUpLeft,
    "down-right": ArrowDownRight,
    "down-left": ArrowDownLeft,
    "up": ArrowUp,
    "down": ArrowDown,
    "left": ArrowLeft,
    "right": ArrowRight,
  }[direction];

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-[#CFFF24] text-black px-8 py-4 
        text-sm font-bold uppercase tracking-wider 
        flex items-center group transition-transform
        ${className}
      `}
    >
      {/* The Glass Reflection Effect Container 
        - Using 'skew-x-12' keeps the top/bottom edges of the streaks horizontal (parallelogram).
        - We adjust the width and left position to ensure the streaks sweep completely across.
      */}
      <span
        className="
          pointer-events-none absolute inset-0 
          
          /* First, thinner streak (the 'before' element) */
          before:content-[''] before:absolute 
          before:top-0 before:left-[-150%] before:w-[40%] before:h-full 
          before:bg-white/70 before:skew-x-[-20deg] /* Skew X for parallelogram shape */
          before:transition-transform before:duration-500
          group-hover:before:translate-x-[450%] /* Large translation to sweep across */
          
          /* Second, wider streak (the 'after' element) */
          after:content-[''] after:absolute 
          after:top-0 after:left-[-200%] after:w-[60%] after:h-full /* Wider streak (60% vs 40%) */
          after:bg-white/70 after:skew-x-[-20deg] /* Skew X for parallelogram shape */
          after:transition-transform after:duration-500 after:delay-100
          group-hover:after:translate-x-[450%] /* Large translation to sweep across */
        "
      />

      {/* Label + Icon */}
      <span className="relative z-10 flex items-center">
        {label}
        <Icon
          className="
            ml-2 w-4 h-4 transition-transform duration-500
            group-hover:rotate-[360deg]
          "
        />
      </span>
    </button>
  );
};
