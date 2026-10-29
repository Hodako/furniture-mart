import React from 'react';
import { Search } from 'lucide-react';
import {
  BrandConfig,
  CATEGORIES_LIST,
  Product,
  ProductCategory,
  SortOption,
  formatBDT,
} from '../data/storeLogic';

interface ProductCatalogProps {
  brandConfig: BrandConfig;
  products: Product[];
  selectedCategory: 'All' | ProductCategory;
  searchQuery: string;
  sortBy: SortOption;
  wishlistIds: string[];
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  onCategoryChange: (cat: 'All' | ProductCategory) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (s: SortOption) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  brandConfig,
  products,
  selectedCategory,
  searchQuery,
  sortBy,
  wishlistIds,
  searchInputRef,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  const filterCategories: Array<'All' | ProductCategory> = [
    'All',
    ...CATEGORIES_LIST.map((c) => c.name),
  ];

  return (
    <section id="products" className="scroll-mt-20 py-7 sm:py-[42px]">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Heading */}
        <div className="mb-3.5 sm:mb-[22px]">
          <div className="text-[#D4A45B] text-[10px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase">
            Curated for your home
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-[32px] md:text-[34px] text-[#292720] my-1 sm:my-2">
            Featured Products
          </h2>
          <p className="text-xs sm:text-[13px] text-[#777777]">
            Explore furniture and home decor favourites ({products.length} items).
          </p>
        </div>

        {/* Category Filter Pills: Mobile horizontal swipe with no-scrollbar */}
        <div
          role="tablist"
          aria-label="Filter products by category"
          className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 mb-3.5 sm:mb-4 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap"
        >
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat)}
                className={`cursor-pointer shrink-0 py-2 px-3 sm:py-[9px] sm:px-[14px] border rounded-full text-xs font-medium transition-colors whitespace-nowrap min-h-[36px] ${
                  isActive
                    ? 'bg-[#183D32] text-white border-[#183D32] shadow-xs'
                    : 'bg-white text-[#292720] border-[#E8E0D5] hover:border-[#75472F]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Toolbar - Phone Optimized */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 mb-4 sm:mb-[22px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#75472F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              id="search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search wooden lamps, beds, sofas, tables..."
              aria-label="Search products"
              className="w-full pl-10 pr-3.5 h-11 border border-[#E8E0D5] rounded-lg bg-white text-xs sm:text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs text-[#777777] sm:hidden whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort"
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full sm:w-auto h-11 px-3 border border-[#E8E0D5] rounded-lg bg-white text-xs sm:text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid: 2 columns on phone */}
        {products.length === 0 ? (
          <div className="p-8 text-center border border-[#E8E0D5] rounded-xl bg-[#F7F3ED]">
            <p className="font-display text-lg text-[#292720]">
              No products found.
            </p>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('All');
                onSearchChange('');
              }}
              className="mt-3 cursor-pointer bg-[#183D32] text-white rounded-[7px] py-2 px-4 text-xs font-bold"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-[17px]">
            {products.map((product) => {
              const isWished = wishlistIds.includes(product.id);
              return (
                <article
                  key={product.id}
                  className="border border-[#E8E0D5] rounded-lg sm:rounded-xl overflow-hidden bg-white hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product.id)}
                      aria-label={`View details for ${product.name}`}
                      className="cursor-pointer block w-full text-left"
                    >
                      <img
                        loading="lazy"
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="block w-full aspect-square object-cover bg-[#F7F3ED]"
                      />
                    </button>
                    {product.featuredTag && (
                      <span className="absolute top-2 left-2 bg-white/95 text-[#183D32] text-[8px] sm:text-[9px] font-bold py-0.5 sm:py-1 px-1.5 rounded shadow-xs">
                        {product.featuredTag}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product)}
                      aria-label={
                        isWished
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      className="cursor-pointer absolute right-2 top-2 border-0 rounded-full bg-white/90 hover:bg-white w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] text-sm sm:text-base leading-none flex items-center justify-center text-[#75472F] shadow-xs transition-transform"
                    >
                      {isWished ? '♥' : '♡'}
                    </button>
                  </div>

                  <div className="p-2.5 sm:p-[13px] flex-1 flex flex-col justify-between">
                    <div>
                      <small className="text-[#75472F] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider block truncate">
                        {product.category}
                      </small>
                      <h3 className="text-xs sm:text-[13px] font-semibold leading-snug min-h-[30px] sm:min-h-[38px] my-1 sm:my-[7px] text-[#292720] line-clamp-2">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product.id)}
                          className="cursor-pointer text-left hover:text-[#183D32]"
                        >
                          {product.name}
                        </button>
                      </h3>
                      <div className="text-[10px] sm:text-[11px] text-[#C38C36]">
                        ★★★★★{' '}
                        <span className="text-[#777777] text-[10px]">{product.rating}</span>
                      </div>
                    </div>

                    <div className="pt-1.5 sm:pt-2">
                      <div className="font-bold text-[#183D32] my-1 sm:my-2 text-xs sm:text-sm tabular-nums font-mono-tabular">
                        {formatBDT(product.price, brandConfig.currencySymbol)}
                        {product.oldPrice > product.price && (
                          <span className="text-[#999999] line-through text-[10px] sm:text-[11px] font-normal ml-1 sm:ml-[7px]">
                            {formatBDT(
                              product.oldPrice,
                              brandConfig.currencySymbol
                            )}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-1 sm:gap-1.5 mt-1">
                        <button
                          type="button"
                          onClick={() => onQuickAdd(product)}
                          className="cursor-pointer flex-1 bg-[#183D32] hover:bg-[#75472F] text-white border-0 rounded-md sm:rounded-[7px] py-2 sm:py-2.5 px-1 font-bold text-[10px] sm:text-[11px] transition-colors min-h-[34px] sm:min-h-[36px]"
                        >
                          Add to Bag
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product.id)}
                          aria-label={`Quick view ${product.name}`}
                          className="cursor-pointer px-2 sm:px-2.5 border border-[#E8E0D5] hover:border-[#75472F] bg-white rounded-md sm:rounded-[7px] text-xs text-[#292720] min-h-[34px] sm:min-h-[36px] flex items-center justify-center"
                        >
                          ↗
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
