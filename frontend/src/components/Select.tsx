
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children?: React.ReactNode;
}

export const Select = ({ label, children, className = "", ...props }: SelectProps) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <div className="relative">
      <select 
        className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg appearance-none focus:outline-none focus:border-[#CFFF24] focus:ring-1 focus:ring-[#CFFF24] transition-all"
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  </div>
);
