import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  X,
  Calendar,
  Users,
  Bed,
  Check,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Upload,
  MessageCircle,
  FileCheck2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import type { Booking, GuestInfo, PaymentMethod, Room } from '@/types';
import { hotelInfo, hotelSettings, paymentMethods, rooms } from '@/data/hotelData';

const STORAGE_KEY = 'lotus_bookings_v1';
const PROOFS_KEY = 'lotus_payment_proofs_v1';
const MAX_LOCAL_RECEIPT_BYTES = 750 * 1024; // 750KB to avoid localStorage crash

// ✅ Use this WhatsApp number for now (Ethiopia format, digits only for wa.me)
const WHATSAPP_NUMBER_DIGITS = '251976040457';

type PaymentProof = {
  bookingId: string;
  bookingReference: string;
  method: PaymentMethod;
  amountETB: number;
  note?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  dataUrl?: string; // base64 (optional)
  submittedAt: string;
  verifiedAt?: string; // demo
  transactionId?: string;
};

function safeParseJSON<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function uid(prefix = 'LTS') {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}

function nightsBetween(checkInISO: string, checkOutISO: string) {
  const a = new Date(checkInISO);
  const b = new Date(checkOutISO);
  const ms = b.getTime() - a.getTime();
  const nights = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Number.isFinite(nights) && nights > 0 ? nights : 1;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function formatETB(v: number) {
  try {
    return `ETB ${v.toLocaleString()}`;
  } catch {
    return `ETB ${v}`;
  }
}

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error('Failed to read file'));
    r.onload = () => resolve(String(r.result));
    r.readAsDataURL(file);
  });
}

function loadProofs(): Record<string, PaymentProof> {
  return safeParseJSON<Record<string, PaymentProof>>(localStorage.getItem(PROOFS_KEY), {});
}
function saveProofs(next: Record<string, PaymentProof>) {
  localStorage.setItem(PROOFS_KEY, JSON.stringify(next));
}

/**
 * ✅ FIXES TS2322 Resolver adults/children unknown:
 * - Use z.coerce.number() in schema
 * - Type BookingForm = z.infer<typeof bookingSchema> (no manual type mismatch)
 */
const bookingSchema = z.object({
  roomId: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  specialRequests: z.string().optional(),
  paymentMethod: z
    .enum(['telebirr', 'ebirr', 'cbe-birr', 'amole', 'ethswitch', 'bank-transfer', 'cash'])
    .optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

type Step = 'room' | 'dates' | 'guest' | 'review' | 'success';

const steps: Array<{ id: Exclude<Step, 'success'>; label: string }> = [
  { id: 'room', label: 'Room' },
  { id: 'dates', label: 'Dates' },
  { id: 'guest', label: 'Guest' },
  { id: 'review', label: 'Pay' },
];

export function BookingFlow({
  open,
  onOpenChange,
  initialRoom,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialRoom?: Room;
}) {
  const [step, setStep] = useState<Step>('room');
  const [created, setCreated] = useState<Booking | null>(null);

  // Pay Now modal + receipt upload state
  const [payOpen, setPayOpen] = useState(false);
  const [payTab, setPayTab] = useState<'receipt' | 'whatsapp'>('receipt');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptNote, setReceiptNote] = useState('');
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [proof, setProof] = useState<PaymentProof | null>(null);

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomId: initialRoom?.id ?? rooms[0]?.id ?? '',
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
      paymentMethod: 'telebirr',
    },
    mode: 'onChange',
  });

  const roomId = form.watch('roomId');
  const checkIn = form.watch('checkIn');
  const checkOut = form.watch('checkOut');
  const adults = form.watch('adults');
  const children = form.watch('children');
  const paymentMethod = form.watch('paymentMethod');

  const selectedRoom = useMemo(() => rooms.find((r) => r.id === roomId) ?? rooms[0], [roomId]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    return nightsBetween(checkIn, checkOut);
  }, [checkIn, checkOut]);

  const totals = useMemo(() => {
    const base = (selectedRoom?.pricePerNight ?? 0) * nights;
    const deposit = hotelSettings.requireDeposit
      ? Math.round((base * hotelSettings.depositPercentage) / 100)
      : 0;
    return { base, deposit };
  }, [selectedRoom, nights]);

  const payableNow = hotelSettings.requireDeposit ? totals.deposit : totals.base;

  const selectedPaymentConfig = useMemo(() => {
    const method = (paymentMethod ?? 'telebirr') as PaymentMethod;
    return paymentMethods.find((m) => m.method === method) ?? paymentMethods[0];
  }, [paymentMethod]);

  // Reset when opened
  useEffect(() => {
    if (!open) return;

    setStep('room');
    setCreated(null);

    setPayOpen(false);
    setPayTab('receipt');
    setReceiptFile(null);
    setReceiptNote('');
    setProof(null);

    if (initialRoom?.id) {
      form.setValue('roomId', initialRoom.id, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialRoom?.id]);

  // Load proof for created booking
  useEffect(() => {
    if (!created?.id) return;
    const all = loadProofs();
    setProof(all[created.id] ?? null);
  }, [created?.id]);

  const goNext = async () => {
    if (step === 'room') {
      const ok = await form.trigger(['roomId']);
      if (!ok) return;
      setStep('dates');
      return;
    }
    if (step === 'dates') {
      const ok = await form.trigger(['checkIn', 'checkOut', 'adults', 'children']);
      if (!ok) return;

      if (checkIn && checkOut && new Date(checkOut).getTime() <= new Date(checkIn).getTime()) {
        toast.error('Check-out must be after check-in');
        return;
      }

      setStep('guest');
      return;
    }
    if (step === 'guest') {
      const ok = await form.trigger(['firstName', 'lastName', 'email', 'phone']);
      if (!ok) return;
      setStep('review');
    }
  };

  const goBack = () => {
    if (step === 'dates') setStep('room');
    else if (step === 'guest') setStep('dates');
    else if (step === 'review') setStep('guest');
  };

  const saveBooking = (booking: Booking) => {
    const existing = safeParseJSON<Booking[]>(localStorage.getItem(STORAGE_KEY), []);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([booking, ...existing]));
  };

  const updateBookingInStorage = (bookingId: string, patch: Partial<Booking>) => {
    const existing = safeParseJSON<Booking[]>(localStorage.getItem(STORAGE_KEY), []);
    const idx = existing.findIndex((b) => b.id === bookingId);
    if (idx < 0) return null;

    const updated = {
      ...existing[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    } as Booking;

    const next = [...existing];
    next[idx] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return updated;
  };

  const submitBooking = async () => {
    const ok = await form.trigger();
    if (!ok || !selectedRoom) return;

    const v = form.getValues();

    const guest: GuestInfo = {
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      phone: v.phone,
    };

    const booking: Booking = {
      id: crypto?.randomUUID?.() ?? uid('BOOK'),
      bookingReference: uid('LOTUS'),
      roomId: selectedRoom.id,
      room: selectedRoom,
      guestInfo: guest,
      checkIn: v.checkIn,
      checkOut: v.checkOut,
      nights,
      adults: v.adults,
      children: v.children,
      status: 'pending',
      addOns: [],
      totalAmount: totals.base,
      depositAmount: totals.deposit,
      paymentStatus: 'pending',
      paymentMethod: v.paymentMethod as PaymentMethod | undefined,
      specialRequests: v.specialRequests?.trim() || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveBooking(booking);
    setCreated(booking);
    setStep('success');

    toast.success('Booking created!', { description: `Reference: ${booking.bookingReference}` });
  };

  // Pay Now opens modal
  const payNow = () => {
    if (!created) {
      toast.error('Create booking first');
      return;
    }
    setPayOpen(true);
  };

  const submitReceiptProof = async () => {
    if (!created) return;

    const method = (selectedPaymentConfig?.method ?? 'telebirr') as PaymentMethod;
    const tx = uid('TX');

    setIsSubmittingProof(true);
    try {
      let dataUrl: string | undefined;

      if (receiptFile) {
        if (receiptFile.size <= MAX_LOCAL_RECEIPT_BYTES) {
          dataUrl = await fileToDataUrl(receiptFile);
        } else {
          toast.message('Receipt too large to store locally', {
            description: 'We saved only the file info. Please send the image via WhatsApp.',
          });
        }
      }

      const p: PaymentProof = {
        bookingId: created.id,
        bookingReference: created.bookingReference,
        method,
        amountETB: payableNow,
        note: receiptNote.trim() || undefined,
        fileName: receiptFile?.name,
        fileType: receiptFile?.type,
        fileSize: receiptFile?.size,
        dataUrl,
        submittedAt: new Date().toISOString(),
        transactionId: tx,
      };

      const all = loadProofs();
      all[created.id] = p;
      saveProofs(all);
      setProof(p);

      const updatedBooking = updateBookingInStorage(created.id, {
        transactionId: tx,
        paymentMethod: method,
        paymentStatus: 'pending',
        status: 'pending',
      });
      if (updatedBooking) setCreated(updatedBooking);

      toast.success('Receipt submitted', { description: 'Status: Pending verification' });
      setPayOpen(false);
      setReceiptFile(null);
      setReceiptNote('');
    } catch (e) {
      toast.error('Failed to submit receipt', {
        description: e instanceof Error ? e.message : 'Unknown error',
      });
    } finally {
      setIsSubmittingProof(false);
    }
  };

  // demo-only
  const verifyDemo = () => {
    if (!created) return;

    const method = (selectedPaymentConfig?.method ?? 'telebirr') as PaymentMethod;

    const all = loadProofs();
    const p = all[created.id];
    if (p) {
      all[created.id] = { ...p, verifiedAt: new Date().toISOString() };
      saveProofs(all);
      setProof(all[created.id]);
    }

    const updated = updateBookingInStorage(created.id, {
      status: 'confirmed',
      paymentMethod: method,
      paymentStatus: hotelSettings.requireDeposit ? 'deposit-paid' : 'fully-paid',
      transactionId: p?.transactionId ?? uid('TX'),
    });

    if (updated) setCreated(updated);
    toast.success('Payment verified (demo)', { description: 'Booking confirmed' });
  };

  const isSuccess = step === 'success' && !!created;

  const whatsappPayHref = useMemo(() => {
    if (!created) return null;

    const methodName =
      paymentMethods.find((m) => m.method === (selectedPaymentConfig?.method ?? 'telebirr'))?.name ?? 'Payment';

    const msg = [
      `Hello Lotus Hotel, I want to pay the deposit.`,
      `Booking Ref: ${created.bookingReference}`,
      `Amount: ${formatETB(payableNow)}`,
      `Method: ${methodName}`,
      `Name: ${created.guestInfo?.firstName ?? ''} ${created.guestInfo?.lastName ?? ''}`.trim(),
      `Phone: ${created.guestInfo?.phone ?? ''}`.trim(),
      `Please confirm once received. Thank you.`,
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${encodeURIComponent(msg)}`;
  }, [created, payableNow, selectedPaymentConfig?.method]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cx(
            'p-0 overflow-hidden text-white border-white/10',
            'w-[96vw] sm:w-[92vw] max-w-5xl',
            'max-h-[92vh] bg-[#0B0F1A]',
          )}
        >
          {/* subtle background polish */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#D4A14C]/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(212,161,76,0.18),transparent_60%)]" />
          </div>

          {/* ✅ Only ONE close button: remove duplicate X in header areas */}
          <DialogHeader className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-2xl font-bold flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">
                    <Sparkles className="w-4 h-4 text-[#D4A14C]" />
                  </span>
                  <span className="truncate">Book Lotus Hotel</span>
                </DialogTitle>
                <p className="text-xs sm:text-sm text-[#B8C0D0] mt-1">
                  Fast booking + Ethiopian payment options (receipt verification)
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Stepper */}
            <div className="mt-4 sm:mt-5">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {steps.map((s, i) => {
                  const active = step === s.id || (step === 'success' && s.id === 'review');
                  const idxActive = steps.findIndex((x) => x.id === (step === 'success' ? 'review' : step));
                  const done = idxActive >= 0 && i < idxActive;

                  return (
                    <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className={cx(
                          'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold',
                          active
                            ? 'bg-[#D4A14C] text-[#0B0F1A]'
                            : done
                              ? 'bg-white/10 text-white'
                              : 'bg-white/5 text-[#B8C0D0]',
                        )}
                      >
                        {done ? <Check className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={cx('text-xs whitespace-nowrap', active ? 'text-white' : 'text-[#B8C0D0]')}>
                        {s.label}
                      </span>
                      {i < steps.length - 1 && <div className="w-10 h-px bg-white/10" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogHeader>

          {/* Body */}
          <div className="relative">
            {/* ✅ IMPORTANT: allow dropdown portals to overlay (no clipping) */}
            <div className="px-3 sm:px-6 py-4 sm:py-6 max-h-[60vh] overflow-y-auto overflow-x-visible">
              <AnimatePresence mode="wait">
                {/* ROOM */}
                {step === 'room' && (
                  <motion.div
                    key="room"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* ✅ z-index context to keep SelectContent above the image card */}
                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-white font-semibold">Choose a room</p>
                            <p className="text-xs text-[#B8C0D0] mt-1">Pick the best fit for your stay</p>
                          </div>
                          <Badge className="bg-white/5 text-[#B8C0D0] border-white/10">Step 1/4</Badge>
                        </div>

                        <div>
                          <Label className="text-[#B8C0D0] text-xs">Room</Label>
                          <Select
                            value={roomId}
                            onValueChange={(v) => form.setValue('roomId', v, { shouldValidate: true })}
                          >
                            <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent className="z-[50]">
                              {rooms.map((r) => (
                                <SelectItem key={r.id} value={r.id}>
                                  {r.name} — {formatETB(r.pricePerNight)}/night
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="text-xs text-[#B8C0D0] flex items-center gap-2">
                          <Bed className="w-4 h-4 text-[#D4A14C]" />
                          <span>
                            {selectedRoom?.bedType} • {selectedRoom?.maxGuests} guests • {selectedRoom?.size}
                          </span>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-[#B8C0D0]">
                          <div className="flex items-center gap-2 text-white">
                            <ShieldCheck className="w-4 h-4 text-[#D4A14C]" />
                            <span className="font-medium">Premium stay</span>
                          </div>
                          <p className="mt-1">Secure booking + receipt verification (no payment API needed).</p>
                        </div>
                      </div>

                      <Card className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative z-[40]">
                        <div className="relative h-44 sm:h-52">
                          <img
                            src={selectedRoom?.images?.[0]}
                            alt={selectedRoom?.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/30 to-transparent" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <Badge className="bg-[#D4A14C] text-[#0B0F1A]">
                              {formatETB(selectedRoom?.pricePerNight ?? 0)}/night
                            </Badge>
                            <Badge className="bg-white/10 text-white border-white/15">
                              {selectedRoom?.maxGuests} guests
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 sm:p-6">
                          <h3 className="text-base sm:text-lg font-semibold text-white">{selectedRoom?.name}</h3>
                          <p className="text-xs sm:text-sm text-[#B8C0D0] mt-1">{selectedRoom?.shortDescription}</p>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {selectedRoom?.amenities?.slice(0, 8).map((a) => (
                              <Badge
                                key={a.id}
                                variant="outline"
                                className="border-white/15 text-[#B8C0D0] text-[11px]"
                              >
                                {a.name}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* DATES */}
                {step === 'dates' && (
                  <motion.div
                    key="dates"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                      <Card className="glass-card rounded-2xl border border-white/10 bg-white/5">
                        <CardContent className="p-4 sm:p-6 space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-white font-semibold">
                              <Calendar className="w-5 h-5 text-[#D4A14C]" /> Stay dates
                            </div>
                            <Badge className="bg-white/5 text-[#B8C0D0] border-white/10">{nights} night(s)</Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <Label className="text-[#B8C0D0] text-xs">Check-in</Label>
                              <Input
                                type="date"
                                className="mt-2 bg-white/5 border-white/10 text-white text-sm"
                                {...form.register('checkIn')}
                              />
                            </div>
                            <div>
                              <Label className="text-[#B8C0D0] text-xs">Check-out</Label>
                              <Input
                                type="date"
                                className="mt-2 bg-white/5 border-white/10 text-white text-sm"
                                {...form.register('checkOut')}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <Label className="text-[#B8C0D0] text-xs">Adults</Label>
                              <Input
                                type="number"
                                min={1}
                                max={10}
                                className="mt-2 bg-white/5 border-white/10 text-white text-sm"
                                {...form.register('adults', { setValueAs: (v) => v === '' ? 1 : Number(v) })}
                              />
                            </div>
                            <div>
                              <Label className="text-[#B8C0D0] text-xs">Children</Label>
                              <Input
                                type="number"
                                min={0}
                                max={10}
                                className="mt-2 bg-white/5 border-white/10 text-white text-sm"
                                {...form.register('children', { setValueAs: (v) => v === '' ? 0 : Number(v) })}
                              />
                            </div>
                          </div>

                          <div className="text-xs text-[#B8C0D0]">
                            <p>
                              Check-in: {hotelInfo.checkInTime} • Check-out: {hotelInfo.checkOutTime}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card rounded-2xl border border-white/10 bg-white/5">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-white font-semibold">Price estimate</p>
                              <p className="text-xs text-[#B8C0D0] mt-1">Based on selected room + nights</p>
                            </div>
                            <Badge className="bg-white/5 text-[#B8C0D0] border-white/10">Step 2/4</Badge>
                          </div>

                          <div className="mt-6 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-[#B8C0D0]">Room</span>
                              <span className="text-white">{formatETB(selectedRoom?.pricePerNight ?? 0)}/night</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[#B8C0D0]">Subtotal</span>
                              <span className="text-white">{formatETB(totals.base)}</span>
                            </div>
                            {hotelSettings.requireDeposit && (
                              <div className="flex items-center justify-between">
                                <span className="text-[#B8C0D0]">Deposit ({hotelSettings.depositPercentage}%)</span>
                                <span className="text-[#D4A14C] font-semibold">{formatETB(totals.deposit)}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-[#B8C0D0]">
                            <p className="font-medium text-white mb-1">Somali Cuisine add-on</p>
                            <p>After booking, you can reserve Somali breakfast/dinner and other experiences.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* GUEST */}
                {step === 'guest' && (
                  <motion.div
                    key="guest"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                      <Card className="glass-card rounded-2xl border border-white/10 bg-white/5">
                        <CardContent className="p-4 sm:p-6 space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-white font-semibold">
                              <Users className="w-5 h-5 text-[#D4A14C]" /> Guest details
                            </div>
                            <Badge className="bg-white/5 text-[#B8C0D0] border-white/10">Step 3/4</Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <Label className="text-[#B8C0D0] text-xs">First name</Label>
                              <Input className="mt-2 bg-white/5 border-white/10 text-white" {...form.register('firstName')} />
                            </div>
                            <div>
                              <Label className="text-[#B8C0D0] text-xs">Last name</Label>
                              <Input className="mt-2 bg-white/5 border-white/10 text-white" {...form.register('lastName')} />
                            </div>
                          </div>

                          <div>
                            <Label className="text-[#B8C0D0] text-xs">Email</Label>
                            <div className="relative mt-2">
                              <Mail className="w-4 h-4 text-[#B8C0D0] absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                type="email"
                                className="pl-10 bg-white/5 border-white/10 text-white"
                                {...form.register('email')}
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-[#B8C0D0] text-xs">Phone / WhatsApp</Label>
                            <div className="relative mt-2">
                              <Phone className="w-4 h-4 text-[#B8C0D0] absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                className="pl-10 bg-white/5 border-white/10 text-white"
                                placeholder="+251..."
                                {...form.register('phone')}
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-[#B8C0D0] text-xs">Special requests (optional)</Label>
                            <Textarea
                              className="mt-2 bg-white/5 border-white/10 text-white min-h-[110px]"
                              placeholder="Late check-in, extra pillow, airport pickup…"
                              {...form.register('specialRequests')}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card rounded-2xl border border-white/10 bg-white/5">
                        <CardContent className="p-4 sm:p-6">
                          <p className="text-white font-semibold">Hotel contact</p>

                          <div className="mt-4 space-y-3 text-sm text-[#B8C0D0]">
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#D4A14C]" /> {hotelInfo.address}, {hotelInfo.city}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#D4A14C]" /> {hotelInfo.phone}
                            </p>
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-[#D4A14C]" /> {hotelInfo.email}
                            </p>
                          </div>

                          <div className="mt-6 p-4 rounded-xl border border-[#D4A14C]/25 bg-[#D4A14C]/10 text-xs text-[#B8C0D0]">
                            <p className="font-medium text-white mb-1">Pro tip</p>
                            <p>After payment, upload receipt or send via WhatsApp for faster confirmation.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* REVIEW */}
                {step === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                      <Card className="glass-card rounded-2xl border border-white/10 bg-white/5">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-white font-semibold">Review</p>
                              <p className="text-xs text-[#B8C0D0] mt-1">Confirm details before creating booking</p>
                            </div>
                            <Badge className="bg-white/5 text-[#B8C0D0] border-white/10">Step 4/4</Badge>
                          </div>

                          <div className="mt-5 space-y-3 text-sm">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[#B8C0D0]">Room</span>
                              <span className="text-white text-right">{selectedRoom?.name}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[#B8C0D0]">Dates</span>
                              <span className="text-white text-right">
                                {checkIn || '—'} → {checkOut || '—'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[#B8C0D0]">Guests</span>
                              <span className="text-white text-right">
                                {adults} adult(s), {children} child(ren)
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[#B8C0D0]">Total</span>
                              <span className="text-white font-semibold text-right">{formatETB(totals.base)}</span>
                            </div>
                            {hotelSettings.requireDeposit && (
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-[#B8C0D0]">Deposit due now</span>
                                <span className="text-[#D4A14C] font-semibold text-right">{formatETB(totals.deposit)}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-6 relative z-[60]">
                            <Label className="text-[#B8C0D0] text-xs">Payment method</Label>
                            <Select
                              value={paymentMethod}
                              onValueChange={(v) =>
                                form.setValue('paymentMethod', v as BookingForm['paymentMethod'], {
                                  shouldValidate: true,
                                })
                              }
                            >
                              <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>

                              <SelectContent className="z-[9999]">
                                {paymentMethods
                                  .filter((p) => p.isAvailable)
                                  .map((p) => (
                                    <SelectItem key={p.method} value={p.method}>
                                      {p.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            <div className="mt-3 p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-[#B8C0D0]">
                              <p className="text-white font-medium mb-1">Instructions</p>
                              <p>{selectedPaymentConfig?.instructions ?? '—'}</p>
                              <p className="mt-2">After payment, upload receipt or send via WhatsApp for confirmation.</p>
                            </div>
                          </div>

                          <div className="mt-6 flex flex-col gap-3">
                            <Button className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={submitBooking}>
                              Create Booking
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={goBack}
                            >
                              Back
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card rounded-2xl border border-white/10 bg-white/5">
                        <CardContent className="p-4 sm:p-6">
                          <p className="text-white font-semibold mb-2 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[#D4A14C]" /> Pay without APIs
                          </p>
                          <p className="text-sm text-[#B8C0D0]">
                            “Pay Now” opens receipt upload + WhatsApp request. Booking stays pending until verified.
                          </p>

                          <div className="mt-5 p-4 rounded-xl border border-[#D4A14C]/25 bg-[#D4A14C]/10 text-sm">
                            <p className="text-white font-medium">Amount to pay now</p>
                            <p className="text-[#B8C0D0] mt-1">
                              {formatETB(payableNow)} ({hotelSettings.requireDeposit ? 'Deposit' : 'Full payment'})
                            </p>
                          </div>

                          {created && (
                            <div className="mt-6">
                              <p className="text-[#B8C0D0] text-xs">Created booking</p>
                              <p className="text-white font-semibold">{created.bookingReference}</p>
                              <div className="mt-4">
                                <Button className="w-full bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]" onClick={payNow}>
                                  Pay Now
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {isSuccess && created && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Card className="glass-card rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                      <CardContent className="p-5 sm:p-8">
                        <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-2 items-center">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Booking ready</Badge>
                              {proof?.submittedAt && !proof?.verifiedAt && (
                                <Badge className="bg-white/10 text-white border-white/15">Payment: Pending verification</Badge>
                              )}
                              {proof?.verifiedAt && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Payment: Verified</Badge>
                              )}
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 break-words">
                              Your reference: <span className="text-[#D4A14C]">{created.bookingReference}</span>
                            </h3>
                            <p className="text-[#B8C0D0] mt-2 text-sm">
                              Pay now using receipt upload or WhatsApp. We’ll confirm after verification.
                            </p>
                          </div>

                          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <Button
                              className="flex-1 sm:flex-none bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]"
                              onClick={payNow}
                            >
                              Pay Now
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 sm:flex-none border-white/20 text-white hover:bg-white/10"
                              onClick={() => onOpenChange(false)}
                            >
                              Done
                            </Button>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-xs text-[#B8C0D0]">Room</p>
                            <p className="text-white font-medium mt-1">{created.room?.name}</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-xs text-[#B8C0D0]">Stay</p>
                            <p className="text-white font-medium mt-1">
                              {created.checkIn} → {created.checkOut} ({created.nights} night{created.nights > 1 ? 's' : ''})
                            </p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-xs text-[#B8C0D0]">Pay now</p>
                            <p className="text-white font-medium mt-1">{formatETB(payableNow)}</p>
                          </div>
                        </div>

                        {proof?.submittedAt && !proof?.verifiedAt && (
                          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-white font-semibold flex items-center gap-2">
                                  <FileCheck2 className="w-4 h-4 text-[#D4A14C]" /> Receipt submitted
                                </p>
                                <p className="text-xs text-[#B8C0D0] mt-1">
                                  Demo button to simulate hotel verification (no admin panel yet).
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10"
                                onClick={verifyDemo}
                              >
                                Mark Verified (Demo)
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-3 sm:px-6 py-3 sm:py-4 bg-[#0B0F1A]/80 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-[11px] sm:text-xs text-[#B8C0D0] max-w-full sm:max-w-md">
                  {hotelSettings.cancellationPolicy}
                </p>

                {step !== 'review' && step !== 'success' && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    {step !== 'room' && (
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 flex-1 sm:flex-none"
                        onClick={goBack}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                      </Button>
                    )}
                    <Button
                      type="button"
                      className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A] flex-1 sm:flex-none"
                      onClick={goNext}
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pay Now Modal */}
      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent className="bg-[#0B0F1A] border-white/10 text-white w-[96vw] sm:w-[92vw] max-w-xl p-0 overflow-hidden">
          {/* ✅ Remove extra X: this modal has only one close too */}
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-xl font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#D4A14C]" />
                  Pay Now
                </DialogTitle>
                <p className="text-xs sm:text-sm text-[#B8C0D0] mt-1">
                  {created ? (
                    <>
                      Reference: <span className="text-white font-medium">{created.bookingReference}</span> • Pay now:{' '}
                      <span className="text-white font-medium">{formatETB(payableNow)}</span>
                    </>
                  ) : (
                    'Create booking first'
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                onClick={() => setPayTab('receipt')}
                className={cx(
                  'flex-1',
                  payTab === 'receipt'
                    ? 'bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10',
                )}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Receipt
              </Button>
              <Button
                type="button"
                onClick={() => setPayTab('whatsapp')}
                className={cx(
                  'flex-1',
                  payTab === 'whatsapp'
                    ? 'bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10',
                )}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </DialogHeader>

          <div className="px-4 sm:px-6 py-4 sm:py-5">
            {payTab === 'receipt' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white font-semibold">1) Pay using the instructions</p>
                  <p className="text-xs text-[#B8C0D0] mt-1">
                    Method: <span className="text-white">{selectedPaymentConfig?.name ?? '—'}</span>
                  </p>
                  <p className="text-xs text-[#B8C0D0] mt-2">{selectedPaymentConfig?.instructions ?? '—'}</p>
                  <p className="text-xs text-[#B8C0D0] mt-2">
                    Use reference: <span className="text-white font-medium">{created?.bookingReference ?? '—'}</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white font-semibold">2) Upload payment proof</p>

                  <div className="mt-3">
                    <Label className="text-[#B8C0D0] text-xs">Receipt file</Label>
                    <Input
                      type="file"
                      accept="image/*,application/pdf"
                      className="mt-2 bg-white/5 border-white/10 text-white"
                      onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
                    />
                    {receiptFile && (
                      <p className="text-[11px] text-[#B8C0D0] mt-2">
                        Selected: <span className="text-white">{receiptFile.name}</span> • {(receiptFile.size / 1024).toFixed(0)} KB
                      </p>
                    )}
                  </div>

                  <div className="mt-3">
                    <Label className="text-[#B8C0D0] text-xs">Note (optional)</Label>
                    <Textarea
                      className="mt-2 bg-white/5 border-white/10 text-white min-h-[90px]"
                      placeholder="e.g., Sender name, time of transfer, last 4 digits..."
                      value={receiptNote}
                      onChange={(e) => setReceiptNote(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      type="button"
                      className="flex-1 bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]"
                      onClick={submitReceiptProof}
                      disabled={!created || isSubmittingProof}
                    >
                      {isSubmittingProof ? 'Submitting...' : 'Submit Receipt'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setPayOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>

                  {proof?.submittedAt && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-[#B8C0D0]">
                      <p className="text-white font-medium">Latest submission</p>
                      <p className="mt-1">
                        Status:{' '}
                        <span className="text-white">{proof.verifiedAt ? 'Verified' : 'Pending verification'}</span>
                      </p>
                      {proof.fileName && (
                        <p className="mt-1">
                          File: <span className="text-white">{proof.fileName}</span>
                        </p>
                      )}
                      {proof.note && (
                        <p className="mt-1">
                          Note: <span className="text-white">{proof.note}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {payTab === 'whatsapp' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white font-semibold">WhatsApp payment request</p>
                  <p className="text-xs text-[#B8C0D0] mt-1">
                    Opens WhatsApp with a prefilled message (using +251976040457).
                  </p>

                  <div className="mt-4 flex gap-2">
                    <a
                      href={whatsappPayHref ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(!whatsappPayHref && 'pointer-events-none opacity-50')}
                    >
                      <Button type="button" className="bg-[#D4A14C] hover:bg-[#E8C87A] text-[#0B0F1A]">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Open WhatsApp
                      </Button>
                    </a>

                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setPayOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D4A14C]/25 bg-[#D4A14C]/10 p-4">
                  <p className="text-white font-semibold">Tip</p>
                  <p className="text-xs text-[#B8C0D0] mt-1">
                    If the receipt file is large, send the screenshot in the WhatsApp chat after the message.
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}