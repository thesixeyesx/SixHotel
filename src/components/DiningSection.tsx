import React from 'react';
import { Utensils, Clock, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { DiningVenue } from '../types';
import { DINING_VENUES } from '../data/dining';

interface DiningSectionProps {
  onReserveTable: (venue: DiningVenue) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onReserveTable }) => {
  return (
    <section id="dining" className="py-20 bg-[#0d0e12] border-b border-[#282117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#cca166] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            <Utensils className="w-4 h-4 text-[#cca166]" />
            <span>Epicurean Journeys</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide leading-tight mb-4">
            Palace Banquets &amp; Signature Gastronomy
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#cca166] to-transparent mx-auto mb-6" />
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            From centuries-old Awadhi and Mewari royal recipes simmered over fragrant charcoal 
            to contemporary Japanese artistry overlooking the Arabian Sea, dine where emperors celebrated.
          </p>
        </div>

        {/* Dining Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DINING_VENUES.map((venue) => (
            <div
              key={venue.id}
              className="bg-[#141622] border border-[#2e2619] hover:border-[#cca166] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#cca166]/10 flex flex-col md:flex-row group"
            >
              <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden bg-black shrink-0">
                <img
                  src={venue.image}
                  alt={venue.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141622] via-transparent to-transparent md:hidden" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[#cca166]/40 text-[10px] uppercase tracking-wider text-[#cca166] font-semibold">
                  {venue.city}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#cca166] font-semibold mb-1">
                    {venue.hotelName}
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-white font-medium mb-1">
                    {venue.name}
                  </h3>
                  <div className="text-xs text-neutral-300 font-medium mb-3">
                    {venue.cuisine}
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {venue.description}
                  </p>

                  <div className="space-y-1.5 mb-4 text-xs">
                    <div className="text-[11px] text-[#cca166] font-semibold uppercase tracking-wider">
                      Signature Degustation:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {venue.signatureDishes.map((dish, i) => (
                        <span
                          key={i}
                          className="bg-[#1c1e2c] border border-[#34291a] text-neutral-300 text-[11px] px-2 py-0.5 rounded-full"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#262016] flex items-center justify-between gap-3">
                  <div className="text-[11px] text-neutral-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#cca166]" />
                    <span>{venue.timing.split('|')[0]}</span>
                  </div>

                  <button
                    onClick={() => onReserveTable(venue)}
                    className="bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] font-semibold text-xs px-4 py-2 rounded hover:brightness-110 active:scale-95 transition shadow uppercase tracking-wider cursor-pointer"
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
