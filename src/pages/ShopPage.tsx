import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Star } from 'lucide-react';
import {
  BrandConfig,
  CATEGORIES_LIST,
  Product,
  ProductCategory,
  SortOption,
  filterAndSortProducts,
} from '../data/storeLogic';

interface ShopPageProps {
  brandConfig: BrandConfig;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>(
    () => {
      if (
        initialCategoryParam &&
        CATEGORIES_LIST.some((c) => c.name === initialCategoryParam)
      ) {
        return initialCategoryParam as ProductCategory;
      }
      return 'All';
    }
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Sync category when query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES_LIST.some((c) => c.name === cat)) {
      setSelectedCategory(cat as ProductCategory);
    } else if (!cat) {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const handleCategoryClick = (cat: 'All' | ProductCategory) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        category: selectedCategory,
        searchQuery,
        sortBy,
      }),
    [products, selectedCategory, searchQuery, sortBy]
  );

  return (
    <div className="py-4 sm:py-8">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Page Header - Minimalist */}
        <div className="mb-3 sm:mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2 sm:pb-3 border-b border-[#E8E0D5]">
          <h1 className="font-display font-bold text-lg sm:text-2xl text-[#292720]">
            All Furniture
          </h1>
          <span className="text-xs text-[#777777]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Category Pills Filter Bar */}
        <div className="mb-3 sm:mb-5 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex gap-1.5 sm:gap-2 flex-nowrap sm:flex-wrap items-center min-w-max pb-1">
            <button
              type="button"
              onClick={() => handleCategoryClick('All')}
              className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap min-h-[34px] ${
                selectedCategory === 'All'
                  ? 'bg-[#183D32] text-white shadow-xs'
                  : 'bg-white border border-[#E8E0D5] text-[#292720] hover:border-[#75472F]'
              }`}
            >
              All Pieces ({products.length})
            </button>
            {CATEGORIES_LIST.map((cat) => {
              const count = products.filter((p) => p.category === cat.name).length;
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap min-h-[34px] ${
                    isActive
                      ? 'bg-[#183D32] text-white shadow-xs'
                      : 'bg-white border border-[#E8E0D5] text-[#292720] hover:border-[#75472F]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Sort Toolbar */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#75472F]" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lamps, beds, wardrobes, tables..."
              aria-label="Search furniture products"
              className="w-full h-10 sm:h-11 pl-9 pr-8 border border-[#E8E0D5] rounded-lg bg-white text-xs sm:text-sm text-[#292720] placeholder:text-[#999999] focus:outline-none focus:border-[#183D32]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#292720]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
            <span className="hidden sm:inline text-xs text-[#777777] whitespace-nowrap">
              Sort by:
            </span>
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products by"
                className="cursor-pointer w-full sm:w-auto h-10 sm:h-11 px-3 pr-8 border border-[#E8E0D5] rounded-lg bg-white text-xs sm:text-sm text-[#292720] font-medium appearance-none focus:outline-none focus:border-[#183D32]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#777777]" />
            </div>
          </div>
        </div>

        {/* Results Info Counter */}
        <div className="flex items-center justify-between text-xs text-[#777777] mb-3 pb-2 border-b border-[#E8E0D5]">
          <span>
            Showing <strong className="text-[#183D32]">{filteredProducts.length}</strong> of{' '}
            {products.length} pieces
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                handleCategoryClick('All');
                setSearchQuery('');
              }}
              className="cursor-pointer text-[#75472F] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid: 2 cols on mobile, 4 on desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-[17px]">
            {filteredProducts.map((product) => {
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
                        className="font-display font-semibold text-xs sm:text-[14px] text-[#292720] hover:text-[#75472F] mt-1 line-clamp-2 block transition-colors"
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
                          className="cursor-pointer flex-1 bg-[#183D32] hover:bg-[#75472F] text-white border-0 rounded-md py-1.5 px-1 font-bold text-[10px] sm:text-[11px] transition-colors min-h-[34px]"
                        >
                          Add to Bag
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          aria-label={`View full details of ${product.name}`}
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
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E8E0D5] p-6">
            <h3 className="font-display font-bold text-lg text-[#292720] mb-2">
              No pieces match your search
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] mb-4">
              Try searching for something else or clearing the active filters.
            </p>
            <button
              type="button"
              onClick={() => {
                handleCategoryClick('All');
                setSearchQuery('');
              }}
              className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
