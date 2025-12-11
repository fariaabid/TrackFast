import React from 'react';
import EventPill from '../components/EventPill';

interface Props {
  onTrack: (name: string, payload?: any) => void;
}

const PrivacyPolicy: React.FC<Props> = ({ onTrack }) => {
  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <EventPill eventName="page_view" onClick={() => onTrack('page_view', { page_title: 'Privacy Policy' })} />
      </div>

      <div className="prose prose-lg text-gray-600">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Data Collection</h2>
        <p className="mb-4">
          We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Cookies and Web Beacons</h2>
        <p className="mb-4">
          Like many other websites, TrackFast uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Third-Party Services</h2>
        <p className="mb-4">
          We may employ third-party companies and individuals due to the following reasons:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services; or</li>
            <li>To assist us in analyzing how our Service is used.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. User Rights</h2>
        <p className="mb-4">
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          The right to access, rectification, erasure, restrict processing, object to processing, and data portability.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Contact Info</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us via our Contact Us page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;