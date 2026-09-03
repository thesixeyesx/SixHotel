import React from 'react';
import { Eye, Crown, Sparkles, HeartHandshake, Compass, Utensils, Waves, Music, Flower2, Sun } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const SENSES = [
    {
      num: 'I',
      sanskrit: 'Darshana',
      title: 'Grandeur of Sight',
      desc: 'Soaring Makrana marble courtyards, hand-carved thikri mirrorwork, and sweeping lake & ocean vistas that take your breath away.',
      icon: Eye,
    },
    {
      num: 'II',
      sanskrit: 'Rasa',
      title: 'Imperial Taste',
      desc: 'Centuries-old royal recipes simmered in sealed copper degs, paired with vintage Grand Crus and bespoke culinary artistry.',
      icon: Utensils,
    },
    {
      num: 'III',
      sanskrit: 'Sparsha',
      title: 'Soothing Touch',
      desc: 'Holistic Ayurvedic therapies with warm medicated herbal oils, 1000-thread Egyptian cotton, and healing touch rituals.',
      icon: Waves,
    },
    {
      num: 'IV',
      sanskrit: 'Nada',
      title: 'Harmonious Sound',
      desc: 'Gentle river ripples, morning sitar and flute melodies on palace verandahs, and vibrational Tibetan singing bowl sound baths.',
      icon: Music,
    },
    {
      num: 'V',
      sanskrit: 'Gandha',
      title: 'Aroma of Royalty',
      desc: 'Subtle notes of pure sandalwood, fresh jasmine garlands, rare Mysore oud, and mountain pine drifting on twilight breezes.',
      icon: Flower2,
    },
    {
      num: 'VI',
      sanskrit: 'Ananda',
      title: 'Transcendent Care',
      desc: 'Our venerated tradition of "Atithi Devo Bhava" — treating every guest as the divine manifestation of royalty with sincere warmth.',
      icon: Sun,
    },
  ];

  return (
    <section id="philosophy" className="py-20 bg-gradient-to-b from-[#0d0e12] via-[#12141d] to-[#0d0e12] border-y border-[#261f15] relative overflow-hidden">
      {/* Background Subtle Mandala / Geometric accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#b9853c_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#cca166] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            <Crown className="w-4 h-4 text-[#cca166]" />
            <span>The Sacred Philosophy</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide leading-tight mb-4">
            Why We Are Named <span className="text-[#e2ba7d] italic">The Six Eyes</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#cca166] to-transparent mx-auto mb-6" />
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Rooted in royal Indian heritage, true luxury transcends physical opulence. 
            <strong className="text-white font-medium"> The Six Eyes</strong> embodies the six sacred portals of human perception — 
            awakening the senses to experience life in its most sublime, revered grandeur.
          </p>
        </div>

        {/* The 6 Senses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SENSES.map((sense) => {
            const Icon = sense.icon;
            return (
              <div
                key={sense.num}
                className="bg-[#151722]/80 border border-[#352c1e] hover:border-[#cca166] rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#cca166]/5 group relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#241c12] border border-[#524128] flex items-center justify-center text-[#cca166] group-hover:scale-110 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-cinzel text-xs text-[#cca166] tracking-[0.25em] font-bold">
                    PORTAL {sense.num}
                  </div>
                </div>

                <div className="text-xs uppercase tracking-[0.2em] text-[#cca166] font-semibold mb-1">
                  {sense.sanskrit}
                </div>
                <h3 className="font-serif-luxury text-xl text-white font-medium mb-2 group-hover:text-[#f2dfc5] transition">
                  {sense.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {sense.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Heritage Quote Banner */}
        <div className="mt-16 bg-[#181924] border border-[#3a3020] rounded-xl p-8 max-w-4xl mx-auto text-center relative">
          <div className="text-3xl text-[#cca166] font-serif leading-none mb-3">“</div>
          <p className="font-serif-luxury text-lg sm:text-2xl text-neutral-200 font-light italic leading-relaxed mb-4">
            We do not simply host guests within walls; we welcome royalty into living legends of hospitality, 
            where every smile is an ancient prayer of reverence.
          </p>
          <div className="text-xs uppercase tracking-[0.25em] text-[#cca166] font-semibold">
            — The Six Eyes Grand Patron Decree
          </div>
        </div>
      </div>
    </section>
  );
};
