import React, { useState } from 'react';
import { X, Calendar, Users, Check, ArrowRight, ShieldCheck, Download, Printer, CheckCircle2, Crown, Sparkles, MapPin } from 'lucide-react';
import { Hotel, Room, Currency, Booking } from '../types';
import { HOTELS } from '../data/hotels';
import { formatPrice } from '../utils/formatters';

interface BookingModalProps {
  initialHotelId?: string;
  initialRoomId?: string;
  initialFilters?: {
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
    children: number;
    rateCode: string;
  };
  currency: Currency;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

interface AddOnOption {
  id: string;
  name: string;
  priceINR: number;
  desc: string;
}

const LUXURY_ADD_ONS: AddOnOption[] = [
  {
    id: 'addon-rolls-royce',
    name: 'Palace Rolls-Royce / Vintage Chauffeur Transfer',
    priceINR: 9500,
    desc: 'Bespoke airport or city pickup in an authentic vintage/Rolls-Royce limousine with chilled champagne.',
  },
  {
    id: 'addon-candlelight-dinner',
    name: 'Private Candlelit Royal Terrace Dinner',
    priceINR: 14000,
    desc: 'A 5-course curated feast by the Master Chef on a private marble jharokha with live sitar maestro.',
  },
  {
    id: 'addon-soma-spa',
    name: '90-min Soma Couple Ayurvedic Rejuvenation',
    priceINR: 18000,
    desc: 'Warm herbal oils, royal Shirodhara, and aromatherapy milk bath in a private royal spa pavilion.',
  },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  initialHotelId,
  initialRoomId,
  initialFilters,
  currency,
  onClose,
  onBookingSuccess,
}) => {
  // Tomorrow and 3 days later
  const today = new Date();
  const defIn = initialFilters?.checkIn || new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
  const defOut = initialFilters?.checkOut || new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedHotelId, setSelectedHotelId] = useState<string>(initialHotelId || HOTELS[0].id);
  const [checkIn, setCheckIn] = useState<string>(defIn);
  const [checkOut, setCheckOut] = useState<string>(defOut);
  const [roomsCount, setRoomsCount] = useState<number>(initialFilters?.rooms || 1);
  const [adultsCount, setAdultsCount] = useState<number>(initialFilters?.adults || 2);
  const [childrenCount, setChildrenCount] = useState<number>(initialFilters?.children || 0);

  const activeHotel = HOTELS.find((h) => h.id === selectedHotelId) || HOTELS[0];
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoomId || (activeHotel.rooms[0]?.id ?? '')
  );

  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Guest details form state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('Anniversary / Royal Vacation Celebration');
  const [paymentMethod, setPaymentMethod] = useState<'hotel' | 'card'>('hotel');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Nights calculation
  const nights = Math.max(
    1,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
  );

  const selectedRoom =
    activeHotel.rooms.find((r) => r.id === selectedRoomId) || activeHotel.rooms[0];

  // Price calculations (with 15% circle member discount if applicable)
  const isCircleRate = initialFilters?.rateCode !== 'standard';
  const baseNightly = selectedRoom ? selectedRoom.basePriceINR : activeHotel.startingPriceINR;
  const discountedNightly = isCircleRate ? Math.round(baseNightly * 0.85) : baseNightly;
  const roomTotal = discountedNightly * nights * roomsCount;

  const addOnTotal = selectedAddOns.reduce((sum, addOnId) => {
    const item = LUXURY_ADD_ONS.find((a) => a.id === addOnId);
    return sum + (item ? item.priceINR : 0);
  }, 0);

  const taxesAndLuxuryCess = Math.round(roomTotal * 0.18); // 18% GST standard luxury hospitality
  const grandTotalINR = roomTotal + addOnTotal + taxesAndLuxuryCess;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((x) => x !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in your name, email, and phone number for royal confirmation.');
      return;
    }

    const refNumber = `TSE-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking: Booking = {
      bookingId: refNumber,
      hotelId: activeHotel.id,
      hotelName: activeHotel.name,
      hotelCity: activeHotel.city,
      hotelImage: activeHotel.heroImage,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guests: {
        adults: adultsCount,
        children: childrenCount,
        rooms: roomsCount,
      },
      totalAmountINR: grandTotalINR,
      specialRequests,
      guestName,
      guestEmail,
      guestPhone,
      paymentMethod: paymentMethod === 'hotel' ? 'Pay upon Check-in at Palace' : 'Guaranteed via Card',
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      addOns: selectedAddOns.map((id) => LUXURY_ADD_ONS.find((a) => a.id === id)?.name || id),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tse_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('tse_bookings', JSON.stringify(existing));
    } catch {
      // ignore storage error
    }

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
    setCurrentStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#12141c] border border-[#3f3220] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-[#181a25] px-6 py-4 border-b border-[#2b2319] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-[#cca166] flex items-center justify-center bg-[#251e14]">
              <Crown className="w-4 h-4 text-[#cca166]" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm sm:text-base text-white tracking-widest uppercase font-bold">
                The Six Eyes Reservation
              </h2>
              <div className="text-[11px] text-[#cca166]">
                {activeHotel.name} • {activeHotel.city}
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

        {/* Step Indicator (Steps 1, 2, 3) */}
        {currentStep < 4 && (
          <div className="bg-[#151722] px-6 py-2.5 border-b border-[#282116] flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center space-x-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep >= 1 ? 'bg-[#cca166] text-[#0d0e12]' : 'bg-neutral-700 text-white'
                }`}
              >
                1
              </span>
              <span className={currentStep === 1 ? 'text-[#cca166] font-semibold' : 'text-neutral-400'}>
                Select Suite
              </span>
            </div>
            <div className="w-8 h-px bg-[#31271b]" />
            <div className="flex items-center space-x-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep >= 2 ? 'bg-[#cca166] text-[#0d0e12]' : 'bg-neutral-700 text-white'
                }`}
              >
                2
              </span>
              <span className={currentStep === 2 ? 'text-[#cca166] font-semibold' : 'text-neutral-400'}>
                Royal Add-ons
              </span>
            </div>
            <div className="w-8 h-px bg-[#31271b]" />
            <div className="flex items-center space-x-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep >= 3 ? 'bg-[#cca166] text-[#0d0e12]' : 'bg-neutral-700 text-white'
                }`}
              >
                3
              </span>
              <span className={currentStep === 3 ? 'text-[#cca166] font-semibold' : 'text-neutral-400'}>
                Guest Details
              </span>
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Select Room / Suite */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Hotel & Dates Quick Selector */}
              <div className="bg-[#171926] p-4 rounded-xl border border-[#32281a] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#cca166] block font-medium">
                    Palace / Hotel
                  </span>
                  <select
                    value={selectedHotelId}
                    onChange={(e) => {
                      setSelectedHotelId(e.target.value);
                      const newH = HOTELS.find((h) => h.id === e.target.value);
                      if (newH?.rooms[0]) setSelectedRoomId(newH.rooms[0].id);
                    }}
                    className="mt-1 w-full bg-[#1e2130] text-white p-2 rounded border border-[#3e3120] text-xs focus:outline-none"
                  >
                    {HOTELS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#cca166] block font-medium">
                    Dates ({nights} Nights)
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-[#1e2130] text-white p-1.5 rounded border border-[#3e3120] text-xs"
                    />
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-[#1e2130] text-white p-1.5 rounded border border-[#3e3120] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#cca166] block font-medium">
                    Rooms &amp; Guests
                  </span>
                  <div className="mt-1 p-2 bg-[#1e2130] rounded border border-[#3e3120] text-white text-xs flex justify-between">
                    <span>{roomsCount} Room</span>
                    <span>{adultsCount} Adults</span>
                    {childrenCount > 0 && <span>{childrenCount} Child</span>}
                  </div>
                </div>
              </div>

              {/* Room Categories */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold mb-3">
                  Choose Your Royal Chamber
                </h3>

                <div className="space-y-4">
                  {activeHotel.rooms.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    const price = isCircleRate
                      ? Math.round(room.basePriceINR * 0.85)
                      : room.basePriceINR;

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-4 rounded-xl border transition cursor-pointer flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${
                          isSelected
                            ? 'bg-[#221d15] border-[#cca166] shadow-lg shadow-[#cca166]/10'
                            : 'bg-[#151722] border-[#2f271a] hover:border-[#4d3d28]'
                        }`}
                      >
                        <div className="w-full md:w-44 h-32 rounded-lg overflow-hidden shrink-0 bg-black">
                          <img
                            src={room.image}
                            alt={room.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] uppercase tracking-wider bg-[#2e2316] text-[#cca166] px-2 py-0.5 rounded font-semibold">
                              {room.category}
                            </span>
                            <span className="text-xs text-neutral-400">
                              {room.sizeSqFt} sq.ft • {room.bedType}
                            </span>
                          </div>

                          <h4 className="font-serif-luxury text-lg text-white font-medium">
                            {room.name}
                          </h4>

                          <p className="text-xs text-neutral-400 line-clamp-2">
                            {room.description}
                          </p>

                          <div className="flex flex-wrap gap-2 text-[11px] text-[#cca166]">
                            {room.amenities.slice(0, 3).map((a, i) => (
                              <span key={i} className="bg-[#1c1e2b] px-2 py-0.5 rounded">
                                ✓ {a}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="w-full md:w-auto text-left md:text-right shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#2b241a]">
                          {isCircleRate && (
                            <div className="text-[10px] text-[#cca166] font-medium">
                              Circle Privilege Applied (-15%)
                            </div>
                          )}
                          <div className="text-xl font-bold text-white">
                            {formatPrice(price, currency)}
                            <span className="text-xs text-neutral-400 font-normal"> / night</span>
                          </div>
                          <div className="text-[11px] text-neutral-400 mb-2">
                            Total: {formatPrice(price * nights * roomsCount, currency)} ({nights} nights)
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoomId(room.id);
                              setCurrentStep(2);
                            }}
                            className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold transition ${
                              isSelected
                                ? 'bg-[#cca166] text-[#0d0e12]'
                                : 'bg-[#1f2230] text-white hover:bg-[#cca166] hover:text-[#0d0e12]'
                            }`}
                          >
                            {isSelected ? 'Selected ✓' : 'Select'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Footer */}
              <div className="flex justify-end pt-4 border-t border-[#2a2318]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] font-bold text-xs py-3 px-6 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition flex items-center space-x-2"
                >
                  <span>Continue to Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Royal Add-ons */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold mb-2">
                  Enhance Your Royal Stay
                </h3>
                <p className="text-neutral-400 text-xs">
                  Complement your stay with our signature palace experiences and private butler curations.
                </p>
              </div>

              <div className="space-y-3">
                {LUXURY_ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-[#221e16] border-[#cca166]'
                          : 'bg-[#151722] border-[#2c2419] hover:border-[#423420]'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#cca166] border-[#cca166] text-[#0d0e12]'
                              : 'border-neutral-600 bg-black/40'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">
                            {addon.name}
                          </div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            {addon.desc}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-[#cca166]">
                          +{formatPrice(addon.priceINR, currency)}
                        </div>
                        <div className="text-[10px] text-neutral-400">per stay</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing Overview Summary */}
              <div className="bg-[#171926] p-4 rounded-xl border border-[#32281b] space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>{selectedRoom?.name} ({nights} Nights x {roomsCount} Room)</span>
                  <span>{formatPrice(roomTotal, currency)}</span>
                </div>
                {addOnTotal > 0 && (
                  <div className="flex justify-between text-neutral-300">
                    <span>Curated Experiences ({selectedAddOns.length})</span>
                    <span>+{formatPrice(addOnTotal, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Taxes &amp; Heritage Luxury Surcharge (18%)</span>
                  <span>+{formatPrice(taxesAndLuxuryCess, currency)}</span>
                </div>
                <div className="pt-2 border-t border-[#2b241a] flex justify-between text-base font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-[#cca166]">{formatPrice(grandTotalINR, currency)}</span>
                </div>
              </div>

              {/* Step 2 Footer */}
              <div className="flex justify-between pt-4 border-t border-[#2a2318]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-neutral-400 hover:text-white text-xs uppercase tracking-wider py-2 px-4"
                >
                  Back to Suites
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] font-bold text-xs py-3 px-6 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition flex items-center space-x-2"
                >
                  <span>Proceed to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Info & Payment Form */}
          {currentStep === 3 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold mb-1">
                  Primary Guest Information
                </h3>
                <p className="text-neutral-400 text-xs">
                  Your reservation will be held under these credentials for royal arrival.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharaja Vikramaditya / Rohit Sharma"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#1a1c2a] border border-[#3b3021] text-white p-2.5 rounded focus:border-[#cca166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">
                    Email Address * (For Confirmation Voucher)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@luxurymail.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#1a1c2a] border border-[#3b3021] text-white p-2.5 rounded focus:border-[#cca166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">
                    Phone Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#1a1c2a] border border-[#3b3021] text-white p-2.5 rounded focus:border-[#cca166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">
                    Celebration / Special Occasion
                  </label>
                  <select
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#1a1c2a] border border-[#3b3021] text-white p-2.5 rounded focus:border-[#cca166] focus:outline-none"
                  >
                    <option value="Anniversary Celebration">Wedding Anniversary</option>
                    <option value="Honeymoon Escape">Royal Honeymoon</option>
                    <option value="Birthday Gala">Birthday Celebration</option>
                    <option value="Palace Wellness & Relaxation">Holistic Wellness Retreat</option>
                    <option value="Business & Dignitary Stay">High-Profile Business</option>
                  </select>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#cca166] font-semibold mb-2">
                  Payment Guarantee
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div
                    onClick={() => setPaymentMethod('hotel')}
                    className={`p-3.5 rounded-lg border cursor-pointer transition ${
                      paymentMethod === 'hotel'
                        ? 'bg-[#221e16] border-[#cca166]'
                        : 'bg-[#161824] border-[#2c2419]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 font-semibold text-white">
                      <ShieldCheck className="w-4 h-4 text-[#cca166]" />
                      <span>Pay at Hotel upon Arrival</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      No advance deduction. Present card or cash upon check-in. Free cancellation 48h prior.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-lg border cursor-pointer transition ${
                      paymentMethod === 'card'
                        ? 'bg-[#221e16] border-[#cca166]'
                        : 'bg-[#161824] border-[#2c2419]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 font-semibold text-white">
                      <Crown className="w-4 h-4 text-[#cca166]" />
                      <span>Instant VIP Pre-Authorization</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Secures immediate complimentary room upgrade subject to palace availability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Summary Card */}
              <div className="bg-[#171926] p-4 rounded-xl border border-[#32281b] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase text-neutral-400">Total Payable Amount</div>
                  <div className="text-2xl font-bold text-[#cca166]">
                    {formatPrice(grandTotalINR, currency)}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Inclusive of all royal palace taxes &amp; service charges
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-[#cca166]" />
                  <span>256-bit Encrypted Reservation</span>
                </div>
              </div>

              {/* Step 3 Footer */}
              <div className="flex justify-between pt-4 border-t border-[#2a2318]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-neutral-400 hover:text-white text-xs uppercase tracking-wider py-2 px-4"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#cca166] via-[#e2ba7d] to-[#b9853c] text-[#0d0e12] font-bold text-xs sm:text-sm py-3 px-8 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-xl cursor-pointer"
                >
                  Confirm Royal Stay
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmed Voucher */}
          {currentStep === 4 && confirmedBooking && (
            <div className="space-y-6 py-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#292217] border-2 border-[#cca166] flex items-center justify-center mx-auto text-[#cca166] shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#cca166] font-bold">
                  Reservation Confirmed &amp; Honored
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium">
                  We Await Your Gracious Arrival
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm max-w-lg mx-auto">
                  Your booking voucher has been issued. A royal palace concierge has been assigned to your stay.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="bg-[#181a27] border-2 border-[#cca166]/60 rounded-xl p-6 relative overflow-hidden text-neutral-200 space-y-5">
                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-8xl text-white/[0.03] font-bold pointer-events-none select-none tracking-widest">
                  VI EYES
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#30281c] pb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#cca166]">
                      Booking Reference Number
                    </div>
                    <div className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-widest">
                      {confirmedBooking.bookingId}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-[#241f17] text-[#cca166] border border-[#4a3924] px-3 py-1 rounded text-xs uppercase font-bold tracking-widest">
                      ★ Confirmed Palace Voucher
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase tracking-wider">Palace Property</div>
                    <div className="font-semibold text-white mt-0.5">{confirmedBooking.hotelName}</div>
                    <div className="text-neutral-400">{confirmedBooking.hotelCity}</div>
                  </div>

                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase tracking-wider">Dates &amp; Nights</div>
                    <div className="font-semibold text-white mt-0.5">
                      {confirmedBooking.checkIn} to {confirmedBooking.checkOut}
                    </div>
                    <div className="text-[#cca166]">{confirmedBooking.nights} Nights</div>
                  </div>

                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase tracking-wider">Suite Category</div>
                    <div className="font-semibold text-white mt-0.5">{confirmedBooking.roomName}</div>
                    <div className="text-neutral-400">{confirmedBooking.guests.rooms} Room, {confirmedBooking.guests.adults} Guests</div>
                  </div>

                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase tracking-wider">Total Amount</div>
                    <div className="font-bold text-lg text-[#cca166] mt-0.5">
                      {formatPrice(confirmedBooking.totalAmountINR, currency)}
                    </div>
                    <div className="text-neutral-400 text-[10px]">{confirmedBooking.paymentMethod}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#30281c] flex flex-wrap justify-between items-center text-xs text-neutral-400 gap-2">
                  <div>
                    Guest: <strong className="text-white">{confirmedBooking.guestName}</strong> ({confirmedBooking.guestEmail})
                  </div>
                  <div>
                    Special Note: <span className="italic text-[#cca166]">{confirmedBooking.specialRequests}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[#1e2130] hover:bg-[#2a2e42] text-white border border-[#3e3220] px-4 py-2.5 rounded text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#cca166]" />
                  <span>Print Royal Voucher</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] px-6 py-2.5 rounded text-xs uppercase tracking-wider font-bold transition hover:brightness-110 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
