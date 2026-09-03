import React, { useState } from 'react';
import { Search, Calendar, Users, Tag, ChevronDown, Check } from 'lucide-react';
import { HOTELS } from '../data/hotels';

interface BookingBarProps {
  onCheckAvailability: (filters: {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
    children: number;
    rateCode: string;
  }) => void;
  selectedHotelId?: string;
}

export const BookingBar: React.FC<BookingBarProps> = ({
  onCheckAvailability,
  selectedHotelId,
}) => {
  // Tomorrow and 3 days later as default dates
  const today = new Date();
  const defaultCheckIn = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
  const defaultCheckOut = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];

  const [hotelId, setHotelId] = useState<string>(selectedHotelId || HOTELS[0].id);
  const [checkIn, setCheckIn] = useState<string>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<string>(defaultCheckOut);
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rateCode, setRateCode] = useState<string>('circle'); // 'circle' | 'standard' | 'corporate'

  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [hotelDropdownOpen, setHotelDropdownOpen] = useState(false);
  const [rateDropdownOpen, setRateDropdownOpen] = useState(false);

  const selectedHotel = HOTELS.find((h) => h.id === hotelId) || HOTELS[0];

  // Calculate nights
  const nights = Math.max(
    1,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
  );

  const handleSearch = () => {
    onCheckAvailability({
      hotelId,
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
      rateCode,
    });
  };

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-12">
      <div className="bg-[#151722] border border-[#3b3222] shadow-2xl rounded-lg p-3 sm:p-4 lg:p-5 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Destination / Hotel Selector (5 cols) */}
          <div className="lg:col-span-4 relative">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cca166] mb-1">
              Select Palace or Sanctuary
            </label>
            <button
              type="button"
              onClick={() => {
                setHotelDropdownOpen(!hotelDropdownOpen);
                setGuestPopoverOpen(false);
                setRateDropdownOpen(false);
              }}
              className="w-full text-left bg-[#1a1c29] border border-[#32281a] hover:border-[#cca166] rounded p-2.5 flex items-center justify-between transition cursor-pointer"
            >
              <div className="truncate pr-2">
                <div className="text-white font-medium text-xs sm:text-sm truncate">
                  {selectedHotel.name}
                </div>
                <div className="text-neutral-400 text-[11px] truncate">
                  {selectedHotel.city}, {selectedHotel.state}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#cca166] shrink-0" />
            </button>

            {hotelDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-[#181926] border border-[#443622] rounded shadow-2xl max-h-72 overflow-y-auto z-50 divide-y divide-[#2a241b]">
                {HOTELS.map((hotel) => (
                  <button
                    key={hotel.id}
                    onClick={() => {
                      setHotelId(hotel.id);
                      setHotelDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 text-xs hover:bg-[#272118] transition flex items-center justify-between ${
                      hotel.id === hotelId ? 'bg-[#2b2216] text-[#cca166]' : 'text-neutral-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">{hotel.name}</div>
                      <div className="text-[11px] text-neutral-400">{hotel.city}, {hotel.state} • {hotel.category}</div>
                    </div>
                    {hotel.id === hotelId && <Check className="w-4 h-4 text-[#cca166]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dates (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cca166]">
                Check-In &amp; Check-Out
              </label>
              <span className="text-[10px] text-[#cca166] font-medium">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-[#1a1c29] border border-[#32281a] rounded p-1.5">
              <div className="flex items-center space-x-1.5 px-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#cca166] shrink-0" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-white text-xs focus:outline-none w-full cursor-pointer"
                />
              </div>
              <div className="flex items-center space-x-1.5 px-1.5 border-l border-[#2e261a]">
                <Calendar className="w-3.5 h-3.5 text-[#cca166] shrink-0" />
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-white text-xs focus:outline-none w-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Rooms & Guests (3 cols) */}
          <div className="lg:col-span-3 relative">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cca166] mb-1">
              Rooms &amp; Guests
            </label>
            <button
              type="button"
              onClick={() => {
                setGuestPopoverOpen(!guestPopoverOpen);
                setHotelDropdownOpen(false);
                setRateDropdownOpen(false);
              }}
              className="w-full text-left bg-[#1a1c29] border border-[#32281a] hover:border-[#cca166] rounded p-2.5 flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#cca166]" />
                <span className="text-white text-xs sm:text-sm font-medium">
                  {rooms} {rooms === 1 ? 'Room' : 'Rooms'}, {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#cca166]" />
            </button>

            {guestPopoverOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-[#181926] border border-[#443622] rounded shadow-2xl p-4 z-50 text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2e261a]">
                  <div>
                    <div className="text-white font-semibold">Rooms</div>
                    <div className="text-[11px] text-neutral-400">Palace Suites</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-6 h-6 rounded bg-[#272118] text-white disabled:opacity-30 border border-[#3d3121]"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[#cca166] w-4 text-center">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 5}
                      onClick={() => setRooms(Math.min(5, rooms + 1))}
                      className="w-6 h-6 rounded bg-[#272118] text-white border border-[#3d3121]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#2e261a]">
                  <div>
                    <div className="text-white font-semibold">Adults</div>
                    <div className="text-[11px] text-neutral-400">Ages 12+</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-6 h-6 rounded bg-[#272118] text-white disabled:opacity-30 border border-[#3d3121]"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[#cca166] w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 10}
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                      className="w-6 h-6 rounded bg-[#272118] text-white border border-[#3d3121]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">Children</div>
                    <div className="text-[11px] text-neutral-400">Ages 0 - 11</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-6 h-6 rounded bg-[#272118] text-white disabled:opacity-30 border border-[#3d3121]"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[#cca166] w-4 text-center">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={() => setChildren(Math.min(6, children + 1))}
                      className="w-6 h-6 rounded bg-[#272118] text-white border border-[#3d3121]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestPopoverOpen(false)}
                  className="w-full bg-[#cca166] text-[#0d0e12] font-semibold py-1.5 rounded mt-2 uppercase tracking-wider text-[11px]"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Check Availability CTA Button (2 cols) */}
          <div className="lg:col-span-2 pt-1 sm:pt-0">
            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-[#cca166] via-[#e2ba7d] to-[#b9853c] text-[#0d0e12] font-bold text-xs sm:text-sm py-3.5 px-4 rounded shadow-xl hover:shadow-[#cca166]/20 hover:brightness-110 active:scale-98 transition flex items-center justify-center space-x-1.5 uppercase tracking-[0.15em] cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#0d0e12]" />
              <span>Check Rates</span>
            </button>
          </div>
        </div>

        {/* Special Rate Filter Row */}
        <div className="mt-3 pt-2.5 border-t border-[#2a241b] flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-[#cca166] uppercase tracking-wider font-semibold">
              Special Rates:
            </span>
            <label className="inline-flex items-center space-x-1.5 cursor-pointer">
              <input
                type="radio"
                name="specialRate"
                checked={rateCode === 'circle'}
                onChange={() => setRateCode('circle')}
                className="accent-[#cca166]"
              />
              <span className={`text-[11px] ${rateCode === 'circle' ? 'text-white font-medium' : 'text-neutral-400'}`}>
                The Six Eyes Circle Member (15% Off)
              </span>
            </label>

            <label className="inline-flex items-center space-x-1.5 cursor-pointer hidden sm:inline-flex">
              <input
                type="radio"
                name="specialRate"
                checked={rateCode === 'standard'}
                onChange={() => setRateCode('standard')}
                className="accent-[#cca166]"
              />
              <span className={`text-[11px] ${rateCode === 'standard' ? 'text-white font-medium' : 'text-neutral-400'}`}>
                Standard Best Available
              </span>
            </label>
          </div>

          <div className="text-[11px] text-[#cca166]/80 italic">
            Best Rate Guarantee • Free Cancellation 48 hrs prior
          </div>
        </div>
      </div>
    </div>
  );
};
