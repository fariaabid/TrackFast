export interface EventDef {
  group: string;
  example_payload: string;
  why_it_matters: string;
  loss_if_missing: string;
}

export interface TrackedEvent {
  name: string;
  timestamp: Date;
  payload: any;
  def?: EventDef;
}

export interface Product {
  id: string;
  category: 'Electronics' | 'Fashion' | 'Home' | 'Beauty';
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  specs?: Record<string, string>;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image: string;
}

export type PageView = 
  | 'home' 
  | 'plp' 
  | 'pdp' 
  | 'cart' 
  | 'checkout-shipping' 
  | 'checkout-payment' 
  | 'confirmation' 
  | 'login' 
  | 'register'
  | 'docs'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'shipping'
  | 'contact'
  | 'newsletter';

export interface AutoDemoStep {
  page: PageView;
  event: string;
  delay: number;
  payload?: any;
  label: string;
  firePageView?: boolean;
}