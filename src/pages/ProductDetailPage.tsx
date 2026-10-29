import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Heart,
  MessageSquare,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
  Check,
  Share2,
} from 'lucide-react';
import { BrandConfig, Product } from '../data/storeLogic';

interface ProductDetailPageProps {
  brandConfig: BrandConfig;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onNotify: (msg: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  brandConfig,
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onNotify,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [selectedFinish, setSelectedFinish] = useState<string>(() => {
    return product?.woodFinishes?.[0] || 'Natural Walnut';
  });
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // If finish changed when product changes
  React.useEffect(() => {
    if (product?.woodFinishes?.[0]) {
      setSelectedFinish(product.woodFinishes[0]);
    }
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="py-16 sm:py-24 text-center">
        <div className="w-[min(600px,94%)] mx-auto bg-white rounded-2xl border border-[#E8E0D5] p-8">
          <h1 className="font-display font-bold text-2xl text-[#292720] mb-3">
            Product Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] mb-6">
            The furniture design you are looking for may have been moved or is currently out of stock.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#183D32] hover:bg-[#75472F] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Furniture Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlistIds.includes(product.id);
  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      onNotify('Link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hello ${brandConfig.companyName},\nI would like to order:\n- Item: ${product.name}\n- Category: ${product.category}\n- Finish: ${selectedFinish}\n- Quantity: ${quantity}\n- Price: ৳${(product.price * quantity).toLocaleString('en-US')}\n\nPlease confirm availability and delivery timeframe.`
    );
    window.open(`https://wa.me/8801711849200?text=${message}`, '_blank');
  };

  const handleAdd = () => {
    onAddToCart(product, selectedFinish, quantity);
  };

  // Related products from same category or random
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="py-4 sm:py-8">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#777777] mb-4 sm:mb-6 overflow-x-auto no-scrollbar"
        >
          <Link to="/" className="hover:text-[#183D32] whitespace-nowrap">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#183D32] whitespace-nowrap">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#183D32] whitespace-nowrap"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#292720] font-medium truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Back Button for mobile */}
        <div className="mb-3 sm:hidden">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-[#75472F]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 mb-12 sm:mb-16">
          {/* Left Column: Image Showcase */}
          <div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F7F3ED] border border-[#E8E0D5] shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featuredTag && (
                <span className="absolute top-3 left-3 bg-[#183D32] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {product.featuredTag}
                </span>
              )}
              {discountPercent && (
                <span className="absolute top-3 right-3 bg-[#D4A45B] text-[#211B13] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                  SAVE {discountPercent}%
                </span>
              )}
            </div>

            {/* Quick trust bar below photo */}
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="p-2 rounded-lg bg-white border border-[#E8E0D5] text-[10px] sm:text-[11px] text-[#292720]">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#183D32]" />
                <span className="font-semibold block">10-Yr Timber</span>
                <span className="text-[#777777]">Warranty</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E8E0D5] text-[10px] sm:text-[11px] text-[#292720]">
                <Truck className="w-4 h-4 mx-auto mb-1 text-[#183D32]" />
                <span className="font-semibold block">Nationwide</span>
                <span className="text-[#777777]">In-Home Setup</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E8E0D5] text-[10px] sm:text-[11px] text-[#292720]">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#183D32]" />
                <span className="font-semibold block">7-Day</span>
                <span className="text-[#777777]">Easy Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#75472F] uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#D4A45B]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#D4A45B] text-[#D4A45B]'
                            : 'text-[#E8E0D5]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#292720]">
                    {product.rating}
                  </span>
                  <span className="text-[#777777]">
                    (Artisan Reviewed)
                  </span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#292720] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-4 p-3 rounded-xl bg-[#F7F3ED] border border-[#E8E0D5] w-fit">
                <span className="font-mono-tabular font-bold text-2xl sm:text-3xl text-[#183D32]">
                  ৳{product.price.toLocaleString('en-US')}
                </span>
                {product.oldPrice && (
                  <del className="font-mono-tabular text-sm sm:text-base text-[#999999]">
                    ৳{product.oldPrice.toLocaleString('en-US')}
                  </del>
                )}
                <span className="text-[11px] text-[#183D32] font-semibold bg-white px-2 py-0.5 rounded border border-[#E8E0D5]">
                  Cash on Delivery Available
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Wood Finish Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-[#292720] mb-2">
                  <span>Selected Timber Finish:</span>
                  <span className="text-[#75472F]">{selectedFinish}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.woodFinishes.map((finish) => {
                    const isSelected = selectedFinish === finish;
                    return (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`cursor-pointer px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#183D32] text-white shadow-xs'
                            : 'bg-white border border-[#E8E0D5] text-[#292720] hover:border-[#75472F]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#D4A45B]" />}
                        <span>{finish}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag Actions */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E8E0D5] rounded-lg bg-white h-11 px-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="cursor-pointer w-8 h-8 flex items-center justify-center text-[#75472F] font-bold text-sm hover:bg-[#F7F3ED] rounded"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-bold text-xs font-mono-tabular">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="cursor-pointer w-8 h-8 flex items-center justify-center text-[#75472F] font-bold text-sm hover:bg-[#F7F3ED] rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="cursor-pointer flex-1 h-11 bg-[#183D32] hover:bg-[#75472F] text-white rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity > 1 ? `(${quantity}) ` : ''}to Bag</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    aria-label={
                      isWishlisted
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    className={`cursor-pointer h-11 w-11 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      isWishlisted
                        ? 'border-[#75472F] bg-[#75472F] text-white'
                        : 'border-[#E8E0D5] bg-white text-[#75472F] hover:border-[#75472F]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                  </button>

                  {/* Share Button */}
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share product link"
                    className="cursor-pointer h-11 w-11 rounded-lg border border-[#E8E0D5] bg-white text-[#777777] hover:text-[#292720] flex items-center justify-center transition-colors shrink-0"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="cursor-pointer w-full h-11 bg-[#F7F3ED] hover:bg-[#E8E0D5] text-[#183D32] border border-[#E8E0D5] rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#75472F]" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Specifications Box */}
            <div className="rounded-xl border border-[#E8E0D5] bg-white p-4 sm:p-5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#75472F] mb-3">
                Craftsmanship & Dimensions
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-[#777777]">Category:</span>
                <span className="font-semibold text-[#292720]">{product.category}</span>

                <span className="text-[#777777]">Primary Material:</span>
                <span className="font-semibold text-[#292720]">{product.material}</span>

                <span className="text-[#777777]">Dimensions:</span>
                <span className="font-semibold text-[#292720]">{product.dimensions}</span>

                <span className="text-[#777777]">Workshop Lead Time:</span>
                <span className="font-semibold text-[#292720]">{product.leadTime}</span>

                <span className="text-[#777777]">Stock Availability:</span>
                <span className="font-semibold text-[#183D32]">
                  {product.inStock ? 'In Stock (Ready for Dispatch)' : 'Crafted to Order'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        <section className="pt-8 border-t border-[#E8E0D5]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[#D4A45B] text-[10px] font-bold tracking-widest uppercase">
                Curated Recommendations
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#292720] mt-0.5">
                More in {product.category}
              </h2>
            </div>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-[#183D32] hover:text-[#75472F] transition-colors"
            >
              View All {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {fallbackRelated.map((rel) => {
              const relWish = wishlistIds.includes(rel.id);
              return (
                <div
                  key={rel.id}
                  className="group rounded-xl border border-[#E8E0D5] bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                >
                  <Link to={`/product/${rel.id}`} className="block relative aspect-square overflow-hidden bg-[#F7F3ED]">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {rel.featuredTag && (
                      <span className="absolute top-2 left-2 bg-[#183D32] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {rel.featuredTag}
                      </span>
                    )}
                  </Link>

                  <div className="p-3 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[9px] font-bold text-[#75472F] uppercase block">
                        {rel.category}
                      </span>
                      <Link
                        to={`/product/${rel.id}`}
                        className="font-display font-semibold text-xs text-[#292720] hover:text-[#75472F] line-clamp-1 mt-0.5 block"
                      >
                        {rel.name}
                      </Link>
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#F2ECE2] flex items-center justify-between">
                      <span className="font-mono-tabular font-bold text-xs text-[#183D32]">
                        ৳{rel.price.toLocaleString('en-US')}
                      </span>
                      <Link
                        to={`/product/${rel.id}`}
                        className="text-[10px] font-bold text-[#183D32] hover:text-[#75472F]"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
