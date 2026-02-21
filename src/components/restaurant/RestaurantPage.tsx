import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { restaurantMenu, restaurantHours, seatingOptions, hotelInfo } from '@/data/hotelData';
import { Utensils, Clock, Sun, Moon, Phone } from 'lucide-react';
import type { MenuItem } from '@/types';

export default function RestaurantPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ vegetarian: false, spicy: false });
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [tab, setTab] = useState<string>(restaurantMenu[0]?.id || '');
  const [partyCount, setPartyCount] = useState<string>('2');
  const [reservationDateTime, setReservationDateTime] = useState<string>('');
  const whatsappNumber = '251976040457'; // reservation WA number requested by user

  const categories = restaurantMenu.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const filteredItems = useMemo(() => {
    const items = categories.find(c => c.id === tab)?.items ?? [];
    return items.filter(i => {
      if (filters.vegetarian && !i.isVegetarian) return false;
      if (filters.spicy && !i.isSpicy) return false;
      if (query && !(`${i.name} ${i.description} ${i.tags?.join(' ')}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [categories, tab, filters, query]);

  function addToCart(item: MenuItem) {
    setCart(prev => [...prev, item]);
  }

  function removeFromCart(index: number) {
    setCart(prev => prev.filter((_, i) => i !== index));
  }

  function openWhatsAppReservation() {
    const itemsText = cart.length ? `\nItems:\n${cart.map(it => `- ${it.name} (ETB ${it.price})`).join('\n')}` : '';
    const partyText = partyCount ? `\nParty: ${partyCount}` : '';
    let dtText = '';
    if (reservationDateTime) {
      try {
        const d = new Date(reservationDateTime);
        dtText = `\nDate & Time: ${d.toLocaleString()}`;
      } catch {
        dtText = `\nDate & Time: ${reservationDateTime}`;
      }
    }

    const message = encodeURIComponent(`Hello Shaahid Hotel, I'd like to reserve a table.${partyText}${dtText}${itemsText}\n\nPlease confirm availability and final price. Thank you.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  }

  return (
    <div className="pt-32 pb-20 px-4 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4"><Utensils className="w-3 h-3 mr-1" />Dining</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Restaurant & Menu</h1>
            <p className="text-[#B8C0D0] mb-4">A premium dining experience featuring Somali classics and international favorites.</p>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D4A14C]" />
                <div>
                  <div className="text-white text-sm">Breakfast</div>
                  <div className="text-[#B8C0D0] text-xs">{restaurantHours.breakfast.open} - {restaurantHours.breakfast.close}</div>
                </div>
              </div>
              <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#D4A14C]" />
                <div>
                  <div className="text-white text-sm">Lunch</div>
                  <div className="text-[#B8C0D0] text-xs">{restaurantHours.lunch.open} - {restaurantHours.lunch.close}</div>
                </div>
              </div>
              <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#D4A14C]" />
                <div>
                  <div className="text-white text-sm">Dinner</div>
                  <div className="text-[#B8C0D0] text-xs">{restaurantHours.dinner.open} - {restaurantHours.dinner.close}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Input placeholder="Search dishes, tags or descriptions..." value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-lg" />
              <Button variant="outline" onClick={() => setFilters(f => ({ ...f, vegetarian: !f.vegetarian }))} className={`border-white/20 ${filters.vegetarian ? 'bg-white/5 text-white' : 'text-[#B8C0D0]'}`}>Vegetarian</Button>
              <Button variant="outline" onClick={() => setFilters(f => ({ ...f, spicy: !f.spicy }))} className={`border-white/20 ${filters.spicy ? 'bg-white/5 text-white' : 'text-[#B8C0D0]'}`}>Spicy</Button>
            </div>
          </div>

          <div className="w-80 hidden lg:block">
            <div className="glass-card rounded-2xl p-4 sticky top-28">
              <h3 className="text-white font-semibold mb-2">Reserve a Table</h3>
              <p className="text-[#B8C0D0] text-sm mb-4">Quick reservation via WhatsApp</p>
              <div className="mb-3">
                <Label className="text-xs text-[#B8C0D0]">Party</Label>
                <Input
                  type="number"
                  min={1}
                  value={partyCount}
                  onChange={(e) => setPartyCount(e.target.value)}
                  className="mt-1"
                  aria-label="Number of guests"
                />
              </div>
              <div className="mb-3">
                <Label className="text-xs text-[#B8C0D0]">Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={reservationDateTime}
                  onChange={(e) => setReservationDateTime(e.target.value)}
                  className="mt-1"
                  aria-label="Reservation date and time"
                />
              </div>
              <Button className="w-full bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={openWhatsAppReservation}><Phone className="w-4 h-4 mr-2" />Reserve via WhatsApp</Button>
              <div className="text-xs text-[#B8C0D0] mt-3">Or call: <a href={`tel:${hotelInfo.phone}`} className="text-white">{hotelInfo.phone}</a></div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Tabs value={tab} onValueChange={(v) => setTab(v)}>
            <TabsList>
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id}>{cat.name}</TabsTrigger>
              ))}
            </TabsList>

            {categories.map(cat => (
              <TabsContent key={cat.id} value={cat.id} className="pt-4">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredItems.map(item => (
                        <Card key={item.id} className="glass-card rounded-xl p-4 flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-medium">{item.name}</h4>
                              {item.isPopular && <Badge className="bg-[#D4A14C] text-[#0B0F1A] text-xs">Popular</Badge>}
                            </div>
                            {item.nameSomali && <p className="text-[#D4A14C] text-xs">{item.nameSomali}</p>}
                            <p className="text-[#B8C0D0] text-sm mt-1">{item.description}</p>
                            <div className="flex gap-2 mt-2">
                              {item.isVegetarian && <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">Vegetarian</Badge>}
                              {item.isSpicy && <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">Spicy</Badge>}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[#D4A14C] font-semibold mb-3">ETB {item.price}</div>
                            <Button size="sm" className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={() => addToCart(item)}>Add</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <div className="glass-card rounded-2xl p-4">
                      <h4 className="text-white font-semibold mb-3">Your Order</h4>
                      {cart.length === 0 ? (
                        <p className="text-[#B8C0D0] text-sm">No items yet. Add dishes to build your order.</p>
                      ) : (
                        <div className="space-y-2">
                          {cart.map((it, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div>
                                <div className="text-white text-sm">{it.name}</div>
                                <div className="text-[#B8C0D0] text-xs">ETB {it.price}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => removeFromCart(i)}>Remove</Button>
                              </div>
                            </div>
                          ))}
                          <div className="border-t border-white/10 pt-3 mt-3">
                            <div className="flex items-center justify-between text-white font-semibold">Total <span>ETB {cart.reduce((s, it) => s + (it.price ?? 0), 0)}</span></div>
                            <Button className="w-full mt-3 bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={openWhatsAppReservation}>Reserve via WhatsApp</Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h5 className="text-white font-semibold mb-2">Seating Options</h5>
                      <div className="grid gap-3">
                        {seatingOptions.map(s => (
                          <Card key={s.id} className="glass-card p-3"><CardContent><div className="flex items-center justify-between"><div><div className="text-white">{s.name}</div><div className="text-[#B8C0D0] text-xs">{s.capacity}</div></div></div></CardContent></Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
