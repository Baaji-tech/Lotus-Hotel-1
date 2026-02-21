import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { rooms } from '@/data/hotelData';
import { Bed, Users, Maximize, ArrowRight } from 'lucide-react';

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
  startWhenInView?: boolean;
};

function useCountUp(target: number, duration = 1500, start = false) {
  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    if (!start) return;
    let rafId = 0;
    const startTime = performance.now();
    const tick = (t: number) => {
      const elapsed = t - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);
  return value;
}

function CountUp({ to, suffix = '', duration = 1600, className, startWhenInView = true }: CountUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const start = startWhenInView ? inView : true;
  const value = useCountUp(to, duration, start);
  return (
    <div ref={ref} className={className} role="status" aria-live="polite">
      {value.toLocaleString()}{suffix}
    </div>
  );
}

type Props = {
  onNavigate?: (page: string) => void;
};

export default function AboutPage({ onNavigate }: Props) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.8], [0, -36]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  useReducedMotion();

  const statsRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="bg-[#0B0F1A] text-white overflow-x-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-center">
        <motion.div
          style={{ scale, backgroundImage: 'url(/IMG-20251003-WA0007.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}
          className="absolute inset-0"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F1A] opacity-80" />

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            Essence in Hospitality
          </motion.h1>
          <motion.p style={{ opacity: titleOpacity }} className="mt-4 max-w-2xl mx-auto text-[#B8C0D0]">
            Where modern comfort meets authentic Somali and Ethiopian warmth.
          </motion.p>

          <motion.div style={{ opacity: titleOpacity }} className="mt-8 flex justify-center gap-4">
            <Button className="px-6 py-3 focus-visible:ring-2 focus-visible:ring-[#D4A14C]/60" onClick={() => onNavigate ? onNavigate('rooms') : window.location.assign('?page=rooms')}>Explore Our Rooms</Button>
            <Button variant="outline" className="px-6 py-3 focus-visible:ring-2 focus-visible:ring-[#D4A14C]/40" onClick={() => onNavigate ? onNavigate('booking') : window.location.assign('?page=booking')}>Reserve Now</Button>
          </motion.div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="animate-bounce text-[#D4A14C] opacity-80">▾</div>
          </div>
        </div>
      </section>

      {/* Story + Split */}
      <section className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-[#D4A14C]/10 text-[#D4A14C] border-[#D4A14C]/20 mb-4">Our Story</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Story</h2>
            <p className="text-[#B8C0D0] leading-relaxed">Shaahid Hotel was created to redefine hospitality in Jijiga — blending contemporary design, professional service, and authentic cultural warmth. For over a decade, we have welcomed thousands of guests seeking comfort, quality, and trust.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
          >
            <img src="/IMG-20251003-WA0013.jpg" alt="Shaahid Hotel reception" className="w-full h-96 object-cover rounded-2xl shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-12 bg-[#07101a]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center border border-[#D4A14C]/20 bg-opacity-10">
              <div className="text-3xl font-extrabold text-[#D4A14C] mb-2">
                <CountUp to={10} suffix="+" startWhenInView={true} />
              </div>
              <div className="text-[#B8C0D0]">Years of Service</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center border border-[#D4A14C]/20">
              <div className="text-3xl font-extrabold text-[#D4A14C] mb-2">
                <CountUp to={50} suffix="+" startWhenInView={true} />
              </div>
              <div className="text-[#B8C0D0]">Premium Rooms</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center border border-[#D4A14C]/20">
              <div className="text-3xl font-extrabold text-[#D4A14C] mb-2">
                <CountUp to={10000} suffix="+" startWhenInView={true} />
              </div>
              <div className="text-[#B8C0D0]">Happy Guests</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center border border-[#D4A14C]/20">
              <div className="text-3xl font-extrabold text-[#D4A14C] mb-2">
                <CountUp to={48} suffix="★" startWhenInView={true} />
              </div>
              <div className="text-[#B8C0D0]">Guest Rating (4.8★)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Blocks */}
      <section className="container mx-auto px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold mb-8">What We Offer</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Prime Location', desc: 'Steps from Jijiga’s best destinations.' },
            { title: 'Authentic Dining Experience', desc: 'Local & international cuisine, chef-driven menus.' },
            { title: 'Designed for Business & Leisure', desc: 'Conference facilities, fast Wi‑Fi, tailored services.' },
          { title: 'Commitment to Excellence', desc: 'Attention to detail in every guest moment.' }
          ].map((blk) => (
            <div key={blk.title} className="bg-[#07121a] p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-[#D4A14C]/20">
              <div className="w-12 h-12 rounded-full bg-[#D4A14C]/10 flex items-center justify-center mb-4 text-[#D4A14C] font-semibold">•</div>
              <h4 className="font-semibold mb-2">{blk.title}</h4>
              <p className="text-[#B8C0D0] text-sm">{blk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="container mx-auto px-6 lg:px-8 py-16">
        <Badge className="bg-[#D4A14C]/10 text-[#D4A14C] border-[#D4A14C]/20 mb-4">Our Rooms</Badge>
        <h3 className="text-3xl font-bold mb-8">Accommodations for Every Need</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.slice(0, 4).map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#07121a] rounded-2xl overflow-hidden border border-[#D4A14C]/10 hover:border-[#D4A14C]/30 transition-colors"
            >
              <div className="h-48 overflow-hidden">
                <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">{room.name}</h4>
                <p className="text-[#B8C0D0] text-sm mb-3">{room.shortDescription}</p>
                <div className="flex items-center gap-4 text-sm text-[#B8C0D0] mb-3">
                  <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {room.size}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {room.maxGuests}</span>
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {room.bedType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#D4A14C] font-bold text-lg">ETB {room.pricePerNight.toLocaleString()}</span>
                    <span className="text-[#B8C0D0] text-sm"> /night</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-[#D4A14C]/30 text-[#D4A14C] hover:bg-[#D4A14C]/10" onClick={() => onNavigate ? onNavigate('rooms') : window.location.assign('?page=rooms')}>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="px-8 py-3" onClick={() => onNavigate ? onNavigate('rooms') : window.location.assign('?page=rooms')}>View All Rooms & Amenities</Button>
        </div>
      </section>

      {/* Emotional closing */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-center bg-cover filter blur-sm opacity-30" style={{ backgroundImage: 'url(/lotushotel-topview.jpg)' }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/95 to-transparent" />
        <div className="relative container mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">A place where every guest feels valued, respected, and at home.</h3>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="?page=booking">Reserve Now</a>
            </Button>
            <Button asChild variant="outline">
              <a href="?page=contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
