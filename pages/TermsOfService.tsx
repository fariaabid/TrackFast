import React from 'react';
import EventPill from '../components/EventPill';

interface Props {
  onTrack: (name: string, payload?: any) => void;
}

const TermsOfService: React.FC<Props> = ({ onTrack }) => {
  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <EventPill eventName="page_view" onClick={() => onTrack('page_view', { page_title: 'Terms of Service' })} />
      </div>

      <div className="prose prose-lg text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Purchases & Payments</h2>
        <p className="mb-4">
          You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Refund Rules</h2>
        <p className="mb-4">
          All sales are final unless otherwise stated in our Refund Policy. If you are not completely satisfied with your purchase, you may contact us for a potential resolution, but we are under no obligation to provide a refund.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall TrackFast, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;