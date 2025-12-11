import React from 'react';
import EventPill from '../components/EventPill';
import { CheckCircle } from 'lucide-react';

interface ConfirmationProps {
  onNavigate: (page: any) => void;
  onTrack: (name: string, payload?: any) => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onNavigate, onTrack }) => {
  return (
    <div className="animate-in zoom-in duration-300 text-center py-20">
      <div className="flex justify-center mb-6">
        <CheckCircle size={80} className="text-success" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-xl text-gray-600 mb-8">Thank you for your purchase.</p>
      <p className="font-mono text-gray-500 mb-10 bg-gray-100 inline-block px-4 py-2 rounded">Order ID: #{Math.floor(Math.random() * 100000)}</p>

      <div className="flex justify-center gap-4">
         <button 
            onClick={() => onNavigate('home')}
            className="btn bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300"
        >
            Back to Home
        </button>
        <EventPill eventName="purchase" onClick={() => onTrack('purchase', { transaction_id: `ORD-${Date.now()}`, currency: "USD", value: 299.99, items: [] })} className="bg-success" />
      </div>
    </div>
  );
};

export default Confirmation;