import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, placeholder, type = "text", className = "", ...props }: InputProps) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#CFFF24] focus:ring-1 focus:ring-[#CFFF24] transition-all placeholder-gray-600"
      {...props}
    />
  </div>
);
