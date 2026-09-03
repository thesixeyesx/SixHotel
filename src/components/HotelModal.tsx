import React, { useState } from 'react';
import { X, MapPin, Phone, Award, Sparkles, Check, Crown, Bed, Users, Maximize2, Calendar, ShieldCheck } from 'lucide-react';
import { Hotel, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface HotelModalProps {
  hotel: Hotel | null;
  currency: Currency;
  onClose: () => void;
  onBookHotel: (hotelId: string, roomId?: string) => void;
}

export const HotelModal: React.FC<HotelModalProps> = ({
  hotel,
  currency,
  onClose,
  onBookHotel,
}) => {
  if (!hotel) return null;

  const [activeImage, setActiveImage] = useState(hotel.heroImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#12141c] border border-[#3d3221] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-[#cca166] border border-[#cca166]/40 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Gallery Banner */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 bg-black">
          <img
            src={activeImage}
            alt={hotel.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-black/50" />

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 sm:left-8 right-16">
            <div className="flex items-center space-x-2 text-xs text-[#cca166] uppercase tracking-widest font-semibold mb-1">
              <Crown className="w-3.5 h-3.5" />
              <span>{hotel.category} • {hotel.city}, {hotel.state}</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl text-white font-light tracking-wide">
              {hotel.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#cca166] italic">
              {hotel.tagline}
            </p>
          </div>
        </div>

        {/* Gallery Thumbnails Bar */}
        {hotel.gallery.length > 0 && (
          <div className="bg-[#181a25] px-4 py-2 border-b border-[#2a2318] flex items-center space-x-2 overflow-x-auto shrink-0">
            {[hotel.heroImage, ...hotel.gallery].map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative w-16 h-11 rounded overflow-hidden shrink-0 border-2 transition ${
                  activeImage === imgUrl ? 'border-[#cca166] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Details Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Overview & Heritage Story */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold mb-2">
                  The Royal Provenance &amp; Heritage
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {hotel.heritageStory}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold mb-2">
                  Sanctuary Overview
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              {/* Signature Experience */}
              <div className="p-4 rounded-lg bg-[#1a1d29] border border-[#3b3020]">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#cca166] uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-[#cca166]" />
                  <span>Curated Signature Experience</span>
                </div>
                <p className="text-sm text-neutral-200 font-serif-luxury italic">
                  “{hotel.signatureExperience}”
                </p>
              </div>
            </div>

            {/* Quick Fact Sheet & Awards */}
            <div className="bg-[#181a25] border border-[#32281b] rounded-xl p-5 space-y-4 h-fit">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#cca166] font-semibold mb-1">
                  Starting Rate
                </div>
                <div className="text-2xl font-bold text-white">
                  {formatPrice(hotel.startingPriceINR, currency)}
                  <span className="text-xs text-neutral-400 font-normal"> / night</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2b241a] space-y-2 text-xs text-neutral-300">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-[#cca166] shrink-0 mt-0.5" />
                  <span>{hotel.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#cca166] shrink-0" />
                  <span>{hotel.phone}</span>
                </div>
              </div>

              {hotel.awards && (
                <div className="pt-3 border-t border-[#2b241a] space-y-1.5">
                  <div className="text-[10px] uppercase tracking-widest text-[#cca166] font-semibold">
                    Acclaimed Accolades
                  </div>
                  {hotel.awards.map((award, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-xs text-neutral-300">
                      <Award className="w-3.5 h-3.5 text-[#cca166] shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  onClose();
                  onBookHotel(hotel.id);
                }}
                className="w-full bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] font-bold text-xs py-3 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer"
              >
                Proceed to Reservation
              </button>
            </div>
          </div>

          {/* Highlights & Amenities */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold mb-3">
              Privileged Palace Inclusions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {hotel.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 p-2.5 rounded bg-[#171924] border border-[#2b241a] text-xs text-neutral-300"
                >
                  <Check className="w-4 h-4 text-[#cca166] shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms & Suites Showcase */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold">
                Available Rooms &amp; Royal Suites
              </h3>
              <span className="text-xs text-neutral-400">
                {hotel.rooms.length} categories available
              </span>
            </div>

            <div className="space-y-4">
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-[#161824] border border-[#30281b] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:border-[#cca166]/70 transition"
                >
                  <div className="w-full md:w-48 h-36 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img
                      src={room.image}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest bg-[#272017] text-[#cca166] px-2 py-0.5 rounded border border-[#483722]">
                        {room.category}
                      </span>
                      <span className="text-xs text-neutral-400 flex items-center space-x-1">
                        <Maximize2 className="w-3 h-3 text-[#cca166]" />
                        <span>{room.sizeSqFt} sq.ft</span>
                      </span>
                      <span className="text-xs text-neutral-400 flex items-center space-x-1">
                        <Users className="w-3 h-3 text-[#cca166]" />
                        <span>Up to {room.maxGuests} Guests</span>
                      </span>
                    </div>

                    <h4 className="font-serif-luxury text-lg sm:text-xl text-white font-medium">
                      {room.name}
                    </h4>

                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[11px] text-[#cca166]">
                      {room.features.map((feat, i) => (
                        <span key={i} className="bg-[#1d1f2b] px-2 py-0.5 rounded">
                          • {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-auto text-left md:text-right shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#2b241a]">
                    <div className="text-[10px] uppercase text-neutral-400">
                      Exclusive Rate
                    </div>
                    <div className="text-xl font-bold text-white mb-2">
                      {formatPrice(room.basePriceINR, currency)}
                      <span className="text-[11px] font-normal text-neutral-400"> / night</span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onBookHotel(hotel.id, room.id);
                      }}
                      className="w-full md:w-auto bg-[#cca166] hover:bg-[#deb175] text-[#0d0e12] font-semibold text-xs px-5 py-2 rounded uppercase tracking-wider transition cursor-pointer"
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
