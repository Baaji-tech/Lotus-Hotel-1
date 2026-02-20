import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ScrollShowcase({ onBookClick }: { onBookClick: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Apple-like zoom: image scales down while a spotlight card scales up slightly
  const imageScale = useTransform(scrollYProgress, [0, 0.6, 1], [1.25, 1.0, 0.92]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const cardScale = useTransform(scrollYProgress, [0, 0.7, 1], [0.98, 1.0, 1.02]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.35, 0.1]);

  return (
    <section ref={ref} className="w-full bg-[#0B0F1A] py-20 lg:py-28 border-y border-white/5">
      <div className="w-full px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-[#D4A14C]/20 text-[#D4A14C] border-[#D4A14C]/30 mb-4">
                <Sparkles className="w-3 h-3 mr-1" /> Signature Scroll Moment
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                A cinematic <span className="text-[#D4A14C]">Lotus</span> reveal
              </h2>
              <p className="text-[#B8C0D0] mt-4">
                As you scroll, the room “breathes” into focus—like Apple-style product storytelling—then invites you to book.
              </p>

              <div className="mt-7 flex gap-3 flex-wrap">
                <Button className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={onBookClick}>
                  Book a room <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Back to top
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
                {[
                  { k: 'Quiet', v: 'Sleep-grade silence' },
                  { k: 'Fast', v: 'Work-ready Wi‑Fi' },
                  { k: 'Warm', v: 'Somali hospitality' },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-white font-semibold">{x.k}</p>
                    <p className="text-[#B8C0D0] mt-1">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div style={{ scale: cardScale }} className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,161,76,0.55),transparent_55%)]"
              />
              <motion.img
                src="/lotus_suite.jpg"
                alt="Lotus cinematic suite"
                className="w-full h-[420px] object-cover"
                style={{ scale: imageScale, y: imageY }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-[#0B0F1A]/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">VIP Suite — Lotus Signature</p>
                <p className="text-[#B8C0D0] text-sm mt-1">Scroll-powered story • Tap to book</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
