import React, { useState } from 'react';
import { Crown, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenCircle: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenCircle,
  onNavigateSection,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#0a0b0f] text-neutral-400 border-t border-[#2a2216] text-xs">
      {/* Top Concierge & Toll-Free Assistance Bar */}
      <div className="bg-[#12131b] border-b border-[#241c12] py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-neutral-300">
            <Phone className="w-4 h-4 text-[#cca166]" />
            <span className="font-semibold text-white uppercase tracking-wider text-xs">
              24/7 Global Palace Concierge:
            </span>
            <span className="text-[#cca166] font-medium">+91 22 6601 1825 (India Toll-Free: 1800 111 825)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-400">
            <span>USA: +1 866 969 1825</span>
            <span>•</span>
            <span>UK: +44 207 984 1825</span>
            <span>•</span>
            <span>UAE: +971 4 567 1825</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#cca166] flex items-center justify-center bg-[#241c12]">
                <span className="font-cinzel text-lg font-bold text-[#e5be85]">VI</span>
              </div>
              <div>
                <div className="font-cinzel text-xl font-bold tracking-[0.2em] text-white">
                  THE SIX EYES
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#cca166]">
                  Luxury Palaces &amp; Sanctuaries
                </div>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Custodians of India&apos;s timeless royal grandeur. Inspiring wonder through palatial heritage, 
              epicurean mastery, and revered hospitality since 1903.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Palace Chronicles Newsletter
              </div>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you. You have been enrolled for royal missives.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#161824] border border-[#342819] text-white px-3 py-2 rounded-l text-xs focus:outline-none focus:border-[#cca166]"
                  />
                  <button
                    type="submit"
                    className="bg-[#cca166] hover:bg-[#deaf70] text-[#0d0e12] px-4 py-2 rounded-r text-xs uppercase tracking-wider font-bold transition cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links 1: Palaces & Destinations */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#cca166] font-semibold">
              Palaces &amp; Sanctuaries
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('palaces')}
                  className="hover:text-white transition"
                >
                  The Six Eyes Lake Palace, Udaipur
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('palaces')}
                  className="hover:text-white transition"
                >
                  The Six Eyes Heritage Mahal, Mumbai
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('palaces')}
                  className="hover:text-white transition"
                >
                  The Six Eyes Rambagh Palace, Jaipur
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('palaces')}
                  className="hover:text-white transition"
                >
                  The Six Eyes Ganges, Rishikesh
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('palaces')}
                  className="hover:text-white transition"
                >
                  Fort Aguada &amp; Cliff, Goa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('palaces')}
                  className="hover:text-white transition"
                >
                  Royal Tiger Wilderness, Ranthambore
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Experiences & Wellness */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#cca166] font-semibold">
              Experiences &amp; Dining
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('dining')}
                  className="hover:text-white transition"
                >
                  Dawat-e-Khaas (Royal Mughlai)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('dining')}
                  className="hover:text-white transition"
                >
                  Wasabi &amp; Jade Dragon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('dining')}
                  className="hover:text-white transition"
                >
                  Sea Lounge Afternoon High Tea
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('wellness')}
                  className="hover:text-white transition"
                >
                  Soma Royal Spa &amp; Ayurveda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('experiences')}
                  className="hover:text-white transition"
                >
                  Palace Destination Weddings
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCircle}
                  className="hover:text-white text-[#cca166] transition font-medium"
                >
                  The Six Eyes Circle Membership
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate & Trust */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#cca166] font-semibold">
              Heritage &amp; ESG
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('philosophy')}
                  className="hover:text-white transition"
                >
                  The 6 Senses Philosophy
                </button>
              </li>
              <li className="hover:text-white transition cursor-pointer">Heritage Restoration Trust</li>
              <li className="hover:text-white transition cursor-pointer">Paathya ESG &amp; Sustainability</li>
              <li className="hover:text-white transition cursor-pointer">Artisan &amp; Weavers Patronage</li>
              <li className="hover:text-white transition cursor-pointer">Investor Relations</li>
              <li className="hover:text-white transition cursor-pointer">Careers at The Six Eyes</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1f1911] flex flex-wrap items-center justify-between text-neutral-500 text-[11px] gap-4">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} The Six Eyes Hospitality Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms &amp; Conditions</span>
            <span className="hover:text-neutral-300 cursor-pointer">Accessibility</span>
            <span className="hover:text-neutral-300 cursor-pointer">Security &amp; Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
