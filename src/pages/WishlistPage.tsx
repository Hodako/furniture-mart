import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../data/storeLogic';

interface WishlistPageProps {
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="py-6 sm:py-12">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="text-[#D4A45B] text-[10px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase">
            Your Curation
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#292720] mt-1 mb-2">
            Saved Favorites ({wishlistedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#777777]">
            Keep track of the handcrafted furniture designs you love most.
          </p>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-[17px]">
            {wishlistedProducts.map((product) => (
              <article
                key={product.id}
                className="group rounded-xl border border-[#E8E0D5] bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
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
                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(product)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="cursor-pointer absolute top-2 right-2 rounded-full w-7 h-7 sm:w-8 sm:h-8 bg-white/90 hover:bg-white text-[#75472F] hover:text-red-600 flex items-center justify-center transition-all shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[#75472F] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase block">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-display font-semibold text-xs sm:text-[14px] text-[#292720] hover:text-[#75472F] mt-1 line-clamp-2 block transition-colors"
                    >
                      {product.name}
                    </Link>
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
                        onClick={() => onAddToCart(product)}
                        className="cursor-pointer flex-1 bg-[#183D32] hover:bg-[#75472F] text-white border-0 rounded-md py-1.5 px-1 font-bold text-[10px] sm:text-[11px] transition-colors min-h-[34px] flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        aria-label={`View details of ${product.name}`}
                        className="border border-[#E8E0D5] hover:border-[#75472F] rounded-md px-2 py-1.5 text-[#75472F] flex items-center justify-center min-h-[34px] transition-colors"
                      >
                        ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F7F3ED] rounded-2xl border border-[#E8E0D5] p-6 max-w-lg mx-auto">
            <Heart className="w-12 h-12 text-[#75472F]/40 mx-auto mb-3" />
            <h2 className="font-display font-bold text-xl text-[#292720] mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mb-6">
              Tap the heart icon on any lamp, wardrobe, sofa, or dining piece to save it here for later.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#183D32] hover:bg-[#75472F] text-white px-5 py-3 rounded-lg text-xs font-bold transition-colors"
            >
              <span>Explore Furniture Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
