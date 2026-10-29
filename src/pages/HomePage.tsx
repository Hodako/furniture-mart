import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { BrandConfig, Product } from '../data/storeLogic';
import { HeroSection } from '../components/HeroSection';
import { CollectionShowcase } from '../components/CollectionShowcase';
import { CraftsmanshipSection } from '../components/CraftsmanshipSection';

interface HomePageProps {
  brandConfig: BrandConfig;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNotify: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  brandConfig,
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onNotify,
}) => {
  // Top 4 bestsellers for the home page teaser
  const bestsellers = products
    .filter((p) => p.featuredTag === 'Bestseller' || p.featuredTag === 'Popular')
    .slice(0, 4);

  const displayList = bestsellers.length >= 4 ? bestsellers : products.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Carousel (Compact phone height, no slider controls on phone) */}
      <HeroSection brandConfig={brandConfig} />

      {/* 2. Shop by Category (8 Categories) + Explore Collections (3 Promo Banners) */}
      <CollectionShowcase />

      {/* 3. Featured Bestsellers Grid */}
      <section className="py-3 sm:py-10">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-3 mb-2.5 sm:mb-6">
            <div>
              <div className="text-[#D4A45B] text-[9px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase">
                Customer Favorites
              </div>
              <h2 className="font-display font-bold text-lg sm:text-[28px] md:text-[32px] text-[#292720] mt-0.5">
                Most-Loved Pieces
              </h2>
              <p className="text-[11px] sm:text-xs text-[#777777]">
                Top rated furniture crafted for lifetime durability.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#183D32] hover:text-[#75472F] transition-colors self-start sm:self-auto"
            >
              <span>View All {products.length} Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-[17px]">
            {displayList.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <article
                  key={product.id}
                  className="group rounded-xl border border-[#E8E0D5] bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                >
                  {/* Clickable Image Body -> Links to dedicated Product Page */}
                  <div className="relative aspect-square overflow-hidden bg-[#F7F3ED]">
                    <Link
                      to={`/product/${product.id}`}
                      className="block w-full h-full"
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                    {product.featuredTag && (
                      <span className="absolute top-2 left-2 bg-[#183D32] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs pointer-events-none">
                        {product.featuredTag}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product)}
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      className={`cursor-pointer absolute top-2 right-2 rounded-full w-7 h-7 flex items-center justify-center transition-all shadow-xs ${
                        isWishlisted
                          ? 'bg-[#75472F] text-white'
                          : 'bg-white/90 hover:bg-white text-[#75472F]'
                      }`}
                    >
                      <span className="text-xs">
                        {isWishlisted ? '♥' : '♡'}
                      </span>
                    </button>
                  </div>

                  {/* Product Details & Actions */}
                  <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[#75472F] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase block">
                        {product.category}
                      </span>
                      {/* Clickable Title -> Links to dedicated Product Page */}
                      <Link
                        to={`/product/${product.id}`}
                        className="font-display font-semibold text-xs sm:text-[14px] text-[#292720] hover:text-[#75472F] mt-1 line-clamp-1 block transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-[#D4A45B]">
                        <Star className="w-3 h-3 fill-[#D4A45B] text-[#D4A45B]" />
                        <span className="font-semibold text-[#292720]">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 mt-2 border-t border-[#F2ECE2]">
                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-xs sm:text-sm md:text-base font-bold text-[#183D32] font-mono-tabular">
                          ৳{product.price.toLocaleString('en-US')}
                        </span>
                        {product.oldPrice && (
                          <del className="text-[10px] sm:text-xs text-[#999999] font-mono-tabular">
                            ৳{product.oldPrice.toLocaleString('en-US')}
                          </del>
                        )}
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => onQuickAdd(product)}
                          className="cursor-pointer flex-1 bg-[#183D32] hover:bg-[#75472F] text-white border-0 rounded-md py-1.5 px-2 font-bold text-[10px] sm:text-[11px] transition-colors min-h-[34px]"
                        >
                          Add to Bag
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          aria-label={`View full page for ${product.name}`}
                          className="border border-[#E8E0D5] hover:border-[#75472F] rounded-md px-2 py-1.5 text-[#75472F] flex items-center justify-center min-h-[34px] transition-colors"
                        >
                          ↗
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Trust Badges Strip */}
      <section className="bg-white border-y border-[#E8E0D5] py-2.5 sm:py-7">
        <div className="w-[min(1200px,94%)] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 p-1 sm:p-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F3ED] border border-[#E8E0D5] flex items-center justify-center text-[#183D32] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#292720]">
                10-Year Timber Warranty
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#777777]">
                Solid teak, oak and walnut built to last generations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1 sm:p-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F3ED] border border-[#E8E0D5] flex items-center justify-center text-[#183D32] shrink-0">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#292720]">
                Nationwide White-Glove Delivery
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#777777]">
                Carefully packaged and assembled inside your home.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1 sm:p-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F3ED] border border-[#E8E0D5] flex items-center justify-center text-[#183D32] shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#292720]">
                Direct Concierge & Showroom
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#777777]">
                WhatsApp order confirmation and customized timber finishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship & Color System & Newsletter */}
      <CraftsmanshipSection
        brandConfig={brandConfig}
        onNotify={onNotify}
      />
    </div>
  );
};
