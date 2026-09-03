import React, { useState } from 'react';
import { X, Utensils, Calendar, Clock, Users, CheckCircle2, Crown, Sparkles } from 'lucide-react';
import { DiningVenue } from '../types';
import { DINING_VENUES } from '../data/dining';

interface DiningModalProps {
  venue: DiningVenue | null;
  onClose: () => void;
}

export const DiningModal: React.FC<DiningModalProps> = ({ venue, onClose }) => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venue?.id || DINING_VENUES[0].id);
  const currentVenue = DINING_VENUES.find((v) => v.id === selectedVenueId) || DINING_VENUES[0];

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(today);
  const [timeSlot, setTimeSlot] = useState<string>('07:30 PM (Dinner)');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [tablePreference, setTablePreference] = useState<string>('Window / Lake View Table');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('Celebration / Tasting Menu');

  const [confirmedReservation, setConfirmedReservation] = useState<{
    code: string;
    venueName: string;
    date: string;
    timeSlot: string;
    guests: number;
    guestName: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert('Please provide your name and phone number for table reservation.');
      return;
    }
    const code = `DINE-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedReservation({
      code,
      venueName: currentVenue.name,
      date,
      timeSlot,
      guests: guestsCount,
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
              <Utensils className="w-4 h-4 text-[#cca166]" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm sm:text-base text-white tracking-widest uppercase font-bold">
                Table Reservation
              </h2>
              <div className="text-[11px] text-[#cca166]">
                {currentVenue.name} • {currentVenue.hotelName}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!confirmedReservation ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Venue Selector */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#cca166] font-semibold mb-1">
                  Culinary Destination
                </label>
                <select
                  value={selectedVenueId}
                  onChange={(e) => setSelectedVenueId(e.target.value)}
                  className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2.5 rounded text-xs focus:border-[#cca166] focus:outline-none"
                >
                  {DINING_VENUES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.hotelName} - {v.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Venue Snapshot */}
              <div className="p-3.5 rounded-lg bg-[#161824] border border-[#2b2318] flex items-center gap-3">
                <img
                  src={currentVenue.image}
                  alt={currentVenue.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded object-cover shrink-0"
                />
                <div className="text-xs">
                  <div className="text-white font-semibold">{currentVenue.cuisine}</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Dress Code: {currentVenue.dressCode}</div>
                  <div className="text-[#cca166] text-[11px] mt-0.5">{currentVenue.timing}</div>
                </div>
              </div>

              {/* Date & Time Slot & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Service / Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  >
                    <option value="12:30 PM (Lunch)">12:30 PM (Lunch)</option>
                    <option value="01:30 PM (Lunch)">01:30 PM (Lunch)</option>
                    <option value="04:00 PM (High Tea)">04:00 PM (High Tea)</option>
                    <option value="07:00 PM (Dinner)">07:00 PM (Dinner)</option>
                    <option value="08:30 PM (Dinner)">08:30 PM (Dinner)</option>
                    <option value="09:45 PM (Late Supper)">09:45 PM (Late Supper)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table Preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#cca166] font-semibold mb-1">
                  Seating Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {['Window / Lake View Table', 'Palace Courtyard', 'Private Alcove', 'Live Show Kitchen', 'Verandah Lounge'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setTablePreference(pref)}
                      className={`p-2 rounded border text-left transition text-[11px] ${
                        tablePreference === pref
                          ? 'bg-[#261f15] border-[#cca166] text-[#cca166] font-semibold'
                          : 'bg-[#181a26] border-[#2e261a] text-neutral-300 hover:border-[#4d3d28]'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Guest Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Contact Phone *</label>
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
                  Special Occasion or Dietary Preferences
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian Jain / Anniversary Champagne Toast / Nut allergy"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2 rounded text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#cca166] via-[#e2ba7d] to-[#b9853c] text-[#0d0e12] font-bold text-xs py-3 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer"
              >
                Confirm Table Reservation
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#272118] border-2 border-[#cca166] flex items-center justify-center mx-auto text-[#cca166]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-bold">
                  Reservation Confirmed
                </div>
                <h3 className="font-serif-luxury text-2xl text-white font-medium mt-1">
                  Your Table is Gratefully Reserved
                </h3>
              </div>

              <div className="bg-[#171926] p-5 rounded-xl border border-[#3c311f] max-w-md mx-auto text-left text-xs space-y-2 text-neutral-300">
                <div className="flex justify-between border-b border-[#2b241b] pb-2">
                  <span className="text-neutral-400">Reservation Code:</span>
                  <span className="font-bold text-white tracking-wider">{confirmedReservation.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Restaurant:</span>
                  <span className="font-medium text-white">{confirmedReservation.venueName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Date &amp; Time:</span>
                  <span className="text-white">{confirmedReservation.date} • {confirmedReservation.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Party Size:</span>
                  <span className="text-white">{confirmedReservation.guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Guest:</span>
                  <span className="text-white">{confirmedReservation.guestName}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="bg-[#cca166] text-[#0d0e12] px-6 py-2.5 rounded text-xs uppercase tracking-wider font-bold transition hover:brightness-110 cursor-pointer"
              >
                Close &amp; Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
