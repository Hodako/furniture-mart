import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, LayoutGrid, Layers, Heart } from 'lucide-react';

interface MobileNavProps {
  totalCartItems: number;
  totalWishlistItems: number;
  onOpenCart: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  totalCartItems,
  totalWishlistItems,
  onOpenCart,
}) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `border-0 bg-transparent flex flex-col items-center justify-center text-[9px] font-medium py-1 px-1 min-w-[50px] min-h-[40px] transition-colors ${
      isActive ? 'text-[#183D32] font-bold' : 'text-[#75472F]/80 hover:text-[#183D32]'
    }`;

  return (
    <nav
      aria-label="Mobile Navigation"
      className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E0D5] justify-around items-center py-1 px-1 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
    >
      {/* Home */}
      <NavLink to="/" end className={getNavLinkClass}>
        <Home className="w-4 h-4 mb-0.5" />
        <span>Home</span>
      </NavLink>

      {/* Shop */}
      <NavLink to="/shop" className={getNavLinkClass}>
        <LayoutGrid className="w-4 h-4 mb-0.5" />
        <span>Shop</span>
      </NavLink>

      {/* Collections - changed icon to Layers */}
      <NavLink to="/collections" className={getNavLinkClass}>
        <Layers className="w-4 h-4 mb-0.5" />
        <span>Collections</span>
      </NavLink>

      {/* Wishlist */}
      <NavLink to="/wishlist" className={getNavLinkClass}>
        <div className="relative">
          <Heart className="w-4 h-4 mb-0.5" />
          {totalWishlistItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#75472F] text-white font-bold text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-mono-tabular">
              {totalWishlistItems}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </NavLink>

      {/* Bag / Cart */}
      <button
        type="button"
        onClick={onOpenCart}
        aria-label={`Open shopping bag with ${totalCartItems} items`}
        className="cursor-pointer border-0 bg-transparent text-[#183D32] hover:text-[#75472F] flex flex-col items-center justify-center text-[9px] font-medium py-1 px-1 min-w-[50px] min-h-[40px] relative"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 mb-0.5" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#D4A45B] text-[#183D32] font-bold text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-mono-tabular">
              {totalCartItems}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>
    </nav>
  );
};
