import React, { useEffect } from 'react';
import EventPill from '../components/EventPill';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { PRODUCTS } from '../constants';

interface PLPProps {
  onTrack: (name: string, payload?: any) => void;
  onNavigate: (page: any) => void;
  onProductClick: (id: string) => void;
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  onAddToCart: (item: any) => void;
}

const PLP: React.FC<PLPProps> = ({ onTrack, onNavigate, onProductClick, selectedCategory, onCategorySelect, onAddToCart }) => {
  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  useEffect(() => {
    // Track view_item_list when the component mounts or category changes
    onTrack('view_item_list', { 
        item_list_id: selectedCategory.toLowerCase(),
        item_list_name: selectedCategory + " Products",
        items: filteredProducts.map(p => ({
            item_id: p.id,
            item_name: p.name,
            price: p.price,
            item_category: p.category
        }))
    });
  }, [selectedCategory, filteredProducts.length]);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                {selectedCategory} Products
                <EventPill eventName="view_item_list" onClick={() => onTrack('view_item_list')} />
            </h1>
            <p className="text-gray-500 mt-1">Showing {filteredProducts.length} results</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onCategorySelect(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        selectedCategory === cat 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((p, idx) => (
           <div 
            key={p.id}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative"
          >
            {/* Discount Badge */}
            {p.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                    -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                </div>
            )}

            {/* Event Pill for Select Item */}
             <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <EventPill eventName="select_item" onClick={() => onTrack('select_item', { item_list_id: selectedCategory.toLowerCase(), item_list_name: selectedCategory + " Products", items: [{ item_id: p.id, item_name: p.name }] })} />
             </div>

            {/* Image */}
            <div 
                className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
                onClick={() => {
                    onTrack('select_item', { item_list_id: selectedCategory.toLowerCase(), item_list_name: selectedCategory + " Products", items: [{ item_id: p.id, item_name: p.name, index: idx }] });
                    onProductClick(p.id);
                }}
            >
                 <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
            </div>
            
            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{p.rating}</span>
                    <span className="text-xs text-gray-400">({p.reviews})</span>
                </div>
                
                <h3 
                    className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
                    onClick={() => onProductClick(p.id)}
                >
                    {p.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">${p.price}</span>
                    {p.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${p.originalPrice}</span>
                    )}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                     <button 
                        onClick={() => {
                            onTrack('view_product_details', { items: [{ item_id: p.id, item_name: p.name }], source: 'product_card' });
                            onProductClick(p.id);
                        }}
                        className="flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition-colors"
                     >
                        <Eye size={16} /> Details
                     </button>
                     <button 
                        onClick={() => {
                            onAddToCart({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1, variant: 'Default' });
                            onTrack('add_to_cart', { currency: "USD", value: p.price, items: [{ item_id: p.id, item_name: p.name, price: p.price, quantity: 1 }] });
                        }}
                        className="flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover text-sm font-semibold transition-colors shadow-sm"
                     >
                        <ShoppingCart size={16} /> Add
                     </button>
                </div>
                <div className="flex justify-between mt-2 px-1">
                    <EventPill eventName="view_prod..." onClick={() => onTrack('view_product_details', { items: [{ item_id: p.id, item_name: p.name }] })} className="text-[10px] px-1 py-0.5" />
                    <EventPill eventName="add_to..." onClick={() => onTrack('add_to_cart', { currency: "USD", value: p.price, items: [{ item_id: p.id, item_name: p.name, price: p.price }] })} className="text-[10px] px-1 py-0.5" />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PLP;