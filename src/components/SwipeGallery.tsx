import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SwipeCard, type SwipeCardData } from './SwipeCard';
import { toast } from 'sonner';

interface SwipeGalleryProps {
  items: SwipeCardData[];
  title: string;
  subtitle?: string;
  onBook: (item: SwipeCardData) => void;
  onViewAll?: () => void;
  showToggle?: boolean;
  className?: string;
}

// Analytics event tracking
const trackEvent = (eventName: string, data?: Record<string, any>) => {
  console.log(`[Analytics] ${eventName}`, data);
  // In production, this would send to analytics service
};

// Saved items manager
const savedItemsManager = {
  getSavedItems: (): SwipeCardData[] => {
    try {
      const saved = localStorage.getItem('lotus_saved_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },
  
  saveItem: (item: SwipeCardData) => {
    try {
      const saved = savedItemsManager.getSavedItems();
      if (!saved.find((s) => s.id === item.id)) {
        const updated = [...saved, item];
        localStorage.setItem('lotus_saved_items', JSON.stringify(updated));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
  
  removeItem: (itemId: string) => {
    try {
      const saved = savedItemsManager.getSavedItems();
      const updated = saved.filter((s) => s.id !== itemId);
      localStorage.setItem('lotus_saved_items', JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  },
  
  isSaved: (itemId: string): boolean => {
    const saved = savedItemsManager.getSavedItems();
    return saved.some((s) => s.id === itemId);
  },
  
  getSavedByType: (type: string): SwipeCardData[] => {
    const saved = savedItemsManager.getSavedItems();
    return saved.filter((s) => s.type === type);
  },
};

export { savedItemsManager };

export function SwipeGallery({ 
  items, 
  title, 
  subtitle, 
  onBook, 
  onViewAll,
  showToggle = true,
  className = ''
}: SwipeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'swipe' | 'grid'>('swipe');
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload next images
  useEffect(() => {
    const preloadImages = () => {
      for (let i = currentIndex + 1; i < Math.min(currentIndex + 3, items.length); i++) {
        const img = new Image();
        img.src = items[i]?.image;
      }
    };
    preloadImages();
  }, [currentIndex, items]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'swipe') return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handleSwipeLeft(items[currentIndex]);
          break;
        case 'ArrowRight':
          handleSwipeRight(items[currentIndex]);
          break;
        case 'Enter':
          onBook(items[currentIndex]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items, viewMode, onBook]);

  const handleSwipeLeft = useCallback((item: SwipeCardData) => {
    trackEvent('gallery_swipe_left', { itemId: item.id, type: item.type });
    
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev >= items.length - 1) {
          toast.info("You've seen all items! Starting over...");
          return 0;
        }
        return prev + 1;
      });
    }, 300);
  }, [items.length]);

  const handleSwipeRight = useCallback((item: SwipeCardData) => {
    const wasAdded = savedItemsManager.saveItem(item);
    
    if (wasAdded) {
      trackEvent('gallery_swipe_right', { itemId: item.id, type: item.type });
      trackEvent('gallery_save_' + item.type, { itemId: item.id });
      
      // Show appropriate toast based on item type
      switch (item.type) {
        case 'room':
          toast.success(`You loved ${item.title} 🌸`, {
            description: 'Added to your saved rooms',
            action: {
              label: 'Book Now',
              onClick: () => onBook(item),
            },
          });
          break;
        case 'restaurant':
          toast.success(`You loved ${item.title} 🍽️`, {
            description: 'Added to your saved dining',
            action: {
              label: 'Reserve Table',
              onClick: () => onBook(item),
            },
          });
          break;
        case 'experience':
          toast.success(`You loved ${item.title} ✨`, {
            description: 'Added to your saved experiences',
            action: {
              label: 'Learn More',
              onClick: () => onBook(item),
            },
          });
          break;
        default:
          toast.success(`You loved ${item.title} ❤️`, {
            description: 'Added to your saved items',
          });
      }
    } else {
      toast.info(`${item.title} is already in your saved items`);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev >= items.length - 1) {
          toast.info("You've seen all items! Starting over...");
          return 0;
        }
        return prev + 1;
      });
    }, 300);
  }, [items.length, onBook]);

  const handleTap = useCallback((item: SwipeCardData) => {
    trackEvent('gallery_view', { itemId: item.id, type: item.type });
  }, []);

  const handleBook = useCallback((item: SwipeCardData) => {
    trackEvent('gallery_book_click', { itemId: item.id, type: item.type });
    onBook(item);
  }, [onBook]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    toast.success('Gallery reset!');
  }, []);

  const progress = ((currentIndex + 1) / items.length) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-[#B8C0D0] mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-3">
          {showToggle && (
            <div className="flex bg-white/5 rounded-lg p-1">
              <Button
                variant={viewMode === 'swipe' ? 'default' : 'ghost'}
                size="sm"
                className={viewMode === 'swipe' ? 'bg-[#D4A14C] text-[#0B0F1A]' : 'text-[#B8C0D0]'}
                onClick={() => setViewMode('swipe')}
              >
                <Layers className="w-4 h-4 mr-2" />
                Swipe
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className={viewMode === 'grid' ? 'bg-[#D4A14C] text-[#0B0F1A]' : 'text-[#B8C0D0]'}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
            </div>
          )}
          
          {onViewAll && (
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" onClick={onViewAll}>
              View All
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {viewMode === 'swipe' && (
        <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
          <motion.div 
            className="h-full bg-[#D4A14C]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Gallery Content */}
      {viewMode === 'swipe' ? (
        <div className="relative">
          {/* Card Stack Container */}
          <div 
            ref={containerRef}
            className="relative w-full aspect-[3/4] max-w-md mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {items.slice(currentIndex, currentIndex + 3).map((item, index) => (
                <SwipeCard
                  key={item.id}
                  data={item}
                  index={index}
                  totalCards={Math.min(3, items.length - currentIndex)}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onTap={handleTap}
                  onBook={handleBook}
                  isActive={index === 0}
                />
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {currentIndex >= items.length && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center glass-card rounded-3xl p-8"
              >
                <div className="w-20 h-20 bg-[#D4A14C]/20 rounded-full flex items-center justify-center mb-4">
                  <Layers className="w-10 h-10 text-[#D4A14C]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">You've seen it all!</h3>
                <p className="text-[#B8C0D0] text-center mb-6">Check out your saved items or start over</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white/20 text-white" onClick={handleReset}>
                    Start Over
                  </Button>
                  <Button className="bg-[#D4A14C] text-[#0B0F1A]" onClick={onViewAll}>
                    View Saved
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Desktop Navigation Hints */}
          <div className="hidden lg:flex items-center justify-center gap-4 mt-6 text-[#B8C0D0] text-sm">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
              <span>Skip</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
              <span>Save</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Enter</kbd>
              <span>Book</span>
            </div>
          </div>

          {/* Mobile Swipe Hints */}
          <div className="flex lg:hidden items-center justify-center gap-8 mt-6">
            <div className="flex flex-col items-center text-[#B8C0D0]">
              <div className="w-12 h-12 border-2 border-red-500/50 rounded-full flex items-center justify-center mb-2">
                <ChevronLeft className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-xs">Swipe Left</span>
            </div>
            <div className="flex flex-col items-center text-[#B8C0D0]">
              <div className="w-12 h-12 border-2 border-green-500/50 rounded-full flex items-center justify-center mb-2">
                <ChevronRight className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs">Swipe Right</span>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => handleBook(item)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3">
                <Badge className={`${
                  item.type === 'room' ? 'bg-blue-500' :
                  item.type === 'restaurant' ? 'bg-orange-500' :
                  item.type === 'experience' ? 'bg-purple-500' :
                  'bg-[#D4A14C]'
                } text-white text-xs`}>
                  {item.type}
                </Badge>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-semibold text-sm line-clamp-1">{item.title}</h4>
                {item.price && (
                  <p className="text-[#D4A14C] text-xs">ETB {item.price.toLocaleString()}</p>
                )}
              </div>

              {savedItemsManager.isSaved(item.id) && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Counter */}
      {viewMode === 'swipe' && currentIndex < items.length && (
        <div className="text-center mt-4">
          <span className="text-[#B8C0D0] text-sm">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      )}
    </div>
  );
}
