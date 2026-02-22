import type { Room, VibeOption, StayAddOn, Experience, MenuCategory, PaymentConfig, HotelInfo, Review, NearbyPlace, GalleryImage, EventPackage, NavItem, RestaurantHours, SeatingOption } from '../types';

export const hotelInfo: HotelInfo = {
  name: 'Hoyga Jiifka Ee Shaahid Hotel',
  nameSomali: 'Hoyga Jiifka Ee Shaahid',
  tagline: 'Your Comfort, Our Priority',
  description: 'Experience the perfect blend of modern comfort and warm Somali hospitality in the heart of Jijiga. Hoyga Jiifka Ee Shaahid Hotel offers premium accommodations, authentic Somali cuisine, and world-class service for business and leisure travelers alike.',
  address: '9R26+G2Q, Jijiga',
  city: 'Jijiga',
  region: 'Somali Region',
  country: 'Ethiopia',
  phone: '+252789881',
  phone2: '+251943733333',
  phone3: '+251970357306',
  whatsapp: '251976040457',
  email: 'shaahidhotel5@gmail.com',
  website: 'https://www.shaahidhotel.com',
  coordinates: { lat: 9.350164523458709, lng: 42.81108139331711 },
  socialMedia: {
    facebook: 'https://facebook.com/shaahidhotel',
    instagram: 'https://instagram.com/shaahidhotel',
    telegram: 'https://t.me/shaahidhotel'
  },
  checkInTime: '14:00',
  checkOutTime: '12:00',
  timezone: 'Africa/Addis_Ababa'
};

export const navItems: NavItem[] = [
  { label: 'Home', href: 'home' },
  { label: 'Rooms', href: 'rooms' },
  { label: 'Restaurant', href: 'restaurant' },
  { label: 'Facilities', href: 'facilities' },
  { label: 'Gallery', href: 'gallery' },
  { label: 'Events', href: 'events' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' }
];

export const rooms: Room[] = [
  {
    id: '1',
    slug: 'standard-room',
    name: 'Standard Room',
    fromPriceETB: 2200,
    priceRangeETB: { min: 2200, max: 3200 },
    nameSomali: 'Qolka Caadiga ah',
    description: 'Comfortable and well-appointed room perfect for solo travelers or couples. Features modern amenities and a cozy atmosphere for a restful stay.',
    shortDescription: 'Cozy comfort with essential amenities',
    pricePerNight: 2200,
    priceUSD: 65,
    size: '24 m²',
    maxGuests: 2,
    bedType: '1 Queen Bed',
    images: ['/Normal Single Room.jpg'],
    amenities: [
      { id: 'wifi', name: 'Free Wi-Fi', icon: 'Wifi', category: 'tech' },
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind', category: 'comfort' },
      { id: 'tv', name: 'Flat-screen TV', icon: 'Tv', category: 'tech' },
      { id: 'phone', name: 'Direct Dial Phone', icon: 'Phone', category: 'service' }
    ],
    features: ['Work desk with lamp', 'En-suite bathroom with shower', 'Wardrobe and luggage rack', 'Daily housekeeping'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
      childrenPolicy: 'Children under 6 stay free when using existing beds',
      petPolicy: 'No pets allowed',
      smokingPolicy: 'Non-smoking room'
    },
    isAvailable: true,
    category: 'standard',
    floor: 2,
    view: 'City View'
  },
  {
    id: '2',
    slug: 'deluxe-double',
    name: 'Deluxe Double',
    fromPriceETB: 2800,
    priceRangeETB: { min: 2800, max: 3600 },
    nameSomali: 'Deluxe Laba Qof',
    description: 'Our most popular room featuring a spacious layout with premium furnishings. The signature Shaahid Hotel experience with our iconic red accents and exceptional comfort.',
    shortDescription: 'Guest favorite with signature Shaahid comfort',
    pricePerNight: 2800,
    priceUSD: 78,
    size: '28 m²',
    maxGuests: 2,
    bedType: '1 King Bed',
    images: ['/Normal Single Room.jpg'],
    amenities: [
      { id: 'wifi', name: 'Free Wi-Fi', icon: 'Wifi', category: 'tech' },
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind', category: 'comfort' },
      { id: 'tv', name: 'Flat-screen TV', icon: 'Tv', category: 'tech' },
      { id: 'minibar', name: 'Mini Bar', icon: 'Coffee', category: 'comfort' },
      { id: 'safe', name: 'In-room Safe', icon: 'Shield', category: 'service' },
      { id: 'room-service', name: '24/7 Room Service', icon: 'Utensils', category: 'service' }
    ],
    features: ['Seating area with armchairs', 'Premium bedding and linens', 'En-suite bathroom with rain shower', 'Coffee and tea making facilities', 'Evening turndown service'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
      childrenPolicy: 'Children under 6 stay free when using existing beds',
      petPolicy: 'No pets allowed',
      smokingPolicy: 'Non-smoking room'
    },
    isAvailable: true,
    category: 'deluxe',
    floor: 3,
    view: 'City View'
  },
  {
    id: '3',
    slug: 'twin-room',
    name: 'Twin Room',
    fromPriceETB: 2400,
    priceRangeETB: { min: 2400, max: 3000 },
    nameSomali: 'Qolka Laba Sariir',
    description: 'Perfect for friends or colleagues traveling together. Two comfortable single beds with all the amenities you need for a productive stay.',
    shortDescription: 'Ideal for shared travel experiences',
    pricePerNight: 2400,
    priceUSD: 70,
    size: '26 m²',
    maxGuests: 2,
    bedType: '2 Single Beds',
    images: ['/Normal Single Room.jpg'],
    amenities: [
      { id: 'wifi', name: 'Free Wi-Fi', icon: 'Wifi', category: 'tech' },
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind', category: 'comfort' },
      { id: 'tv', name: 'Flat-screen TV', icon: 'Tv', category: 'tech' },
      { id: 'work-desk', name: 'Work Desk', icon: 'Briefcase', category: 'service' }
    ],
    features: ['Two separate work desks', 'Individual reading lights', 'En-suite bathroom with shower', 'Ample storage space'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
      childrenPolicy: 'Children under 6 stay free when using existing beds',
      petPolicy: 'No pets allowed',
      smokingPolicy: 'Non-smoking room'
    },
    isAvailable: true,
    category: 'standard',
    floor: 2,
    view: 'Garden View'
  },
  {
    id: '4',
    slug: 'vip-suite',
    name: 'VIP Suite',
    fromPriceETB: 4800,
    priceRangeETB: { min: 4800, max: 6500 },
    nameSomali: 'Suite-ka VIP',
    description: 'Our most luxurious accommodation featuring a separate living area, premium amenities, and panoramic city views. Perfect for discerning guests seeking the ultimate in comfort and style.',
    shortDescription: 'Ultimate luxury with separate living space',
    pricePerNight: 4800,
    priceUSD: 120,
    size: '45 m²',
    maxGuests: 3,
    bedType: '1 King Bed + Sofa Bed',
    images: ['/Normal Single Room.jpg'],
    amenities: [
      { id: 'wifi', name: 'Free Wi-Fi', icon: 'Wifi', category: 'tech' },
      { id: 'ac', name: 'Air Conditioning', icon: 'Wind', category: 'comfort' },
      { id: 'tv', name: '2 Flat-screen TVs', icon: 'Tv', category: 'tech' },
      { id: 'minibar', name: 'Premium Mini Bar', icon: 'Coffee', category: 'comfort' },
      { id: 'safe', name: 'In-room Safe', icon: 'Shield', category: 'service' },
      { id: 'jacuzzi', name: 'Jacuzzi Tub', icon: 'Bath', category: 'bathroom' },
      { id: 'balcony', name: 'Private Balcony', icon: 'Sun', category: 'comfort' }
    ],
    features: ['Separate living room with sofa', 'Dining area for 4 guests', 'Master bedroom with king bed', 'Luxury bathroom with jacuzzi', 'Private balcony with city views', 'Complimentary airport transfer', 'Priority check-in/out', 'Butler service available'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
      childrenPolicy: 'Children under 12 stay free when using existing beds',
      petPolicy: 'No pets allowed',
      smokingPolicy: 'Non-smoking room'
    },
    isAvailable: true,
    category: 'vip',
    floor: 4,
    view: 'Panoramic City View'
  }
];

export const vibeOptions: VibeOption[] = [
  {
    id: 'business-calm',
    name: 'Business Calm',
    nameSomali: 'Ganacsi Degan',
    description: 'Streamlined stay for the productive traveler. Quiet room, express laundry, and high-speed WiFi.',
    image: '/lotus_room1.jpg',
    color: '#3B82F6',
    recommendedAddOns: ['early-checkin', 'express-laundry', 'premium-wifi']
  },
  {
    id: 'romantic-lotus',
    name: 'Romantic Lotus',
    nameSomali: 'Jacaylka Lotus',
    description: 'Intimate setting with rose petals, champagne, and a private dinner setup for two.',
    image: '/lotus_suite.jpg',
    color: '#EC4899',
    recommendedAddOns: ['late-checkout', 'flower-arrangement', 'private-dinner']
  },
  {
    id: 'family-comfort',
    name: 'Family Comfort',
    nameSomali: 'Deganaansho Qoys',
    description: 'Spacious accommodation with extra beds, child-friendly amenities, and connecting rooms.',
    image: '/lotus_room2.jpg',
    color: '#10B981',
    recommendedAddOns: ['extra-bed', 'crib', 'kids-menu']
  },
  {
    id: 'explorer-jijiga',
    name: 'Explorer Jijiga',
    nameSomali: 'Sahaminta Jijiga',
    description: 'Discover the city with our curated local experiences, city guide, and cultural dinner.',
    image: '/hero_jijiga_night.jpg',
    color: '#F59E0B',
    recommendedAddOns: ['city-guide', 'cultural-dinner', 'airport-pickup']
  },
  {
    id: 'quiet-retreat',
    name: 'Quiet Retreat',
    nameSomali: 'Xasillooni',
    description: 'Disconnect and rejuvenate. Spa services, healthy meals, and absolute tranquility.',
    image: '/lotus_standard.jpg',
    color: '#8B5CF6',
    recommendedAddOns: ['spa-package', 'healthy-meals', 'late-checkout']
  }
];

export const stayAddOns: StayAddOn[] = [
  { id: 'early-checkin', name: 'Early Check-in', description: 'Check in as early as 10:00 AM', price: 500, priceType: 'per-stay', category: 'comfort', icon: 'Clock' },
  { id: 'late-checkout', name: 'Late Check-out', description: 'Extend your stay until 4:00 PM', price: 500, priceType: 'per-stay', category: 'comfort', icon: 'Clock' },
  { id: 'extra-bed', name: 'Extra Bed', description: 'Additional single bed in your room', price: 800, priceType: 'per-night', category: 'upgrade', icon: 'Bed' },
  { id: 'express-laundry', name: 'Express Laundry', description: 'Same-day laundry service', price: 300, priceType: 'per-stay', category: 'service', icon: 'Shirt' },
  { id: 'premium-wifi', name: 'Premium WiFi', description: 'High-speed dedicated connection', price: 200, priceType: 'per-night', category: 'upgrade', icon: 'Wifi' },
  { id: 'airport-pickup', name: 'Airport Transfer', description: 'Private car from Jijiga Airport', price: 800, priceType: 'per-stay', category: 'service', icon: 'Car' },
  { id: 'flower-arrangement', name: 'Flower Arrangement', description: 'Fresh flowers in your room', price: 400, priceType: 'per-stay', category: 'upgrade', icon: 'Flower' },
  { id: 'private-dinner', name: 'Private Dinner Setup', description: 'Romantic dinner in your room or balcony', price: 1500, priceType: 'per-stay', category: 'upgrade', icon: 'Utensils' },
  { id: 'crib', name: 'Baby Crib', description: 'Safe and comfortable crib for infants', price: 0, priceType: 'per-stay', category: 'comfort', icon: 'Baby' },
  { id: 'spa-package', name: 'In-Room Spa Package', description: 'Massage and relaxation treatments', price: 1200, priceType: 'per-stay', category: 'service', icon: 'Sparkles' }
];

export const experiences: Experience[] = [
  { id: 'city-guide', name: 'Jijiga City Guide', nameSomali: 'Hagaha Magaalada Jijiga', description: 'Personalized tour of Jijiga with a local guide. Visit markets, historic sites, and cultural landmarks.', duration: '3 hours', price: 1500, image: '/hero_jijiga_night.jpg', category: 'cultural', available: true },
  { id: 'cultural-dinner', name: 'Traditional Somali Dinner', nameSomali: 'Cunto Dhaqan Soomaali', description: 'Authentic Somali dining experience with traditional dishes, music, and cultural storytelling.', duration: '2 hours', price: 2000, image: '/dining_ethiopian.jpg', category: 'culinary', available: true },
  { id: 'sunrise-trip', name: 'Sunrise at Karamarda', nameSomali: 'Soo Bixidda Karamarda', description: 'Early morning trip to Karamarda hills for breathtaking sunrise views over the Somali region.', duration: '4 hours', price: 2500, image: '/map_jijiga.jpg', category: 'adventure', available: true },
  { id: 'shopping-assistance', name: 'Market Shopping Assistant', nameSomali: 'Caawimaadka Suuqa', description: 'Guided shopping at Jijiga central market with local bargaining assistance.', duration: '2 hours', price: 800, image: '/lotus_gym.jpg', category: 'cultural', available: true }
];

export const restaurantMenu: MenuCategory[] = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    nameSomali: 'Quraac',
    description: 'Start your day with authentic Somali and continental breakfast options',
    order: 1,
    items: [
      { id: 'canjeero-maraq', name: 'Canjeero with Maraq', nameSomali: 'Canjeero iyo Maraq', description: 'Traditional Somali pancakes served with savory meat or vegetable stew', price: 350, isAvailable: true, isVegetarian: false, isSpicy: false, isPopular: true, tags: ['traditional', 'halal'] },
      { id: 'malawah', name: 'Malawah', nameSomali: 'Malawah', description: 'Sweet Somali pancake with honey and butter', price: 280, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['sweet', 'vegetarian'] },
      { id: 'ful-medames', name: 'Ful Medames', nameSomali: 'Ful', description: 'Slow-cooked fava beans with olive oil, lemon, and spices', price: 250, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['vegetarian', 'healthy'] },
      { id: 'continental-breakfast', name: 'Continental Breakfast', description: 'Fresh bread, croissants, jam, butter, and coffee or tea', price: 400, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['continental'] }
    ]
  },
  {
    id: 'lunch',
    name: 'Lunch',
    nameSomali: 'Qado',
    description: 'Hearty midday meals featuring Somali specialties',
    order: 2,
    items: [
      { id: 'bariis-iskukaris', name: 'Bariis Iskukaris', nameSomali: 'Bariis Iskukaris', description: 'Fragrant spiced rice with vegetables and your choice of meat', price: 650, isAvailable: true, isVegetarian: false, isSpicy: true, isPopular: true, tags: ['traditional', 'halal', 'spicy'] },
      { id: 'chicken-biryani', name: 'Chicken Biryani', description: 'Aromatic basmati rice with spiced chicken and herbs', price: 750, isAvailable: true, isVegetarian: false, isSpicy: true, isPopular: true, tags: ['international', 'spicy'] },
      { id: 'suqaar-beef', name: 'Suqaar (Beef)', nameSomali: 'Suqaar (Hilib)', description: 'Tender beef cubes sautéed with onions, peppers, and Somali spices', price: 700, isAvailable: true, isVegetarian: false, isSpicy: true, isPopular: true, tags: ['traditional', 'halal'] },
      { id: 'club-sandwich', name: 'Club Sandwich', description: 'Triple-layered sandwich with chicken, bacon, lettuce, and tomato', price: 550, isAvailable: true, isVegetarian: false, isSpicy: false, tags: ['international', 'sandwich'] },
      { id: 'burger', name: 'Shaahid Burger', description: 'Beef patty with cheese, lettuce, tomato, and special sauce', price: 600, isAvailable: true, isVegetarian: false, isSpicy: false, tags: ['international', 'burger'] },
      { id: 'pizza', name: 'Somali Pizza', description: 'Thin crust pizza with halal toppings and Somali spices', price: 650, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['international', 'pizza'] },
      { id: 'spaghetti', name: 'Spaghetti Somali', description: 'Pasta with Somali-spiced meat sauce and vegetables', price: 580, isAvailable: true, isVegetarian: false, isSpicy: true, tags: ['fusion', 'pasta'] },
      { id: 'suqaar-chicken', name: 'Suqaar (Chicken)', nameSomali: 'Suqaar (Digaag)', description: 'Succulent chicken pieces with traditional Somali seasoning', price: 600, isAvailable: true, isVegetarian: false, isSpicy: false, tags: ['traditional', 'halal'] },
      { id: 'roast-chicken', name: 'Roast Chicken', description: 'Tender roasted chicken with herbs and spices', price: 720, isAvailable: true, isVegetarian: false, isSpicy: false, tags: ['international', 'roasted'] },
      { id: 'fried-chicken', name: 'Fried Chicken', description: 'Crispy fried chicken with Somali spices', price: 650, isAvailable: true, isVegetarian: false, isSpicy: true, tags: ['international', 'fried'] },
      { id: 'sambusa', name: 'Sambusa (3 pieces)', nameSomali: 'Sambuus (3)', description: 'Crispy pastries filled with spiced meat or lentils', price: 200, isAvailable: true, isVegetarian: true, isSpicy: true, isPopular: true, tags: ['appetizer', 'vegetarian-option'] }
    ]
  },
  {
    id: 'dinner',
    name: 'Dinner',
    nameSomali: 'Cunto Habeenkii',
    description: 'Evening specialties and Somali feast options',
    order: 3,
    items: [
      { id: 'somali-injera', name: 'Somali Injera Platter', nameSomali: 'Injera Soomaali', description: 'Traditional injera with various stews and vegetables', price: 800, isAvailable: true, isVegetarian: true, isSpicy: false, isPopular: true, tags: ['traditional', 'vegetarian', 'for-sharing'] },
      { id: 'hilib-digaag', name: 'Digaag Roasted', nameSomali: 'Digaag La Dabayaaqay', description: 'Whole roasted chicken marinated in Somali spices, served with rice', price: 1200, isAvailable: true, isVegetarian: false, isSpicy: false, isPopular: true, tags: ['feast', 'halal', 'for-sharing'] },
      { id: 'hilib-geel', name: 'Camel Meat Stew', nameSomali: 'Maraq Geel', description: 'Traditional camel meat slow-cooked with herbs and spices', price: 1500, isAvailable: true, isVegetarian: false, isSpicy: false, tags: ['traditional', 'halal', 'specialty'] },
      { id: 'maraq-yanyo', name: 'Vegetable Stew', nameSomali: 'Maraq Khudaar', description: 'Hearty vegetable stew with Somali spices, served with canjeero', price: 450, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['vegetarian', 'healthy'] },
      { id: 'pasta-somali', name: 'Somali Style Pasta', nameSomali: 'Baasto Soomaali', description: 'Pasta with Somali-spiced tomato sauce and your choice of protein', price: 550, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['fusion', 'halal'] }
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    nameSomali: 'Cabo',
    description: 'Refreshing beverages including traditional Somali drinks',
    order: 4,
    items: [
      { id: 'shaah-somali', name: 'Shaah Somali', nameSomali: 'Shaah Soomaali', description: 'Traditional Somali spiced tea with milk, cardamom, and ginger', price: 80, isAvailable: true, isVegetarian: true, isSpicy: false, isPopular: true, tags: ['traditional', 'hot'] },
      { id: 'qaxwo', name: 'Qaxwo (Coffee)', nameSomali: 'Qaxwo', description: 'Authentic Ethiopian/Somali coffee ceremony coffee', price: 100, isAvailable: true, isVegetarian: true, isSpicy: false, isPopular: true, tags: ['traditional', 'hot'] },
      { id: 'fresh-juice', name: 'Fresh Fruit Juice', nameSomali: 'Caano Miraha', description: 'Seasonal fresh-squeezed juice (mango, papaya, avocado)', price: 200, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['fresh', 'healthy'] },
      { id: 'tamarind-drink', name: 'Tamarind Juice', nameSomali: 'Caano Tamarind', description: 'Refreshing sweet and sour tamarind beverage', price: 150, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['traditional', 'refreshing'] }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    nameSomali: 'Macmacaan',
    description: 'Sweet treats to end your meal',
    order: 5,
    items: [
      { id: 'xalwo', name: 'Xalwo (Halwa)', nameSomali: 'Xalwo', description: 'Traditional Somali sweet made with sugar, ghee, and spices', price: 250, isAvailable: true, isVegetarian: true, isSpicy: false, isPopular: true, tags: ['traditional', 'sweet'] },
      { id: 'buskud', name: 'Buskud (Somali Biscuits)', nameSomali: 'Buskud', description: 'Crispy Somali cookies with cardamom flavor', price: 180, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['traditional', 'sweet'] },
      { id: 'fresh-fruit', name: 'Fresh Fruit Platter', nameSomali: 'Miraha Cusub', description: 'Selection of seasonal fresh fruits', price: 300, isAvailable: true, isVegetarian: true, isSpicy: false, tags: ['fresh', 'healthy'] }
    ]
  }
];

export const paymentMethods: PaymentConfig[] = [
  { method: 'cbe', name: 'CBE', nameAmharic: 'ሲቢኢ', logo: '/Commercial Bank of Ethiopia.png', instructions: 'Bank Account: 1000518679728. Use CBE Birr mobile banking or app.', isAvailable: true, processingFee: 0 },
  { method: 'ebirr', name: 'Ebirr', nameAmharic: 'እብር', logo: '/E-birr.png', instructions: 'Pay using Ebirr mobile money service. Merchant: 400193', isAvailable: true, processingFee: 0 },
  { method: 'hellocash', name: 'HelloCash', logo: '/hellocash.jpeg', instructions: 'Pay using HelloCash mobile wallet. Follow on-screen instructions.', isAvailable: true, processingFee: 0 },
  { method: 'telebirr', name: 'Telebirr', nameAmharic: 'ቴሌብር', logo: '/TeleBirr.png', instructions: 'Pay using Telebirr mobile money. Enter your phone number to receive a payment request.', isAvailable: true, processingFee: 0 },
  { method: 'abyssinia-bank', name: 'Abyssinia Bank', logo: '/Bank of Abyssinia.png', instructions: 'Transfer to Abyssinia Bank account. Include booking reference in the transfer description.', isAvailable: true, processingFee: 0 },
  // Legacy/backup methods left for compatibility (hidden in UI if desired)
  // { method: 'amole', name: 'Amole', nameAmharic: 'አሞሌ', logo: '/amole-logo.png', instructions: 'Pay using Dashen Bank Amole. Use merchant ID: LOTUS_HOTEL', isAvailable: false, processingFee: 0 },
  // { method: 'ethswitch', name: 'EthSwitch (Card)', nameAmharic: 'ኢትስዊች', logo: '/ethswitch-logo.png', instructions: 'Pay with your Ethiopian debit card through EthSwitch network.', isAvailable: false, processingFee: 25 },
  // { method: 'bank-transfer', name: 'Bank Transfer', nameAmharic: 'ባንክ ዝውውር', logo: '/bank-logo.png', instructions: 'Transfer to: Commercial Bank of Ethiopia, Account: 1000XXXXXX, Name: Shaahid Hotel Jijiga. Please include your booking reference.', isAvailable: false, processingFee: 0 }
];

export const reviews: Review[] = [
  { id: '1', name: 'Amina H.', rating: 5, comment: 'Clean, calm, and reliable. The bed was firm, the shower was hot, and the team was kind. Exactly what I needed after a long trip. The Somali breakfast was amazing!', date: '2024-01-15', verified: true, roomType: 'Deluxe Double' },
  { id: '2', name: 'Yusuf M.', rating: 5, comment: 'Best value in Jijiga. I\'ve tried a few places. Shaahid is the most consistent—great Wi-Fi, quiet nights, good food. The Stay Experience Designer is a game changer!', date: '2024-01-10', verified: true, roomType: 'Standard Room' },
  { id: '3', name: 'Sarah K.', rating: 5, comment: 'They actually care. I arrived late and they had dinner waiting. Small details make the difference. The staff remembered my name throughout my stay.', date: '2024-01-05', verified: true, roomType: 'VIP Suite' },
  { id: '4', name: 'Dr. Mohamed A.', rating: 5, comment: 'Perfect for business travel. The high-speed WiFi and quiet rooms made it easy to work. The airport pickup service was punctual and professional.', date: '2023-12-28', verified: true, roomType: 'Deluxe Double' },
  { id: '5', name: 'Fatima O.', rating: 4, comment: 'Beautiful hotel with authentic Somali hospitality. The restaurant serves the best bariis iskukaris in Jijiga. Will definitely return!', date: '2023-12-20', verified: true, roomType: 'Twin Room' }
];

export const nearbyPlaces: NearbyPlace[] = [
  { id: '1', name: 'Jijiga Airport', nameSomali: 'Garoonka Jijiga', type: 'Transport', distance: '3.5 km', distanceMinutes: 5, icon: 'Plane', description: 'Domestic airport with flights to Addis Ababa and Dire Dawa' },
  { id: '2', name: 'Central Market', nameSomali: 'Suuqa Weyn', type: 'Shopping', distance: '1.2 km', distanceMinutes: 3, icon: 'ShoppingBag', description: 'Vibrant local market with fresh produce, textiles, and crafts' },
  { id: '3', name: 'Jigjiga University', nameSomali: 'Jaamacadda Jigjiga', type: 'Education', distance: '6 km', distanceMinutes: 10, icon: 'GraduationCap', description: 'Major university in the Somali Region' },
  { id: '4', name: 'Somali Regional Government', nameSomali: 'Dowladda Gobolka Soomaalida', type: 'Government', distance: '4 km', distanceMinutes: 7, icon: 'Building', description: 'Regional administrative offices' },
  { id: '5', name: 'Karamarda Hills', nameSomali: 'Buuraha Karamarda', type: 'Nature', distance: '12 km', distanceMinutes: 20, icon: 'Mountain', description: 'Scenic hills popular for sunrise viewing' }
];

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/lotus_reception.jpg', alt: 'Shaahid Hotel Reception', category: 'exterior', caption: 'Welcome to Shaahid Hotel' },
  { id: '2', src: '/lotus_standard.jpg', alt: 'Deluxe Room', category: 'rooms', caption: 'Deluxe Double Room' },
  { id: '3', src: '/lotus_room1.jpg', alt: 'Standard Room', category: 'rooms', caption: 'Standard Room' },
  { id: '4', src: '/lotus_room2.jpg', alt: 'VIP Suite Living Area', category: 'rooms', caption: 'VIP Suite' },
  { id: '5', src: '/lotus_suite.jpg', alt: 'Suite Bedroom', category: 'rooms', caption: 'Luxury Suite' },
  { id: '6', src: '/dining_ethiopian.jpg', alt: 'Somali Cuisine', category: 'restaurant', caption: 'Authentic Somali Dining' },
  { id: '7', src: '/hotel_restaurant.jpg', alt: 'Restaurant Interior', category: 'restaurant', caption: 'Our Restaurant' },
  { id: '8', src: '/lotus_gym.jpg', alt: 'Fitness Center', category: 'facilities', caption: 'Fitness Center' },
  { id: '9', src: '/hotel_meeting.jpg', alt: 'Meeting Hall', category: 'facilities', caption: 'Conference Facilities' },
  { id: '10', src: '/hero_jijiga_night.jpg', alt: 'Jijiga at Night', category: 'exterior', caption: 'Jijiga City Views' }
];

export const eventPackages: EventPackage[] = [
  { id: '1', name: 'Business Conference Package', description: 'Professional setup for meetings, seminars, and corporate events', capacity: '50-100 guests', features: ['Projector and screen', 'Sound system', 'High-speed WiFi', 'Coffee break service', 'Lunch buffet option'], startingPrice: 15000, image: '/hotel_meeting.jpg' },
  { id: '2', name: 'Wedding Reception Package', description: 'Elegant venue for your special day with full catering', capacity: '100-200 guests', features: ['Decorated venue', 'Buffet or plated dinner', 'Sound system', 'Bridal suite included', 'Event coordinator'], startingPrice: 50000, image: '/hotel_restaurant.jpg' },
  { id: '3', name: 'Intimate Gathering Package', description: 'Perfect for small celebrations and private dinners', capacity: '10-30 guests', features: ['Private dining room', 'Customized menu', 'Personalized service', 'Decoration options'], startingPrice: 5000, image: '/lotus_suite.jpg' }
];

export const restaurantHours: RestaurantHours = {
  breakfast: { open: '06:30', close: '10:00' },
  lunch: { open: '12:00', close: '15:00' },
  dinner: { open: '18:00', close: '22:00' }
};

export const seatingOptions: SeatingOption[] = [
  { id: 'main-dining', name: 'Main Dining Hall', description: 'Elegant indoor dining with capacity for 80 guests', capacity: '80 guests', image: '/hotel_restaurant.jpg' },
  { id: 'private-room', name: 'Private Dining Room', description: 'Intimate space for family gatherings and business meetings', capacity: '12 guests', image: '/lotus_suite.jpg' },
  { id: 'outdoor-terrace', name: 'Outdoor Terrace', description: 'Al fresco dining with city views (weather permitting)', capacity: '30 guests', image: '/hero_jijiga_night.jpg' }
];

export const hotelSettings = {
  depositPercentage: 30,
  requireDeposit: true,
  currency: 'ETB' as const,
  usdEstimateEnabled: true,
  usdExchangeRate: 55,
  bankTransferInstructions: 'Commercial Bank of Ethiopia\nAccount Name: Hoyga Jiifka Ee Shaahid Hotel\nAccount Number: 1000518679728\nBranch: Jijiga Main Branch\n\nPlease include your booking reference in the transfer description.',
  cancellationPolicy: 'Free cancellation up to 24h before check-in.',
  privacyPolicy: 'We respect your privacy and protect your personal information in accordance with Ethiopian data protection laws.',
  termsOfService: 'By booking with Hoyga Jiifka Ee Shaahid Hotel, you agree to our terms and conditions including our cancellation and payment policies.'
};
