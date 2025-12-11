import React from 'react';
import EventPill from '../components/EventPill';

interface CheckoutShippingProps {
  onTrack: (name: string, payload?: any) => void;
  onNavigate: (page: any) => void;
}

const CheckoutShipping: React.FC<CheckoutShippingProps> = ({ onTrack, onNavigate }) => {

  return (
    <div className="animate-in fade-in duration-300 max-w-2xl mx-auto">
      <div className="flex justify-between mb-8 text-sm font-semibold text-gray-400">
        <span className="text-primary border-b-2 border-primary pb-2 px-2">Shipping</span>
        <span className="pb-2 px-2">Payment</span>
        <span className="pb-2 px-2">Confirmation</span>
      </div>

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Shipping Information
        <EventPill eventName="add_shipping_info" onClick={() => onTrack('add_shipping_info', { shipping_tier: 'Standard', currency: "USD", value: 0 })} />
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            onFocus={() => onTrack('form_start', { form_name: 'shipping', field_name: 'email' })}
        />
        <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
        <input type="text" placeholder="Address" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
        <div className="grid grid-cols-2 gap-4">
             <input type="text" placeholder="City" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
             <input type="text" placeholder="Zip Code" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
        </div>

        <div className="pt-4">
             <h4 className="font-semibold mb-2">Shipping Method</h4>
             <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg mb-2 cursor-pointer hover:bg-gray-50">
                <input type="radio" name="shipping" defaultChecked />
                Standard (Free)
             </label>
             <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="shipping" />
                Express ($10)
             </label>
        </div>

        <button 
            onClick={() => {
                onTrack('add_shipping_info', { shipping_tier: 'Standard', currency: "USD", value: 0 }); // In a real app, value might be total or shipping cost
                onNavigate('checkout-payment');
            }}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover shadow-lg mt-4 transition-all"
        >
            Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutShipping;