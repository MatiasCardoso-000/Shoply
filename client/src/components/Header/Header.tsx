import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Store</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">Home</Link></li>
       
            <li><Link to="/about" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">About</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">Contact</Link></li>
            <li>
              <Link to="/cart" className="text-gray-600 hover:text-rose-500 transition-colors duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="ml-1">Cart</span>
              </Link>
            </li>
            <li className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-rose-500 transition-colors duration-300">
                <FaUser size={24} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-gray-800">{user?.username}</div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Ingresar
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;