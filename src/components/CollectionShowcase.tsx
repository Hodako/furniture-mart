import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CATEGORIES_LIST,
  PROMO_COLLECTIONS,
  ProductCategory,
} from '../data/storeLogic';

interface CollectionShowcaseProps {
  onSelectCategory?: (category: 'All' | ProductCategory) => void;
}

export const CollectionShowcase: React.FC<CollectionShowcaseProps> = ({
  onSelectCategory,
}) => {
  const navigate = useNavigate();

  const handleSelect = (category: 'All' | ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      {/* Section 1: Shop by Category (4 columns on mobile = 2 rows of 4) */}
      <section id="categories" className="py-2.5 sm:py-[32px]">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="mb-2.5 sm:mb-4 flex items-baseline justify-between">
            <h2 className="font-display font-bold text-base sm:text-xl text-[#292720]">
              Shop by Category
            </h2>
            <span className="text-[11px] text-[#777777]">8 categories</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleSelect(cat.name)}
                className="cursor-pointer group border border-[#E8E0D5] hover:border-[#75472F] rounded-lg sm:rounded-[11px] bg-white overflow-hidden text-center pb-1.5 sm:pb-3 transition-all flex flex-col items-center justify-between"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#F7F3ED]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <strong className="block text-[10px] sm:text-xs text-[#292720] mt-1 sm:mt-2.5 px-0.5 truncate w-full">
                  {cat.name}
                </strong>
                <span className="text-[#183D32] group-hover:text-[#75472F] font-semibold text-[10px] sm:text-[11px] mt-1 hidden sm:inline">
                  Shop Now →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Explore Our Collections (3 Promo Banners on Warm Cream) */}
      <section id="collections" className="py-3 sm:py-[32px] bg-[#F7F3ED]">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="mb-2.5 sm:mb-4">
            <h2 className="font-display font-bold text-base sm:text-xl text-[#292720]">
              Featured Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-[15px]">
            {PROMO_COLLECTIONS.map((promo) => (
              <button
                key={promo.id}
                type="button"
                onClick={() => handleSelect(promo.category)}
                style={{ backgroundImage: `url("${promo.image}")` }}
                className="cursor-pointer text-left min-h-[140px] sm:min-h-[220px] bg-cover bg-center rounded-[12px] sm:rounded-[13px] text-white flex items-end overflow-hidden group border border-[#75472F]/15"
              >
                <div className="p-3 sm:p-[22px] w-full bg-gradient-to-t from-[#111111]/90 via-[#111111]/50 to-transparent">
                  <h3 className="font-display font-bold text-lg sm:text-[24px] mb-0.5 sm:mb-1">
                    {promo.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/90 mb-1">{promo.subtitle}</p>
                  <b className="text-[11px] sm:text-xs text-[#D4A45B] group-hover:underline">
                    Shop Now →
                  </b>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
