import React, { useState } from 'react';
import { Crown, Sparkles, MapPin, Search, Calendar, ChevronRight, Award, Compass, ShieldCheck } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { BookingBar } from './components/BookingBar';
import { HotelCard } from './components/HotelCard';
import { HotelModal } from './components/HotelModal';
import { BookingModal } from './components/BookingModal';
import { DiningModal } from './components/DiningModal';
import { SpaModal } from './components/SpaModal';
import { ManageBookingModal } from './components/ManageBookingModal';
import { CircleModal } from './components/CircleModal';
import { PhilosophySection } from './components/PhilosophySection';
import { DiningSection } from './components/DiningSection';
import { WellnessSection } from './components/WellnessSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { Footer } from './components/Footer';

import { HOTELS } from './data/hotels';
import { Hotel, Currency, Booking, DiningVenue, SpaTreatment } from './types';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [circleMember, setCircleMember] = useState<{ name: string; tier: string } | null>({
    name: 'Rohit Vishwakarma',
    tier: 'Platinum Member',
  });

  // Hotel filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedHotelForModal, setSelectedHotelForModal] = useState<Hotel | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingHotelId, setBookingHotelId] = useState<string | undefined>(undefined);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>(undefined);
  const [bookingFilters, setBookingFilters] = useState<{
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
    children: number;
    rateCode: string;
  } | undefined>(undefined);

  const [diningModalOpen, setDiningModalOpen] = useState(false);
  const [selectedDiningVenue, setSelectedDiningVenue] = useState<DiningVenue | null>(null);

  const [spaModalOpen, setSpaModalOpen] = useState(false);
  const [selectedSpaTreatment, setSelectedSpaTreatment] = useState<SpaTreatment | null>(null);

  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [circleModalOpen, setCircleModalOpen] = useState(false);

  // Filtered hotels
  const filteredHotels = HOTELS.filter((hotel) => {
    const matchesCategory =
      selectedCategory === 'All' || hotel.category === selectedCategory;
    const matchesCity =
      cityFilter === 'All' || hotel.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCity && matchesSearch;
  });

  const categories = [
    'All',
    'Palace',
    'Heritage Flagship',
    'Himalayan Retreat',
       'Coastal Sanctuary',
     'Wilderness Lodge',
  ];

  const cities = ['All', 'Udaipur', 'Mumbai', 'Jaipur', 'Rishikesh', 'Goa', 'Ranthambore'];

  const handleOpenBooking = (hotelId?: string, roomId?: string) => {
    setBookingHotelId(hotelId || HOTELS[0].id);
    setBookingRoomId(roomId);
    setBookingModalOpen(true);
  };

  const handleCheckAvailability = (filters: {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
    children: number;
    rateCode: string;
  }) => {
    setBookingHotelId(filters.hotelId);
    setBookingFilters(filters);
    setBookingModalOpen(true);
  };

  const handleReserveTable = (venue: DiningVenue) => {
    setSelectedDiningVenue(venue);
    setDiningModalOpen(true);
  };

  const handleBookSpa = (treatment: SpaTreatment) => {
    setSelectedSpaTreatment(treatment);
    setSpaModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-neutral-100 flex flex-col font-sans selection:bg-[#cca166] selection:text-[#0d0e12]">
      {/* Luxury Navigation Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenBooking={() => handleOpenBooking()}
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenCircleModal={() => setCircleModalOpen(true)}
        circleMember={circleMember}
        onNavigateSection={scrollToSection}
      />

      {/* Hero Visual Showcase */}
      <HeroSlider
        onOpenBooking={(hId) => handleOpenBooking(hId)}
        onExploreHotel={(hId) => {
          const found = HOTELS.find((h) => h.id === hId);
          if (found) setSelectedHotelForModal(found);
        }}
      />

      {/* Floating Taj-Style Reservation Booking Bar */}
      <BookingBar
        onCheckAvailability={handleCheckAvailability}
        selectedHotelId={bookingHotelId}
      />

      {/* Main Palaces & Sanctuaries Showcase */}
      <main id="palaces" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[#cca166] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            <Crown className="w-4 h-4 text-[#cca166]" />
            <span>Royal Sanctuaries &amp; Palaces</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide leading-tight mb-4">
            Living Legends of Indian Hospitality
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#cca166] to-transparent mx-auto mb-6" />
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Each property is a custodian of royal history, architectural marvels, and bespoke hospitality 
            where kings once held court and legends were born.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium whitespace-nowrap transition cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#cca166] text-[#0d0e12] border-[#cca166] font-bold shadow-lg shadow-[#cca166]/10'
                    : 'bg-[#151722] text-neutral-300 border-[#2f281b] hover:border-[#cca166]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* City / Destination Pills & Search input */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2 overflow-x-auto text-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#cca166] font-semibold">
                Destinations:
              </span>
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                    cityFilter === city
                      ? 'bg-[#292217] text-[#cca166] border border-[#524128] font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#cca166] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search palace, city, experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#151722] border border-[#30281b] text-white text-xs pl-8 pr-3 py-2 rounded focus:border-[#cca166] focus:outline-none placeholder-neutral-500"
              />
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                currency={currency}
                onExplore={(h) => setSelectedHotelForModal(h)}
                onBook={(hotelId) => handleOpenBooking(hotelId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#131520] border border-[#2b241a] rounded-xl p-8 space-y-3">
            <Compass className="w-8 h-8 text-[#cca166] mx-auto opacity-70" />
            <h4 className="font-serif-luxury text-xl text-white">No Sanctuaries Match Your Criteria</h4>
            <p className="text-neutral-400 text-xs max-w-md mx-auto">
              Please adjust your destination filter or search terms to discover our authentic palace retreats.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCityFilter('All');
                setSearchQuery('');
              }}
              className="bg-[#cca166] text-[#0d0e12] font-semibold text-xs px-4 py-2 rounded uppercase tracking-wider transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Destinations Spotlight Strip */}
      <section id="destinations" className="py-16 bg-[#10121a] border-y border-[#282117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#cca166] font-semibold mb-2">
                Iconic Terrains
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
                Destinations of Royalty
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
              From the tranquil lakes of Mewar and misty Himalayan peaks to royal tiger reserves and coastal fortresses.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { city: 'Udaipur', label: 'The City of Lakes', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80', count: '1 Palace' },
              { city: 'Mumbai', label: 'Gateway of India', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', count: '1 Flagship' },
              { city: 'Jaipur', label: 'The Pink City', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80', count: '1 Palace' },
              { city: 'Rishikesh', label: 'The Sacred Himalayas', img: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80', count: '1 Sanctuary' },
              { city: 'Goa', label: 'Coastal Ramparts', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', count: '1 Cliff Estate' },
              { city: 'Ranthambore', label: 'Tiger Wilderness', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80', count: '1 Safari Camp' },
            ].map((d) => (
              <div
                key={d.city}
                onClick={() => {
                  setCityFilter(d.city);
                  scrollToSection('palaces');
                }}
                className="group relative h-48 rounded-xl overflow-hidden cursor-pointer border border-[#30281b] hover:border-[#cca166] transition shadow-lg"
              >
                <img
                  src={d.img}
                  alt={d.city}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-white font-serif-luxury text-lg font-medium group-hover:text-[#edd4af] transition">
                    {d.city}
                  </div>
                  <div className="text-[10px] text-[#cca166]">{d.label}</div>
                  <div className="text-[9px] text-neutral-400 mt-0.5">{d.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy - The Six Eyes Sacred Senses */}
      <PhilosophySection />

      {/* Epicurean Dining & High Tea Showcase */}
      <DiningSection onReserveTable={handleReserveTable} />

      {/* Soma Royal Spa & Ayurveda Showcase */}
      <WellnessSection currency={currency} onBookSpa={handleBookSpa} />

      {/* Royal Celebrations & Curated Experiences */}
      <ExperiencesSection onOpenBooking={() => handleOpenBooking()} />

      {/* The Six Eyes Circle Banner */}
      <section className="py-16 bg-[#16130e] border-y border-[#3a2e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-full border-2 border-[#cca166] bg-[#292015] flex items-center justify-center shrink-0 shadow-xl">
              <Crown className="w-8 h-8 text-[#cca166]" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#cca166] font-bold">
                The Inner Circle
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium">
                The Six Eyes Circle Privilege Membership
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-xl">
                Enjoy 15% guaranteed privilege on all royal suites, complimentary high tea at Sea Lounge, 
                and private palace butler assignments.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <button
              onClick={() => setCircleModalOpen(true)}
              className="bg-gradient-to-r from-[#cca166] via-[#e2ba7d] to-[#b9853c] text-[#0d0e12] font-bold text-xs sm:text-sm px-6 py-3 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-xl cursor-pointer"
            >
              {circleMember ? 'Manage Membership' : 'Join Complimentary'}
            </button>
          </div>
        </div>
      </section>

      {/* Luxury Taj-Style Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenCircle={() => setCircleModalOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* MODALS */}
      {/* 1. Hotel Deep-Dive Modal */}
      {selectedHotelForModal && (
        <HotelModal
          hotel={selectedHotelForModal}
          currency={currency}
          onClose={() => setSelectedHotelForModal(null)}
          onBookHotel={(hId, rId) => handleOpenBooking(hId, rId)}
        />
      )}

      {/* 2. Full Reservation Engine Modal */}
      {bookingModalOpen && (
        <BookingModal
          initialHotelId={bookingHotelId}
          initialRoomId={bookingRoomId}
          initialFilters={bookingFilters}
          currency={currency}
          onClose={() => setBookingModalOpen(false)}
          onBookingSuccess={(booking: Booking) => {
            // Can show notification or log
          }}
        />
      )}

      {/* 3. Fine Dining Table Reservation Modal */}
      {diningModalOpen && (
        <DiningModal
          venue={selectedDiningVenue}
          onClose={() => setDiningModalOpen(false)}
        />
      )}

      {/* 4. Royal Spa Ritual Modal */}
      {spaModalOpen && (
        <SpaModal
          treatment={selectedSpaTreatment}
          currency={currency}
          onClose={() => setSpaModalOpen(false)}
        />
      )}

      {/* 5. Manage Bookings Modal */}
      {manageBookingOpen && (
        <ManageBookingModal
          currency={currency}
          onClose={() => setManageBookingOpen(false)}
          onNewBooking={() => handleOpenBooking()}
        />
      )}

      {/* 6. The Six Eyes Circle Membership Modal */}
      {circleModalOpen && (
        <CircleModal
          onClose={() => setCircleModalOpen(false)}
          currentMember={circleMember}
          onMemberUpdated={(member) => setCircleMember(member)}
        />
      )}
    </div>
  );
}
