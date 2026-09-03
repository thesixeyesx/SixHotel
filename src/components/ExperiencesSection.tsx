import React from 'react';
import { Crown, Sparkles, Heart, Compass, Ship, Sunset } from 'lucide-react';

interface ExperiencesSectionProps {
  onOpenBooking: () => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onOpenBooking }) => {
  const EXPERIENCES = [
    {
      id: 'weddings',
      title: 'Timeless Royal Destination Weddings',
      subtitle: 'Where Royal Dreams are Inscribed in Stone and Starlight',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      tag: 'Grand Celebrations',
      desc: 'Exchange vows in 200-year-old palace courtyards with majestic elephant processions, royal nagada trumpets, and thousands of floating diyas.',
    },
    {
      id: 'barge',
      title: 'Sunset Champagne Lake Cruises',
      subtitle: 'The Royal Mewar Pontoon on Shimmering Waters',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      tag: 'Bespoke Journeys',
      desc: 'Glide along Lake Pichola as twilight washes over the Aravalli peaks, accompanied by a personal sommelier and live classical sitar.',
    },
    {
      id: 'safari',
      title: 'Royal Tiger Safaris & Campfire Feasts',
      subtitle: 'Private Tracking in Ranthambore with Master Naturalists',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      tag: 'Wildlife & Wilderness',
      desc: 'Traverse ancient hunting reserves of the Maharajas, followed by lantern-lit hunter barbecue under canopy constellations.',
    },
  ];

  return (
    <section id="experiences" className="py-20 bg-[#0d0e12] border-b border-[#282117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#cca166] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-[#cca166]" />
            <span>Bespoke Curations</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide leading-tight mb-4">
            Curated Royal Experiences &amp; Weddings
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#cca166] to-transparent mx-auto mb-6" />
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Every celebration at The Six Eyes is crafted as an eternal saga. 
            Allow our palace event directors to choreograph moments that linger for generations.
          </p>
        </div>

        {/* Experiences Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#141622] border border-[#2e2619] hover:border-[#cca166] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#cca166]/10 flex flex-col group"
            >
              <div className="relative h-64 w-full overflow-hidden bg-black">
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141622] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[#cca166]/40 text-[10px] uppercase tracking-wider text-[#cca166] font-semibold">
                  {exp.tag}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-white font-medium mb-1">
                    {exp.title}
                  </h3>
                  <div className="text-xs text-[#cca166] italic mb-3">
                    {exp.subtitle}
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {exp.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#262016]">
                  <button
                    onClick={onOpenBooking}
                    className="w-full bg-[#1b1e2c] hover:bg-[#252a3d] text-white border border-[#3b3020] hover:border-[#cca166] text-xs font-semibold py-2.5 rounded uppercase tracking-wider transition flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Inquire / Reserve Experience</span>
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
