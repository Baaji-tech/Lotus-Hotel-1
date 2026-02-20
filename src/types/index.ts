// Lotus Hotel - Complete Type Definitions

export interface Room {
  id: string;
  slug: string;
  name: string;
  nameSomali?: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  priceUSD?: number;
  size: string;
  maxGuests: number;
  bedType: string;
  images: string[];
  amenities: Amenity[];
  features: string[];
  policies: RoomPolicy;
  isAvailable: boolean;
  category: 'standard' | 'deluxe' | 'suite' | 'vip';
  floor?: number;
  view?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'comfort' | 'tech' | 'bathroom' | 'service';
}

export interface RoomPolicy {
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  childrenPolicy: string;
  petPolicy: string;
  smokingPolicy: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  roomId: string;
  room?: Room;
  guestInfo: GuestInfo;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  status: BookingStatus;
  stayPlan?: StayPlan;
  addOns: BookingAddOn[];
  totalAmount: number;
  depositAmount?: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';
export type PaymentStatus = 'pending' | 'deposit-paid' | 'fully-paid' | 'refunded' | 'failed';

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  idType?: string;
  idNumber?: string;
}

export interface StayPlan {
  vibe: VibeType;
  addOns: StayAddOn[];
  mealPlan?: MealPlanType;
  dietaryNotes?: string;
  transport?: TransportOption;
  occasion?: OccasionType;
  occasionDetails?: string;
  experiences: Experience[];
}

export type VibeType = 'business-calm' | 'romantic-lotus' | 'family-comfort' | 'explorer-jijiga' | 'quiet-retreat';

export interface VibeOption {
  id: VibeType;
  name: string;
  nameSomali?: string;
  description: string;
  image: string;
  color: string;
  recommendedAddOns: string[];
}

export interface StayAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'per-stay' | 'per-night' | 'per-person';
  category: 'comfort' | 'service' | 'upgrade';
  icon: string;
}

export interface BookingAddOn extends StayAddOn {
  quantity: number;
  totalPrice: number;
}

export type MealPlanType = 'ethiopian-traditional' | 'continental' | 'mixed' | 'somali-cuisine';

export interface TransportOption {
  enabled: boolean;
  arrivalTime?: string;
  flightNumber?: string;
  pickupLocation?: string;
  price: number;
}

export type OccasionType = 'birthday' | 'anniversary' | 'honeymoon' | 'business-meeting' | 'other';

export interface Experience {
  id: string;
  name: string;
  nameSomali?: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  category: 'cultural' | 'adventure' | 'relaxation' | 'culinary';
  available: boolean;
}

export type PaymentMethod = 'telebirr' | 'ebirr' | 'cbe-birr' | 'amole' | 'ethswitch' | 'bank-transfer' | 'cash';

export interface PaymentConfig {
  method: PaymentMethod;
  name: string;
  nameAmharic?: string;
  nameSomali?: string;
  logo: string;
  instructions?: string;
  accountNumber?: string;
  accountName?: string;
  isAvailable: boolean;
  processingFee?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameSomali?: string;
  description?: string;
  items: MenuItem[];
  order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameSomali?: string;
  description: string;
  price: number;
  priceUSD?: number;
  image?: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  isPopular?: boolean;
  allergens?: string[];
  tags?: string[];
}

export interface RestaurantHours {
  breakfast: { open: string; close: string };
  lunch: { open: string; close: string };
  dinner: { open: string; close: string };
}

export interface SeatingOption {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image?: string;
}

export interface TableReservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference?: string;
  occasion?: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface HotelInfo {
  name: string;
  nameSomali?: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  phone2?: string;
  whatsapp?: string;
  email: string;
  website: string;
  coordinates: { lat: number; lng: number };
  socialMedia: { facebook?: string; instagram?: string; twitter?: string; telegram?: string };
  checkInTime: string;
  checkOutTime: string;
  timezone: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  roomType?: string;
  language?: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  nameSomali?: string;
  type: string;
  distance: string;
  distanceMinutes: number;
  icon: string;
  description?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'rooms' | 'restaurant' | 'facilities' | 'events' | 'exterior';
  caption?: string;
}

export interface EventPackage {
  id: string;
  name: string;
  description: string;
  capacity: string;
  features: string[];
  startingPrice: number;
  image?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  labelSomali?: string;
  href: string;
  children?: NavItem[];
}
