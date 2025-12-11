import React, { useState } from 'react';
import EventPill from '../components/EventPill';
import { Mail, Facebook, Instagram, Youtube, Phone } from 'lucide-react';

interface Props {
  onTrack: (name: string, payload?: any) => void;
}

const ContactUs: React.FC<Props> = ({ onTrack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrack('contact_form_submit', { subject: 'General Inquiry' });
    setSubmitted(true);
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600">We'd love to hear from you. Please fill out the form below or reach out via social media.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {submitted ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">We have received your message and will get back to you shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-primary hover:underline">Send another message</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input required type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Your Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input required type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea required rows={4} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="How can we help?"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                         <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg transition-transform active:scale-95">
                            Send Message
                        </button>
                        <EventPill eventName="contact_form_submit" onClick={() => onTrack('contact_form_submit')} />
                    </div>
                </form>
            )}
        </div>

        {/* Social & Info */}
        <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:text-blue-600 transition-colors">
                        <Facebook size={20} /> Facebook
                    </button>
                    <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:text-pink-600 transition-colors">
                        <Instagram size={20} /> Instagram
                    </button>
                    <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:text-red-600 transition-colors">
                        <Youtube size={20} /> YouTube
                    </button>
                    <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:text-green-600 transition-colors">
                        <Phone size={20} /> WhatsApp
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                 <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Support</h3>
                 <p className="text-gray-600 mb-2">Available Mon-Fri, 9am - 5pm EST</p>
                 <p className="font-bold text-primary text-xl">support@trackfast.demo</p>
                 <p className="font-bold text-primary text-xl">+1 (555) 123-4567</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;