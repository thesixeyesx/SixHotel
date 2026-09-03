import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  tagline: string;
  hotelId: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'udaipur',
    title: 'The Floating Marble Palace on Lake Pichola',
    subtitle: 'Step into an ethereal realm of white Makrana marble, hand-carved jharokhas, and timeless Mewari royalty.',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=90',
    tagline: 'The Six Eyes Lake Palace',
    hotelId: 'tse-lake-palace-udaipur',
  },
  {
    id: 'mumbai',
    title: 'The Grande Dame Facing The Gateway of India',
    subtitle: 'Where world dignitaries, Maharajas, and cultural icons have gathered under the red dome since 1903.',
    location: 'Apollo Bunder, Mumbai',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=90',
    tagline: 'The Six Eyes Heritage Mahal',
    hotelId: 'tse-mumbai-flagship',
  },
  {
    id: 'jaipur',
    title: 'The Jewel of Jaipur & Residence of Kings',
    subtitle: '47 acres of landscaped Mughal gardens, resident peacocks, and opulent palace ballrooms in the Pink City.',
    location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2000&q=90',
    tagline: 'The Six Eyes Rambagh Palace',
    hotelId: 'tse-jaipur-palace',
  },
  {
    id: 'rishikesh',
    title: 'Sacred Himalayan Stillness on the River Ganges',
    subtitle: 'Immerse in transformative Ayurvedic wellness, sacred sunrise chants, and pristine Sal forests.',
    location: 'Rishikesh, Himalayas',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=2000&q=90',
    tagline: 'The Six Eyes Ganges Sanctuary',
    hotelId: 'tse-rishikesh-sanctuary',
  },
];

interface HeroSliderProps {
  onOpenBooking: (hotelId?: string) => void;
  onExploreHotel: (hotelId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenBooking, onExploreHotel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div id="hero" className="relative h-[80vh] min-h-[580px] max-h-[850px] w-full overflow-hidden bg-black">
      {/* Background Image Carousel with Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-[0.65]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0d0e12]/20 to-[#0d0e12]/80 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <div className="max-w-3xl">
          {/* Top Royal Tag & Location Badge */}
          <motion.div
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#d8b884]/40 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d8b884]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#f2dfc5] uppercase">
              {slide.tagline} • {slide.location}
            </span>
          </motion.div>

          {/* Majestic Heading */}
          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-wide leading-[1.15] mb-4 drop-shadow-md"
          >
            {slide.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`subtitle-${slide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8 drop-shadow"
          >
            {slide.subtitle}
          </motion.p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenBooking(slide.hotelId)}
              className="bg-gradient-to-r from-[#cca166] via-[#e2ba7d] to-[#b9853c] text-[#0d0e12] font-semibold text-xs sm:text-sm px-6 py-3 rounded tracking-[0.15em] uppercase hover:brightness-110 active:scale-95 transition shadow-xl cursor-pointer"
            >
              Reserve This Palace
            </button>
            <button
              onClick={() => onExploreHotel(slide.hotelId)}
              className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-[#b9853c]/60 hover:border-[#e2ba7d] font-medium text-xs sm:text-sm px-5 py-3 rounded tracking-[0.15em] uppercase transition cursor-pointer flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-[#cca166]" />
              <span>Explore Sanctuary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Prestige Accolade Tag */}
      <div className="absolute right-6 bottom-24 hidden xl:flex items-center space-x-3 bg-[#11131a]/80 backdrop-blur-md p-3.5 rounded border border-[#cca166]/30 max-w-sm text-xs">
        <div className="w-10 h-10 rounded-full bg-[#241d14] flex items-center justify-center border border-[#d8b884] shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#cca166]" />
        </div>
        <div>
          <div className="text-[#cca166] font-semibold tracking-wider uppercase text-[11px]">
            World’s Strongest Luxury Hotel Brand
          </div>
          <div className="text-neutral-400 text-[11px] leading-tight">
            Ranked No. 1 worldwide for quintessential heritage hospitality &amp; royal palace stewardship.
          </div>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-[#cca166]/40 hover:border-[#cca166] transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-1.5 px-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentIdx ? 'w-8 bg-[#cca166]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-[#cca166]/40 hover:border-[#cca166] transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
