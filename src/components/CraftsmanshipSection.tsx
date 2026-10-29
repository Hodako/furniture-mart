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

      {/* 2. Newsletter Section - Phone & Desktop Optimized with anti-zoom mobile text inputs */}
      <section className="bg-[#E9DFD1] py-4 sm:py-10">
        <div className="w-[min(1200px,94%)] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-2xl md:text-[28px] text-[#292720] m-0">
              Ideas for a more beautiful home.
            </h2>
            <p className="text-[12px] sm:text-[13px] text-[#292720]/75 mt-0.5 sm:mt-1">
              Join our list for new collections, care guides and interior inspiration.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              required
              className="h-12 sm:h-11 px-4 border border-[#D3C8B8] rounded-xl bg-white text-[16px] sm:text-sm min-w-0 sm:min-w-[260px] flex-1 shadow-xs focus:outline-none focus:border-[#183D32] focus:ring-2 focus:ring-[#183D32]/15 transition-all text-[#292720] placeholder:text-[#9C9488]"
            />
            <button
              type="submit"
              className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white border-0 rounded-xl h-12 sm:h-11 px-5 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors flex items-center justify-center min-h-[44px] shadow-xs active:scale-[0.99]"
            >
              Join Us →
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
