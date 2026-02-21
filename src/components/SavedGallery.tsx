import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Bed, Utensils, Sparkles, Calendar, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import type { SwipeCardData } from './SwipeCard';

interface SavedGalleryProps {
  onBookRoom: (roomId: string) => void;
  onReserveTable: () => void;
  onBack: () => void;
}

// Saved items manager (same as in SwipeGallery)
const savedItemsManager = {
  getSavedItems: (): SwipeCardData[] => {
    try {
      const saved = localStorage.getItem('lotus_saved_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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
  
  clearAll: () => {
    localStorage.removeItem('lotus_saved_items');
  },
};

export function SavedGallery({ onBookRoom, onReserveTable, onBack }: SavedGalleryProps) {
  const [savedItems, setSavedItems] = useState<SwipeCardData[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setSavedItems(savedItemsManager.getSavedItems());
  }, []);

  const handleRemove = (itemId: string, itemTitle: string) => {
    savedItemsManager.removeItem(itemId);
    setSavedItems(savedItemsManager.getSavedItems());
    toast.success(`${itemTitle} removed from saved items`);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all saved items?')) {
      savedItemsManager.clearAll();
      setSavedItems([]);
      toast.success('All saved items cleared');
    }
  };

  const filteredItems = activeTab === 'all' 
    ? savedItems 
    : savedItems.filter(item => item.type === activeTab);

  const savedRooms = savedItems.filter(item => item.type === 'room');
  const savedDining = savedItems.filter(item => item.type === 'restaurant');
  const savedExperiences = savedItems.filter(item => item.type === 'experience');

  const getIcon = (type: string) => {
    switch (type) {
      case 'room': return <Bed className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'experience': return <Sparkles className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'room': return 'Room';
      case 'restaurant': return 'Dining';
      case 'experience': return 'Experience';
      default: return 'Item';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'room': return 'bg-blue-500';
      case 'restaurant': return 'bg-orange-500';
      case 'experience': return 'bg-purple-500';
      default: return 'bg-[#D4A14C]';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button variant="ghost" className="text-[#B8C0D0] mb-2 -ml-4" onClick={onBack}>
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back
          </Button>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">My Saved Items</h1>
          <p className="text-[#B8C0D0] mt-2">Your curated collection of Shaahid Hotel favorites</p>
        </div>
        
        {savedItems.length > 0 && (
          <Button 
            variant="outline" 
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            onClick={handleClearAll}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl p-4 text-center">
          <Heart className="w-6 h-6 text-[#D4A14C] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{savedItems.length}</p>
          <p className="text-[#B8C0D0] text-sm">Total Saved</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <Bed className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{savedRooms.length}</p>
          <p className="text-[#B8C0D0] text-sm">Rooms</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <Utensils className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{savedDining.length}</p>
          <p className="text-[#B8C0D0] text-sm">Dining</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{savedExperiences.length}</p>
          <p className="text-[#B8C0D0] text-sm">Experiences</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#D4A14C] data-[state=active]:text-[#0B0F1A]">
            All ({savedItems.length})
          </TabsTrigger>
          <TabsTrigger value="room" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Rooms ({savedRooms.length})
          </TabsTrigger>
          <TabsTrigger value="restaurant" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Dining ({savedDining.length})
          </TabsTrigger>
          <TabsTrigger value="experience" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Experiences ({savedExperiences.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#B8C0D0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {activeTab === 'all' ? 'No saved items yet' : `No saved ${getTypeLabel(activeTab)} items`}
              </h3>
              <p className="text-[#B8C0D0] mb-6">
                {activeTab === 'all' 
                  ? 'Start swiping to save your favorite rooms, dishes, and experiences!' 
                  : `You haven't saved any ${getTypeLabel(activeTab)} items yet.`}
              </p>
              <Button className="bg-[#D4A14C] text-[#0B0F1A]" onClick={onBack}>
                Start Exploring
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-card rounded-2xl overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getTypeColor(item.type)} text-white flex items-center gap-1`}>
                          {getIcon(item.type)}
                          {getTypeLabel(item.type)}
                        </Badge>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="absolute top-4 right-4 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
                        onClick={() => handleRemove(item.id, item.title)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      {item.subtitle && <p className="text-[#D4A14C] text-sm mb-2">{item.subtitle}</p>}
                      <p className="text-[#B8C0D0] text-sm mb-4 line-clamp-2">{item.caption}</p>

                      {item.price && (
                        <p className="text-[#D4A14C] font-bold mb-4">
                          ETB {item.price.toLocaleString()}
                          {item.type === 'room' && <span className="text-sm font-normal text-[#B8C0D0]"> / night</span>}
                        </p>
                      )}

                      {/* CTA Button */}
                      {item.type === 'room' && item.roomId && (
                        <Button 
                          className="w-full bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]"
                          onClick={() => onBookRoom(item.roomId!)}
                        >
                          <Bed className="w-4 h-4 mr-2" />
                          Book This Room
                        </Button>
                      )}

                      {item.type === 'restaurant' && (
                        <Button 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={onReserveTable}
                        >
                          <Utensils className="w-4 h-4 mr-2" />
                          Reserve Table
                        </Button>
                      )}

                      {item.type === 'experience' && (
                        <Button 
                          className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                          onClick={() => toast.info('Experience booking coming soon!')}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Experience
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
