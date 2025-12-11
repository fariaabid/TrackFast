import React from 'react';
import { Gauge, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate?: (page: PageView) => void;
  onTrack?: (name: string, payload?: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onTrack }) => {
  const handleLinkClick = (e: React.MouseEvent, page: PageView | null, label: string) => {
    e.preventDefault();
    if (onTrack) {
      onTrack('footer_click', { link_text: label, section: 'Footer' });
    }
    if (onNavigate && page) {
      onNavigate(page);
    }
  };

  const handleSocialClick = (network: string) => {
    if (onTrack) {
      onTrack('link_click', { link_url: `https://${network}.com`, link_text: network, section: 'Footer Social' });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold text-primary">
              <Gauge size={24} />
              TrackFast
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The world's most advanced analytics simulation platform for e-commerce developers and marketers. Master your event tracking implementation.
            </p>
            <div className="flex gap-4 text-gray-400">
              <Facebook size={20} onClick={() => handleSocialClick('facebook')} className="hover:text-primary cursor-pointer transition-colors" />
              <Twitter size={20} onClick={() => handleSocialClick('twitter')} className="hover:text-primary cursor-pointer transition-colors" />
              <Instagram size={20} onClick={() => handleSocialClick('instagram')} className="hover:text-primary cursor-pointer transition-colors" />
              <Linkedin size={20} onClick={() => handleSocialClick('linkedin')} className="hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li onClick={(e) => handleLinkClick(e, 'plp', 'All Products')} className="hover:text-primary cursor-pointer transition-colors">All Products</li>
              <li onClick={(e) => handleLinkClick(e, 'plp', 'Electronics')} className="hover:text-primary cursor-pointer transition-colors">Electronics</li>
              <li onClick={(e) => handleLinkClick(e, 'plp', 'Fashion')} className="hover:text-primary cursor-pointer transition-colors">Fashion</li>
              <li onClick={(e) => handleLinkClick(e, 'plp', 'Home & Kitchen')} className="hover:text-primary cursor-pointer transition-colors">Home & Kitchen</li>
              <li onClick={(e) => handleLinkClick(e, 'plp', 'Beauty')} className="hover:text-primary cursor-pointer transition-colors">Beauty</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li onClick={(e) => handleLinkClick(e, 'docs', 'Documentation')} className="hover:text-primary cursor-pointer transition-colors">Documentation</li>
              <li onClick={(e) => handleLinkClick(e, 'shipping', 'Shipping & Returns')} className="hover:text-primary cursor-pointer transition-colors">Shipping & Returns</li>
              <li onClick={(e) => handleLinkClick(e, 'login', 'Order Status')} className="hover:text-primary cursor-pointer transition-colors">Order Status</li>
              <li onClick={(e) => handleLinkClick(e, 'contact', 'Contact Us')} className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
              <li onClick={(e) => handleLinkClick(e, 'newsletter', 'Newsletter')} className="hover:text-primary cursor-pointer transition-colors">Newsletter</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">
              Subscribe to our newsletter for the latest analytics tips and product updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 outline-none"
              />
              <button 
                onClick={() => onTrack && onTrack('newsletter_signup', { location: 'footer' })}
                className="bg-primary hover:bg-primary-hover text-white p-2.5 rounded-lg transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2024 TrackFast Analytics Demo. All rights reserved.</p>
          <div className="flex gap-6">
            <span onClick={(e) => handleLinkClick(e, 'privacy', 'Privacy Policy')} className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            <span onClick={(e) => handleLinkClick(e, 'terms', 'Terms of Service')} className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
            <span onClick={(e) => handleLinkClick(e, 'cookies', 'Cookie Policy')} className="hover:text-gray-600 cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;