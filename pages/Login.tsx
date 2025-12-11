import React from 'react';
import EventPill from '../components/EventPill';

interface LoginProps {
  onTrack: (name: string, payload?: any) => void;
  onNavigate: (page: any) => void;
}

const Login: React.FC<LoginProps> = ({ onTrack, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-300 max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center">Account Login</h1>
        
        <div className="space-y-4">
            <div>
                 <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
            </div>
            <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
            />
            
            <div className="flex items-center justify-between gap-4 pt-4">
                 <button 
                    onClick={() => {
                        onTrack('login_success', { method: 'email' });
                        onNavigate('home');
                    }}
                    className="flex-1 bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary-hover"
                >
                    Login
                </button>
                <EventPill eventName="login_success" onClick={() => onTrack('login_success')} />
            </div>

            <div className="flex items-center justify-between gap-4">
                 <button 
                    onClick={() => onTrack('login_error', { reason: 'invalid_credentials' })}
                    className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-200"
                >
                    Simulate Error
                </button>
                <EventPill eventName="login_error" onClick={() => onTrack('login_error')} className="bg-warning hover:bg-red-600" />
            </div>

            <div className="mt-6 text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm mb-2">Don't have an account?</p>
                <button 
                    onClick={() => onNavigate('register')}
                    className="text-primary font-bold hover:underline"
                >
                    Create Account
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;