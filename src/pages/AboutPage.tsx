import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, TreePine, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BrandConfig, DESIGN_SYSTEM_COLORS } from '../data/storeLogic';

interface AboutPageProps {
  brandConfig: BrandConfig;
}

export const AboutPage: React.FC<AboutPageProps> = ({ brandConfig }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="py-6 sm:py-12">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Hero Banner */}
        <div className="bg-[#183D32] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 mb-10 sm:mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="text-[#D4A45B] text-[10px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase">
              Artisanal Heritage · বাংলাদেশ
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl my-3 text-balance">
              Crafted by Nature, Perfected for Modern Living
            </h1>
            <p className="text-xs sm:text-base text-[#DCE7DF] leading-relaxed mb-6">
              {brandConfig.companyName} was born from a love for natural wood and simplicity of design.
              We believe every grain tells a story of time, sincerity, and durability.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-[#D4A45B] hover:bg-[#c39347] text-[#211B13] rounded-lg py-3 px-6 font-bold text-xs transition-colors"
            >
              Explore Our Pieces →
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 hidden md:block">
            <img
              src="/assets/uzvi/banner-living.jpg"
              alt="Timber workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">
          <div>
            <div className="text-[#D4A45B] text-[10px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase">
              Our Philosophy
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#292720] mt-1 mb-4">
              Furniture That Grows With Your Family
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-4">
              In an age of disposable particle-board furniture, {brandConfig.companyName} stands for permanence.
              Every dining table, wooden lamp, bed, and wardrobe is built with ethically sourced solid hardwood—primarily
              Burma Teak, Sheesham (Rosewood), White Oak, and Walnut.
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              Our master artisans in Bangladesh use traditional mortise-and-tenon joints, ensuring that your furniture
              withstands seasonal humidity and temperature shifts without loosening or creaking.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#F7F3ED] rounded-xl border border-[#E8E0D5]">
                <b className="block text-2xl font-display text-[#183D32]">100%</b>
                <span className="text-xs text-[#777777]">Solid Timber Only</span>
              </div>
              <div className="p-4 bg-[#F7F3ED] rounded-xl border border-[#E8E0D5]">
                <b className="block text-2xl font-display text-[#183D32]">10 Yrs</b>
                <span className="text-xs text-[#777777]">Structural Timber Warranty</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E8E0D5] aspect-[4/3] bg-[#F7F3ED]">
            <img
              src="/assets/uzvi/dining-table.jpg"
              alt="Artisan solid wood dining table"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="mb-12 sm:mb-20">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#292720]">
              The Four Pillars of Uzvi Craft
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mt-1">
              Every detail is engineered with patience and respect for natural resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-xl border border-[#E8E0D5] bg-white">
              <TreePine className="w-8 h-8 text-[#183D32] mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-[#292720] mb-1">
                Ethical Hardwood
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Seasoned timber dried in controlled kilns to achieve optimal 8-12% moisture content.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E8E0D5] bg-white">
              <Award className="w-8 h-8 text-[#75472F] mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-[#292720] mb-1">
                Hand-Rubbed Finishes
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Natural botanical wax and organic matte polyurethane sealants that highlight live grain.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E8E0D5] bg-white">
              <ShieldCheck className="w-8 h-8 text-[#183D32] mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-[#292720] mb-1">
                Precision Joinery
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                No cheap nails or glue blocks. Classic wooden dowels, tenons, and interlocking wood frames.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E8E0D5] bg-white">
              <HeartHandshake className="w-8 h-8 text-[#D4A45B] mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-[#292720] mb-1">
                Local Artisans
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Empowering generational carpenters across Bangladesh with fair wages and safe working conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Color & Design System with Bangla Typography */}
        <div id="materials" className="bg-[#F7F3ED] rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-[#D4A45B] text-[10px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase font-bangla">
                কালার ও ডিজাইন সিস্টেম · Color & Design System
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#292720] mt-1">
                Our Signature Brand Palette
              </h2>
            </div>
            <p className="text-xs text-[#75472F] font-bangla font-semibold">
              উষ্ণ প্রাকৃতিক কাঠ, বনানী সবুজ ও শান্ত সোনালী আভা
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {DESIGN_SYSTEM_COLORS.map((token) => {
              const isLight =
                token.hex === '#F7F3ED' || token.hex === '#D4A45B';
              const isCopied = copiedHex === token.hex;

              return (
                <div
                  key={token.id}
                  className="rounded-xl border border-[#E8E0D5] overflow-hidden bg-white shadow-xs"
                >
                  <div
                    style={{ backgroundColor: token.hex }}
                    className={`h-24 sm:h-28 p-3 sm:p-4 flex items-end justify-between border-b border-[#E8E0D5] ${
                      isLight ? 'text-[#292720]' : 'text-white'
                    }`}
                  >
                    <span className="font-mono-tabular text-xs font-bold">
                      {token.hex}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyHex(token.hex)}
                      aria-label={`Copy hex ${token.hex}`}
                      className={`cursor-pointer px-2 py-0.5 rounded text-[10px] inline-flex items-center gap-1 ${
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

                  <div className="p-3 sm:p-4 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#292720] truncate">
                      {token.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#75472F] font-bangla">
                      {token.bengaliLabel}
                    </p>
                    <p className="text-[11px] text-[#777777]">
                      {token.englishRole}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
