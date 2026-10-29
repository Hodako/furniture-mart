import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrandConfig, HERO_SLIDES } from '../data/storeLogic';

interface HeroSectionProps {
  brandConfig: BrandConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ brandConfig }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const changeSlide = (delta: number) => {
    setSlideIndex(
      (prev) => (prev + delta + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  const currentSlide = HERO_SLIDES[slideIndex];

  const displayHeadline =
    slideIndex === 0
      ? brandConfig.heroTitle
      : `${currentSlide.titleLine1} ${currentSlide.titleLine2}`;
  const displayDesc =
    slideIndex === 0 ? brandConfig.heroSubtitle : currentSlide.desc;

  return (
    <div id="home">
      {/* Hero Section with compact phone height and streamlined phone typography */}
      <section className="py-1.5 sm:py-4 bg-[#F7F3ED]">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div
            style={{ backgroundImage: `url("${currentSlide.img}")` }}
            className="h-[155px] xs:h-[180px] sm:h-[300px] md:h-[420px] rounded-xl sm:rounded-[18px] overflow-hidden relative bg-cover bg-center flex items-center transition-all duration-300"
          >
            {/* Measured Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171811]/90 via-[#171811]/60 to-transparent" />

            {/* Hero Content - Clean and focused on mobile without text clutter */}
            <div className="relative z-10 text-white p-3 sm:p-6 md:p-[6%] max-w-[580px]">
              {/* Kicker hidden on mobile */}
              <div className="hidden sm:block text-[#D4A45B] text-[9px] sm:text-[11px] font-bold tracking-[1.5px] sm:tracking-[3px] uppercase">
                {currentSlide.kicker}
              </div>

              {/* Punchy Headline */}
              <h1 className="font-display font-bold text-[15px] xs:text-base sm:text-2xl md:text-[42px] leading-tight my-0.5 sm:my-3 text-balance max-w-[280px] sm:max-w-none">
                {displayHeadline}
              </h1>

              {/* Long description text hidden on phone */}
              <p className="hidden sm:block leading-snug text-[#EEE8DE] text-[11px] sm:text-sm mb-2.5 sm:mb-5 line-clamp-2 sm:line-clamp-none max-w-md">
                {displayDesc}
              </p>

              {/* Action Buttons: 1 compact button on phone, dual buttons on desktop */}
              <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-0">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center bg-[#D4A45B] hover:bg-[#c39347] text-[#211B13] rounded-md sm:rounded-[7px] py-1 sm:py-2.5 px-2.5 sm:px-[18px] font-bold text-[10px] sm:text-xs transition-colors whitespace-nowrap min-h-[28px] sm:min-h-[38px]"
                >
                  {currentSlide.btn}
                </Link>
                <Link
                  to="/collections"
                  className="hidden sm:inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-md sm:rounded-[7px] py-1.5 sm:py-2.5 px-3 sm:px-[16px] font-semibold text-[11px] sm:text-xs transition-colors whitespace-nowrap min-h-[32px] sm:min-h-[38px] backdrop-blur-xs"
                >
                  Collections →
                </Link>
              </div>
            </div>

            {/* Slider Controls: HIDDEN ON PHONE/MOBILE, visible only on desktop (md:flex) */}
            <div className="hidden md:flex absolute bottom-3 sm:bottom-5 right-3 sm:right-[22px] z-10 gap-1.5 sm:gap-[9px] items-center text-white text-[11px] sm:text-xs font-mono-tabular">
              <button
                type="button"
                onClick={() => changeSlide(-1)}
                aria-label="Previous hero slide"
                className="cursor-pointer bg-black/30 hover:bg-black/50 text-white border border-white/40 rounded-full w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] flex items-center justify-center text-sm sm:text-base transition-colors"
              >
                ‹
              </button>
              <span className="px-1">0{slideIndex + 1} / 03</span>
              <button
                type="button"
                onClick={() => changeSlide(1)}
                aria-label="Next hero slide"
                className="cursor-pointer bg-black/30 hover:bg-black/50 text-white border border-white/40 rounded-full w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] flex items-center justify-center text-sm sm:text-base transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
