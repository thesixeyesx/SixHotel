import React, { useState, useEffect } from 'react';
import { X, BookmarkCheck, Search, Calendar, MapPin, Printer, Trash2, ArrowRight } from 'lucide-react';
import { Booking, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface ManageBookingModalProps {
  currency: Currency;
  onClose: () => void;
  onNewBooking: () => void;
}

export const ManageBookingModal: React.FC<ManageBookingModalProps> = ({
  currency,
  onClose,
  onNewBooking,
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchRef, setSearchRef] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('tse_bookings') || '[]');
      setBookings(data);
      if (data.length > 0) {
        setSelectedBooking(data[0]);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;
    const found = bookings.find(
      (b) => b.bookingId.toLowerCase() === searchRef.trim().toLowerCase()
    );
    if (found) {
      setSelectedBooking(found);
    } else {
      alert(`No active royal booking found for reference "${searchRef}".`);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you wish to cancel this royal reservation? Free cancellation policy applies.')) {
      const updated = bookings.map((b) =>
        b.bookingId === bookingId ? { ...b, status: 'Cancelled' as const } : b
      );
      setBookings(updated);
      localStorage.setItem('tse_bookings', JSON.stringify(updated));
      if (selectedBooking?.bookingId === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: 'Cancelled' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#12141c] border border-[#3f3220] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#181a25] px-6 py-4 border-b border-[#2b2319] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-[#cca166] flex items-center justify-center bg-[#251e14]">
              <BookmarkCheck className="w-4 h-4 text-[#cca166]" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm sm:text-base text-white tracking-widest uppercase font-bold">
                Manage Palace Reservations
              </h2>
              <div className="text-[11px] text-[#cca166]">
                Look up or review your upcoming stays
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Lookup Input Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#cca166] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Booking Reference (e.g. TSE-84920)..."
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                className="w-full bg-[#181b28] border border-[#352a1b] text-white pl-9 pr-3 py-2.5 rounded text-xs focus:border-[#cca166] focus:outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-[#cca166] hover:bg-[#deaf70] text-[#0d0e12] font-semibold px-5 py-2.5 rounded text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Search
            </button>
          </form>

          {bookings.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#342a1b] rounded-xl space-y-3">
              <BookmarkCheck className="w-10 h-10 text-neutral-600 mx-auto" />
              <div className="text-white font-medium text-sm">No Active Palace Bookings Found</div>
              <p className="text-neutral-400 text-xs max-w-sm mx-auto">
                You haven&apos;t placed any stays yet in this session. Book your royal retreat to view your itinerary here.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNewBooking();
                }}
                className="bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] font-bold text-xs px-5 py-2.5 rounded uppercase tracking-wider hover:brightness-110 cursor-pointer inline-flex items-center space-x-1.5"
              >
                <span>Book a Stay Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Bookings list */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs uppercase tracking-wider text-[#cca166] font-semibold">
                  Saved Bookings ({bookings.length})
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {bookings.map((b) => (
                    <div
                      key={b.bookingId}
                      onClick={() => setSelectedBooking(b)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer text-xs space-y-1 ${
                        selectedBooking?.bookingId === b.bookingId
                          ? 'bg-[#251f15] border-[#cca166]'
                          : 'bg-[#161824] border-[#2c2419] hover:border-[#423422]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-white tracking-wider">
                          {b.bookingId}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                              : 'bg-rose-900/60 text-rose-300 border border-rose-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="font-semibold text-neutral-200">{b.hotelName}</div>
                      <div className="text-neutral-400 text-[11px]">
                        {b.checkIn} → {b.checkOut} ({b.nights} Nights)
                      </div>
                      <div className="text-[#cca166] font-bold pt-1">
                        {formatPrice(b.totalAmountINR, currency)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Voucher Details */}
              <div className="lg:col-span-7">
                {selectedBooking && (
                  <div className="bg-[#171926] border border-[#3b3020] rounded-xl p-5 space-y-4 text-xs text-neutral-300">
                    <div className="flex items-center justify-between border-b border-[#2d2419] pb-3">
                      <div>
                        <div className="text-[10px] uppercase text-[#cca166] tracking-wider font-semibold">
                          Reference Code
                        </div>
                        <div className="font-cinzel text-lg font-bold text-white tracking-widest">
                          {selectedBooking.bookingId}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded ${
                          selectedBooking.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-rose-950 text-rose-300 border border-rose-700'
                        }`}
                      >
                        {selectedBooking.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-white font-semibold text-sm">
                        {selectedBooking.hotelName}
                      </div>
                      <div className="flex items-center space-x-1.5 text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-[#cca166]" />
                        <span>{selectedBooking.hotelCity}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 bg-[#131520] p-3 rounded-lg border border-[#2b2319]">
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase">Check-In</div>
                        <div className="font-medium text-white">{selectedBooking.checkIn}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase">Check-Out</div>
                        <div className="font-medium text-white">{selectedBooking.checkOut}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase">Suite</div>
                        <div className="font-medium text-white">{selectedBooking.roomName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase">Guests</div>
                        <div className="font-medium text-white">
                          {selectedBooking.guests.adults} Adults, {selectedBooking.guests.rooms} Room
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase">Total Amount</div>
                        <div className="text-xl font-bold text-[#cca166]">
                          {formatPrice(selectedBooking.totalAmountINR, currency)}
                        </div>
                        <div className="text-[10px] text-neutral-400">{selectedBooking.paymentMethod}</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="bg-[#202333] hover:bg-[#2b2f44] text-neutral-200 p-2 rounded border border-[#3b3020] text-xs flex items-center space-x-1"
                        >
                          <Printer className="w-4 h-4 text-[#cca166]" />
                          <span>Print</span>
                        </button>

                        {selectedBooking.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(selectedBooking.bookingId)}
                            className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800 p-2 rounded text-xs flex items-center space-x-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
