import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { BrandConfig } from '../data/storeLogic';

interface NavbarProps {
  brandConfig: BrandConfig;
  totalCartItems: number;
  totalWishlistItems: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandConfig,
  totalCartItems,
  totalWishlistItems,
  onOpenCart,
}) => {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap transition-colors py-1 relative text-[13px] font-medium ${
      isActive
        ? 'text-[#183D32] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#183D32]'
        : 'text-[#292720] hover:text-[#75472F]'
    }`;

  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8E0D5]">
      <div className="w-[min(1200px,94%)] mx-auto">
        <nav
          aria-label="Primary Navigation"
          className="flex items-center justify-between gap-2 sm:gap-6 min-h-[52px] sm:min-h-[70px]"
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="font-display font-bold text-[18px] sm:text-[24px] md:text-[26px] leading-tight text-[#75472F] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            {brandConfig.companyName}
            <small className="block font-sans font-bold text-[7.5px] sm:text-[9px] tracking-[1.5px] sm:tracking-[3px] text-[#292720]/75 uppercase">
              {brandConfig.companySubtitle}
            </small>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/collections" className={navLinkClass}>
              Collections
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact & Showroom
            </NavLink>
          </div>

          {/* Right Action Buttons: matching unified icon buttons with no heavy green background on Bag */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => navigate('/shop')}
              aria-label="Search all products"
              className="cursor-pointer border border-[#E8E0D5] bg-white hover:border-[#75472F] p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-[#183D32] transition-colors whitespace-nowrap flex items-center justify-center min-h-[34px] sm:min-h-[36px]"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#75472F]" />
              <span className="hidden sm:inline sm:ml-1.5 text-xs">Search</span>
            </button>

            {/* Wishlist Love Button */}
            <Link
              to="/wishlist"
              aria-label={`View wishlist with ${totalWishlistItems} items`}
              className="cursor-pointer border border-[#E8E0D5] bg-white hover:border-[#75472F] p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-[#183D32] transition-colors whitespace-nowrap flex items-center justify-center gap-1 min-h-[34px] sm:min-h-[36px] relative"
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  totalWishlistItems > 0
                    ? 'fill-[#75472F] text-[#75472F]'
                    : 'text-[#75472F]'
                }`}
              />
              <span className="hidden sm:inline text-xs">Saved</span>
              {totalWishlistItems > 0 && (
                <span className="inline-flex items-center justify-center bg-[#F7F3ED] text-[#75472F] border border-[#75472F]/30 text-[9px] font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Bag Button: Styled with clean outline just like Search and Love, removing heavy solid dark background */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag with ${totalCartItems} items`}
              className="cursor-pointer border border-[#E8E0D5] bg-white hover:border-[#75472F] p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-[#183D32] transition-colors whitespace-nowrap flex items-center justify-center gap-1 min-h-[34px] sm:min-h-[36px] relative"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#75472F]" />
              <span className="hidden sm:inline text-xs">Bag</span>
              {totalCartItems > 0 && (
                <span className="inline-flex items-center justify-center bg-[#D4A45B] text-[#183D32] text-[9px] font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
