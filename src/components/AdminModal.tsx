import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Building2,
  Package,
  ClipboardList,
} from 'lucide-react';
import {
  BrandConfig,
  CATEGORIES_LIST,
  DEFAULT_BRAND_CONFIG,
  DESIGN_SYSTEM_COLORS,
  Order,
  Product,
  ProductCategory,
  formatBDT,
  validateBrandConfig,
} from '../data/storeLogic';

interface AdminModalProps {
  isOpen: boolean;
  brandConfig: BrandConfig;
  products: Product[];
  orders: Order[];
  onClose: () => void;
  onSaveBrandConfig: (newConfig: BrandConfig) => void;
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const STUDIO_IMAGE_PRESETS = [
  { label: 'Wooden Lamp', path: '/assets/uzvi/wooden-lamp.jpg' },
  { label: 'Classic Wardrobe', path: '/assets/uzvi/wardrobe.jpg' },
  { label: 'Wooden Almira', path: '/assets/uzvi/almira.jpg' },
  { label: 'Modern Bed', path: '/assets/uzvi/bed.jpg' },
  { label: 'Forest Green Sofa', path: '/assets/uzvi/sofa.jpg' },
  { label: 'Solid Wood Dining Table', path: '/assets/uzvi/dining-table.jpg' },
  { label: 'Round Side Table', path: '/assets/uzvi/side-table.jpg' },
  { label: 'Minimal Accent Chair', path: '/assets/uzvi/chair.jpg' },
  { label: 'Decorative Home Vase', path: '/assets/uzvi/home-decor.jpg' },
];

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  brandConfig,
  products,
  orders,
  onClose,
  onSaveBrandConfig,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'brand' | 'products' | 'orders'>(
    'brand'
  );

  // Brand Config Form State
  const [companyName, setCompanyName] = useState(brandConfig.companyName);
  const [companySubtitle, setCompanySubtitle] = useState(
    brandConfig.companySubtitle
  );
  const [topBannerText, setTopBannerText] = useState(brandConfig.topBannerText);
  const [heroTitle, setHeroTitle] = useState(brandConfig.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(brandConfig.heroSubtitle);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    String(brandConfig.freeShippingThreshold)
  );
  const [supportPhone, setSupportPhone] = useState(brandConfig.supportPhone);
  const [showroomAddress, setShowroomAddress] = useState(
    brandConfig.showroomAddress
  );
  const [brandMessage, setBrandMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // New Product Form State
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] =
    useState<ProductCategory>('Wooden Lamp');
  const [prodPrice, setProdPrice] = useState('6500');
  const [prodOldPrice, setProdOldPrice] = useState('7800');
  const [prodTag, setProdTag] = useState('New');
  const [prodImage, setProdImage] = useState(STUDIO_IMAGE_PRESETS[0].path);
  const [prodMessage, setProdMessage] = useState<string | null>(null);

  useEffect(() => {
    setCompanyName(brandConfig.companyName);
    setCompanySubtitle(brandConfig.companySubtitle);
    setTopBannerText(brandConfig.topBannerText);
    setHeroTitle(brandConfig.heroTitle);
    setHeroSubtitle(brandConfig.heroSubtitle);
    setFreeShippingThreshold(String(brandConfig.freeShippingThreshold));
    setSupportPhone(brandConfig.supportPhone);
    setShowroomAddress(brandConfig.showroomAddress);
  }, [brandConfig]);

  if (!isOpen) return null;

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBrandConfig({
      companyName,
      companySubtitle,
      topBannerText,
      heroTitle,
      heroSubtitle,
      freeShippingThreshold: Number(freeShippingThreshold),
      supportPhone,
      showroomAddress,
      craftHeading: brandConfig.craftHeading,
      currencySymbol: brandConfig.currencySymbol,
      supportEmail: brandConfig.supportEmail,
      websiteUrl: brandConfig.websiteUrl,
    });

    if (!result.valid || !result.sanitized) {
      setBrandMessage({
        type: 'error',
        text: result.error || 'Invalid brand configuration.',
      });
      return;
    }

    onSaveBrandConfig(result.sanitized);
    setBrandMessage({
      type: 'success',
      text: `Company name updated to "${result.sanitized.companyName}" across the storefront.`,
    });
  };

  const handleResetDefaultBrand = () => {
    setCompanyName(DEFAULT_BRAND_CONFIG.companyName);
    setCompanySubtitle(DEFAULT_BRAND_CONFIG.companySubtitle);
    setTopBannerText(DEFAULT_BRAND_CONFIG.topBannerText);
    setHeroTitle(DEFAULT_BRAND_CONFIG.heroTitle);
    setHeroSubtitle(DEFAULT_BRAND_CONFIG.heroSubtitle);
    setFreeShippingThreshold(String(DEFAULT_BRAND_CONFIG.freeShippingThreshold));
    setSupportPhone(DEFAULT_BRAND_CONFIG.supportPhone);
    setShowroomAddress(DEFAULT_BRAND_CONFIG.showroomAddress);
    onSaveBrandConfig(DEFAULT_BRAND_CONFIG);
    setBrandMessage({
      type: 'success',
      text: 'Reset to default company name: Qatar Elite Decor.',
    });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(prodPrice);
    const numericOld = Number(prodOldPrice) || Math.round(numericPrice * 1.15);
    if (!prodName.trim() || Number.isNaN(numericPrice) || numericPrice <= 0) {
      setProdMessage('Please enter a valid product title and positive price.');
      return;
    }

    const newItem: Product = {
      id: `prod-custom-${Date.now()}`,
      name: prodName.trim(),
      maker: brandConfig.companyName,
      category: prodCategory,
      price: numericPrice,
      oldPrice: numericOld,
      rating: 4.9,
      material: 'Solid Seasoned Timber & Natural Finish',
      dimensions: '120 × 60 × 75 cm',
      leadTime: 'Delivery in 3–5 days',
      inStock: true,
      featuredTag: prodTag.trim() || 'New',
      image: prodImage,
      description: `Handcrafted by ${brandConfig.companyName} artisans for modern Bangladesh homes.`,
      woodFinishes: ['Natural Walnut', 'Warm Teak'],
    };

    onAddProduct(newItem);
    setProdName('');
    setProdMessage(`Added "${newItem.name}" to the storefront catalog.`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs"
    >
      <div className="w-full h-full sm:h-auto sm:max-w-5xl rounded-none sm:rounded-2xl bg-[#F7F3ED] border-0 sm:border border-[#75472F]/30 shadow-2xl overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh]">
        {/* Admin Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-5 bg-[#183D32] text-[#F7F3ED] flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D4A45B] font-bold">
              Administration · {brandConfig.companyName}
            </span>
            <h2
              id="admin-panel-title"
              className="font-display text-xl sm:text-2xl md:text-3xl font-bold"
            >
              Admin Control Panel
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Admin Panel"
            className="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#F7F3ED]/15 hover:bg-[#F7F3ED]/25 text-xs font-semibold text-[#F7F3ED] inline-flex items-center gap-1.5 transition-colors min-h-[36px]"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Storefront</span>
          </button>
        </div>

        {/* Admin Navigation Tabs - Mobile Swipeable */}
        <div
          role="tablist"
          aria-label="Admin sections"
          className="px-3 py-2 sm:px-6 sm:py-3 bg-[#EFE9DF] border-b border-[#75472F]/15 flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'brand'}
            onClick={() => setActiveTab('brand')}
            className={`cursor-pointer shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors min-h-[36px] ${
              activeTab === 'brand'
                ? 'bg-[#183D32] text-white'
                : 'text-[#1C1917]/75 hover:bg-[#F7F3ED]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Brand & Company</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
            className={`cursor-pointer shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors min-h-[36px] ${
              activeTab === 'products'
                ? 'bg-[#183D32] text-white'
                : 'text-[#1C1917]/75 hover:bg-[#F7F3ED]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products ({products.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
            className={`cursor-pointer shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors min-h-[36px] ${
              activeTab === 'orders'
                ? 'bg-[#183D32] text-white'
                : 'text-[#1C1917]/75 hover:bg-[#F7F3ED]'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>
        </div>

        {/* Admin Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {activeTab === 'brand' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              <form
                onSubmit={handleBrandSubmit}
                className="lg:col-span-7 space-y-3.5 sm:space-y-4"
              >
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">
                    Company Name & Storefront Identity
                  </h3>
                  <p className="text-xs text-[#1C1917]/70 mt-1">
                    Default company name is <strong>Qatar Elite Decor</strong>.
                    Updating here updates the brand logo, hero, footer, and WhatsApp receipts instantly.
                  </p>
                </div>

                {brandMessage && (
                  <div
                    role="status"
                    className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                      brandMessage.type === 'success'
                        ? 'bg-[#183D32]/10 text-[#183D32] border border-[#183D32]/25'
                        : 'bg-red-900/10 text-red-900 border border-red-800/30'
                    }`}
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{brandMessage.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor="admin-company-name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#75472F] mb-1"
                    >
                      Company Name (Default: Qatar Elite Decor)
                    </label>
                    <input
                      id="admin-company-name"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Qatar Elite Decor"
                      className="w-full h-12 sm:h-11 px-4 text-[16px] sm:text-sm font-semibold rounded-xl bg-white border border-[#D8CEBE] text-[#1C1917] shadow-xs focus:outline-none focus:border-[#183D32] focus:ring-2 focus:ring-[#183D32]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-company-subtitle"
                      className="block text-xs font-bold uppercase tracking-wider text-[#75472F] mb-1"
                    >
                      Logo Subtitle
                    </label>
                    <input
                      id="admin-company-subtitle"
                      type="text"
                      value={companySubtitle}
                      onChange={(e) => setCompanySubtitle(e.target.value)}
                      placeholder="HOME & LIVING"
                      className="w-full h-11 px-3.5 text-sm rounded-lg bg-white border border-[#75472F]/30 text-[#1C1917] focus:outline-none focus:border-[#183D32]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="admin-top-banner"
                    className="block text-xs font-bold text-[#1C1917] mb-1"
                  >
                    Top Announcement Bar
                  </label>
                  <input
                    id="admin-top-banner"
                    type="text"
                    value={topBannerText}
                    onChange={(e) => setTopBannerText(e.target.value)}
                    className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25 text-[#1C1917]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-hero-title"
                    className="block text-xs font-bold text-[#1C1917] mb-1"
                  >
                    Hero Primary Headline
                  </label>
                  <input
                    id="admin-hero-title"
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25 text-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor="admin-support-phone"
                      className="block text-xs font-bold text-[#1C1917] mb-1"
                    >
                      Concierge Phone
                    </label>
                    <input
                      id="admin-support-phone"
                      type="text"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25 text-[#1C1917]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="admin-showroom-address"
                      className="block text-xs font-bold text-[#1C1917] mb-1"
                    >
                      Showroom Location
                    </label>
                    <input
                      id="admin-showroom-address"
                      type="text"
                      value={showroomAddress}
                      onChange={(e) => setShowroomAddress(e.target.value)}
                      className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25 text-[#1C1917]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    type="submit"
                    className="cursor-pointer px-5 py-2.5 rounded-lg bg-[#183D32] hover:bg-[#75472F] text-white text-xs font-bold transition-colors min-h-[42px] flex items-center justify-center"
                  >
                    Save Brand Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDefaultBrand}
                    className="cursor-pointer px-4 py-2.5 rounded-lg bg-[#EFE9DF] hover:bg-[#E5DDD0] text-[#1C1917] text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default (Qatar Elite Decor)</span>
                  </button>
                </div>
              </form>

              {/* Right Column: Active Color & Design System Preview */}
              <div className="lg:col-span-5 rounded-xl border border-[#75472F]/20 bg-[#EFE9DF]/70 p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#1C1917]">
                  কালার ও ডিজাইন সিস্টেম
                </h3>
                <p className="text-xs text-[#1C1917]/75 font-bangla">
                  অ্যাপে ব্যবহৃত চারটি সিগনেচার আর্কিটেকচারাল কালার টোকেন:
                </p>

                <div className="space-y-2.5">
                  {DESIGN_SYSTEM_COLORS.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-[#75472F]/15"
                    >
                      <span
                        style={{ backgroundColor: c.hex }}
                        className="w-9 h-9 rounded-md border border-black/15 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1C1917]">
                            {c.name}
                          </span>
                          <span className="font-mono-tabular text-xs font-bold text-[#75472F]">
                            {c.hex}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#183D32] font-bangla truncate">
                          {c.bengaliLabel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Add New Product Form */}
              <form
                onSubmit={handleCreateProduct}
                className="lg:col-span-5 space-y-3 p-4 sm:p-5 rounded-xl bg-[#EFE9DF]/70 border border-[#75472F]/20 h-fit"
              >
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#1C1917]">
                  Add New Furniture Piece
                </h3>

                {prodMessage && (
                  <div className="p-2.5 rounded-lg bg-[#183D32]/10 text-[#183D32] text-xs font-medium">
                    {prodMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="new-prod-name"
                    className="block text-xs font-bold text-[#1C1917] mb-1"
                  >
                    Product Name
                  </label>
                  <input
                    id="new-prod-name"
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Carved Teak Dressing Table"
                    className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label
                      htmlFor="new-prod-cat"
                      className="block text-xs font-bold text-[#1C1917] mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="new-prod-cat"
                      value={prodCategory}
                      onChange={(e) =>
                        setProdCategory(e.target.value as ProductCategory)
                      }
                      className="w-full h-10 px-2.5 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="new-prod-tag"
                      className="block text-xs font-bold text-[#1C1917] mb-1"
                    >
                      Badge Tag
                    </label>
                    <input
                      id="new-prod-tag"
                      type="text"
                      value={prodTag}
                      onChange={(e) => setProdTag(e.target.value)}
                      placeholder="Bestseller / New"
                      className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label
                      htmlFor="new-prod-price"
                      className="block text-xs font-bold text-[#1C1917] mb-1"
                    >
                      Price ({brandConfig.currencySymbol})
                    </label>
                    <input
                      id="new-prod-price"
                      type="number"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25 font-mono-tabular"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="new-prod-old-price"
                      className="block text-xs font-bold text-[#1C1917] mb-1"
                    >
                      Compare Price
                    </label>
                    <input
                      id="new-prod-old-price"
                      type="number"
                      value={prodOldPrice}
                      onChange={(e) => setProdOldPrice(e.target.value)}
                      className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25 font-mono-tabular"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="new-prod-image"
                    className="block text-xs font-bold text-[#1C1917] mb-1"
                  >
                    Image Preset
                  </label>
                  <select
                    id="new-prod-image"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    className="w-full h-10 px-2.5 text-xs sm:text-sm rounded-lg bg-white border border-[#75472F]/25"
                  >
                    {STUDIO_IMAGE_PRESETS.map((preset) => (
                      <option key={preset.path} value={preset.path}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full h-11 rounded-lg bg-[#183D32] hover:bg-[#75472F] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Piece to Catalog</span>
                </button>
              </form>

              {/* Existing Products List */}
              <div className="lg:col-span-7 space-y-2.5">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#1C1917]">
                  Active Catalog ({products.length})
                </h3>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-[#75472F]/15"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-lg object-cover bg-[#E5DDD0] shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#292720] truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-[#75472F] font-mono-tabular">
                            {item.category} ·{' '}
                            <span className="font-bold">
                              {formatBDT(item.price, brandConfig.currencySymbol)}
                            </span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onDeleteProduct(item.id)}
                        aria-label={`Delete ${item.name}`}
                        className="cursor-pointer p-2 text-[#292720]/40 hover:text-red-700 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">
                Customer Orders Queue
              </h3>
              {orders.length === 0 ? (
                <p className="text-xs sm:text-sm text-[#777777]">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3.5 sm:p-4 rounded-xl border border-[#75472F]/20 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] text-[#75472F] font-bold">
                          <span className="font-mono-tabular">#{ord.id}</span>
                          <span aria-hidden="true">·</span>
                          <span>{ord.createdAt}</span>
                          <span aria-hidden="true">·</span>
                          <span>{ord.paymentMethod}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#292720]">
                          {ord.customerName} — {ord.phone}
                        </h4>
                        <p className="text-[11px] text-[#777777]">{ord.address}</p>
                        <p className="text-xs text-[#183D32] font-semibold pt-0.5">
                          {ord.items
                            .map(
                              (i) =>
                                `${i.quantity}× ${i.productName}`
                            )
                            .join(' · ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono-tabular text-sm font-bold text-[#183D32]">
                          {formatBDT(ord.total, brandConfig.currencySymbol)}
                        </span>

                        <select
                          aria-label={`Order status for ${ord.id}`}
                          value={ord.status}
                          onChange={(e) =>
                            onUpdateOrderStatus(
                              ord.id,
                              e.target.value as Order['status']
                            )
                          }
                          className="h-9 px-2 text-xs font-bold rounded-lg bg-[#F7F3ED] border border-[#75472F]/30 text-[#1C1917]"
                        >
                          <option value="Preparing Shipment">Preparing</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
