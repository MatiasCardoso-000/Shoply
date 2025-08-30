
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><a href="#" className="hover:text-rose-500 transition-colors duration-300">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-rose-500 transition-colors duration-300">Shipping & Returns</a></li>
              <li className="mb-2"><a href="#" className="hover:text-rose-500 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors duration-300">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors duration-300">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors duration-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} My Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
