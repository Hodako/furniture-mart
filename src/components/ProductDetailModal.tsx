import React, { useState } from 'react';
import { X, Minus, Plus, Check, ShieldCheck, Truck } from 'lucide-react';
import { BrandConfig, Product, formatBDT } from '../data/storeLogic';

interface ProductDetailModalProps {
  product: Product | null;
  brandConfig: BrandConfig;
  onClose: () => void;
  onAddToCart: (product: Product, woodFinish: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  brandConfig,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedFinish, setSelectedFinish] = useState<string>(
    product.woodFinishes[0] || 'Natural Walnut'
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    onAddToCart(product, selectedFinish, quantity);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-4xl rounded-t-[20px] sm:rounded-2xl bg-[#F7F3ED] border border-[#75472F]/25 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[92vh] overflow-y-auto">
        {/* Mobile drag handle indicator */}
        <div className="sm:hidden col-span-full flex justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 bg-[#75472F]/25 rounded-full" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="cursor-pointer absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-white/90 sm:bg-[#F7F3ED]/90 text-[#1C1917] hover:bg-[#183D32] hover:text-[#F7F3ED] flex items-center justify-center transition-colors shadow-sm"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Top/Left Product Image & Specs */}
        <div className="md:col-span-6 bg-[#EFECE6] flex flex-col justify-between p-4 sm:p-6 md:p-8">
          <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#E5DDD0]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="mt-3.5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#75472F]/15 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#1C1917]/60 block text-[11px]">Dimensions</span>
              <span className="font-mono-tabular font-medium text-[#1C1917] mt-0.5 block">
                {product.dimensions}
              </span>
            </div>
            <div>
              <span className="text-[#1C1917]/60 block text-[11px]">Dispatch Estimate</span>
              <span className="font-medium text-[#183D32] mt-0.5 block">
                {product.leadTime}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom/Right Purchase Module */}
        <div className="md:col-span-6 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-[#F7F3ED]">
          <div className="space-y-3.5 sm:space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-[#75472F] font-bold">
                <span>{product.maker}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
              </div>
              <h2
                id="pdp-modal-title"
                className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#1C1917] mt-1"
              >
                {product.name}
              </h2>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#183D32]">
                {formatBDT(product.price, brandConfig.currencySymbol)}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-xs text-[#999999] line-through font-mono-tabular">
                  {formatBDT(product.oldPrice, brandConfig.currencySymbol)}
                </span>
              )}
              <span className="text-[11px] text-[#75472F] font-medium ml-auto">
                {product.inStock ? 'In stock' : 'Made to order'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#1C1917]/80 leading-relaxed">
              {product.description}
            </p>

            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1C1917]/75 block mb-1">
                Material Specification
              </span>
              <p className="text-xs text-[#1C1917]/80">{product.material}</p>
            </div>

            {/* Wood / Material Finish Selector */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1C1917]/75 block">
                Select Finish: <span className="text-[#75472F]">{selectedFinish}</span>
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.woodFinishes.map((finish) => {
                  const active = selectedFinish === finish;
                  return (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors inline-flex items-center gap-1.5 min-h-[34px] ${
                        active
                          ? 'bg-[#75472F] text-white border-[#75472F]'
                          : 'bg-[#EFE9DF] text-[#1C1917] border-[#75472F]/20 hover:border-[#75472F]'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{finish}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity + Buy CTA */}
          <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#75472F]/15 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#75472F]/25 rounded-lg bg-[#EFE9DF] shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="cursor-pointer p-2.5 sm:p-3 text-[#1C1917] hover:text-[#183D32] min-w-[36px] flex items-center justify-center"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2.5 sm:px-4 text-xs sm:text-sm font-mono-tabular font-bold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="cursor-pointer p-2.5 sm:p-3 text-[#1C1917] hover:text-[#183D32] min-w-[36px] flex items-center justify-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="cursor-pointer flex-1 py-3 sm:py-3.5 px-4 rounded-lg bg-[#183D32] hover:bg-[#75472F] text-white text-xs sm:text-sm font-bold transition-colors tabular-nums min-h-[44px] flex items-center justify-center"
              >
                Add to Bag · {formatBDT(product.price * quantity, brandConfig.currencySymbol)}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#1C1917]/65 pt-0.5">
              <span className="inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#75472F]" />
                Delivery across BD
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#183D32]" />
                {brandConfig.companyName} Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
