import { useEffect, useState, lazy } from 'react';
import {
  Wifi,
  Car,
  Coffee,
  Clock,
  Sparkles,
  Shield,
  MapPin,
  Phone,
  Wind,
  Tv,
  Mail,
  Instagram,
  Facebook,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
  Bed,
  Users,
  Navigation,
  Utensils,
  Dumbbell,
  Users2,
  Image,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

import {
  hotelInfo,
  rooms,
  restaurantMenu,
  reviews,
  nearbyPlaces,
  galleryImages,
  eventPackages,
} from './data/hotelData';

import { homeGalleryItems, allGalleryItems } from './data/galleryData';

import { SwipeGallery, savedItemsManager } from './components/SwipeGallery';
import { SavedGallery } from './components/SavedGallery';
import { BookingFlow } from './components/booking/BookingFlow';
import RestaurantPage from './components/restaurant/RestaurantPage';
const AboutPage = lazy(() => import('./components/AboutPage'));
import type { SwipeCardData } from './components/SwipeCard';

import type { Room } from './types';

// ✅ Force WhatsApp number everywhere (no "+", no spaces)
const WHATSAPP_NUMBER = '251976040457';

// Navigation Component
function NavBar({
  onBookClick,
  currentPage,
  onNavigate,
  savedCount,
}: {
  onBookClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  savedCount: number;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'Rooms', href: 'rooms' },
    { label: 'Restaurant', href: 'restaurant' },
    { label: 'Facilities', href: 'facilities' },
    { label: 'Gallery', href: 'gallery' },
    { label: 'Events', href: 'events' },
    { label: 'About', href: 'about' },
    { label: 'Contact', href: 'contact' },
    { label: savedCount > 0 ? `Saved (${savedCount})` : 'Saved', href: 'saved' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || currentPage !== 'home'
            ? 'bg-[#0B0F1A]/95 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="bg-[#D4A14C]/10 border-b border-[#D4A14C]/20">
          <div className="w-full px-4 lg:px-8 py-2 flex justify-between items-center text-xs">
            <div className="flex items-center gap-4 text-[#B8C0D0]">
              <div className="hidden md:flex items-center gap-3">
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="flex items-center gap-1 hover:text-[#D4A14C] transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>{hotelInfo.phone}</span>
                  <span className="text-[#B8C0D0]/60 text-[10px]">(mobile)</span>
                </a>
                <span className="text-[#B8C0D0]/30">|</span>
                <a
                  href={`tel:${hotelInfo.phone2}`}
                  className="flex items-center gap-1 hover:text-[#D4A14C] transition-colors"
                >
                  <span>{hotelInfo.phone2}</span>
                  <span className="text-[#B8C0D0]/60 text-[10px]">(mobile)</span>
                </a>
                <span className="text-[#B8C0D0]/30">|</span>
                <a
                  href={`tel:${hotelInfo.phone3}`}
                  className="flex items-center gap-1 hover:text-[#D4A14C] transition-colors"
                >
                  <span>{hotelInfo.phone3}</span>
                  <span className="text-[#B8C0D0]/60 text-[10px]">(mobile)</span>
                </a>
              </div>
              <a
                href={`tel:${hotelInfo.phone}`}
                className="flex items-center gap-1 hover:text-[#D4A14C] transition-colors md:hidden"
              >
                <Phone className="w-3 h-3" />
                <span>Call Us</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="flex items-center gap-1 hover:text-[#D4A14C] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp</span>
              </a>
            </div>
            <div className="flex items-center gap-4 text-[#B8C0D0]">
              <span className="hidden md:inline">{hotelInfo.tagline}</span>
              <div className="flex gap-2">
                <a href={hotelInfo.socialMedia.facebook} className="hover:text-[#D4A14C]">
                  <Facebook className="w-3 h-3" />
                </a>
                <a href={hotelInfo.socialMedia.instagram} className="hover:text-[#D4A14C]">
                  <Instagram className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
              <img
                src="/cropped-328238465_555977749885592_4473954904930748254_n.jpg"
                alt="Shaahid Hotel"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </button>

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  className={`text-sm transition-colors ${
                    currentPage === item.href
                      ? 'text-[#D4A14C] font-medium'
                      : 'text-[#B8C0D0] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#B8C0D0] hover:text-[#D4A14C] transition-colors"
              >
                Call Now
              </a>
              <Button
                onClick={onBookClick}
                data-test-id="book-now-button"
                className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A] font-semibold rounded-xl"
              >
                Book Now
              </Button>
            </div>

            <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0F1A]/98 backdrop-blur-xl lg:hidden pt-32">
          <div className="flex flex-col items-center gap-6 p-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl text-white hover:text-[#D4A14C] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                onBookClick();
                setIsMobileMenuOpen(false);
              }}
              className="bg-[#D4A14C] text-[#0B0F1A] mt-4 w-full max-w-xs"
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src="/hero_jijiga_night.jpg" alt="Jijiga night view" className="w-full h-full object-cover" />
      </div>

      {/* ✅ FIX: properly closed overlay wrapper (this was causing the JSX div error) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A]/90 via-[#0B0F1A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-[#0B0F1A]/30" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex items-center pt-32 pb-20">
        <div className="w-full px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
                <Star className="w-3 h-3 mr-1 fill-[#D4A14C]" />
                Premium Hotel in Jijiga
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Experience Jigjiga best hotel
              </h1>
              <p className="text-lg text-[#B8C0D0] mb-8">
                At Shaahid Hotel, every detail is designed to offer you comfort, elegance, and an unforgettable experience.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={onBookClick}
                  data-test-id="book-now-button"
                  className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A] font-semibold rounded-xl"
                >
                  Book Now
                </Button>
              </div>

              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-[#D4A14C]">4.8</p>
                  <p className="text-xs text-[#B8C0D0]">Guest Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#D4A14C]">50+</p>
                  <p className="text-xs text-[#B8C0D0]">Premium Rooms</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#D4A14C]">24/7</p>
                  <p className="text-xs text-[#B8C0D0]">Service</p>
                </div>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <Card className="glass-card rounded-3xl p-6 lg:p-8 w-full max-w-md">
                <h3 className="text-xl font-semibold text-white mb-6">Quick Booking</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-[#B8C0D0] uppercase tracking-wider">Check In</Label>
                      <Input type="date" className="bg-white/5 border-white/10 text-white mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-[#B8C0D0] uppercase tracking-wider">Check Out</Label>
                      <Input type="date" className="bg-white/5 border-white/10 text-white mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-[#B8C0D0] uppercase tracking-wider">Adults</Label>
                      <Input type="number" min={1} defaultValue={2} className="bg-white/5 border-white/10 text-white mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-[#B8C0D0] uppercase tracking-wider">Children</Label>
                      <Input type="number" min={0} defaultValue={0} className="bg-white/5 border-white/10 text-white mt-1" />
                    </div>
                  </div>
                  <Button
                    onClick={onBookClick}
                    className="w-full bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A] font-semibold rounded-xl py-6"
                  >
                    Check Availability
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Rooms Preview Section
function RoomsPreview({ onViewAll, onBookRoom }: { onViewAll: () => void; onBookRoom: (room: Room) => void }) {
  const featuredRooms = rooms.slice(0, 3);

  return (
    <section id="rooms" className="w-full py-20 lg:py-32 bg-[#0B0F1A]">
      <div className="w-full px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">Accommodations</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Rooms & Suites</h2>
          <p className="text-[#B8C0D0]">From comfortable standards to luxurious VIP suites, find your perfect stay</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredRooms.map((room) => (
            <Card key={room.id} className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
                <div className="absolute top-4 left-4">
                  {room.name === 'Standard Room' ? (
                    <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">ETB 2000/night</Badge>
                  ) : room.name === 'Deluxe Double' ? (
                    <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">ETB 2500/night</Badge>
                  ) : room.name === 'VIP Suite' ? (
                    <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">ETB 3500/night</Badge>
                  ) : (
                    <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
                      ETB {room.pricePerNight.toLocaleString()}/night
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{room.name}</h3>
                <p className="text-[#B8C0D0] text-sm mb-4">{room.shortDescription}</p>
                <div className="flex items-center gap-4 text-sm text-[#B8C0D0] mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {room.maxGuests} Guests
                  </span>
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {room.size}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                    onClick={onViewAll}
                  >
                    View Details
                  </Button>
                  <Button className="flex-1 bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={() => onBookRoom(room)}>
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-[#D4A14C] text-[#D4A14C] hover:bg-[#D4A14C] hover:text-[#0B0F1A]"
            onClick={onViewAll}
          >
            View All Rooms
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Restaurant Preview Section
function RestaurantPreview({ onViewMenu }: { onViewMenu: () => void }) {
  const featuredItems = restaurantMenu.flatMap((cat) => cat.items).slice(0, 4);

  const foodImages = ['/chicken-biryani.svg', '/club-sandwich.svg', '/somali-injera.svg', '/roast-chicken.svg'];

  return (
    <section className="w-full py-20 lg:py-32 bg-[#141B2A]">
      <div className="w-full px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
              <Utensils className="w-3 h-3 mr-1" />
              Somali Cuisine
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Authentic Somali <span className="text-[#D4A14C]">Dining</span>
            </h2>
            <p className="text-[#B8C0D0] mb-6">
              Experience the rich flavors of Somali cuisine at our signature restaurant. From traditional Bariis Iskukaris to
              sweet Xalwo, every dish tells a story of our heritage.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card rounded-xl p-4">
                <Clock className="w-6 h-6 text-[#D4A14C] mb-2" />
                <p className="text-white font-medium">Breakfast</p>
                <p className="text-[#B8C0D0] text-sm">6:30 AM - 10:00 AM</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <Sun className="w-6 h-6 text-[#D4A14C] mb-2" />
                <p className="text-white font-medium">Lunch & Dinner</p>
                <p className="text-[#B8C0D0] text-sm">12:00 PM - 10:00 PM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={onViewMenu}>
                View Full Menu
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Reserve Table
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredItems.map((item, index) => (
              <Card
                key={item.id}
                className={`glass-card rounded-2xl overflow-hidden ${index === 0 || index === 3 ? 'mt-8' : ''}`}
              >
                <div className="h-32 relative overflow-hidden">
                  <img
                    src={foodImages[index]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement?.classList.add(
                        'bg-gradient-to-br',
                        'from-[#D4A14C]/20',
                        'to-[#D4A14C]/5',
                        'flex',
                        'items-center',
                        'justify-center',
                      );
                      const icon = document.createElement('div');
                      icon.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils text-[#D4A14C]/50"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>';
                      target.parentElement?.appendChild(icon);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-[#D4A14C] text-[#0B0F1A] text-xs">Popular</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="text-white font-medium mb-1">{item.name}</h4>
                  <p className="text-[#D4A14C] font-semibold">ETB {item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Facilities Section
function FacilitiesSection({ onViewAll }: { onViewAll: () => void }) {
  const facilities = [
    { icon: Wifi, name: 'Free Wi-Fi', desc: 'High-speed throughout' },
    { icon: Car, name: 'Airport Transfer', desc: 'On-time pickup' },
    { icon: Coffee, name: 'Breakfast', desc: 'Included with stay' },
    { icon: Clock, name: '24/7 Front Desk', desc: 'Always here for you' },
    { icon: Sparkles, name: 'Housekeeping', desc: 'Daily service' },
    { icon: Shield, name: 'Secure Parking', desc: 'Gated & monitored' },
    { icon: Dumbbell, name: 'Fitness Center', desc: 'Modern equipment' },
    { icon: Users2, name: 'Meeting Hall', desc: 'Up to 100 guests' },
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-[#0B0F1A]">
      <div className="w-full px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">Amenities</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-[#B8C0D0]">Premium facilities and services for a comfortable stay</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {facilities.map((facility, index) => (
            <Card
              key={index}
              className="glass-card rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform cursor-pointer group"
              onClick={onViewAll}
            >
              <facility.icon className="w-10 h-10 text-[#D4A14C] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-medium mb-1">{facility.name}</h3>
              <p className="text-[#B8C0D0] text-sm">{facility.desc}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={onViewAll}>
            View All Facilities
          </Button>
        </div>
      </div>
    </section>
  );
}

// Location Section
function LocationSection() {
  return (
    <section className="w-full py-20 lg:py-32 bg-[#141B2A]">
      <div className="w-full px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              Location
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Find Us in <span className="text-[#D4A14C]">Jijiga</span>
            </h2>
            <p className="text-[#B8C0D0] mb-8">
              Conveniently located on Main Street in Kebele 15, just minutes from Jijiga Airport and the Central Market.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#D4A14C]/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4A14C]" />
                </div>
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-[#B8C0D0]">{hotelInfo.address}</p>
                  <p className="text-[#B8C0D0]">
                    {hotelInfo.city}, {hotelInfo.region}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#D4A14C]/20 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#D4A14C]" />
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <div className="space-y-1">
                    <a href={`tel:${hotelInfo.phone}`} className="block text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                      {hotelInfo.phone} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                    </a>
                    <a href={`tel:${hotelInfo.phone2}`} className="block text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                      {hotelInfo.phone2} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                    </a>
                    <a href={`tel:${hotelInfo.phone3}`} className="block text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                      {hotelInfo.phone3} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#D4A14C]/20 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#D4A14C]" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href={`mailto:${hotelInfo.email}`} className="text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                    {hotelInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <p className="text-white font-medium mb-4">Nearby Landmarks</p>
              <div className="space-y-3">
                {nearbyPlaces.slice(0, 4).map((place) => (
                  <div key={place.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {place.icon === 'Plane' && '✈️'}
                        {place.icon === 'ShoppingBag' && '🏪'}
                        {place.icon === 'GraduationCap' && '🎓'}
                        {place.icon === 'Building' && '🏛️'}
                      </span>
                      <span className="text-[#B8C0D0] text-sm">{place.name}</span>
                    </div>
                    <span className="text-[#D4A14C] text-sm">{place.distanceMinutes} min</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="aspect-video bg-[#0B0F1A]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0!2d${hotelInfo.coordinates.lng}!3d${hotelInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjEnMzAuMiJOIDQywrA0OCcwMC4wIkU!5e0!3m2!1sen!2set!4v1`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4A14C]/30 rounded-full animate-ping" />
                  <div className="relative w-10 h-10 bg-[#D4A14C] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-[#0B0F1A]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#141B2A] border-t border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-[#B8C0D0]">Open 24/7</span>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${hotelInfo.coordinates.lat},${hotelInfo.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]">
                  <Navigation className="w-3 h-3 mr-1" />
                  Directions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reviews Section
function ReviewsSection() {
  return (
    <section className="w-full py-20 lg:py-32 bg-[#0B0F1A]">
      <div className="w-full px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
            <Star className="w-3 h-3 mr-1 fill-[#D4A14C]" />
            Reviews
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">What Our Guests Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <Card key={review.id} className="glass-card rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-[#D4A14C] text-[#D4A14C]' : 'text-[#B8C0D0]/30'}`}
                  />
                ))}
              </div>
              <p className="text-white mb-4">"{review.comment}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#D4A14C] font-medium">{review.name}</p>
                  {review.roomType && <p className="text-[#B8C0D0] text-xs">{review.roomType}</p>}
                </div>
                {review.verified && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    <Check className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="w-full bg-[#0B0F1A] border-t border-white/5">
      <div className="w-full px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src="/cropped-328238465_555977749885592_4473954904930748254_n.jpg"
              alt="Shaahid Hotel"
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-[#B8C0D0] text-sm mb-4">{hotelInfo.tagline}</p>
            <p className="text-[#B8C0D0] text-sm">{hotelInfo.description.slice(0, 100)}...</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Rooms', 'Restaurant', 'Facilities', 'Gallery', 'Events', 'About'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-[#B8C0D0] hover:text-[#D4A14C] transition-colors text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[#B8C0D0]">
                <MapPin className="w-4 h-4 text-[#D4A14C] mt-0.5 shrink-0" />
                {hotelInfo.address}, {hotelInfo.city}
              </li>
              <li>
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="flex items-center gap-2 text-sm text-[#B8C0D0] hover:text-[#D4A14C]"
                >
                  <Phone className="w-4 h-4 text-[#D4A14C]" />
                  {hotelInfo.phone} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${hotelInfo.phone2}`}
                  className="flex items-center gap-2 text-sm text-[#B8C0D0] hover:text-[#D4A14C]"
                >
                  <Phone className="w-4 h-4 text-[#D4A14C]" />
                  {hotelInfo.phone2} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${hotelInfo.phone3}`}
                  className="flex items-center gap-2 text-sm text-[#B8C0D0] hover:text-[#D4A14C]"
                >
                  <Phone className="w-4 h-4 text-[#D4A14C]" />
                  {hotelInfo.phone3} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="flex items-center gap-2 text-sm text-[#B8C0D0] hover:text-[#D4A14C]"
                >
                  <Mail className="w-4 h-4 text-[#D4A14C]" />
                  {hotelInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#B8C0D0] hover:text-[#D4A14C]"
                >
                  <Phone className="w-4 h-4 text-[#D4A14C]" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-[#B8C0D0] text-sm mb-4">Subscribe for special offers and updates</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-white/5 border-white/10 text-white text-sm" />
              <Button className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#B8C0D0] text-sm">© 2026 {hotelInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="text-[#B8C0D0] hover:text-[#D4A14C] text-sm">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="text-[#B8C0D0] hover:text-[#D4A14C] text-sm">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setBookingOpen(true);
  };

  const [savedCount, setSavedCount] = useState(0);
  useEffect(() => {
    const updateSavedCount = () => setSavedCount(savedItemsManager.getSavedItems().length);
    updateSavedCount();
    window.addEventListener('storage', updateSavedCount);
    return () => window.removeEventListener('storage', updateSavedCount);
  }, []);

  const [pageAnnouncement, setPageAnnouncement] = useState('');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setPageAnnouncement(`Navigated to ${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBooking = (room?: Room) => {
    if (room) setSelectedRoom(room);
    setBookingOpen(true);
  };

  const handleSwipeBook = (item: SwipeCardData) => {
    if (item.type === 'room' && item.roomId) {
      const room = rooms.find((r) => r.id === item.roomId);
      if (room) {
        setSelectedRoom(room);
        setBookingOpen(true);
      }
    } else if (item.type === 'restaurant') {
      toast.success('Redirecting to table reservation...');
    } else {
      toast.info('Booking details coming soon!');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection onBookClick={() => handleBookRoom(rooms[0])} />
            <RoomsPreview onViewAll={() => navigateTo('rooms')} onBookRoom={openBooking} />

            <section className="w-full py-20 lg:py-32 bg-[#141B2A]">
              <div className="w-full px-4 lg:px-8">
                <SwipeGallery
                  items={homeGalleryItems}
                  title="Swipe the Shaahid Hotel Moments"
                  subtitle="Discover rooms, cuisine, and experiences with a simple swipe"
                  onBook={handleSwipeBook}
                  onViewAll={() => navigateTo('gallery')}
                  showToggle={true}
                />
              </div>
            </section>

            <RestaurantPreview onViewMenu={() => navigateTo('restaurant')} />
            <FacilitiesSection onViewAll={() => navigateTo('facilities')} />
            <LocationSection />
            <ReviewsSection />
          </>
        );

      case 'rooms':
        return (
          <div className="pt-32 pb-20 px-4 lg:px-8 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">Accommodations</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">Rooms & Suites</h1>

              <div className="grid md:grid-cols-2 gap-6">
                {rooms.map((room) => {
                  const priceMin = room.priceRangeETB?.min ?? room.fromPriceETB ?? room.pricePerNight;
                  const priceMax = room.priceRangeETB?.max;
                  const priceLabel = priceMax
                    ? `ETB ${priceMin.toLocaleString()} – ${priceMax.toLocaleString()}`
                    : `From ETB ${priceMin.toLocaleString()} / night`;

                  const badgeLabel =
                    room.category === 'deluxe'
                      ? 'Most Popular'
                      : room.category === 'standard'
                        ? 'Best Value'
                        : room.category === 'vip'
                          ? 'Luxury Suite'
                          : '';

                  const waMessage = encodeURIComponent(
                    `Hello Shaahid Hotel, I would like to get today’s best rate for:\nRoom: ${room.name}\nCheck-in: [Date]\nCheck-out: [Date]\nGuests: [Number]\n\nPlease confirm availability and final price. Thank you.`,
                  );
                  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

                  return (
                    <Card
                      key={room.id}
                      tabIndex={0}
                      role="group"
                      aria-label={`View details for ${room.name}`}
                      className="glass-card rounded-3xl overflow-hidden transform transition-transform hover:scale-[1.02] hover:shadow-2xl"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <img src={room.images[0]} alt={room.name} loading="lazy" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#D4A14C] text-[#0B0F1A]">{priceLabel}</Badge>
                        </div>
                        {badgeLabel && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/5 text-[#B8C0D0] border-white/10">{badgeLabel}</Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-2xl font-semibold text-white mb-2">{room.name}</h3>
                        <p className="text-[#B8C0D0] mb-4">{room.shortDescription}</p>

                        <div className="flex items-center gap-4 text-sm text-[#B8C0D0] mb-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {room.maxGuests} Guests
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            {room.bedType}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {room.size}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#B8C0D0] mb-4">
                          {room.amenities.some((a) => a.id === 'wifi') && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/2">
                              <Wifi className="w-4 h-4" />
                              <span className="text-xs">Wi-Fi</span>
                            </div>
                          )}
                          {room.amenities.some((a) => a.id === 'ac') && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/2">
                              <Wind className="w-4 h-4" />
                              <span className="text-xs">AC</span>
                            </div>
                          )}
                          {room.amenities.some((a) => a.id === 'tv') && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/2">
                              <Tv className="w-4 h-4" />
                              <span className="text-xs">TV</span>
                            </div>
                          )}
                          {room.amenities.some((a) => a.id === 'minibar') && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/2">
                              <Coffee className="w-4 h-4" />
                              <span className="text-xs">Mini Bar</span>
                            </div>
                          )}
                          {room.amenities.some((a) => a.id === 'breakfast') && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/2">
                              <Coffee className="w-4 h-4" />
                              <span className="text-xs">Breakfast</span>
                            </div>
                          )}
                        </div>

                        <div className="mb-3 text-xs text-[#B8C0D0]">Rates may vary by season, occupancy, and availability.</div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            type="button"
                            className="w-full sm:flex-1 bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A] font-semibold"
                            onClick={() => handleBookRoom(room)}
                          >
                            Check Availability
                          </Button>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Get today's rate on WhatsApp for ${room.name}`}
                            className="w-full sm:flex-1"
                          >
                            <Button type="button" variant="outline" className="w-full border-white/20 text-white hover:bg-white/5">
                              Get Today’s Rate on WhatsApp
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'restaurant':
        return <RestaurantPage />;

      case 'facilities':
        return (
          <div className="pt-32 pb-20 px-4 lg:px-8 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">Amenities</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">Facilities & Services</h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Wifi, title: 'Free Wi-Fi', desc: 'High-speed internet throughout the hotel' },
                  { icon: Car, title: 'Airport Transfer', desc: 'Complimentary pickup and drop-off service' },
                  { icon: Coffee, title: 'Breakfast', desc: 'Complimentary breakfast with your stay' },
                  { icon: Clock, title: '24/7 Front Desk', desc: 'Round-the-clock reception and concierge' },
                  { icon: Sparkles, title: 'Housekeeping', desc: 'Daily cleaning and room service' },
                  { icon: Shield, title: 'Secure Parking', desc: 'Gated parking with 24/7 security' },
                  { icon: Dumbbell, title: 'Fitness Center', desc: 'Modern gym equipment for your workout' },
                  { icon: Users2, title: 'Meeting Hall', desc: 'Conference facilities for up to 100 guests' },
                  { icon: Utensils, title: 'Restaurant', desc: 'Authentic Somali and international cuisine' },
                ].map((facility, index) => (
                  <Card key={index} className="glass-card rounded-2xl p-6">
                    <facility.icon className="w-10 h-10 text-[#D4A14C] mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">{facility.title}</h3>
                    <p className="text-[#B8C0D0]">{facility.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="pt-32 pb-20 px-4 lg:px-8 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
                <Image className="w-3 h-3 mr-1" />
                Gallery
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Photo Gallery</h1>
              <p className="text-[#B8C0D0] mb-8">Swipe through our collection or browse in grid view</p>

              <SwipeGallery
                items={allGalleryItems}
                title="Swipe the Shaahid Hotel Moments"
                subtitle="Rooms, cuisine, experiences, and more"
                onBook={handleSwipeBook}
                showToggle={true}
              />

              <div className="mt-16">
                <h2 className="text-2xl font-bold text-white mb-6">All Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="pt-32 pb-20 px-4 lg:px-8 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
                <Users2 className="w-3 h-3 mr-1" />
                Events
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Meetings & Events</h1>
              <p className="text-[#B8C0D0] mb-8">
                Host your next event at Shaahid Hotel with our professional facilities and catering services
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {eventPackages.map((pkg) => (
                  <Card key={pkg.id} className="glass-card rounded-2xl overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-[#D4A14C]/20 to-[#D4A14C]/5 flex items-center justify-center">
                      <Users2 className="w-16 h-16 text-[#D4A14C]/50" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
                      <p className="text-[#B8C0D0] mb-4">{pkg.description}</p>
                      <p className="text-[#D4A14C] font-semibold mb-4">Capacity: {pkg.capacity}</p>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-[#B8C0D0] text-sm">
                            <Check className="w-4 h-4 text-[#D4A14C]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-2xl font-bold text-[#D4A14C] mb-4">From ETB {pkg.startingPrice.toLocaleString()}</p>
                      <Button className="w-full bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]">Inquire Now</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
        return <AboutPage onNavigate={navigateTo} />;

      case 'contact':
        return (
          <div className="pt-32 pb-20 px-4 lg:px-8 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
                <Phone className="w-3 h-3 mr-1" />
                Contact
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">Contact Us</h1>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D4A14C]/20 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-[#D4A14C]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Address</h3>
                        <p className="text-[#B8C0D0]">{hotelInfo.address}</p>
                        <p className="text-[#B8C0D0]">
                          {hotelInfo.city}, {hotelInfo.region}, {hotelInfo.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D4A14C]/20 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-[#D4A14C]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Phone</h3>
                        <div className="space-y-1">
                          <a href={`tel:${hotelInfo.phone}`} className="block text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                            {hotelInfo.phone} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                          </a>
                          <a href={`tel:${hotelInfo.phone2}`} className="block text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                            {hotelInfo.phone2} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                          </a>
                          <a href={`tel:${hotelInfo.phone3}`} className="block text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                            {hotelInfo.phone3} <span className="text-[#B8C0D0]/60 text-xs">(mobile)</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D4A14C]/20 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-[#D4A14C]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Email</h3>
                        <a href={`mailto:${hotelInfo.email}`} className="text-[#B8C0D0] hover:text-[#D4A14C] transition-colors">
                          {hotelInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      <a
                        href={hotelInfo.socialMedia.facebook}
                        className="w-10 h-10 bg-[#D4A14C]/20 rounded-lg flex items-center justify-center hover:bg-[#D4A14C]/40 transition-colors"
                      >
                        <Facebook className="w-5 h-5 text-[#D4A14C]" />
                      </a>
                      <a
                        href={hotelInfo.socialMedia.instagram}
                        className="w-10 h-10 bg-[#D4A14C]/20 rounded-lg flex items-center justify-center hover:bg-[#D4A14C]/40 transition-colors"
                      >
                        <Instagram className="w-5 h-5 text-[#D4A14C]" />
                      </a>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#D4A14C]/20 rounded-lg flex items-center justify-center hover:bg-[#D4A14C]/40 transition-colors"
                      >
                        <Phone className="w-5 h-5 text-[#D4A14C]" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Send us a Message</h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.success('Message sent! We will get back to you soon.');
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#B8C0D0]">First Name</Label>
                        <Input className="bg-white/5 border-white/10 text-white mt-1" />
                      </div>
                      <div>
                        <Label className="text-[#B8C0D0]">Last Name</Label>
                        <Input className="bg-white/5 border-white/10 text-white mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[#B8C0D0]">Email</Label>
                      <Input type="email" className="bg-white/5 border-white/10 text-white mt-1" />
                    </div>
                    <div>
                      <Label className="text-[#B8C0D0]">Phone</Label>
                      <Input className="bg-white/5 border-white/10 text-white mt-1" />
                    </div>
                    <div>
                      <Label className="text-[#B8C0D0]">Message</Label>
                      <textarea
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white mt-1 resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );

      case 'saved':
        return (
          <div className="pt-32 pb-20 px-4 lg:px-8 min-h-screen">
            <SavedGallery
              onBookRoom={(roomId) => {
                const room = rooms.find((r) => r.id === roomId);
                if (room) {
                  setSelectedRoom(room);
                  setBookingOpen(true);
                }
              }}
              onReserveTable={() => toast.info('Table reservation coming soon!')}
              onBack={() => navigateTo('home')}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F1A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 z-50 bg-[#D4A14C] text-[#0B0F1A] px-3 py-2 rounded"
      >
        Skip to content
      </a>
      <div aria-live="polite" className="sr-only">
        {pageAnnouncement}
      </div>

      <div className="grain-overlay" />

      <NavBar onBookClick={() => openBooking()} currentPage={currentPage} onNavigate={navigateTo} savedCount={savedCount} />
      <main id="main-content" className="relative">
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} />

      <BookingFlow open={bookingOpen} onOpenChange={setBookingOpen} initialRoom={selectedRoom || undefined} />
    </div>
  );
}

// Missing icon imports
const Sun = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="5" strokeWidth="2" />
    <path
      strokeWidth="2"
      strokeLinecap="round"
      d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
    />
  </svg>
);

export default App;
