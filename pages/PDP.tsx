import React, { useState, useRef, useEffect } from 'react';
import EventPill from '../components/EventPill';
import { 
    Play, Pause, ShoppingCart, Check, Heart, Share2, Star, User, Truck, Shield, Zap, 
    ThumbsUp, ThumbsDown, Filter, ArrowDownUp, Image, Camera, AlertTriangle, CheckCircle2, XCircle, MoreHorizontal
} from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface PDPProps {
  onTrack: (name: string, payload?: any) => void;
  onAddToCart: (item: any) => void;
  productId: string | null;
}

interface Review {
  id: string;
  author: string;
  avatar?: string;
  verified: boolean;
  rating: number;
  date: string;
  title: string;
  text: string;
  images: string[];
  helpfulCount: number;
}

const PDP: React.FC<PDPProps> = ({ onTrack, onAddToCart, productId }) => {
  // Find product or fallback
  const product: Product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const videoInterval = useRef<number | null>(null);

  // Review State
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "r1",
      author: "Sarah J.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      verified: true,
      rating: 5,
      date: "2 days ago",
      title: "Absolutely love it!",
      text: "This product has completely changed my routine. The quality is amazing and it looks even better in person. Highly recommend!",
      images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80"],
      helpfulCount: 24
    },
    {
      id: "r2",
      author: "Michael T.",
      verified: true,
      rating: 5,
      date: "1 week ago",
      title: "Best purchase of the year",
      text: "I upgraded from an older model and the difference is night and day. The performance is top notch.",
      images: [],
      helpfulCount: 12
    },
    {
      id: "r3",
      author: "Emily R.",
      avatar: "https://i.pravatar.cc/150?u=emily",
      verified: false,
      rating: 4,
      date: "3 weeks ago",
      title: "Great features, minor cons",
      text: "The features are fantastic, but it took me a while to get used to the controls. Overall very satisfied.",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"],
      helpfulCount: 8
    },
    {
        id: "r4",
        author: "David K.",
        verified: true,
        rating: 2,
        date: "1 month ago",
        title: "Disappointed",
        text: "It didn't match the description fully. Shipping was fast though.",
        images: [],
        helpfulCount: 2
    },
    {
        id: "r5",
        author: "Jessica L.",
        verified: true,
        rating: 5,
        date: "2 months ago",
        title: "Perfect gift",
        text: "Bought this for my husband and he loves it. Great packaging.",
        images: [],
        helpfulCount: 45
    }
  ]);

  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'highest' | 'lowest'>('helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterImages, setFilterImages] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);
  
  // Write Review State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
      name: '',
      rating: 0,
      title: '',
      text: '',
      images: [] as string[],
      confirmedPurchase: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Reset state on product change
    setColor(null);
    setSize(null);
    setActiveTab('details');
    onTrack('view_item', { currency: "USD", value: product.price, items: [{ item_id: product.id, item_name: product.name, price: product.price, item_category: product.category }] });
  }, [product.id]);

  const handleVariantSelect = (type: 'color' | 'size', value: string) => {
    if (type === 'color') setColor(value);
    else setSize(value);

    onTrack(`select_${type}`, { item_id: product.id, content_type: "product_variant", variant_type: type, [`selected_${type}`]: value });

    if ((type === 'color' && size) || (type === 'size' && color)) {
      setTimeout(() => {
        onTrack('select_variant', { 
            item_id: product.id, 
            content_type: "product",
            item_variant: `${type === 'color' ? value : color}-${type === 'size' ? value : size}` 
        });
      }, 100);
    }
  };

  const toggleVideo = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (videoInterval.current) clearInterval(videoInterval.current);
      onTrack('video_pause', { video_title: `${product.name} Demo` });
    } else {
      setIsPlaying(true);
      onTrack('video_start', { video_title: `${product.name} Demo` });
      let progress = 0;
      videoInterval.current = window.setInterval(() => {
        progress += 5;
        if (progress === 25) onTrack('video_progress_25', { video_title: 'Demo' });
        if (progress === 50) onTrack('video_progress_50', { video_title: 'Demo' });
        if (progress >= 100) {
            if (videoInterval.current) clearInterval(videoInterval.current);
            setIsPlaying(false);
            onTrack('video_complete', { video_title: 'Demo' });
        }
      }, 200); 
    }
  };

  // Filter & Sort Logic
  const getFilteredReviews = () => {
      let filtered = [...reviews];
      if (filterRating) filtered = filtered.filter(r => r.rating === filterRating);
      if (filterImages) filtered = filtered.filter(r => r.images.length > 0);
      if (filterVerified) filtered = filtered.filter(r => r.verified);

      return filtered.sort((a, b) => {
          if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
          if (sortBy === 'highest') return b.rating - a.rating;
          if (sortBy === 'lowest') return a.rating - b.rating;
          // approximate date sort
          return 0; 
      });
  };

  // Review Summary Stats
  const avgRating = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
  reviews.forEach(r => ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1);

  const handleReviewSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onTrack('review_submitted', { 
          review_id: `NEW_${Date.now()}`, 
          rating: newReview.rating, 
          has_images: newReview.images.length > 0 
      });
      setFormSubmitted(true);
      setTimeout(() => {
          setFormSubmitted(false);
          setShowReviewForm(false);
          setNewReview({ name: '', rating: 0, title: '', text: '', images: [], confirmedPurchase: false });
      }, 3000);
  };

  return (
    <div className="animate-in fade-in duration-300 pb-12">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <span className="text-gray-400">{product.category}</span> / <span className="text-gray-900 font-bold">{product.name}</span>
        <EventPill eventName="view_item" onClick={() => onTrack('view_item', { currency: "USD", value: product.price, items: [{ item_id: product.id, item_name: product.name, price: product.price }] })} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Media */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group aspect-square">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          
           {/* Video Section */}
           <div 
            onClick={toggleVideo}
            className="bg-black rounded-xl h-24 flex items-center justify-center cursor-pointer relative group overflow-hidden"
          >
             <div className="absolute inset-0 bg-gray-800 opacity-60 group-hover:scale-105 transition-transform duration-700"></div>
             {isPlaying ? <Pause size={30} className="text-white relative z-10" /> : <Play size={30} className="text-white relative z-10 pl-1" />}
             <div className="absolute bottom-4 left-4 text-white z-10">
                 <div className="text-xs font-bold uppercase tracking-wider text-gray-300">Product Tour</div>
             </div>
             <div className="absolute top-4 right-4 z-20">
                 <EventPill eventName="video_start" onClick={() => {}} />
             </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div>
          <div className="flex justify-between items-start mb-4">
               <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-yellow-400 flex"><Star fill="currentColor" size={16} /> {product.rating}</span> 
                      <span>({product.reviews} reviews)</span>
                  </div>
               </div>
               <div className="flex gap-2">
                   <button 
                        onClick={() => onTrack('add_to_wishlist', { currency: "USD", value: product.price, items: [{ item_id: product.id, item_name: product.name, price: product.price }] })}
                        className="p-2 rounded-full border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-500 transition-colors"
                    >
                        <Heart size={20} />
                    </button>
                    <EventPill eventName="add_to_wishlist" onClick={() => onTrack('add_to_wishlist', { currency: "USD", value: product.price, items: [{ item_id: product.id, item_name: product.name }] })} className="hidden lg:inline-block" />
               </div>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>}
          </div>

          <div className="space-y-6 mb-8 border-y border-gray-100 py-8">
            {/* Delivery Info */}
            <div className="flex gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2"><Truck size={16} className="text-green-500" /> Free Shipping</div>
                <div className="flex items-center gap-2"><Shield size={16} className="text-blue-500" /> 2 Year Warranty</div>
                <div className="flex items-center gap-2"><Zap size={16} className="text-yellow-500" /> In Stock</div>
            </div>

            {/* Selectors */}
            <div>
                <div className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
                    Color <EventPill eventName="select_color" onClick={() => onTrack('select_color')} />
                </div>
                <div className="flex gap-3">
                    {['Black', 'Silver', 'White'].map(c => (
                        <button 
                            key={c}
                            onClick={() => handleVariantSelect('color', c)}
                            className={`px-6 py-2 rounded-lg border font-medium transition-all ${color === c ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {color && (
                <div className="animate-in fade-in">
                    <div className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
                        Size <EventPill eventName="select_size" onClick={() => onTrack('select_size')} />
                    </div>
                    <div className="flex gap-3">
                        {['Small', 'Medium', 'Large'].map(s => (
                            <button 
                                key={s}
                                onClick={() => handleVariantSelect('size', s)}
                                className={`px-6 py-2 rounded-lg border font-medium transition-all ${size === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <div className="flex gap-4">
                <button 
                    onClick={() => {
                        onAddToCart({ 
                            id: product.id, 
                            name: product.name, 
                            price: product.price, 
                            quantity: 1, 
                            variant: `${color || 'Default'}-${size || 'Default'}`,
                            image: product.image
                        });
                        onTrack('add_to_cart', { currency: "USD", value: product.price, items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1, item_variant: `${color || 'Default'}-${size || 'Default'}` }] });
                    }}
                    className="btn bg-white border-2 border-primary text-primary flex-1 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    <ShoppingCart size={22} />
                    Add to Cart
                </button>

                <button 
                    onClick={() => {
                        onTrack('buy_now_clicked', { items: [{ item_id: product.id, item_name: product.name }] });
                    }}
                    className="btn bg-primary text-white flex-1 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-primary-hover flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    Buy Now
                </button>
            </div>
            <div className="flex justify-between px-2">
                 <EventPill eventName="add_to_cart" onClick={() => onTrack('add_to_cart', { currency: "USD", value: product.price, items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }] })} />
                 <EventPill eventName="buy_now_clicked" onClick={() => onTrack('buy_now_clicked', { items: [{ item_id: product.id }] })} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-8">
         <div className="flex gap-8 overflow-x-auto">
           {['details', 'specs', 'reviews'].map((tab) => (
             <button 
                key={tab}
                onClick={() => {
                    setActiveTab(tab as any);
                    if (tab === 'reviews') {
                        onTrack('product_review_read', { item_id: product.id, reviews_count: product.reviews });
                        onTrack('rating_summary_viewed', { average: avgRating, count: totalReviews });
                    }
                }}
                className={`pb-4 text-lg font-bold transition-colors relative whitespace-nowrap px-2 ${activeTab === tab ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
             >
               {tab === 'details' && 'Full Description'}
               {tab === 'specs' && 'Technical Specs'}
               {tab === 'reviews' && `Reviews (${reviews.length})`}
               {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
             </button>
           ))}
         </div>
         {activeTab === 'reviews' && <div className="flex justify-end p-2"><EventPill eventName="product_review_read" onClick={() => onTrack('product_review_read')} /></div>}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'details' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Highlights</h3>
            <p className="text-gray-600 mb-6">{product.description} Designed with precision and engineered for performance, this product sets a new standard in its category.</p>
            <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {["Premium Build Quality", "Industry Leading Performance", "Eco-Friendly Materials", "Award Winning Design"].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><Check size={12} /></div>
                        <span className="text-gray-700 font-medium">{feat}</span>
                    </li>
                ))}
            </ul>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                 {product.specs ? Object.entries(product.specs).map(([key, value], idx) => (
                   <div key={idx} className="grid grid-cols-3 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className="text-gray-500 font-medium">{key}</div>
                      <div className="col-span-2 text-gray-900 font-semibold">{value}</div>
                   </div>
                 )) : (
                     <div className="p-8 text-center text-gray-500">No specifications available for this product.</div>
                 )}
             </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* PART 1: Rating Summary */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-12 flex flex-col lg:flex-row gap-12 items-center">
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start min-w-[200px]">
                    <div className="text-6xl font-bold text-gray-900 mb-2">{avgRating}</div>
                    <div className="flex text-yellow-400 mb-2">
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} size={24} fill={Number(avgRating) >= star ? "currentColor" : "none"} className={Number(avgRating) < star ? "text-gray-300" : ""} />
                        ))}
                    </div>
                    <p className="text-gray-500 font-medium">{totalReviews} Reviews</p>
                    <EventPill eventName="rating_summary_viewed" onClick={() => onTrack('rating_summary_viewed')} className="mt-2" />
                </div>
                
                <div className="flex-1 w-full space-y-3">
                    {[5,4,3,2,1].map(num => (
                        <div key={num} className="flex items-center gap-4">
                            <span className="text-sm font-bold text-gray-600 w-3">{num}</span>
                            <Star size={14} className="text-gray-400" />
                            <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-yellow-400 rounded-full" 
                                    style={{ width: `${(ratingCounts[num] / totalReviews) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500 w-8 text-right">{Math.round((ratingCounts[num] / totalReviews) * 100)}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* PART 3: Filters & Sort */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 border border-gray-100 rounded-xl shadow-sm sticky top-20 z-10">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2 mr-2">
                        <Filter size={16} /> Filters:
                    </span>
                    
                    {/* Rating Filter */}
                    <div className="flex gap-1">
                        {[5, 4, 3, 2, 1].map(star => (
                            <button
                                key={star}
                                onClick={() => {
                                    setFilterRating(filterRating === star ? null : star);
                                    onTrack('review_filter_applied', { filter_type: 'rating', value: `${star}_star` });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${filterRating === star ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                            >
                                {star} ★
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setFilterImages(!filterImages);
                            onTrack('review_filter_applied', { filter_type: 'has_images', value: !filterImages });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${filterImages ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                    >
                        <Image size={12} /> With Images
                    </button>

                     <button
                        onClick={() => {
                            setFilterVerified(!filterVerified);
                            onTrack('review_filter_applied', { filter_type: 'verified', value: !filterVerified });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${filterVerified ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                    >
                        <CheckCircle2 size={12} /> Verified
                    </button>
                    <EventPill eventName="review_filter_applied" onClick={() => onTrack('review_filter_applied')} />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <ArrowDownUp size={16} /> Sort:
                    </span>
                    <select 
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value as any);
                            onTrack('review_sort_selected', { sort_order: e.target.value });
                        }}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary p-2 outline-none"
                    >
                        <option value="helpful">Most Helpful</option>
                        <option value="newest">Newest</option>
                        <option value="highest">Highest Rating</option>
                        <option value="lowest">Lowest Rating</option>
                    </select>
                </div>
            </div>

            {/* PART 2: Review List */}
            <div className="space-y-8 mb-16">
                 {getFilteredReviews().length === 0 ? (
                     <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
                         No reviews match your filters.
                         <button onClick={() => { setFilterRating(null); setFilterImages(false); setFilterVerified(false); }} className="block mx-auto mt-2 text-primary font-bold hover:underline">Clear Filters</button>
                     </div>
                 ) : getFilteredReviews().map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                    {review.avatar ? <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" /> : <User size={20} className="text-gray-400" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                                            ))}
                                        </div>
                                        {review.verified && <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={10} /> Verified Buyer</span>}
                                    </div>
                                </div>
                            </div>
                            <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        
                        <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
                        <p className="text-gray-600 leading-relaxed text-sm mb-4">{review.text}</p>
                        
                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-4">
                                {review.images.map((img, idx) => (
                                    <img key={idx} src={img} alt="Review attachment" className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90" />
                                ))}
                            </div>
                        )}

                        {/* Helpful & Report */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-500 font-medium">Helpful?</span>
                                <button 
                                    onClick={() => onTrack('review_helpful_clicked', { review_id: review.id, action: 'helpful' })}
                                    className="text-xs text-gray-500 hover:text-primary flex items-center gap-1 transition-colors bg-gray-50 px-2 py-1 rounded-md"
                                >
                                    <ThumbsUp size={12} /> {review.helpfulCount}
                                </button>
                                <button 
                                    onClick={() => onTrack('review_helpful_clicked', { review_id: review.id, action: 'not_helpful' })}
                                    className="text-xs text-gray-500 hover:text-warning flex items-center gap-1 transition-colors bg-gray-50 px-2 py-1 rounded-md"
                                >
                                    <ThumbsDown size={12} />
                                </button>
                                <EventPill eventName="review_helpful_clicked" onClick={() => onTrack('review_helpful_clicked')} className="ml-2 scale-75" />
                            </div>
                            
                            {/* Moderation Placeholders (Part 5) */}
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => onTrack('review_report_clicked', { review_id: review.id })}
                                    className="text-xs text-gray-400 hover:text-red-500 underline"
                                >
                                    Report
                                </button>
                                
                                <div className="group relative">
                                    <button className="text-gray-300 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:flex flex-col bg-white border border-gray-200 shadow-xl rounded-lg p-1 min-w-[120px] z-20">
                                        <button onClick={() => onTrack('review_moderated', { action: 'approve' })} className="text-left px-3 py-1.5 text-xs hover:bg-green-50 text-green-700 rounded">Admin: Approve</button>
                                        <button onClick={() => onTrack('review_moderated', { action: 'reject' })} className="text-left px-3 py-1.5 text-xs hover:bg-red-50 text-red-700 rounded">Admin: Reject</button>
                                        <button onClick={() => onTrack('review_moderated', { action: 'spam' })} className="text-left px-3 py-1.5 text-xs hover:bg-gray-50 text-gray-700 rounded">Admin: Spam</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>

            {/* PART 4: Write Review Section */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                {!showReviewForm ? (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Own this product?</h3>
                        <p className="text-gray-600 mb-6">Share your thoughts with other customers</p>
                        <button 
                            onClick={() => {
                                setShowReviewForm(true);
                                onTrack('review_form_opened', { product_id: product.id });
                            }}
                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg transition-all"
                        >
                            Write a Review
                        </button>
                    </div>
                ) : formSubmitted ? (
                    <div className="text-center py-8 animate-in zoom-in">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                        <p className="text-gray-600">Your review has been submitted and is pending approval.</p>
                    </div>
                ) : (
                    <form onSubmit={handleReviewSubmit} className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-900">Write a Review</h3>
                            <button type="button" onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-gray-600"><XCircle /></button>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Overall Rating</label>
                            <div className="flex gap-2">
                                {[1,2,3,4,5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setNewReview({...newReview, rating: star})}
                                        onClick={() => onTrack('rating_selected', { rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star 
                                            size={32} 
                                            fill={newReview.rating >= star ? "#FBBF24" : "none"} 
                                            className={newReview.rating >= star ? "text-yellow-400" : "text-gray-300"} 
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="John Doe"
                                    value={newReview.name}
                                    onChange={e => setNewReview({...newReview, name: e.target.value})}
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Review Title</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Summarize your experience"
                                    value={newReview.title}
                                    onChange={e => setNewReview({...newReview, title: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-bold text-gray-700 mb-2">Review</label>
                             <textarea 
                                required
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                placeholder="What did you like or dislike?"
                                value={newReview.text}
                                onChange={e => setNewReview({...newReview, text: e.target.value})}
                             ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Add Photos</label>
                            <div className="flex gap-4 items-center">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const newImages = [...newReview.images, `https://picsum.photos/200/200?random=${Date.now()}`];
                                        setNewReview({...newReview, images: newImages});
                                        onTrack('review_image_uploaded', { image_count: newImages.length });
                                    }}
                                    className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-primary hover:text-primary transition-colors bg-white"
                                >
                                    <Camera size={24} className="mb-1" />
                                    <span className="text-xs">Upload</span>
                                </button>
                                {newReview.images.map((img, idx) => (
                                    <div key={idx} className="relative w-24 h-24 group">
                                        <img src={img} alt="Upload preview" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                        <button 
                                            type="button"
                                            onClick={() => setNewReview({...newReview, images: newReview.images.filter((_, i) => i !== idx)})}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                             <input 
                                required
                                type="checkbox" 
                                id="purchase_confirm" 
                                className="mt-1"
                                checked={newReview.confirmedPurchase}
                                onChange={e => setNewReview({...newReview, confirmedPurchase: e.target.checked})}
                             />
                             <label htmlFor="purchase_confirm" className="text-sm text-gray-600">I confirm that I have purchased and used this product.</label>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg transition-all"
                        >
                            Submit Review
                        </button>
                    </form>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDP;