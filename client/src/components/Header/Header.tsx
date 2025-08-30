
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Store</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">Home</Link></li>
            <li><Link to="/shop" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">Shop</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">About</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
