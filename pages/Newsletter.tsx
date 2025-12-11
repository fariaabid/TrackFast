import React, { useState } from 'react';
import EventPill from '../components/EventPill';
import { Mail, CheckCircle } from 'lucide-react';

interface Props {
  onTrack: (name: string, payload?: any) => void;
}

const Newsletter: React.FC<Props> = ({ onTrack }) => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    onTrack('newsletter_submitted', { location: 'newsletter_page' });
    setSubscribed(true);
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-2xl mx-auto py-16 text-center">
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 bg-blue-100 text-primary rounded-full flex items-center justify-center">
            <Mail size={40} />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h1>
      <p className="text-lg text-gray-600 mb-10">
        Stay updated with the latest trends, exclusive offers, and product launches. Join 10,000+ happy subscribers today!
      </p>

      {subscribed ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 animate-in zoom-in">
            <div className="flex justify-center mb-4 text-green-500">
                <CheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Thank you for Trackfast</h2>
            <p className="text-green-700">You have successfully subscribed to our newsletter.</p>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative">
            <div className="flex flex-col gap-4">
                <input 
                    required 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
                />
                <button 
                    type="submit" 
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-hover shadow-xl transition-transform active:scale-95"
                >
                    Subscribe Now
                </button>
            </div>
            <div className="mt-6 flex justify-center">
                <EventPill eventName="newsletter_submitted" onClick={() => onTrack('newsletter_submitted')} />
            </div>
        </form>
      )}

      <div className="mt-12 text-sm text-gray-500">
        We care about your data in our <a href="#" className="underline hover:text-gray-800">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default Newsletter;