import React from 'react';
import { Flower2, Clock, Sparkles, Check, HeartHandshake } from 'lucide-react';
import { SpaTreatment, Currency } from '../types';
import { SPA_TREATMENTS } from '../data/wellness';
import { formatPrice } from '../utils/formatters';

interface WellnessSectionProps {
  currency: Currency;
  onBookSpa: (treatment: SpaTreatment) => void;
}

export const WellnessSection: React.FC<WellnessSectionProps> = ({ currency, onBookSpa }) => {
  return (
    <section id="wellness" className="py-20 bg-gradient-to-b from-[#0d0e12] via-[#11141e] to-[#0d0e12] border-b border-[#282117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#cca166] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            <Flower2 className="w-4 h-4 text-[#cca166]" />
            <span>Soma Royal Spa &amp; Ayurveda</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide leading-tight mb-4">
            Sacred Healing &amp; Timeless Rejuvenation
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#cca166] to-transparent mx-auto mb-6" />
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Rooted in India’s 5,000-year-old healing science of Ayurveda, our royal therapists 
            awaken inner vitality through pure Himalayan botanicals, warm medicated oils, and third-eye meditation.
          </p>
        </div>

        {/* Treatments Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPA_TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-[#141622] border border-[#2e2619] hover:border-[#cca166] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#cca166]/10 flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141622] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-xs bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[#cca166]/30 text-[#cca166]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{treatment.durationMinutes} Minutes</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#cca166] font-semibold mb-1">
                    {treatment.subtitle}
                  </div>
                  <h3 className="font-serif-luxury text-xl text-white font-medium mb-2">
                    {treatment.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {treatment.description}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {treatment.benefits.slice(0, 3).map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#cca166] shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#262016] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400">Therapy Price</div>
                    <div className="text-lg font-bold text-white">
                      {formatPrice(treatment.priceINR, currency)}
                    </div>
                  </div>

                  <button
                    onClick={() => onBookSpa(treatment)}
                    className="bg-gradient-to-r from-[#cca166] to-[#b9853c] text-[#0d0e12] font-semibold text-xs px-4 py-2 rounded hover:brightness-110 active:scale-95 transition shadow uppercase tracking-wider cursor-pointer"
                  >
                    Book Ritual
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
