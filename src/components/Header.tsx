import React, { useState } from 'react';
import { Crown, Calendar, User, Search, Menu, X, Globe, Phone, BookmarkCheck } from 'lucide-react';
import { Currency } from '../types';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onOpenBooking: (hotelId?: string) => void;
  onOpenManageBooking: () => void;
  onOpenCircleModal: () => void;
  circleMember: { name: string; tier: string } | null;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  onOpenBooking,
  onOpenManageBooking,
  onOpenCircleModal,
  circleMember,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: Currency[] = ['INR', 'USD', 'EUR', 'GBP', 'AED'];

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d12]/95 backdrop-blur-md border-b border-[#2a241b] text-neutral-200">
      {/* Top Privilege Bar */}
      <div className="bg-[#15120e] border-b border-[#2c2214] py-1.5 px-4 text-xs tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[#d8b884]">
            <Crown className="w-3.5 h-3.5 text-[#cca166]" />
            <span className="font-medium">
              THE SIX EYES CIRCLE:
            </span>
            <span className="text-neutral-400 hidden sm:inline">
              Exclusive 15% privilege on Palace Stays &amp; Complimentary Royal High Tea.
            </span>
          </div>

          <div className="flex items-center space-x-4 ml-auto text-xs">
            {circleMember ? (
              <button
                onClick={onOpenCircleModal}
                className="flex items-center space-x-1.5 text-[#cea871] hover:text-[#e4be87] transition cursor-pointer"
              >
                <Crown className="w-3 h-3 text-[#d8b884]" />
                <span className="font-medium">{circleMember.name}</span>
                <span className="text-[10px] uppercase tracking-widest bg-[#2a2114] text-[#d8b884] px-1.5 py-0.5 rounded border border-[#524128]">
                  {circleMember.tier}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenCircleModal}
                className="hover:text-[#cca166] transition flex items-center space-x-1 cursor-pointer"
              >
                <User className="w-3 h-3 text-[#cea871]" />
                <span>Join / Sign In</span>
              </button>
            )}

            <button
              onClick={onOpenManageBooking}
              className="hover:text-[#cca166] transition flex items-center space-x-1 cursor-pointer"
            >
              <BookmarkCheck className="w-3 h-3 text-[#cca166]" />
              <span>Manage Booking</span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1 hover:text-[#cca166] transition py-0.5 px-1.5 rounded border border-neutral-800 bg-[#12131a] cursor-pointer"
              >
                <Globe className="w-3 h-3 text-[#cea871]" />
                <span className="font-medium">{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-[#181924] border border-[#3a3020] rounded shadow-2xl py-1 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#2c2419] hover:text-[#d8b884] transition ${
                        currency === curr ? 'text-[#cca166] font-semibold bg-[#251e14]' : 'text-neutral-300'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-[#cca166] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Royal Monogram */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center space-x-3 cursor-pointer group py-2"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#b9853c] flex items-center justify-center bg-gradient-to-b from-[#2a2216] to-[#14120f] shadow-lg group-hover:border-[#e2ba7d] transition">
              <span className="font-cinzel text-lg font-bold text-[#e5be85] tracking-tighter">
                VI
              </span>
            </div>
            <div>
              <div className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#f7e6cf] group-hover:text-white transition">
                THE SIX EYES
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#cca166] font-medium">
                Luxury Palaces &amp; Sanctuaries
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300">
            <button
              onClick={() => handleNavClick('palaces')}
              className="hover:text-[#cca166] transition pb-1 border-b border-transparent hover:border-[#cca166] cursor-pointer"
            >
              Palaces &amp; Hotels
            </button>
            <button
              onClick={() => handleNavClick('destinations')}
              className="hover:text-[#cca166] transition pb-1 border-b border-transparent hover:border-[#cca166] cursor-pointer"
            >
              Destinations
            </button>
            <button
              onClick={() => handleNavClick('philosophy')}
              className="hover:text-[#cca166] transition pb-1 border-b border-transparent hover:border-[#cca166] cursor-pointer"
            >
              The Heritage
            </button>
            <button
              onClick={() => handleNavClick('dining')}
              className="hover:text-[#cca166] transition pb-1 border-b border-transparent hover:border-[#cca166] cursor-pointer"
            >
              Dining
            </button>
            <button
              onClick={() => handleNavClick('wellness')}
              className="hover:text-[#cca166] transition pb-1 border-b border-transparent hover:border-[#cca166] cursor-pointer"
            >
              Soma Spa
            </button>
            <button
              onClick={() => handleNavClick('experiences')}
              className="hover:text-[#cca166] transition pb-1 border-b border-transparent hover:border-[#cca166] cursor-pointer"
            >
              Bespoke Experiences
            </button>
          </nav>

          {/* Action Call-To-Action */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenBooking()}
              className="bg-gradient-to-r from-[#b9853c] via-[#cea871] to-[#a16e2f] text-[#0f0e0d] font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded shadow-lg hover:shadow-[#b9853c]/20 hover:brightness-110 active:scale-95 transition flex items-center space-x-2 tracking-wider uppercase cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Stay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#11131a] border-b border-[#2c2317] px-6 py-6 space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#cca166] font-semibold pb-2 border-b border-[#282218]">
            Explore The Six Eyes
          </div>
          <div className="flex flex-col space-y-3 text-sm tracking-wider text-neutral-200">
            <button
              onClick={() => handleNavClick('palaces')}
              className="text-left hover:text-[#cca166] py-1"
            >
              Palaces &amp; Hotels
            </button>
            <button
              onClick={() => handleNavClick('destinations')}
              className="text-left hover:text-[#cca166] py-1"
            >
              Destinations &amp; Cities
            </button>
            <button
              onClick={() => handleNavClick('philosophy')}
              className="text-left hover:text-[#cca166] py-1"
            >
              The 6 Eyes Heritage &amp; Senses
            </button>
            <button
              onClick={() => handleNavClick('dining')}
              className="text-left hover:text-[#cca166] py-1"
            >
              Epicurean Dining &amp; High Tea
            </button>
            <button
              onClick={() => handleNavClick('wellness')}
              className="text-left hover:text-[#cca166] py-1"
            >
              Soma Royal Spa &amp; Ayurveda
            </button>
            <button
              onClick={() => handleNavClick('experiences')}
              className="text-left hover:text-[#cca166] py-1"
            >
              Royal Celebrations &amp; Weddings
            </button>
            <button
              onClick={onOpenManageBooking}
              className="text-left text-[#cca166] font-medium py-1 flex items-center space-x-2 pt-2 border-t border-[#2a241c]"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Manage Existing Booking</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
