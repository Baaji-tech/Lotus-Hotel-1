import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, type PanInfo } from 'framer-motion';
import { Heart, X, Info, Wifi, Wind, Coffee, Utensils, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface SwipeCardData {
  id: string;
  type: 'room' | 'restaurant' | 'experience' | 'facility' | 'event';
  title: string;
  subtitle?: string;
  caption: string;
  image: string;
  price?: number;
  amenities?: { icon: string; name: string }[];
  tags?: string[];
  roomId?: string;
  menuItemId?: string;
  experienceId?: string;
}

interface SwipeCardProps {
  data: SwipeCardData;
  index: number;
  totalCards: number;
  onSwipeLeft: (data: SwipeCardData) => void;
  onSwipeRight: (data: SwipeCardData) => void;
  onTap: (data: SwipeCardData) => void;
  onBook: (data: SwipeCardData) => void;
  isActive: boolean;
}

const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY = 500;

export function SwipeCard({ 
  data, 
  index, 
  totalCards, 
  onSwipeLeft, 
  onSwipeRight, 
  onTap, 
  onBook,
  isActive 
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-300, 300], [-25, 25]);
  const opacity = useTransform(
    x, 
    [-300, -150, 0, 150, 300], 
    [0.5, 1, 1, 1, 0.5]
  );

  const likeOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const nopeOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // Check if swipe was strong enough
    if (Math.abs(velocity) > SWIPE_VELOCITY || Math.abs(offset) > SWIPE_THRESHOLD) {
      const direction = offset > 0 || velocity > 0 ? 'right' : 'left';
      
      if (direction === 'right') {
        x.set(500);
        onSwipeRight(data);
      } else {
        x.set(-500);
        onSwipeLeft(data);
      }
    } else {
      // Spring back to center
      x.set(0);
      y.set(0);
    }
  }, [data, onSwipeLeft, onSwipeRight, x, y]);

  const handleTap = useCallback(() => {
    if (!isDragging) {
      setShowDetails(!showDetails);
      onTap(data);
    }
  }, [data, isDragging, onTap, showDetails]);

  const handleSkip = useCallback(() => {
    x.set(-500);
    onSwipeLeft(data);
  }, [data, onSwipeLeft, x]);

  const handleSave = useCallback(() => {
    x.set(500);
    onSwipeRight(data);
  }, [data, onSwipeRight, x]);

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'room': return 'bg-blue-500';
      case 'restaurant': return 'bg-orange-500';
      case 'experience': return 'bg-purple-500';
      case 'facility': return 'bg-green-500';
      case 'event': return 'bg-pink-500';
      default: return 'bg-[#D4A14C]';
    }
  };

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case 'room': return 'Room';
      case 'restaurant': return 'Dining';
      case 'experience': return 'Experience';
      case 'facility': return 'Facility';
      case 'event': return 'Event';
      default: return 'Gallery';
    }
  };

  // Stack effect - cards behind are smaller and offset
  const stackOffset = (totalCards - index - 1) * 8;
  const stackScale = 1 - (totalCards - index - 1) * 0.05;
  const stackOpacity = 1 - (totalCards - index - 1) * 0.15;

  if (!isActive) {
    return (
      <div 
        className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          transform: `translateY(${stackOffset}px) scale(${stackScale})`,
          opacity: stackOpacity,
          zIndex: index,
        }}
      >
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
      style={{
        x: xSpring,
        y: ySpring,
        rotate,
        opacity,
        zIndex: totalCards - index,
      }}
      drag={isActive}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      whileTap={{ scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/30 to-transparent" />

        {/* Swipe Indicators */}
        <motion.div 
          className="absolute top-8 left-8 border-4 border-green-500 rounded-xl px-4 py-2"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-green-500 font-bold text-2xl uppercase tracking-wider">SAVE</span>
        </motion.div>
        
        <motion.div 
          className="absolute top-8 right-8 border-4 border-red-500 rounded-xl px-4 py-2"
          style={{ opacity: nopeOpacity }}
        >
          <span className="text-red-500 font-bold text-2xl uppercase tracking-wider">SKIP</span>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Category Badge */}
          <Badge className={`${getCategoryColor(data.type)} text-white mb-3`}>
            {getCategoryLabel(data.type)}
          </Badge>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-1">{data.title}</h3>
          {data.subtitle && <p className="text-[#D4A14C] text-sm mb-2">{data.subtitle}</p>}
          
          {/* Caption */}
          <p className="text-[#B8C0D0] text-sm mb-4 line-clamp-2">{data.caption}</p>

          {/* Price */}
          {data.price && (
            <p className="text-[#D4A14C] font-bold text-lg mb-4">
              ETB {data.price.toLocaleString()}
              {data.type === 'room' && <span className="text-sm font-normal text-[#B8C0D0]"> / night</span>}
            </p>
          )}

          {/* Amenities */}
          {data.amenities && data.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {data.amenities.slice(0, 4).map((amenity, i) => (
                <div key={i} className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                  {amenity.icon === 'Wifi' && <Wifi className="w-3 h-3 text-[#D4A14C]" />}
                  {amenity.icon === 'Wind' && <Wind className="w-3 h-3 text-[#D4A14C]" />}
                  {amenity.icon === 'Coffee' && <Coffee className="w-3 h-3 text-[#D4A14C]" />}
                  {amenity.icon === 'Utensils' && <Utensils className="w-3 h-3 text-[#D4A14C]" />}
                  <span className="text-white text-xs">{amenity.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {data.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="border-white/20 text-white/70 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={(e) => { e.stopPropagation(); handleSkip(); }}
            >
              <X className="w-5 h-5 mr-2" />
              Skip
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
            >
              <Info className="w-5 h-5 mr-2" />
              Details
            </Button>
            
            <Button
              size="lg"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              onClick={(e) => { e.stopPropagation(); handleSave(); }}
            >
              <Heart className="w-5 h-5 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Details Modal Overlay */}
      {showDetails && (
        <motion.div 
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          className="absolute inset-0 bg-[#0B0F1A]/95 backdrop-blur-xl p-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            onClick={() => setShowDetails(false)}
          >
            <X className="w-5 h-5" />
          </button>

          <img 
            src={data.image} 
            alt={data.title} 
            className="w-full h-48 object-cover rounded-2xl mb-6"
          />

          <Badge className={`${getCategoryColor(data.type)} text-white mb-4`}>
            {getCategoryLabel(data.type)}
          </Badge>

          <h2 className="text-3xl font-bold text-white mb-2">{data.title}</h2>
          {data.subtitle && <p className="text-[#D4A14C] mb-4">{data.subtitle}</p>}
          
          <p className="text-[#B8C0D0] mb-6">{data.caption}</p>

          {data.price && (
            <div className="mb-6">
              <p className="text-3xl font-bold text-[#D4A14C]">
                ETB {data.price.toLocaleString()}
                {data.type === 'room' && <span className="text-lg font-normal text-[#B8C0D0]"> / night</span>}
              </p>
            </div>
          )}

          {data.amenities && data.amenities.length > 0 && (
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {data.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    {amenity.icon === 'Wifi' && <Wifi className="w-4 h-4 text-[#D4A14C]" />}
                    {amenity.icon === 'Wind' && <Wind className="w-4 h-4 text-[#D4A14C]" />}
                    {amenity.icon === 'Coffee' && <Coffee className="w-4 h-4 text-[#D4A14C]" />}
                    {amenity.icon === 'Utensils' && <Utensils className="w-4 h-4 text-[#D4A14C]" />}
                    <span className="text-white text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              onClick={() => setShowDetails(false)}
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
            <Button
              className="flex-1 bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]"
              onClick={() => { onBook(data); setShowDetails(false); }}
            >
              <Check className="w-4 h-4 mr-2" />
              {data.type === 'room' ? 'Book Now' : data.type === 'restaurant' ? 'Reserve Table' : 'Learn More'}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
