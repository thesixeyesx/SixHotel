import React, { useState } from 'react';
import { Star, MapPin, Sparkles, ChevronRight, Award, Compass, CalendarCheck } from 'lucide-react';
import { Hotel, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface HotelCardProps {
  hotel: Hotel;
  currency: Currency;
  onExplore: (hotel: Hotel) => void;
  onBook: (hotelId: string) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  currency,
  onExplore,
  onBook,
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const images = hotel.gallery.length > 0 ? hotel.gallery : [hotel.heroImage];

  return (
    <div className="bg-[#141620] border border-[#2e2619] hover:border-[#cca166] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#cca166]/10 flex flex-col group">
      {/* Image Container with Hover Mini Gallery */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
        <img
          src={images[activeImgIdx] || hotel.heroImage}
          alt={hotel.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-black/40 pointer-events-none" />

        {/* Category & City Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
          <span className="bg-black/60 backdrop-blur-md text-[#f3e5ce] text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-[#cca166]/40">
            {hotel.category}
          </span>
          <span className="bg-[#cca166] text-[#0d0e12] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
            ★ {hotel.rating}
          </span>
        </div>

        {/* Thumbnail Preview Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-10 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIdx(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeImgIdx === idx ? 'w-4 bg-[#cca166]' : 'bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center space-x-1.5 text-xs text-[#cca166] tracking-wider uppercase mb-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#cca166]" />
            <span>{hotel.city}, {hotel.state}, {hotel.country}</span>
          </div>

          {/* Hotel Name */}
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium mb-1 group-hover:text-[#edd4af] transition">
            {hotel.name}
          </h3>

          <p className="text-xs text-[#cca166]/80 italic mb-3">
            {hotel.tagline}
          </p>

          <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {hotel.description}
          </p>

          {/* Highlights Chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {hotel.highlights.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-[#1d1f2b] text-neutral-300 border border-[#34291a] px-2 py-0.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and CTAs */}
        <div className="pt-4 border-t border-[#262016] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400">
              Starting From
            </div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-wide">
              {formatPrice(hotel.startingPriceINR, currency)}
              <span className="text-[11px] font-normal text-neutral-400"> / night</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onExplore(hotel)}
              className="p-2.5 rounded bg-[#1f2230] text-neutral-200 hover:text-white hover:bg-[#282b3d] border border-[#3c301e] text-xs transition cursor-pointer"
              title="Explore Property Details"
            >
              <Compass className="w-4 h-4 text-[#cca166]" />
            </button>

            <button
              onClick={() => onBook(hotel.id)}
              className="bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] font-semibold text-xs px-4 py-2.5 rounded hover:brightness-110 active:scale-95 transition shadow uppercase tracking-wider cursor-pointer"
            >
              Book Stay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
