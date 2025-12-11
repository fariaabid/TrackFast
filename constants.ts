import { EventDef, AutoDemoStep, Product } from './types';

export const PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'ELEC_01',
    category: 'Electronics',
    name: 'Smartwatch Pro X',
    description: 'The ultimate companion for your active lifestyle. Features advanced health monitoring, ECG, GPS tracking, and seamless smartphone integration.',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    specs: { 'Battery': '48h', 'Waterproof': 'IP68', 'Display': 'OLED' }
  },
  {
    id: 'ELEC_02',
    category: 'Electronics',
    name: 'Noise-Canceling Headphones Ultra',
    description: 'Immerse yourself in pure audio bliss with industry-leading active noise cancellation.',
    price: 249.99,
    rating: 4.7,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    specs: { 'Type': 'Over-ear', 'Connectivity': 'Bluetooth 5.2', 'Battery': '30h' }
  },
  {
    id: 'ELEC_03',
    category: 'Electronics',
    name: '4K Action Camera',
    description: 'Capture life in stunning 4K resolution. Rugged, waterproof, and ready for adventure.',
    price: 199.99,
    originalPrice: 229.99,
    rating: 4.5,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
    specs: { 'Resolution': '4K 60fps', 'Stabilization': 'HyperSmooth', 'Waterproof': '10m' }
  },
  {
    id: 'ELEC_04',
    category: 'Electronics',
    name: 'Portable Bluetooth Speaker',
    description: 'Big sound in a small package. 360-degree audio with deep bass.',
    price: 89.99,
    rating: 4.6,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    specs: { 'Output': '20W', 'Playtime': '12h', 'Waterproof': 'IPX7' }
  },
  {
    id: 'ELEC_05',
    category: 'Electronics',
    name: 'Wireless Charging Dock',
    description: 'Charge all your devices simultaneously with this sleek 3-in-1 dock.',
    price: 59.99,
    rating: 4.4,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80',
    specs: { 'Output': '15W', 'Compatibility': 'Qi-enabled', 'Input': 'USB-C' }
  },
  {
    id: 'ELEC_06',
    category: 'Electronics',
    name: 'Smart Home Security Camera',
    description: 'Keep an eye on your home 24/7 with 1080p HD video and night vision.',
    price: 129.99,
    rating: 4.3,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3d63?auto=format&fit=crop&w=600&q=80',
    specs: { 'Resolution': '1080p', 'Field of View': '130°', 'Connectivity': 'Wi-Fi' }
  },

  // Fashion
  {
    id: 'FASH_01',
    category: 'Fashion',
    name: 'Premium Leather Backpack',
    description: 'Handcrafted from full-grain leather, perfect for daily commute or travel.',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    specs: { 'Material': 'Full-grain Leather', 'Laptop Sleeve': '15 inch', 'Volume': '20L' }
  },
  {
    id: 'FASH_02',
    category: 'Fashion',
    name: 'Classic Analog Watch',
    description: 'Timeless design with a minimalist dial and leather strap.',
    price: 129.99,
    rating: 4.7,
    reviews: 65,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
    specs: { 'Movement': 'Quartz', 'Case': 'Stainless Steel', 'Water Resistance': '3ATM' }
  },
  {
    id: 'FASH_03',
    category: 'Fashion',
    name: 'Minimalist Sneakers',
    description: 'Clean lines and premium comfort for everyday wear.',
    price: 99.99,
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    specs: { 'Upper': 'Leather', 'Sole': 'Rubber', 'Fit': 'True to size' }
  },
  {
    id: 'FASH_04',
    category: 'Fashion',
    name: 'Sunglasses UV Pro',
    description: 'Protect your eyes in style with polarized lenses.',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    specs: { 'Lens': 'Polarized', 'Frame': 'Acetate', 'UV Protection': '100%' }
  },
  {
    id: 'FASH_05',
    category: 'Fashion',
    name: 'Elegant Women’s Tote Bag',
    description: 'Spacious and stylish, the perfect accessory for any outfit.',
    price: 79.99,
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80',
    specs: { 'Material': 'Vegan Leather', 'Closure': 'Zip', 'Dimensions': '35x30x15cm' }
  },
  {
    id: 'FASH_06',
    category: 'Fashion',
    name: 'Travel Duffel Bag',
    description: 'Rugged canvas duffel for weekend getaways.',
    price: 119.99,
    rating: 4.7,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    specs: { 'Material': 'Canvas', 'Volume': '40L', 'Strap': 'Adjustable' }
  },

  // Home & Kitchen
  {
    id: 'HOME_01',
    category: 'Home',
    name: 'Air Fryer Turbo',
    description: 'Cook healthy meals with less oil. Rapid air technology.',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 200,
    image: 'https://images.unsplash.com/photo-1626082927389-d52b8f2a2468?auto=format&fit=crop&w=600&q=80',
    specs: { 'Capacity': '5L', 'Power': '1500W', 'Presets': '8' }
  },
  {
    id: 'HOME_02',
    category: 'Home',
    name: 'Nonstick Cookware Set',
    description: 'Premium aluminum cookware with durable nonstick coating.',
    price: 199.99,
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1584990347449-a0846b1e1631?auto=format&fit=crop&w=600&q=80',
    specs: { 'Pieces': '10', 'Material': 'Aluminum', 'Oven Safe': 'Yes' }
  },
  {
    id: 'HOME_03',
    category: 'Home',
    name: 'Smart LED Lamp',
    description: 'Adjust brightness and color temperature with your phone.',
    price: 49.99,
    rating: 4.5,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1507473888900-52a1b2d8f7d3?auto=format&fit=crop&w=600&q=80',
    specs: { 'Connectivity': 'Wi-Fi', 'Colors': '16 Million', 'Voice Control': 'Yes' }
  },
  {
    id: 'HOME_04',
    category: 'Home',
    name: 'Ceramic Home Decor Vase',
    description: 'Minimalist ceramic vase to elevate your interior design.',
    price: 39.99,
    rating: 4.6,
    reviews: 30,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80',
    specs: { 'Material': 'Ceramic', 'Height': '25cm', 'Style': 'Modern' }
  },
  {
    id: 'HOME_05',
    category: 'Home',
    name: 'Electric Kettle RapidBoil',
    description: 'Boil water in seconds with this high-efficiency kettle.',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1520038410233-7141dd782f08?auto=format&fit=crop&w=600&q=80',
    specs: { 'Capacity': '1.7L', 'Material': 'Stainless Steel', 'Auto Shut-off': 'Yes' }
  },
  {
    id: 'HOME_06',
    category: 'Home',
    name: 'Aroma Diffuser',
    description: 'Create a relaxing atmosphere with essential oils and soft light.',
    price: 34.99,
    rating: 4.7,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=600&q=80',
    specs: { 'Capacity': '300ml', 'Runtime': '10h', 'Light': '7 LED Colors' }
  },

  // Beauty
  {
    id: 'BEAUTY_01',
    category: 'Beauty',
    name: 'Facial Steamer',
    description: 'Spa-quality facial treatment at home for deep cleansing.',
    price: 69.99,
    rating: 4.6,
    reviews: 90,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    specs: { 'Tank': '100ml', 'Steam Time': '15min', 'Type': 'Nano Ionic' }
  },
  {
    id: 'BEAUTY_02',
    category: 'Beauty',
    name: 'Hair Dryer IonX',
    description: 'Fast drying with ionic technology for frizz-free hair.',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80',
    specs: { 'Power': '2000W', 'Settings': '3 Heat/2 Speed', 'Attachments': '2' }
  },
  {
    id: 'BEAUTY_03',
    category: 'Beauty',
    name: 'Skin Care Vitamin C Serum',
    description: 'Brighten and revitalize your skin with pure Vitamin C.',
    price: 49.99,
    rating: 4.7,
    reviews: 250,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    specs: { 'Volume': '30ml', 'Type': 'Serum', 'Key Ingredient': '20% Vitamin C' }
  },
  {
    id: 'BEAUTY_04',
    category: 'Beauty',
    name: 'Makeup Brush Set',
    description: 'Professional grade synthetic brushes for flawless application.',
    price: 39.99,
    rating: 4.5,
    reviews: 75,
    image: 'https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&w=600&q=80',
    specs: { 'Pieces': '12', 'Material': 'Synthetic', 'Case': 'Included' }
  },
  {
    id: 'BEAUTY_05',
    category: 'Beauty',
    name: 'Portable Massager',
    description: 'Relieve muscle tension anytime, anywhere.',
    price: 89.99,
    rating: 4.4,
    reviews: 60,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    specs: { 'Battery': '3h', 'Speeds': '4', 'Heads': '4' }
  },
  {
    id: 'BEAUTY_06',
    category: 'Beauty',
    name: 'Hair Straightener Pro',
    description: 'Salon-smooth hair in minutes with ceramic plates.',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 130,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
    specs: { 'Max Temp': '230°C', 'Plates': 'Ceramic', 'Heat-up': '30s' }
  }
];

export const EVENT_DEFS: Record<string, EventDef> = {
  // Navigation (GA4 style)
  'page_view': {
      group: 'Navigation',
      example_payload: '{"page_title": "Home Page", "page_location": "https://trackfast.demo/"}',
      why_it_matters: 'The fundamental event for site measurement, providing session counts, bounce rates, and overall page performance.',
      loss_if_missing: 'You lose all visibility into site traffic volume and page performance metrics.'
  },
  'link_click': {
      group: 'Navigation',
      example_payload: '{"link_url": "https://external.com", "link_text": "External Link", "outbound": true}',
      why_it_matters: 'Tracks clicks on outbound links, crucial for measuring traffic to partner sites.',
      loss_if_missing: 'You cannot attribute traffic or revenue generated from affiliate links.'
  },
  'footer_click': {
      group: 'Navigation',
      example_payload: '{"link_text": "Privacy Policy", "section": "Footer"}',
      why_it_matters: 'Tracks usage of site footer navigation.',
      loss_if_missing: 'Cannot measure engagement with support or legal pages.'
  },
  'search': {
      group: 'Navigation',
      example_payload: '{"search_term": "smartwatch"}',
      why_it_matters: 'Identifies user intent and product demand.',
      loss_if_missing: 'You miss key insights on what users are looking for but not finding.'
  },
  // Product Interaction (GA4 Commerce)
  'view_item_list': {
      group: 'Product Interaction',
      example_payload: '{"item_list_id": "category_wearables", "item_list_name": "Wearables", "items": [{"item_id": "ELEC_01", "item_name": "Smartwatch Pro X", "price": 299.99}]}',
      why_it_matters: 'Measures exposure of product lists, key for optimizing placement.',
      loss_if_missing: 'You cannot calculate click-through rates (CTR) on category pages.'
  },
  'view_item': {
      group: 'Product Interaction',
      example_payload: '{"currency": "USD", "value": 299.99, "items": [{"item_id": "ELEC_01", "item_name": "Smartwatch Pro X", "price": 299.99, "item_category": "Electronics"}]}',
      why_it_matters: 'Tracks product page view volume, vital for calculating "Add to Cart Rate".',
      loss_if_missing: 'You cannot measure product page conversion rate.'
  },
  'select_item': {
      group: 'Product Interaction',
      example_payload: '{"item_list_id": "featured", "item_list_name": "Featured Products", "items": [{"item_id": "ELEC_01", "item_name": "Smartwatch Pro X"}]}',
      why_it_matters: 'Measures which products users click from a list.',
      loss_if_missing: 'You cannot identify effective product placements.'
  },
  'view_product_details': {
    group: 'Product Interaction',
    example_payload: '{"items": [{"item_id": "ELEC_01", "item_name": "Smartwatch Pro X"}], "source": "product_card"}',
    why_it_matters: 'Tracks explicit intent to learn more about a product from the listing page.',
    loss_if_missing: 'Cannot separate casual browsers from interested prospects.'
  },
  'add_to_wishlist': {
      group: 'Product Interaction',
      example_payload: '{"currency": "USD", "value": 299.99, "items": [{"item_id": "ELEC_01", "item_name": "Smartwatch Pro X"}]}',
      why_it_matters: 'Measures interest for future purchases and user affinity.',
      loss_if_missing: 'Cannot analyze consideration phase or potential future revenue.'
  },
  'share': {
      group: 'Product Interaction',
      example_payload: '{"method": "copy_link", "content_type": "product", "item_id": "ELEC_01"}',
      why_it_matters: 'Measures viral reach and organic advocacy.',
      loss_if_missing: 'Cannot track social engagement and word-of-mouth.'
  },
  // Cart (GA4 Commerce)
  'add_to_cart': {
      group: 'Cart Interaction',
      example_payload: '{"currency": "USD", "value": 299.99, "items": [{"item_id": "ELEC_01", "item_name": "Smartwatch Pro X", "price": 299.99, "quantity": 1}]}',
      why_it_matters: 'The most important micro-conversion.',
      loss_if_missing: 'Cannot calculate Add-to-Cart rate.'
  },
  'view_cart': {
      group: 'Cart Interaction',
      example_payload: '{"currency": "USD", "value": 449.99, "items": [{"item_id": "ELEC_01", "quantity": 1}, {"item_id": "ELEC_02", "quantity": 1}]}',
      why_it_matters: 'Measures how many users review their cart.',
      loss_if_missing: 'Cannot measure Cart-to-Checkout conversion rate.'
  },
  'remove_from_cart': {
      group: 'Cart Interaction',
      example_payload: '{"currency": "USD", "value": 150.00, "items": [{"item_id": "HEADPHONES_02", "quantity": 1}]}',
      why_it_matters: 'Crucial for measuring buyer remorse or price shock.',
      loss_if_missing: 'Cannot diagnose price sensitivity.'
  },
  // Checkout (GA4 Commerce)
  'begin_checkout': {
      group: 'Checkout & Purchase',
      example_payload: '{"currency": "USD", "value": 449.99, "items": [{"item_id": "ELEC_01", "quantity": 1}, {"item_id": "ELEC_02", "quantity": 1}]}',
      why_it_matters: 'First step of high-value funnel.',
      loss_if_missing: 'You lose ability to measure drop-off after cart.'
  },
  'buy_now_clicked': {
    group: 'Checkout & Purchase',
    example_payload: '{"items": [{"item_id": "ELEC_01"}]}',
    why_it_matters: 'Tracks high-intent immediate purchase behavior.',
    loss_if_missing: 'Cannot measure "Direct Buy" impulse effectiveness.'
  },
  'add_shipping_info': {
      group: 'Checkout & Purchase',
      example_payload: '{"currency": "USD", "value": 449.99, "shipping_tier": "Standard", "items": [{"item_id": "ELEC_01"}]}',
      why_it_matters: 'Measures drop-off between shipping and payment.',
      loss_if_missing: 'Cannot diagnose form friction or unexpected costs.'
  },
  'add_payment_info': {
      group: 'Checkout & Purchase',
      example_payload: '{"currency": "USD", "value": 449.99, "payment_type": "Visa", "items": [{"item_id": "ELEC_01"}]}',
      why_it_matters: 'Measures drop-off before final purchase.',
      loss_if_missing: 'Cannot diagnose payment-specific issues.'
  },
  'purchase': {
      group: 'Checkout & Purchase',
      example_payload: '{"transaction_id": "ORD-123", "value": 449.99, "currency": "USD", "tax": 29.99, "shipping": 0, "items": [{"item_id": "ELEC_01", "quantity": 1}]}',
      why_it_matters: 'The goal of the entire funnel.',
      loss_if_missing: 'You lose all ability to attribute revenue to marketing.'
  },
  // Variant Selection
  'select_color': {
      group: 'Variant Selection',
      example_payload: '{"item_id": "ELEC_01", "content_type": "product_variant", "variant_type": "color", "selected_variant": "Silver"}',
      why_it_matters: 'Tracks specific attribute interest.',
      loss_if_missing: 'You lose ability to analyze product interest by attribute.'
  },
  'select_size': {
      group: 'Variant Selection',
      example_payload: '{"item_id": "ELEC_01", "content_type": "product_variant", "variant_type": "size", "selected_variant": "Large"}',
      why_it_matters: 'Crucial for fashion/apparel inventory planning.',
      loss_if_missing: 'You cannot diagnose inventory or sizing issues.'
  },
  'select_variant': {
      group: 'Variant Selection',
      example_payload: '{"item_id": "ELEC_01", "content_type": "product", "item_variant": "Black-Large"}',
      why_it_matters: 'Meta-event firing when all variants are selected.',
      loss_if_missing: 'Cannot measure conversion rate for fully configured products.'
  },
  // Video
  'video_start': {
      group: 'Video',
      example_payload: '{"video_title": "Product Overview"}',
      why_it_matters: 'Measures video engagement rate.',
      loss_if_missing: 'Cannot justify ROI of video content.'
  },
  'video_progress_25': {
      group: 'Video',
      example_payload: '{"video_title": "Product Overview"}',
      why_it_matters: 'Benchmark for initial interest.',
      loss_if_missing: 'Cannot segment audiences by engagement.'
  },
  'video_progress_50': {
      group: 'Video',
      example_payload: '{"video_title": "Product Overview"}',
      why_it_matters: 'Midpoint commitment.',
      loss_if_missing: 'Cannot analyze correlation between video and conversion.'
  },
  'video_complete': {
      group: 'Video',
      example_payload: '{"video_title": "Product Overview"}',
      why_it_matters: 'Ultimate engagement metric.',
      loss_if_missing: 'Cannot measure success of expensive content assets.'
  },
  // Forms & Account
  'form_start': {
      group: 'Forms & Account',
      example_payload: '{"form_name": "contact_form"}',
      why_it_matters: 'Tracks intent to fill a form.',
      loss_if_missing: 'Cannot measure form abandonment.'
  },
  'newsletter_submitted': {
    group: 'Forms & Account',
    example_payload: '{"location": "footer"}',
    why_it_matters: 'Measures subscriber growth.',
    loss_if_missing: 'Cannot track email marketing list performance.'
  },
  'contact_form_submit': {
    group: 'Forms & Account',
    example_payload: '{"subject": "Support Request"}',
    why_it_matters: 'Tracks successful support inquiries.',
    loss_if_missing: 'Cannot measure support volume via web.'
  },
  'login_success': {
      group: 'Forms & Account',
      example_payload: '{"method": "google"}',
      why_it_matters: 'Confirms successful authentication.',
      loss_if_missing: 'Cannot measure success of login methods.'
  },
  'login_error': {
      group: 'Forms & Account',
      example_payload: '{"reason": "invalid_password"}',
      why_it_matters: 'Tracks failure reasons.',
      loss_if_missing: 'Cannot diagnose authentication issues.'
  },
  // Registration
  'input_field_focused': {
    group: 'Registration',
    example_payload: '{"field_name": "email"}',
    why_it_matters: 'Tracks micro-interactions and potential friction points in forms.',
    loss_if_missing: 'Harder to diagnose which specific fields cause drop-off.'
  },
  'password_strength_checked': {
    group: 'Registration',
    example_payload: '{"score": 3, "status": "Good"}',
    why_it_matters: 'Tracks if users are creating secure passwords or struggling with requirements.',
    loss_if_missing: 'Cannot optimize password policies or UI feedback.'
  },
  'terms_policy_checked': {
    group: 'Registration',
    example_payload: '{"checked": true}',
    why_it_matters: 'Legal compliance tracking and user intent signal.',
    loss_if_missing: 'No record of active consent.'
  },
  'create_account_clicked': {
    group: 'Registration',
    example_payload: '{"method": "email"}',
    why_it_matters: 'The conversion event for registration.',
    loss_if_missing: 'Cannot track new user growth from the form.'
  },
  'google_signup_clicked': {
    group: 'Registration',
    example_payload: '{"method": "google"}',
    why_it_matters: 'Tracks preference for social login.',
    loss_if_missing: 'Cannot optimize login options.'
  },
  'facebook_signup_clicked': {
    group: 'Registration',
    example_payload: '{"method": "facebook"}',
    why_it_matters: 'Tracks preference for social login.',
    loss_if_missing: 'Cannot optimize login options.'
  },
  // Reviews
  'rating_summary_viewed': {
    group: 'Reviews',
    example_payload: '{"product_id": "ELEC_01", "average_rating": 4.7, "total_reviews": 248}',
    why_it_matters: 'Tracks exposure to social proof summary.',
    loss_if_missing: 'Cannot correlate aggregate rating visibility with conversion.'
  },
  'review_helpful_clicked': {
    group: 'Reviews',
    example_payload: '{"review_id": "REV_123", "action": "helpful"}',
    why_it_matters: 'Measures engagement with UGC and identifies top content.',
    loss_if_missing: 'Cannot sort reviews by helpfulness reliably.'
  },
  'review_report_clicked': {
    group: 'Reviews',
    example_payload: '{"review_id": "REV_123", "reason": "spam"}',
    why_it_matters: 'Community moderation signal.',
    loss_if_missing: 'Harder to maintain review quality.'
  },
  'review_filter_applied': {
    group: 'Reviews',
    example_payload: '{"filter_type": "rating", "value": "5_star"}',
    why_it_matters: 'Shows what criteria matter most to users.',
    loss_if_missing: 'Cannot optimize default review sorting/filtering.'
  },
  'review_sort_selected': {
    group: 'Reviews',
    example_payload: '{"sort_order": "newest"}',
    why_it_matters: 'Indicates user preference for review consumption (recency vs quality).',
    loss_if_missing: 'Default sort optimization is guesswork.'
  },
  'review_form_opened': {
    group: 'Reviews',
    example_payload: '{"product_id": "ELEC_01"}',
    why_it_matters: 'Intent to contribute content.',
    loss_if_missing: 'Cannot measure form abandonment rate.'
  },
  'rating_selected': {
    group: 'Reviews',
    example_payload: '{"rating": 5}',
    why_it_matters: 'Tracks sentiment during creation flow.',
    loss_if_missing: 'Cannot analyze sentiment distribution before submission.'
  },
  'review_image_uploaded': {
    group: 'Reviews',
    example_payload: '{"image_count": 2}',
    why_it_matters: 'Tracks rich content contribution.',
    loss_if_missing: 'Cannot measure impact of image upload feature.'
  },
  'review_submitted': {
    group: 'Reviews',
    example_payload: '{"review_id": "NEW_REV", "rating": 5, "has_images": true}',
    why_it_matters: 'Conversion event for UGC.',
    loss_if_missing: 'Cannot track volume of new reviews.'
  },
  'review_moderated': {
    group: 'Reviews',
    example_payload: '{"review_id": "REV_123", "action": "approve"}',
    why_it_matters: 'Admin action tracking.',
    loss_if_missing: 'No audit trail for moderation.'
  },
  // Home Interactions
  'benefit_interaction': {
    group: 'Home Interaction',
    example_payload: '{"benefit": "Fast Shipping"}',
    why_it_matters: 'Tracks which value propositions resonate with users.',
    loss_if_missing: 'Cannot optimize value selling points.'
  },
  'trust_section_viewed': {
    group: 'Home Interaction',
    example_payload: '{"section": "Trust Signals"}',
    why_it_matters: 'Measures exposure to credibility markers.',
    loss_if_missing: 'Unknown impact of social proof on conversion.'
  },
  'category_card_clicked': {
    group: 'Home Interaction',
    example_payload: '{"category": "Electronics"}',
    why_it_matters: 'Indicates user interest and navigation preference.',
    loss_if_missing: 'Harder to optimize homepage layout and merchandising.'
  },
  'testimonial_slide_changed': {
    group: 'Home Interaction',
    example_payload: '{"direction": "next", "index": 1}',
    why_it_matters: 'Measures engagement with social proof content.',
    loss_if_missing: 'Cannot determine if users are reading reviews.'
  },
  'testimonial_clicked': {
    group: 'Home Interaction',
    example_payload: '{"author": "Jane D."}',
    why_it_matters: 'Deep engagement with review content.',
    loss_if_missing: 'Missed signal of high intent.'
  },
  'blog_read_more_clicked': {
    group: 'Content Interaction',
    example_payload: '{"article_title": "Top 10 Tech Trends"}',
    why_it_matters: 'Measures content marketing effectiveness.',
    loss_if_missing: 'Cannot attribute conversions to blog content.'
  },
  'blog_section_viewed': {
    group: 'Content Interaction',
    example_payload: '{"section": "Latest News"}',
    why_it_matters: 'Tracks visibility of content marketing.',
    loss_if_missing: 'Unknown reach of educational content.'
  },
  'newsletter_viewed': {
    group: 'Marketing',
    example_payload: '{"location": "home_bottom"}',
    why_it_matters: 'Measures exposure of lead gen form.',
    loss_if_missing: 'Cannot calculate true form conversion rate.'
  },
  'hero_cta_click': {
    group: 'Navigation',
    example_payload: '{"location": "hero_banner"}',
    why_it_matters: 'Measures initial engagement on landing page.',
    loss_if_missing: 'Cannot optimize hero banner copy.'
  },
  'newsletter_signup': {
    group: 'Marketing',
    example_payload: '{"location": "footer"}',
    why_it_matters: 'Measures lead generation.',
    loss_if_missing: 'Cannot track marketing list growth.'
  },
  'apply_coupon': {
    group: 'Marketing',
    example_payload: '{"code": "SAVE20"}',
    why_it_matters: 'Tracks discount usage.',
    loss_if_missing: 'Cannot calculate true margin on discounted sales.'
  }
};

export const AUTO_DEMO_STEPS: AutoDemoStep[] = [
  { page: 'home', event: 'page_view', delay: 500, label: 'Page Load', firePageView: true, payload: { page_title: 'Home Page', page_location: 'https://trackfast.demo/' } },
  { page: 'plp', event: 'hero_cta_click', delay: 1500, label: 'Hero CTA Click', firePageView: true, payload: { location: 'hero_banner' } },
  { page: 'pdp', event: 'select_item', delay: 1500, payload: { item_list_id: "featured", item_list_name: "Featured Products", items: [{ item_id: 'ELEC_01', item_name: 'Smartwatch Pro X' }] }, label: 'Select Item', firePageView: true },
  { page: 'pdp', event: 'select_color', delay: 800, payload: { item_id: 'ELEC_01', content_type: "product_variant", variant_type: "color", selected_variant: 'Black' }, label: 'Select Color' },
  { page: 'pdp', event: 'select_size', delay: 800, payload: { item_id: 'ELEC_01', content_type: "product_variant", variant_type: "size", selected_variant: 'Large' }, label: 'Select Size' },
  { page: 'pdp', event: 'select_variant', delay: 200, payload: { item_id: 'ELEC_01', content_type: "product", item_variant: 'Black-Large' }, label: 'Select Variant' },
  { page: 'pdp', event: 'add_to_wishlist', delay: 800, payload: { currency: "USD", value: 299.99, items: [{ item_id: 'ELEC_01', item_name: 'Smartwatch Pro X', price: 299.99 }] }, label: 'Add to Wishlist' },
  { page: 'pdp', event: 'video_start', delay: 1000, label: 'Video Start' },
  { page: 'pdp', event: 'video_progress_25', delay: 500, label: 'Video 25%' },
  { page: 'pdp', event: 'video_complete', delay: 500, label: 'Video Complete' },
  { page: 'pdp', event: 'add_to_cart', delay: 1000, payload: { currency: "USD", value: 299.99, items: [{ item_id: 'ELEC_01', item_name: 'Smartwatch Pro X', price: 299.99, quantity: 1 }] }, label: 'Add to Cart' },
  { page: 'cart', event: 'view_cart', delay: 1000, label: 'View Cart', firePageView: true, payload: { currency: "USD", value: 299.99, items: [{ item_id: 'ELEC_01', quantity: 1 }] } },
  { page: 'checkout-shipping', event: 'begin_checkout', delay: 1500, label: 'Begin Checkout', firePageView: true, payload: { currency: "USD", value: 299.99, items: [{ item_id: 'ELEC_01', quantity: 1 }] } },
  { page: 'checkout-payment', event: 'add_shipping_info', delay: 1000, label: 'Add Shipping Info', payload: { currency: "USD", value: 299.99, shipping_tier: "Standard", items: [{ item_id: 'ELEC_01' }] } },
  { page: 'confirmation', event: 'purchase', delay: 2000, payload: { transaction_id: 'ORD-AUTO-DEMO', value: 299.99, currency: "USD", tax: 0, shipping: 0, items: [{ item_id: 'ELEC_01', quantity: 1 }] }, label: 'Purchase', firePageView: true }
];