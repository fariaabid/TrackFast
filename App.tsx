import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import EventLogPanel from './components/EventLogPanel';
import Flowchart from './components/Flowchart';
import EventPopup from './components/EventPopup';
import Footer from './components/Footer';
import { PageView, TrackedEvent, CartItem } from './types';
import { EVENT_DEFS, AUTO_DEMO_STEPS, PRODUCTS } from './constants';
import { Wand2 } from 'lucide-react';

// Pages
import Home from './pages/Home';
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import Cart from './pages/Cart';
import CheckoutShipping from './pages/CheckoutShipping';
import CheckoutPayment from './pages/CheckoutPayment';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Documentation from './pages/Documentation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ShippingReturns from './pages/ShippingReturns';
import ContactUs from './pages/ContactUs';
import Newsletter from './pages/Newsletter';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [eventLog, setEventLog] = useState<TrackedEvent[]>([]);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TrackedEvent | null>(null);
  const [isAutoDemoRunning, setIsAutoDemoRunning] = useState(false);
  
  // Navigation State
  const [selectedProductId, setSelectedProductId] = useState<string | null>(PRODUCTS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const autoDemoTimeout = useRef<number | null>(null);

  const trackEvent = (name: string, customPayload: any = {}, openLog = false) => {
    const def = EVENT_DEFS[name];
    let basePayload = {};
    try {
      basePayload = def ? JSON.parse(def.example_payload) : {};
    } catch(e) {}

    const newEvent: TrackedEvent = {
      name,
      timestamp: new Date(),
      payload: { ...basePayload, ...customPayload },
      def
    };

    setEventLog(prev => [...prev, newEvent]);

    if (openLog) {
      setIsLogOpen(true);
    }
  };

  const navigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo(0,0);
    trackEvent('page_view', { page_title: page, page_location: `/${page}` });
  };

  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    navigate('pdp');
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    navigate('plp');
  };

  // Cart Logic
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.variant === item.variant);
      if (existing) {
        return prev.map(i => i.id === item.id && i.variant === item.variant ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = Math.max(0, item.quantity + delta);
        if (newQ === 0) trackEvent('remove_from_cart', { currency: "USD", value: item.price, items: [{ item_id: id, quantity: 1 }] });
        else if (delta > 0) trackEvent('add_to_cart', { currency: "USD", value: item.price, items: [{ item_id: id, quantity: 1 }] });
        // update_cart isn't standard GA4, but we can track the action
        return { ...item, quantity: newQ };
      }
      return item;
    }).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(c => c.id === id);
    if(item) {
        trackEvent('remove_from_cart', { currency: "USD", value: item.price * item.quantity, items: [{ item_id: id }] });
    }
    setCart(prev => prev.filter(i => i.id !== id));
  };

  // Auto Demo
  const runAutoDemo = () => {
    if (isAutoDemoRunning) return;
    setIsAutoDemoRunning(true);
    setEventLog([]); // Clear log
    setCart([]);
    setIsLogOpen(true);

    let index = 0;

    const processStep = () => {
      if (index >= AUTO_DEMO_STEPS.length) {
        setIsAutoDemoRunning(false);
        return;
      }

      const step = AUTO_DEMO_STEPS[index];
      
      // Update UI
      if (step.page !== currentPage) {
        setCurrentPage(step.page);
        window.scrollTo(0,0);
      }

      // Special handling for PDP selection in auto demo
      if (step.page === 'pdp' && step.payload?.items?.[0]?.item_id) {
          setSelectedProductId(step.payload.items[0].item_id);
      }

      // Fire Event
      trackEvent(step.event, step.payload || {});

      // Simulate logic effects (like adding to cart)
      if (step.event === 'add_to_cart') {
          addToCart({ 
            id: 'ELEC_01', 
            name: 'Smartwatch Pro X', 
            price: 299.99, 
            quantity: 1, 
            variant: 'Black-Large', 
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80' 
          });
      }

      index++;
      autoDemoTimeout.current = window.setTimeout(processStep, step.delay);
    };

    processStep();
  };

  useEffect(() => {
    return () => {
      if (autoDemoTimeout.current) clearTimeout(autoDemoTimeout.current);
    };
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home onTrack={trackEvent} onNavigate={navigate} onCategorySelect={navigateToCategory} onAddToCart={addToCart} />;
      case 'plp': return <PLP onTrack={trackEvent} onNavigate={navigate} onProductClick={navigateToProduct} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} onAddToCart={addToCart} />;
      case 'pdp': return <PDP onTrack={trackEvent} onAddToCart={addToCart} productId={selectedProductId} />;
      case 'cart': return <Cart cart={cart} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} onNavigate={navigate} onTrack={trackEvent} />;
      case 'checkout-shipping': return <CheckoutShipping onTrack={trackEvent} onNavigate={navigate} />;
      case 'checkout-payment': return <CheckoutPayment onTrack={trackEvent} onNavigate={navigate} />;
      case 'confirmation': return <Confirmation onTrack={trackEvent} onNavigate={navigate} />;
      case 'login': return <Login onTrack={trackEvent} onNavigate={navigate} />;
      case 'register': return <Register onTrack={trackEvent} onNavigate={navigate} />;
      case 'docs': return <Documentation onTrack={(n) => trackEvent(n, {}, true)} />;
      case 'privacy': return <PrivacyPolicy onTrack={trackEvent} />;
      case 'terms': return <TermsOfService onTrack={trackEvent} />;
      case 'cookies': return <CookiePolicy onTrack={trackEvent} />;
      case 'shipping': return <ShippingReturns onTrack={trackEvent} />;
      case 'contact': return <ContactUs onTrack={trackEvent} />;
      case 'newsletter': return <Newsletter onTrack={trackEvent} />;
      default: return <Home onTrack={trackEvent} onNavigate={navigate} onCategorySelect={navigateToCategory} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigate} cartCount={cart.reduce((a,b)=>a+b.quantity,0)} />
      
      <div className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        {/* Auto Demo Control */}
        {!isAutoDemoRunning && currentPage === 'home' && (
          <div className="flex justify-center mb-8">
            <button 
              onClick={runAutoDemo}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-transform hover:-translate-y-1"
            >
              <Wand2 size={20} />
              Run Auto Customer Journey Demo
            </button>
          </div>
        )}
        
        {isAutoDemoRunning && (
             <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full z-50 text-sm font-mono animate-pulse">
                Running Demo Scenario...
             </div>
        )}

        <Flowchart events={eventLog} />
        
        <main className="w-full">
          {renderPage()}
        </main>
      </div>

      <Footer onNavigate={navigate} onTrack={trackEvent} />

      <EventLogPanel 
        isOpen={isLogOpen} 
        onClose={() => setIsLogOpen(false)} 
        onOpen={() => setIsLogOpen(true)}
        events={eventLog}
        onEventClick={(e) => setSelectedEvent(e)}
      />

      <EventPopup 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}

export default App;