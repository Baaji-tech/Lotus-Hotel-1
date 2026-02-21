import type { SwipeCardData } from '../components/SwipeCard';

// Room Gallery Items
export const roomGalleryItems: SwipeCardData[] = [
  {
    id: 'room-1',
    type: 'room',
    title: 'Standard Room',
    subtitle: 'Cozy comfort for solo travelers',
    caption: 'Comfortable and well-appointed room perfect for solo travelers or couples. Features modern amenities and a cozy atmosphere.',
    image: '/Normal Single Room.jpg',
    price: 3500,
    amenities: [
      { icon: 'Wifi', name: 'Free WiFi' },
      { icon: 'Wind', name: 'AC' },
      { icon: 'Coffee', name: 'TV' }
    ],
    tags: ['Queen Bed', '24 m²', 'City View'],
    roomId: '1'
  },
  {
    id: 'room-2',
    type: 'room',
    title: 'Deluxe Double',
    subtitle: 'Our guest favorite',
    caption: 'Our most popular room featuring a spacious layout with premium furnishings and the signature Shaahid Hotel experience.',
    image: '/Normal Single Room.jpg',
    price: 4200,
    amenities: [
      { icon: 'Wifi', name: 'Free WiFi' },
      { icon: 'Wind', name: 'AC' },
      { icon: 'Coffee', name: 'Mini Bar' },
      { icon: 'Utensils', name: 'Room Service' }
    ],
    tags: ['King Bed', '28 m²', 'City View', 'Popular'],
    roomId: '2'
  },
  {
    id: 'room-3',
    type: 'room',
    title: 'Twin Room',
    subtitle: 'Perfect for colleagues',
    caption: 'Two comfortable single beds with all the amenities you need for a productive stay. Ideal for friends or colleagues.',
    image: '/Normal Single Room.jpg',
    price: 3800,
    amenities: [
      { icon: 'Wifi', name: 'Free WiFi' },
      { icon: 'Wind', name: 'AC' },
      { icon: 'Coffee', name: 'Work Desk' }
    ],
    tags: ['2 Single Beds', '26 m²', 'Garden View'],
    roomId: '3'
  },
  {
    id: 'room-4',
    type: 'room',
    title: 'VIP Suite',
    subtitle: 'Ultimate luxury experience',
    caption: 'Our most luxurious accommodation featuring a separate living area, premium amenities, and panoramic city views.',
    image: '/Normal Single Room.jpg',
    price: 6500,
    amenities: [
      { icon: 'Wifi', name: 'Free WiFi' },
      { icon: 'Wind', name: 'AC' },
      { icon: 'Coffee', name: 'Jacuzzi' },
      { icon: 'Utensils', name: 'Butler Service' }
    ],
    tags: ['King Bed', '45 m²', 'Panoramic View', 'VIP'],
    roomId: '4'
  }
];

// Restaurant / Somali Cuisine Gallery Items
export const restaurantGalleryItems: SwipeCardData[] = [
  {
    id: 'dish-1',
    type: 'restaurant',
    title: 'Bariis Iskukaris',
    subtitle: 'Traditional Somali Rice',
    caption: 'Fragrant spiced rice with vegetables and your choice of tender meat. A true taste of Somali heritage.',
    image: '/dining_ethiopian.jpg',
    price: 650,
    tags: ['Traditional', 'Halal', 'Spicy'],
    menuItemId: 'bariis-iskukaris'
  },
  {
    id: 'dish-2',
    type: 'restaurant',
    title: 'Suqaar',
    subtitle: 'Sautéed Beef Cubes',
    caption: 'Tender beef cubes sautéed with onions, peppers, and authentic Somali spices.',
    image: '/hotel_restaurant.jpg',
    price: 700,
    tags: ['Traditional', 'Halal', 'Popular'],
    menuItemId: 'suqaar-beef'
  },
  {
    id: 'dish-3',
    type: 'restaurant',
    title: 'Canjeero with Maraq',
    subtitle: 'Somali Breakfast Classic',
    caption: 'Traditional Somali pancakes served with savory meat or vegetable stew. Perfect start to your day.',
    image: '/dining_ethiopian.jpg',
    price: 350,
    tags: ['Breakfast', 'Traditional', 'Halal'],
    menuItemId: 'canjeero-maraq'
  },
  {
    id: 'dish-4',
    type: 'restaurant',
    title: 'Xalwo',
    subtitle: 'Somali Sweet Delight',
    caption: 'Traditional Somali sweet made with sugar, ghee, and aromatic spices. The perfect ending to any meal.',
    image: '/dining_ethiopian.jpg',
    price: 250,
    tags: ['Dessert', 'Traditional', 'Sweet'],
    menuItemId: 'xalwo'
  },
  {
    id: 'dish-5',
    type: 'restaurant',
    title: 'Shaah Somali',
    subtitle: 'Somali Spiced Tea',
    caption: 'Traditional Somali spiced tea with milk, cardamom, and ginger. A comforting beverage any time of day.',
    image: '/hotel_restaurant.jpg',
    price: 80,
    tags: ['Drink', 'Traditional', 'Hot'],
    menuItemId: 'shaah-somali'
  },
  {
    id: 'dish-6',
    type: 'restaurant',
    title: 'Sambusa',
    subtitle: 'Crispy Pastries',
    caption: 'Crispy pastries filled with spiced meat or lentils. A popular appetizer or snack.',
    image: '/dining_ethiopian.jpg',
    price: 200,
    tags: ['Appetizer', 'Vegetarian Option', 'Popular'],
    menuItemId: 'sambusa'
  }
];

// Experience Gallery Items
export const experienceGalleryItems: SwipeCardData[] = [
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Jijiga City Tour',
    subtitle: 'Discover the city',
    caption: 'Personalized tour of Jijiga with a local guide. Visit markets, historic sites, and cultural landmarks.',
    image: '/hero_jijiga_night.jpg',
    price: 1500,
    tags: ['3 Hours', 'Cultural', 'Guided'],
    experienceId: 'city-guide'
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Traditional Somali Dinner',
    subtitle: 'Cultural dining experience',
    caption: 'Authentic Somali dining experience with traditional dishes, music, and cultural storytelling.',
    image: '/dining_ethiopian.jpg',
    price: 2000,
    tags: ['2 Hours', 'Culinary', 'Cultural'],
    experienceId: 'cultural-dinner'
  },
  {
    id: 'exp-3',
    type: 'experience',
    title: 'Sunrise at Karamarda',
    subtitle: 'Breathtaking views',
    caption: 'Early morning trip to Karamarda hills for breathtaking sunrise views over the Somali region.',
    image: '/map_jijiga.jpg',
    price: 2500,
    tags: ['4 Hours', 'Adventure', 'Nature'],
    experienceId: 'sunrise-trip'
  },
  {
    id: 'exp-4',
    type: 'experience',
    title: 'Market Shopping',
    subtitle: 'Shop like a local',
    caption: 'Guided shopping at Jijiga central market with local bargaining assistance.',
    image: '/lotus_gym.jpg',
    price: 800,
    tags: ['2 Hours', 'Cultural', 'Shopping'],
    experienceId: 'shopping-assistance'
  }
];

// Facility Gallery Items
export const facilityGalleryItems: SwipeCardData[] = [
  {
    id: 'fac-1',
    type: 'facility',
    title: 'Fitness Center',
    subtitle: 'Modern equipment',
    caption: 'Stay fit during your stay with our modern gym equipment and facilities.',
    image: '/lotus_gym.jpg',
    amenities: [
      { icon: 'Wifi', name: 'Free WiFi' }
    ],
    tags: ['24/7', 'Modern Equipment']
  },
  {
    id: 'fac-2',
    type: 'facility',
    title: 'Meeting Hall',
    subtitle: 'Professional venue',
    caption: 'Professional conference facilities for up to 100 guests with full AV support.',
    image: '/hotel_meeting.jpg',
    amenities: [
      { icon: 'Wifi', name: 'High-Speed WiFi' },
      { icon: 'Coffee', name: 'AV Equipment' }
    ],
    tags: ['100 Guests', 'AV Support', 'Catering']
  },
  {
    id: 'fac-3',
    type: 'facility',
    title: 'Main Restaurant',
    subtitle: 'Somali & International',
    caption: 'Elegant dining space serving authentic Somali cuisine and international favorites.',
    image: '/hotel_restaurant.jpg',
    amenities: [
      { icon: 'Utensils', name: 'Full Menu' },
      { icon: 'Coffee', name: 'Bar Service' }
    ],
    tags: ['80 Seats', 'Air Conditioned', 'Halal']
  },
  {
    id: 'fac-4',
    type: 'facility',
    title: 'Hotel Lobby',
    subtitle: 'Welcome space',
    caption: 'Elegant lobby with comfortable seating, concierge service, and 24/7 reception.',
    image: '/lotus_reception.jpg',
    amenities: [
      { icon: 'Wifi', name: 'Free WiFi' },
      { icon: 'Coffee', name: 'Coffee Station' }
    ],
    tags: ['24/7 Reception', 'Concierge']
  }
];

// Event Gallery Items
export const eventGalleryItems: SwipeCardData[] = [
  {
    id: 'event-1',
    type: 'event',
    title: 'Business Conference',
    subtitle: 'Professional events',
    caption: 'Professional setup for meetings, seminars, and corporate events with full AV support.',
    image: '/hotel_meeting.jpg',
    price: 15000,
    tags: ['50-100 Guests', 'AV Equipment', 'Catering']
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Wedding Reception',
    subtitle: 'Your special day',
    caption: 'Elegant venue for your special day with full catering and decoration services.',
    image: '/hotel_restaurant.jpg',
    price: 50000,
    tags: ['100-200 Guests', 'Decoration', 'Full Catering']
  },
  {
    id: 'event-3',
    type: 'event',
    title: 'Private Dinner',
    subtitle: 'Intimate gatherings',
    caption: 'Perfect for small celebrations and private dinners with personalized service.',
    image: '/lotus_suite.jpg',
    price: 5000,
    tags: '10-30 Guests,Private Room,Custom Menu'.split(',')
  }
];

// Combined Gallery for Homepage
export const homeGalleryItems: SwipeCardData[] = [
  ...roomGalleryItems.slice(0, 2),
  ...restaurantGalleryItems.slice(0, 2),
  ...experienceGalleryItems.slice(0, 2),
  ...facilityGalleryItems.slice(0, 2)
];

// All Gallery Items
export const allGalleryItems: SwipeCardData[] = [
  ...roomGalleryItems,
  ...restaurantGalleryItems,
  ...experienceGalleryItems,
  ...facilityGalleryItems,
  ...eventGalleryItems
];
