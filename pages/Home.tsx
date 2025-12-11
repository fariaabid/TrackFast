import React, { useEffect, useState } from 'react';
import EventPill from '../components/EventPill';
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, Headphones, RotateCcw, Lock, CheckCircle, Star, ChevronLeft, ChevronRight, Mail, CreditCard, Plus } from 'lucide-react';
import { PRODUCTS } from '../constants';

interface HomeProps {
  onTrack: (name: string, payload?: any) => void;
  onNavigate: (page: any) => void;
  onCategorySelect?: (category: string) => void;
  onAddToCart: (item: any) => void;
}

const Home: React.FC<HomeProps> = ({ onTrack, onNavigate, onCategorySelect, onAddToCart }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const featuredProduct = PRODUCTS[0]; // Select the first product as featured

  useEffect(() => {
    // Fire view events on mount (simulating section view for demo simplicity)
    onTrack('trust_section_viewed');
    onTrack('blog_section_viewed');
    onTrack('newsletter_viewed', { location: 'home_bottom' });
  }, []); // eslint-disable-line

  const testimonials = [
    { name: "Sarah J.", text: "The quality of the smartwatch exceeded my expectations. Shipping was incredibly fast!", rating: 5, avatar: "https://i.pravatar.cc/150?u=sarah" },
    { name: "Michael T.", text: "Best customer service I've experienced. They helped me choose the right headphones.", rating: 5, avatar: "https://i.pravatar.cc/150?u=michael" },
    { name: "Emily R.", text: "I love the eco-friendly packaging. Will definitely shop here again.", rating: 4, avatar: "https://i.pravatar.cc/150?u=emily" }
  ];

  const handleTestimonialNav = (direction: 'prev' | 'next') => {
    let newIndex = direction === 'next' ? testimonialIndex + 1 : testimonialIndex - 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    setTestimonialIndex(newIndex);
    onTrack('testimonial_slide_changed', { direction, index: newIndex });
  };

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049381961-a59a969345d6?auto=format&fit=crop&w=400&q=80' },
    { name: 'Home', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=400&q=80' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80' }
  ];

  const benefits = [
    { icon: <Truck size={24} />, title: "Fast Shipping", desc: "Delivery in 24h" },
    { icon: <CheckCircle size={24} />, title: "Premium Quality", desc: "Certified Products" },
    { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Always here for you" },
    { icon: <RotateCcw size={24} />, title: "Hassle-Free Returns", desc: "30-Day Guarantee" },
    { icon: <Lock size={24} />, title: "Secure Payments", desc: "Encrypted Transactions" },
    { icon: <Star size={24} />, title: "Verified Reviews", desc: "Trusted by Community" }
  ];

  const blogs = [
    { title: "Top 10 Tech Trends of 2024", excerpt: "Discover the gadgets shaping the future.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" },
    { title: "Sustainable Shopping Guide", excerpt: "How to shop responsibly without breaking the bank.", image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=400&q=80" },
    { title: "The Ultimate Gift Guide", excerpt: "Perfect presents for everyone on your list.", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="mb-4">
            <EventPill eventName="page_view" onClick={() => onTrack('page_view', { page_title: 'Home Page', page_location: 'https://trackfast.demo/' })} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Next-Gen Tech for <br/> 
            <span className="text-primary">Peak Performance</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Experience the future of e-commerce. Shop the latest trends with confidence.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              className="btn bg-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-primary-hover transition-all flex items-center gap-2 group"
              onClick={() => {
                onTrack('hero_cta_click', { location: 'hero_banner' });
                onNavigate('plp');
              }}
            >
              <ShoppingBag size={20} />
              Shop Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <EventPill eventName="hero_cta_click" onClick={() => onTrack('hero_cta_click', { location: 'hero_banner' })} />
          </div>
        </div>
        
        <div className="relative h-64 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1556742046-806e8ac21e8d?auto=format&fit=crop&w=1200&q=80" 
            alt="Lifestyle Tech" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
          />
        </div>
      </div>

      {/* Featured Product Section */}
      <div className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Featured Deal</span>
              <EventPill 
                eventName="select_item" 
                onClick={() => onTrack('select_item', { item_list_id: "featured", item_list_name: "Featured Products", items: [{ item_id: featuredProduct.id, item_name: featuredProduct.name }] })} 
                className="bg-white/20 text-white hover:bg-white/30" 
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{featuredProduct.name}</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">{featuredProduct.description}</p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-3xl font-bold text-white">${featuredProduct.price}</span>
              {featuredProduct.originalPrice && <span className="text-xl text-gray-400 line-through">${featuredProduct.originalPrice}</span>}
            </div>
            <button 
              onClick={() => {
                onAddToCart({ id: featuredProduct.id, name: featuredProduct.name, price: featuredProduct.price, image: featuredProduct.image, quantity: 1, variant: 'Default' });
                onTrack('add_to_cart', { currency: "USD", value: featuredProduct.price, items: [{ item_id: featuredProduct.id, item_name: featuredProduct.name, price: featuredProduct.price, quantity: 1 }] });
              }}
              className="mt-4 bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} /> Add to Cart
            </button>
            <div className="inline-block ml-4">
               <EventPill eventName="add_to_cart" onClick={() => onTrack('add_to_cart', { currency: "USD", value: featuredProduct.price, items: [{ item_id: featuredProduct.id, item_name: featuredProduct.name, price: featuredProduct.price, quantity: 1 }] })} className="bg-white/20 text-white hover:bg-white/30" />
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
              <img src={featuredProduct.image} alt={featuredProduct.name} className="w-full h-full object-cover mix-blend-overlay opacity-90" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B: Trust Signals */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-16 flex flex-wrap justify-center md:justify-between items-center gap-6">
         <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary" size={24} />
            <span className="font-bold text-gray-700">Secure SSL Checkout</span>
         </div>
         <div className="flex items-center gap-2">
            <CreditCard className="text-primary" size={24} />
            <span className="font-bold text-gray-700 text-sm">Visa • Mastercard • Amex</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="flex text-yellow-400"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
            <span className="font-bold text-gray-700">4.9/5 Rating</span>
         </div>
         <div className="flex items-center gap-2">
            <CheckCircle className="text-primary" size={24} />
            <span className="font-bold text-gray-700">Trusted by 50,000+</span>
         </div>
         <EventPill eventName="trust_section_viewed" onClick={() => onTrack('trust_section_viewed')} />
      </div>

      {/* SECTION C: Top Categories */}
      <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <EventPill eventName="category_card_clicked" onClick={() => onTrack('category_card_clicked')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
                <div 
                    key={cat.name} 
                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                    onClick={() => {
                        onTrack('category_card_clicked', { category: cat.name });
                        if (onCategorySelect) onCategorySelect(cat.name);
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                        <button className="text-sm font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all">
                            Explore <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            ))}
          </div>
      </div>

      {/* SECTION A: Why Shop With Us */}
      <div className="mb-16 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
         <div className="flex items-center gap-4 mb-8 justify-center">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Why Shop With Us</h2>
            <EventPill eventName="benefit_interaction" onClick={() => onTrack('benefit_interaction')} />
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((b, i) => (
                <div 
                    key={i} 
                    className="flex flex-col items-center text-center p-4 hover:bg-blue-50 rounded-xl transition-colors cursor-default"
                    onMouseEnter={() => onTrack('benefit_interaction', { benefit: b.title })}
                >
                    <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-3">
                        {b.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{b.title}</h4>
                    <p className="text-xs text-gray-500">{b.desc}</p>
                </div>
            ))}
         </div>
      </div>

      {/* SECTION D: Testimonials */}
      <div className="mb-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
         <div className="relative z-10 max-w-4xl mx-auto text-center">
             <div className="flex items-center justify-center gap-4 mb-8">
                 <h2 className="text-3xl font-bold">Customer Love</h2>
                 <EventPill eventName="testimonial_slide..." onClick={() => onTrack('testimonial_slide_changed')} className="bg-white/20 text-white hover:bg-white/30" />
             </div>
             
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-8 relative transition-all duration-300 hover:bg-white/15 cursor-pointer" onClick={() => onTrack('testimonial_clicked', { author: testimonials[testimonialIndex].name })}>
                <div className="flex justify-center mb-6">
                    <img src={testimonials[testimonialIndex].avatar} alt={testimonials[testimonialIndex].name} className="w-20 h-20 rounded-full border-4 border-white/20" />
                </div>
                <div className="flex justify-center text-yellow-400 mb-4">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <p className="text-xl md:text-2xl font-medium italic mb-6">"{testimonials[testimonialIndex].text}"</p>
                <h4 className="font-bold text-lg">{testimonials[testimonialIndex].name}</h4>
                <p className="text-sm text-gray-400">Verified Buyer</p>
             </div>

             <div className="flex justify-center gap-4">
                 <button onClick={() => handleTestimonialNav('prev')} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><ChevronLeft /></button>
                 <button onClick={() => handleTestimonialNav('next')} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><ChevronRight /></button>
             </div>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-20 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* SECTION E: Blog / Shopping Tips */}
      <div className="mb-16">
         <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Shopping Tips & News</h2>
            <EventPill eventName="blog_section_viewed" onClick={() => onTrack('blog_section_viewed')} />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                    <div className="h-48 overflow-hidden">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">{blog.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{blog.excerpt}</p>
                        <button 
                            className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                            onClick={() => onTrack('blog_read_more_clicked', { article_title: blog.title })}
                        >
                            Read More <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            ))}
         </div>
         <div className="flex justify-end mt-2"><EventPill eventName="blog_read_more_clicked" onClick={() => onTrack('blog_read_more_clicked')} /></div>
      </div>

      {/* SECTION F: Newsletter Signup */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
             <div className="inline-block p-3 bg-white rounded-full text-primary mb-4 shadow-sm">
                <Mail size={32} />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Newsletter</h2>
             <p className="text-gray-600 mb-8">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
             </p>
             
             {newsletterSubmitted ? (
                 <div className="bg-green-100 text-green-800 p-4 rounded-xl font-bold animate-in zoom-in border border-green-200">
                     Thank you for subscribing! Stay updated with our newest collections.
                 </div>
             ) : (
                 <form 
                    className="flex flex-col sm:flex-row gap-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setNewsletterSubmitted(true);
                        onTrack('newsletter_submitted', { location: 'home_bottom' });
                    }}
                 >
                     <input 
                        type="email" 
                        required 
                        placeholder="Enter your email address" 
                        className="flex-1 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                     />
                     <button type="submit" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-hover shadow-lg transition-colors">
                        Subscribe
                     </button>
                 </form>
             )}
             <div className="mt-4"><EventPill eventName="newsletter_submitted" onClick={() => onTrack('newsletter_submitted')} /></div>
          </div>
      </div>

    </div>
  );
};

export default Home;