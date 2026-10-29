import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import { BrandConfig, DESIGN_SYSTEM_COLORS } from '../data/storeLogic';

interface CraftsmanshipSectionProps {
  brandConfig: BrandConfig;
  onNotify: (msg: string) => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  brandConfig,
  onNotify,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleCopyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onNotify('Thank you for subscribing to Uzvi Living!');
    setEmail('');
  };

  return (
    <>
      {/* 1. The UZVI Feeling Banner Section */}
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

      {/* 2. কালার ও ডিজাইন সিস্টেম (Color & Design System Swatches with Bangla Font) */}
      <section id="design-system" className="py-2.5 sm:py-[42px]">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-4 mb-2.5 sm:mb-6">
            <div>
              <div className="text-[#D4A45B] text-[9px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase font-bangla">
                কালার ও ডিজাইন সিস্টেম · Design System
              </div>
              <h2 className="font-display font-bold text-lg sm:text-[30px] md:text-[32px] text-[#292720] mt-0.5 sm:mt-1">
                {brandConfig.companyName} Brand Palette
              </h2>
            </div>

            <div className="text-[11px] sm:text-xs text-[#75472F] font-medium font-bangla flex items-center gap-1.5">
              <span>প্রিমিয়াম উডেন ফিনিশ ও প্রাকৃতিক টেক্সচার</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {DESIGN_SYSTEM_COLORS.map((token) => {
              const isLight =
                token.hex === '#F7F3ED' || token.hex === '#D4A45B';
              const isCopied = copiedHex === token.hex;

              return (
                <div
                  key={token.id}
                  className="rounded-lg sm:rounded-xl border border-[#E8E0D5] overflow-hidden bg-white flex flex-col justify-between"
                >
                  <div
                    style={{ backgroundColor: token.hex }}
                    className={`h-20 sm:h-28 p-2.5 sm:p-4 flex items-end justify-between border-b border-[#E8E0D5] ${
                      isLight ? 'text-[#292720]' : 'text-white'
                    }`}
                  >
                    <span className="font-mono-tabular text-xs sm:text-sm font-bold">
                      {token.hex}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyHex(token.hex)}
                      aria-label={`Copy hex code ${token.hex}`}
                      className={`cursor-pointer px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] inline-flex items-center gap-1 ${
                        isLight
                          ? 'bg-black/10 hover:bg-black/20 text-[#292720]'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-2.5 sm:p-4 space-y-1 bg-white">
                    <h3 className="text-xs sm:text-sm font-bold text-[#292720] truncate">
                      {token.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#75472F] font-bangla">
                      {token.bengaliLabel}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-[#777777] line-clamp-2">
                      {token.englishRole}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Newsletter Section - Phone Optimized */}
      <section className="bg-[#E9DFD1] py-3.5 sm:py-10">
        <div className="w-[min(1200px,94%)] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-5">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-2xl md:text-[28px] text-[#292720] m-0">
              Ideas for a more beautiful home.
            </h2>
            <p className="text-[11px] sm:text-[13px] text-[#292720]/75 mt-0.5 sm:mt-1">
              Join our list for new collections, care guides and interior inspiration.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              required
              className="h-10 sm:h-11 px-3.5 border border-[#D3C8B8] rounded-[7px] bg-white text-xs sm:text-sm min-w-0 sm:min-w-[240px] flex-1"
            />
            <button
              type="submit"
              className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white border-0 rounded-[7px] h-10 sm:h-11 px-4 sm:px-5 font-bold text-xs whitespace-nowrap transition-colors flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
            >
              Join Us →
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
