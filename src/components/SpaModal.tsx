import React, { useState } from 'react';
import { X, Sparkles, Clock, CheckCircle2, Flower2, HeartHandshake } from 'lucide-react';
import { SpaTreatment, Currency } from '../types';
import { SPA_TREATMENTS } from '../data/wellness';
import { formatPrice } from '../utils/formatters';

interface SpaModalProps {
  treatment: SpaTreatment | null;
  currency: Currency;
  onClose: () => void;
}

export const SpaModal: React.FC<SpaModalProps> = ({ treatment, currency, onClose }) => {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(treatment?.id || SPA_TREATMENTS[0].id);
  const currentTreatment = SPA_TREATMENTS.find((t) => t.id === selectedTreatmentId) || SPA_TREATMENTS[0];

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(today);
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM (Morning Vitality)');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [focusArea, setFocusArea] = useState<string>('Stress Release & Deep Muscle Alignment');

  const [confirmedSpa, setConfirmedSpa] = useState<{
    code: string;
    treatmentName: string;
    date: string;
    timeSlot: string;
    guestName: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert('Please fill in your name and phone number for spa appointment.');
      return;
    }
    const code = `SPA-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedSpa({
      code,
      treatmentName: currentTreatment.name,
      date,
      timeSlot,
      guestName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12141c] border border-[#3f3220] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#181a25] px-6 py-4 border-b border-[#2b2319] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-[#cca166] flex items-center justify-center bg-[#251e14]">
              <Flower2 className="w-4 h-4 text-[#cca166]" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm sm:text-base text-white tracking-widest uppercase font-bold">
                Soma Royal Spa Appointment
              </h2>
              <div className="text-[11px] text-[#cca166]">
                Ayurvedic &amp; Holistic Rejuvenation
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!confirmedSpa ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Treatment Selector */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#cca166] font-semibold mb-1">
                  Select Royal Ritual
                </label>
                <select
                  value={selectedTreatmentId}
                  onChange={(e) => setSelectedTreatmentId(e.target.value)}
                  className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2.5 rounded text-xs focus:border-[#cca166] focus:outline-none"
                >
                  {SPA_TREATMENTS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.durationMinutes} mins - {formatPrice(t.priceINR, currency)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Treatment Card Snapshot */}
              <div className="p-4 rounded-lg bg-[#161824] border border-[#2b2318] flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={currentTreatment.image}
                  alt={currentTreatment.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-28 h-24 rounded object-cover shrink-0"
                />
                <div className="flex-1 text-xs space-y-1">
                  <div className="text-white font-semibold text-sm">{currentTreatment.name}</div>
                  <div className="text-neutral-400 text-xs">{currentTreatment.description}</div>
                  <div className="flex items-center space-x-3 text-[#cca166] font-medium pt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{currentTreatment.durationMinutes} Minutes</span>
                    </span>
                    <span>•</span>
                    <span>{formatPrice(currentTreatment.priceINR, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Preferred Time</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  >
                    <option value="09:30 AM (Sunrise Prana)">09:30 AM (Sunrise Prana)</option>
                    <option value="11:30 AM (Midday Balance)">11:30 AM (Midday Balance)</option>
                    <option value="03:00 PM (Afternoon Serenity)">03:00 PM (Afternoon Serenity)</option>
                    <option value="05:30 PM (Sunset Sandhya)">05:30 PM (Sunset Sandhya)</option>
                    <option value="08:00 PM (Evening Restorative)">08:00 PM (Evening Restorative)</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Guest Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 text-xs mb-1 font-medium">
                  Therapy Consultation Focus
                </label>
                <input
                  type="text"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  placeholder="e.g. Back pain, insomnia relief, bridal glow"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#cca166] via-[#e2ba7d] to-[#b9853c] text-[#0d0e12] font-bold text-xs py-3 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer"
              >
                Confirm Spa Appointment
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#272118] border-2 border-[#cca166] flex items-center justify-center mx-auto text-[#cca166]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-bold">
                  Appointment Confirmed
                </div>
                <h3 className="font-serif-luxury text-2xl text-white font-medium mt-1">
                  A Sanctuary of Healing Awaits
                </h3>
              </div>

              <div className="bg-[#171926] p-5 rounded-xl border border-[#3c311f] max-w-md mx-auto text-left text-xs space-y-2 text-neutral-300">
                <div className="flex justify-between border-b border-[#2b241b] pb-2">
                  <span className="text-neutral-400">Appointment Code:</span>
                  <span className="font-bold text-white tracking-wider">{confirmedSpa.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Treatment:</span>
                  <span className="font-medium text-white">{confirmedSpa.treatmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Date &amp; Time:</span>
                  <span className="text-white">{confirmedSpa.date} • {confirmedSpa.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Guest:</span>
                  <span className="text-white">{confirmedSpa.guestName}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="bg-[#cca166] text-[#0d0e12] px-6 py-2.5 rounded text-xs uppercase tracking-wider font-bold transition hover:brightness-110 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
