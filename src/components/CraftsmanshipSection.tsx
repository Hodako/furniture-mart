import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandConfig } from '../data/storeLogic';

interface CraftsmanshipSectionProps {
  brandConfig: BrandConfig;
  onNotify: (msg: string) => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  brandConfig,
  onNotify,
}) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onNotify(`Thank you for subscribing to ${brandConfig.companyName}!`);
    setEmail('');
  };

  return (
    <>
      {/* 1. The Brand Feeling Banner Section */}
      <section className="py-2.5 sm:py-[42px] bg-[#F7F3ED]">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#183D32] text-white rounded-[14px] sm:rounded-2xl overflow-hidden shadow-xs">
            <div className="p-3.5 sm:p-8 md:p-[45px] flex flex-col justify-center">
              <div className="text-[#D4A45B] text-[9px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase">
                The {brandConfig.companyName} feeling
              </div>
              <h2 className="font-display font-bold text-lg sm:text-3xl md:text-[38px] leading-snug my-1.5 sm:my-4">
                {brandConfig.craftHeading}
              </h2>
              <p className="leading-relaxed text-[#DCE7DF] text-[11px] sm:text-[13px] mb-3 sm:mb-6">
                From statement furniture to small finishing touches, find pieces
                that make your home feel personal, welcoming and beautiful.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center bg-[#D4A45B] hover:bg-[#c39347] text-[#211B13] rounded-md sm:rounded-[7px] py-1.5 sm:py-[13px] px-3 sm:px-[19px] font-bold text-[11px] sm:text-xs transition-colors min-h-[34px] sm:min-h-[40px]"
                >
                  Find Your Favourite →
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-md sm:rounded-[7px] py-1.5 sm:py-[13px] px-3 sm:px-[18px] font-semibold text-[11px] sm:text-xs transition-colors min-h-[34px] sm:min-h-[40px]"
                >
                  Our Craftsmanship
                </Link>
              </div>
            </div>
            <div className="min-h-[160px] sm:min-h-[260px] md:min-h-[320px]">
              <img
                src="/assets/uzvi/banner-living.jpg"
                alt="Beautiful handcrafted living room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Newsletter Section - Phone & Desktop Optimized with elevated luxury email input */}
      <section className="bg-[#E9DFD1] py-6 sm:py-12 border-t border-[#DED3C2]">
        <div className="w-[min(1200px,94%)] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-xl">
            <span className="text-[#75472F] text-[10px] sm:text-[11px] font-bold tracking-[2px] uppercase block mb-1">
              Newsletter &amp; Interior Journal
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-[30px] text-[#292720] m-0 leading-tight">
              Ideas for a more beautiful home.
            </h2>
            <p className="text-xs sm:text-sm text-[#292720]/75 mt-1 sm:mt-1.5 leading-relaxed">
              Join our list for new collections, care guides and interior inspiration.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full lg:w-[480px] shrink-0"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 bg-white p-1.5 sm:p-1.5 rounded-2xl border border-[#D5C9B8] shadow-sm focus-within:border-[#183D32] focus-within:ring-4 focus-within:ring-[#183D32]/10 transition-all">
              <div className="relative flex-1 flex items-center">
                <svg
                  className="w-5 h-5 text-[#75472F] ml-3.5 shrink-0 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  aria-label="Your email address"
                  required
                  className="w-full h-11 sm:h-11 pl-3 pr-3 bg-transparent border-0 text-[16px] sm:text-sm text-[#292720] placeholder:text-[#8C8479] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white border-0 rounded-xl h-11 sm:h-11 px-6 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.99] shrink-0"
              >
                <span>Join Us</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
