import React, { useState } from 'react';
import { X, Crown, Sparkles, Check, Gift, Shield } from 'lucide-react';

interface CircleModalProps {
  onClose: () => void;
  onMemberUpdated: (member: { name: string; tier: string } | null) => void;
  currentMember: { name: string; tier: string } | null;
}

export const CircleModal: React.FC<CircleModalProps> = ({
  onClose,
  onMemberUpdated,
  currentMember,
}) => {
  const [isRegistering, setIsRegistering] = useState(!currentMember);
  const [name, setName] = useState(currentMember?.name || '');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>(currentMember?.tier || 'Platinum Member');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter your full name.');
      return;
    }
    const memberObj = { name, tier: selectedTier };
    onMemberUpdated(memberObj);
    onClose();
  };

  const handleSignOut = () => {
    onMemberUpdated(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#12141c] border border-[#3f3220] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#181a25] px-6 py-4 border-b border-[#2b2319] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-[#cca166] flex items-center justify-center bg-[#251e14]">
              <Crown className="w-4 h-4 text-[#cca166]" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm sm:text-base text-white tracking-widest uppercase font-bold">
                The Six Eyes Circle
              </h2>
              <div className="text-[11px] text-[#cca166]">
                Royal Loyalty &amp; Privilege Membership
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {currentMember ? (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#272118] border-2 border-[#cca166] flex items-center justify-center mx-auto text-[#cca166]">
                <Crown className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest bg-[#2d2417] text-[#cca166] px-3 py-1 rounded border border-[#524128] font-bold">
                  {currentMember.tier}
                </span>
                <h3 className="font-serif-luxury text-2xl text-white font-medium mt-3">
                  Welcome, {currentMember.name}
                </h3>
                <p className="text-neutral-400 text-xs mt-1">
                  Your 15% Member Privilege is actively unlocked on all palace stays.
                </p>
              </div>

              <div className="bg-[#171926] p-4 rounded-xl border border-[#30271b] text-left text-xs space-y-2 text-neutral-300">
                <div className="text-[#cca166] font-semibold uppercase tracking-wider text-[11px]">
                  Your Active Privileges:
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#cca166]" />
                  <span>15% savings across all luxury palace rooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#cca166]" />
                  <span>Complimentary traditional royal afternoon high tea</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#cca166]" />
                  <span>Priority early check-in (10:00 AM) &amp; late check-out (4:00 PM)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#cca166]" />
                  <span>Dedicated palace butler concierge on call</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#cca166] text-[#0d0e12] px-6 py-2 rounded text-xs uppercase tracking-wider font-bold transition hover:brightness-110"
                >
                  Continue Browsing
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="border border-[#443825] hover:bg-neutral-800 text-neutral-300 px-4 py-2 rounded text-xs uppercase tracking-wider"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="font-serif-luxury text-xl text-white font-light">
                  Experience Unrivalled Royal Privileges
                </h3>
                <p className="text-neutral-400 text-xs">
                  Join instantly to receive 15% off your reservation and unlock complimentary high tea.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { tier: 'Silver Member', desc: '10% Privilege' },
                  { tier: 'Gold Member', desc: '12% + Tea' },
                  { tier: 'Platinum Member', desc: '15% + Butler' },
                ].map((item) => (
                  <button
                    key={item.tier}
                    type="button"
                    onClick={() => setSelectedTier(item.tier)}
                    className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                      selectedTier === item.tier
                        ? 'bg-[#261f15] border-[#cca166] text-[#cca166]'
                        : 'bg-[#161824] border-[#2c2419] text-neutral-400 hover:border-[#4d3d28]'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.tier}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-3 text-xs pt-2">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharani Gayatri / Rohit Vishwakarma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2.5 rounded focus:border-[#cca166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="guest@thesixeyes.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2.5 rounded focus:border-[#cca166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181b28] border border-[#352a1b] text-white p-2.5 rounded focus:border-[#cca166] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#cca166] via-[#e2ba7d] to-[#b9853c] text-[#0d0e12] font-bold text-xs py-3 rounded uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer mt-2"
              >
                Join &amp; Unlock 15% Privilege
              </button>

              <div className="text-center text-[11px] text-neutral-500 pt-1">
                No credit card required. Membership is complimentary for esteemed patrons.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
