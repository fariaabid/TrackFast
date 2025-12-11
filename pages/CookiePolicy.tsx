import React from 'react';
import EventPill from '../components/EventPill';
import { Cookie } from 'lucide-react';

interface Props {
  onTrack: (name: string, payload?: any) => void;
}

const CookiePolicy: React.FC<Props> = ({ onTrack }) => {
  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Cookie className="text-primary" /> Cookie Policy
        </h1>
        <EventPill eventName="page_view" onClick={() => onTrack('page_view', { page_title: 'Cookie Policy' })} />
      </div>

      <div className="prose prose-lg text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. What Are Cookies</h2>
        <p className="mb-4">
          As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Cookies</h2>
        <p className="mb-4">
          We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Third Party Cookies</h2>
        <p className="mb-4">
          In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Google Analytics: We use this to understand how you use the site and ways that we can improve your experience.</li>
            <li>Advertising Partners: To deliver relevant ads to you.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Disabling Cookies</h2>
        <p className="mb-4">
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
        </p>
      </div>
    </div>
  );
};

export default CookiePolicy;