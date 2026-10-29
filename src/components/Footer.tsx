import React from 'react';
import { Link } from 'react-router-dom';
import { BrandConfig } from '../data/storeLogic';

interface FooterProps {
  brandConfig: BrandConfig;
  isProductPage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  brandConfig,
  isProductPage = false,
}) => {
  return (
    <footer
      className={`bg-[#102E26] text-white py-5 sm:py-12 mt-auto ${
        isProductPage ? 'pb-6 md:pb-12' : 'pb-20 md:pb-12'
      }`}
    >
      <div className="w-[min(1200px,94%)] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Brand Info */}
          <div className="sm:col-span-2">
            <Link
              to="/"
              className="font-display font-bold text-xl sm:text-[27px] text-[#F0D7A6] inline-block hover:opacity-90 transition-opacity"
            >
              {brandConfig.companyName}
              <small className="block font-sans font-bold text-[7.5px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] text-white mt-0.5 sm:mt-1 uppercase">
                {brandConfig.companySubtitle}
              </small>
            </Link>
            <p className="text-xs text-[#C5D0C8] leading-relaxed mt-2.5 max-w-md">
              Handcrafted solid timber furniture and refined decor designed to
              bring timeless elegance, natural warmth, and comfort to homes across Bangladesh.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-[#D4A45B]">
              <span className="font-semibold">Showroom Hours:</span>
              <span className="text-[#C5D0C8]">10:00 AM – 9:00 PM (Daily)</span>
            </div>
          </div>

          {/* Shop Quick Links - Hidden on phone in product page */}
          <div className={isProductPage ? 'hidden sm:block' : ''}>
            <h3 className="text-xs sm:text-[13px] font-bold tracking-wider uppercase mb-3 text-[#D4A45B]">
              SHOP
            </h3>
            <div className="flex flex-col gap-2 text-xs text-[#C5D0C8]">
              <Link to="/shop" className="hover:text-white transition-colors">
                All Furniture (20 Pieces)
              </Link>
              <Link to="/collections" className="hover:text-white transition-colors">
                Categories & Collections
              </Link>
              <Link
                to="/shop?category=Wooden%20Lamp"
                className="hover:text-white transition-colors"
              >
                Wooden Lamps
              </Link>
              <Link
                to="/shop?category=Sofa"
                className="hover:text-white transition-colors"
              >
                Living Room Sofas
              </Link>
              <Link
                to="/shop?category=Bed"
                className="hover:text-white transition-colors"
              >
                Beds & Wardrobes
              </Link>
              <Link to="/wishlist" className="hover:text-white transition-colors">
                Saved Wishlist
              </Link>
            </div>
          </div>

          {/* Company & Support - Hidden on phone in product page */}
          <div className={isProductPage ? 'hidden sm:block' : ''}>
            <h3 className="text-xs sm:text-[13px] font-bold tracking-wider uppercase mb-3 text-[#D4A45B]">
              INFORMATION & CONTACT
            </h3>
            <div className="flex flex-col gap-2 text-xs text-[#C5D0C8]">
              <Link to="/about" className="hover:text-white transition-colors">
                About Our Craft
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact & Showroom
              </Link>
              <p className="text-[#E8E0D5] pt-1">
                <span className="text-[#D4A45B] block font-semibold">Location:</span>
                {brandConfig.showroomAddress}
              </p>
              <p className="text-[#E8E0D5]">
                <span className="text-[#D4A45B] block font-semibold">Concierge:</span>
                {brandConfig.supportPhone}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & design system info */}
        <div className="border-t border-white/15 mt-8 pt-5 text-[11px] text-[#B9C3BD] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} {brandConfig.companyName} (
            {brandConfig.companySubtitle}). All rights reserved.
          </span>
          <span className="font-bangla text-[#D4A45B]">
            কালার ও ডিজাইন সিস্টেম · #F7F3ED · #75472F · #183D32 · #D4A45B
          </span>
        </div>
      </div>
    </footer>
  );
};
