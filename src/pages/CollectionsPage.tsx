import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { CATEGORIES_LIST, PROMO_COLLECTIONS, Product } from '../data/storeLogic';

interface CollectionsPageProps {
  products: Product[];
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ products }) => {
  return (
    <div className="py-3 sm:py-8">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Minimalist Header - No extra large texts, no fancy banners, just contents */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-[#E8E0D5]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#183D32]" />
            <h1 className="font-display font-bold text-lg sm:text-2xl text-[#292720]">
              Categories
            </h1>
          </div>
          <span className="text-xs text-[#777777]">
            8 Categories · {products.length} Products
          </span>
        </div>

        {/* 8 Categories Minimal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-8 sm:mb-12">
          {CATEGORIES_LIST.map((cat) => {
            const count = products.filter((p) => p.category === cat.name).length;
            return (
              <div
                key={cat.name}
                className="group rounded-xl border border-[#E8E0D5] bg-white overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F7F3ED] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#183D32]/90 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {count} {count === 1 ? 'Piece' : 'Pieces'}
                  </span>
                </div>

                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#292720]">
                    {cat.name}
                  </h3>

                  <Link
                    to={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="mt-2.5 inline-flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#183D32] group-hover:text-[#75472F] pt-2 border-t border-[#F2ECE2] transition-colors"
                  >
                    <span>View items</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curated Collections - Clean & Minimalist */}
        <div className="pt-5 border-t border-[#E8E0D5]">
          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-base sm:text-xl text-[#292720]">
              Featured Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {PROMO_COLLECTIONS.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl overflow-hidden border border-[#E8E0D5] flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#F7F3ED]">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#292720]">
                      {promo.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#777777] mt-0.5 mb-3">
                      {promo.subtitle}
                    </p>
                  </div>
                  <Link
                    to={`/shop?category=${encodeURIComponent(promo.category)}`}
                    className="inline-flex items-center justify-center bg-[#183D32] hover:bg-[#75472F] text-white py-1.5 px-3 rounded-md text-xs font-bold transition-colors w-full min-h-[34px]"
                  >
                    Explore Collection →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
