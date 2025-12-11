import React from 'react';
import EventPill from '../components/EventPill';

interface CheckoutPaymentProps {
  onTrack: (name: string, payload?: any) => void;
  onNavigate: (page: any) => void;
}

const CheckoutPayment: React.FC<CheckoutPaymentProps> = ({ onTrack, onNavigate }) => {

  return (
    <div className="animate-in fade-in duration-300 max-w-2xl mx-auto">
      <div className="flex justify-between mb-8 text-sm font-semibold text-gray-400">
        <span className="text-success border-b-2 border-success pb-2 px-2 cursor-pointer" onClick={() => onNavigate('checkout-shipping')}>Shipping</span>
        <span className="text-primary border-b-2 border-primary pb-2 px-2">Payment</span>
        <span className="pb-2 px-2">Confirmation</span>
      </div>

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Payment Information
        <EventPill eventName="add_payment_info" onClick={() => onTrack('add_payment_info', { payment_type: 'Credit Card', currency: "USD" })} />
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-500 mb-4">
            This is a demo. No real payment is processed.
        </div>

        <input 
            type="text" 
            placeholder="Card Number" 
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            onFocus={() => onTrack('form_start', { form_name: 'payment', field_name: 'card' })}
        />
        <div className="grid grid-cols-2 gap-4">
             <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
             <input type="text" placeholder="CVV" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
        </div>

        <div className="pt-4 flex flex-col gap-2">
             <button 
                onClick={() => {
                    onTrack('add_payment_info', { payment_type: 'Credit Card', currency: "USD" });
                    // Simulate order
                    const transactionId = `ORD-${Date.now()}`;
                    onTrack('purchase', { 
                        transaction_id: transactionId, 
                        currency: "USD", 
                        value: 299.99, // Dummy value
                        tax: 0,
                        shipping: 0,
                        items: [] // Dummy items
                    });
                    onNavigate('confirmation');
                }}
                className="w-full bg-success text-white py-3 rounded-lg font-bold hover:bg-green-600 shadow-lg mt-4 transition-all"
            >
                Pay & Place Order
            </button>
            <div className="flex justify-center">
                <EventPill eventName="purchase" onClick={() => onTrack('purchase', { transaction_id: `ORD-${Date.now()}`, currency: "USD", value: 0, items: [] })} className="bg-success hover:bg-green-600" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;