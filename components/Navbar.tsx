import React from 'react';
import { Gauge, ShoppingCart, Search, UserCircle } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, cartCount }) => {
  const navClass = (page: PageView) => 
    `text-sm font-medium transition-colors cursor-pointer ${
      currentPage === page || (page === 'checkout-shipping' && currentPage.startsWith('checkout')) 
        ? 'text-primary' 
        : 'text-gray-600 hover:text-primary'
    }`;

  return (
    <header className="sticky top-0 bg-white shadow-sm z-40 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 text-xl font-bold text-primary">
          <Gauge size={24} />
          TrackFast
        </a>
        
        <nav className="flex items-center gap-6">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className={navClass('home')}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('plp'); }} className={navClass('plp')}>Products</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('docs'); }} className={navClass('docs')}>Documentation</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className={navClass('login')}>Account</a>
        </nav>

        <div className="flex items-center gap-4 text-gray-500">
          <Search size={20} className="cursor-pointer hover:text-primary" />
          <UserCircle size={20} className="cursor-pointer hover:text-primary" />
          <div className="relative cursor-pointer hover:text-primary" onClick={() => onNavigate('cart')}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;