
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
