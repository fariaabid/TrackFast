import React from 'react';
import { CartItem } from '../types';
import EventPill from '../components/EventPill';
import { Trash2, PlusCircle, MinusCircle } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (page: any) => void;
  onTrack: (name: string, payload?: any) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onUpdateQuantity, onRemove, onNavigate, onTrack }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <EventPill eventName="view_cart" onClick={() => onTrack('view_cart', { currency: "USD", value: total, items: cart.map(i => ({ item_id: i.id, item_name: i.name, quantity: i.quantity, price: i.price })) })} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <img src={`https://picsum.photos/100/100?random=${item.id}`} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.variant}</p>
                    <p className="text-primary font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-gray-400 hover:text-primary"><MinusCircle size={20} /></button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-gray-400 hover:text-primary"><PlusCircle size={20} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-warning p-2">
                    <Trash2 size={20} />
                  </button>
                  <EventPill eventName="remove_from_cart" onClick={() => onTrack('remove_from_cart', { currency: "USD", value: item.price * item.quantity, items: [{ item_id: item.id, item_name: item.name, quantity: item.quantity, price: item.price }] })} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 h-fit bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Order Summary</h3>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between mb-6 text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-2">
             <button 
                disabled={cart.length === 0}
                onClick={() => {
                    onTrack('begin_checkout', { currency: "USD", value: total, items: cart.map(i => ({ item_id: i.id, item_name: i.name, quantity: i.quantity, price: i.price })) });
                    onNavigate('checkout-shipping');
                }}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
            >
                Checkout
            </button>
            <div className="flex justify-center">
                 <EventPill eventName="begin_checkout" onClick={() => onTrack('begin_checkout', { currency: "USD", value: total, items: cart.map(i => ({ item_id: i.id, item_name: i.name, quantity: i.quantity, price: i.price })) })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;