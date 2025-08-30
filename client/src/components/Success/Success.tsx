
import React from 'react';
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <svg
          className="w-16 h-16 mx-auto text-green-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
        <Link
          to="/"
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
