import React from 'react';
import EventPill from '../components/EventPill';
import { Truck, RotateCcw, PackageCheck } from 'lucide-react';

interface Props {
  onTrack: (name: string, payload?: any) => void;
}

const ShippingReturns: React.FC<Props> = ({ onTrack }) => {
  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">Shipping & Returns</h1>
        <EventPill eventName="page_view" onClick={() => onTrack('page_view', { page_title: 'Shipping & Returns' })} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <Truck className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-gray-600">We process all orders within 24 hours. Free standard shipping on orders over $50.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <RotateCcw className="text-green-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day money back guarantee. If you're not satisfied, we'll make it right.</p>
        </div>
      </div>

      <div className="prose prose-lg text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Processing Times</h2>
        <p className="mb-4">
          All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Delivery Zones</h2>
        <p className="mb-4">
          We currently ship to addresses within the U.S., U.S. Territories, and APO/FPO/DPO addresses. For international shipping, please contact support.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Return Eligibility</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your item must be unused and in the same condition that you received it.</li>
            <li>Your item must be in the original packaging.</li>
            <li>Your item needs to have the receipt or proof of purchase.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Refund Process</h2>
        <p className="mb-4">
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment).
        </p>
      </div>
    </div>
  );
};

export default ShippingReturns;