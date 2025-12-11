import React, { useState } from 'react';
import EventPill from '../components/EventPill';
import { Eye, EyeOff, Check, ChevronDown, ChevronUp, Facebook } from 'lucide-react';

interface RegisterProps {
  onTrack: (name: string, payload?: any) => void;
  onNavigate: (page: any) => void;
}

const Register: React.FC<RegisterProps> = ({ onTrack, onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false,
    address: {
        street: '',
        city: '',
        zip: '',
        country: 'US'
    }
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleFocus = (field: string) => {
    onTrack('input_field_focused', { field_name: field });
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    // Only fire event if score changes significantly or on blur (simplified here to change)
    if (score !== passwordStrength) {
        // Debounce or logic could be added here, but direct is fine for demo
        onTrack('password_strength_checked', { score, status: getStrengthLabel(score) });
    }
    setPasswordStrength(score);
  };

  const getStrengthLabel = (score: number) => {
      if (score <= 1) return 'Weak';
      if (score === 2) return 'Fair';
      if (score === 3) return 'Good';
      return 'Strong';
  };

  const getStrengthColor = (score: number) => {
      if (score <= 1) return 'bg-red-500';
      if (score === 2) return 'bg-yellow-500';
      if (score === 3) return 'bg-blue-500';
      return 'bg-success';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'password') calculateStrength(value);
    if (name === 'terms') {
        onTrack('terms_policy_checked', { checked });
    }

    if (name.startsWith('addr_')) {
        const field = name.replace('addr_', '');
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation check
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    if (passwordStrength < 2) {
        alert("Please choose a stronger password");
        return;
    }

    onTrack('create_account_clicked', { method: 'email' });
    // Simulate API call
    setTimeout(() => {
        onNavigate('home');
    }, 500);
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-xl mx-auto py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Create Account</h1>
        <p className="text-center text-gray-500 mb-8">Join TrackFast for exclusive tracking insights</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                 <input 
                    required
                    name="fullName"
                    type="text" 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    onFocus={() => handleFocus('fullName')}
                    onChange={handleChange}
                />
            </div>

            {/* Email */}
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                 <input 
                    required
                    name="email"
                    type="email" 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    onFocus={() => handleFocus('email')}
                    onChange={handleChange}
                />
            </div>

            {/* Password */}
            <div className="relative">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                 <div className="relative">
                    <input 
                        required
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-10"
                        placeholder="••••••••"
                        onFocus={() => handleFocus('password')}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-primary">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
                 
                 {/* Strength Meter */}
                 {formData.password && (
                     <div className="mt-2 animate-in slide-in-from-top-1">
                        <div className="flex gap-1 h-1.5 mb-1">
                            {[1,2,3,4].map(i => (
                                <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${passwordStrength >= i ? getStrengthColor(passwordStrength) : 'bg-gray-200'}`}></div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 text-right">{getStrengthLabel(passwordStrength)}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500">
                            <span className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-success' : ''}`}>
                                {formData.password.length >= 8 ? <Check size={12} /> : <span className="w-3 h-3 block rounded-full bg-gray-300"></span>} 8+ Characters
                            </span>
                             <span className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-success' : ''}`}>
                                {/[A-Z]/.test(formData.password) ? <Check size={12} /> : <span className="w-3 h-3 block rounded-full bg-gray-300"></span>} Uppercase
                            </span>
                             <span className={`flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-success' : ''}`}>
                                {/[0-9]/.test(formData.password) ? <Check size={12} /> : <span className="w-3 h-3 block rounded-full bg-gray-300"></span>} Number
                            </span>
                             <span className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-success' : ''}`}>
                                {/[^A-Za-z0-9]/.test(formData.password) ? <Check size={12} /> : <span className="w-3 h-3 block rounded-full bg-gray-300"></span>} Special Char
                            </span>
                        </div>
                     </div>
                 )}
            </div>

            {/* Confirm Password */}
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                 <div className="relative">
                    <input 
                        required
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-10 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'}`}
                        placeholder="••••••••"
                        onFocus={() => handleFocus('confirmPassword')}
                        onChange={handleChange}
                    />
                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-primary">
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                     <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                 )}
            </div>

            {/* Phone */}
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                 <input 
                    name="phone"
                    type="tel" 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                    onFocus={() => handleFocus('phone')}
                    onChange={handleChange}
                />
            </div>

            {/* Address Toggle */}
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                <button 
                    type="button" 
                    onClick={() => setShowAddress(!showAddress)}
                    className="flex justify-between items-center w-full text-left font-medium text-gray-700"
                >
                    <span>Address Details (Optional)</span>
                    {showAddress ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {showAddress && (
                    <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
                        <input 
                            name="addr_street"
                            type="text" 
                            placeholder="Street Address" 
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            onFocus={() => handleFocus('street')}
                            onChange={handleChange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                name="addr_city"
                                type="text" 
                                placeholder="City" 
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                onFocus={() => handleFocus('city')}
                                onChange={handleChange}
                            />
                            <input 
                                name="addr_zip"
                                type="text" 
                                placeholder="Postal Code" 
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                onFocus={() => handleFocus('zip')}
                                onChange={handleChange}
                            />
                        </div>
                        <select 
                            name="addr_country"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
                            onChange={handleChange}
                            onFocus={() => handleFocus('country')}
                        >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
                <input 
                    required 
                    name="terms"
                    type="checkbox" 
                    id="terms" 
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer" 
                    onChange={handleChange}
                />
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    I agree to the <button type="button" onClick={() => onNavigate('terms')} className="text-primary hover:underline">Terms of Service</button> and <button type="button" onClick={() => onNavigate('privacy')} className="text-primary hover:underline">Privacy Policy</button>.
                </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
                 <button 
                    type="submit" 
                    data-analytics-event="account_created"
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary-hover shadow-lg transition-transform active:scale-[0.99]"
                >
                    Create Account
                </button>
                <div className="flex justify-center mt-2">
                    <EventPill eventName="create_account_clicked" onClick={() => onTrack('create_account_clicked')} />
                </div>
            </div>
        </form>

        <div className="mt-8">
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or sign up with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <button 
                    type="button"
                    onClick={() => onTrack('google_signup_clicked', { method: 'google' })}
                    className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                </button>
                <button 
                    type="button"
                    onClick={() => onTrack('facebook_signup_clicked', { method: 'facebook' })}
                    className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
                >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    Facebook
                </button>
            </div>
            <div className="flex justify-center mt-2 gap-2">
                <EventPill eventName="google_signup..." onClick={() => onTrack('google_signup_clicked')} className="scale-90" />
                <EventPill eventName="facebook_sign..." onClick={() => onTrack('facebook_signup_clicked')} className="scale-90" />
            </div>
        </div>

        <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <button onClick={() => onNavigate('login')} className="font-bold text-primary hover:underline">
                Log in
            </button>
        </div>
      </div>
    </div>
  );
};

export default Register;