
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        {...props}
      />
    </div>
  );
};

export default Input;
