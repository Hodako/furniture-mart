import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Package,
  ClipboardList,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';
import {
  BrandConfig,
  CATEGORIES_LIST,
  DEFAULT_BRAND_CONFIG,
  Order,
  Product,
  ProductCategory,
  formatBDT,
  validateBrandConfig,
} from '../data/storeLogic';

interface AdminPageProps {
  brandConfig: BrandConfig;
  products: Product[];
  orders: Order[];
  onSaveBrandConfig: (newConfig: BrandConfig) => void;
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onNotify: (msg: string) => void;
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

export const AdminPage: React.FC<AdminPageProps> = ({
  brandConfig,
  products,
  orders,
  onSaveBrandConfig,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<'brand' | 'products' | 'orders'>('brand');

  // Brand Config Form
  const [companyName, setCompanyName] = useState(brandConfig.companyName);
  const [companySubtitle, setCompanySubtitle] = useState(brandConfig.companySubtitle);
  const [heroTitle, setHeroTitle] = useState(brandConfig.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(brandConfig.heroSubtitle);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    String(brandConfig.freeShippingThreshold)
  );
  const [supportPhone, setSupportPhone] = useState(brandConfig.supportPhone);
  const [showroomAddress, setShowroomAddress] = useState(brandConfig.showroomAddress);
  const [brandStatus, setBrandStatus] = useState<string | null>(null);

  // New Product Form
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Wooden Lamp');
  const [prodPrice, setProdPrice] = useState('6500');
  const [prodOldPrice, setProdOldPrice] = useState('7800');
  const [prodTag, setProdTag] = useState('New');
  const [prodImage, setProdImage] = useState(STUDIO_IMAGE_PRESETS[0].path);

  useEffect(() => {
    setCompanyName(brandConfig.companyName);
    setCompanySubtitle(brandConfig.companySubtitle);
    setHeroTitle(brandConfig.heroTitle);
    setHeroSubtitle(brandConfig.heroSubtitle);
    setFreeShippingThreshold(String(brandConfig.freeShippingThreshold));
    setSupportPhone(brandConfig.supportPhone);
    setShowroomAddress(brandConfig.showroomAddress);
  }, [brandConfig]);

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BrandConfig = {
      ...brandConfig,
      companyName: companyName.trim() || 'Uzvi Furniture',
      companySubtitle: companySubtitle.trim() || 'HOME & LIVING',
      heroTitle: heroTitle.trim() || 'Make Your Home More Beautiful',
      heroSubtitle:
        heroSubtitle.trim() ||
        'Thoughtfully selected furniture and timeless details for a home that feels like you.',
      freeShippingThreshold: Math.max(0, parseInt(freeShippingThreshold, 10) || 50000),
      supportPhone: supportPhone.trim() || '+880 1711-849200',
      showroomAddress: showroomAddress.trim() || 'Bangladesh',
    };

    const val = validateBrandConfig(updated);
    if (!val.valid) {
      setBrandStatus(val.error || 'Invalid configuration');
      return;
    }

    onSaveBrandConfig(updated);
    setBrandStatus('Settings saved successfully!');
    onNotify(`Company name updated to ${updated.companyName}`);
    setTimeout(() => setBrandStatus(null), 3000);
  };

  const handleResetToDefault = () => {
    onSaveBrandConfig(DEFAULT_BRAND_CONFIG);
    setCompanyName(DEFAULT_BRAND_CONFIG.companyName);
    setCompanySubtitle(DEFAULT_BRAND_CONFIG.companySubtitle);
    setHeroTitle(DEFAULT_BRAND_CONFIG.heroTitle);
    setHeroSubtitle(DEFAULT_BRAND_CONFIG.heroSubtitle);
    setFreeShippingThreshold(String(DEFAULT_BRAND_CONFIG.freeShippingThreshold));
    setSupportPhone(DEFAULT_BRAND_CONFIG.supportPhone);
    setShowroomAddress(DEFAULT_BRAND_CONFIG.showroomAddress);
    setBrandStatus('Reset to default brand identity (Uzvi Furniture)');
    onNotify('Reset to default Uzvi Furniture');
    setTimeout(() => setBrandStatus(null), 3000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      onNotify('Product name is required');
      return;
    }

    const priceNum = parseInt(prodPrice, 10) || 1000;
    const oldPriceNum = prodOldPrice ? parseInt(prodOldPrice, 10) : priceNum;

    const newProd: Product = {
      id: `p-${Date.now()}`,
      name: prodName.trim(),
      maker: 'Uzvi Studio',
      category: prodCategory,
      price: priceNum,
      oldPrice: oldPriceNum,
      rating: 5.0,
      material: 'Solid Kiln-Dried Timber',
      dimensions: 'Custom Studio Dimensions',
      leadTime: '3-5 Business Days',
      inStock: true,
      featuredTag: prodTag || 'New',
      image: prodImage,
      description: `${prodName.trim()} crafted by Uzvi Furniture artisans from seasoned hardwood.`,
      woodFinishes: ['Natural Walnut', 'Burma Teak Finish', 'Matte Black Wood'],
    };

    onAddProduct(newProd);
    setProdName('');
    onNotify(`Added ${newProd.name} to catalog!`);
  };

  return (
    <div className="py-6 sm:py-10 bg-[#F7F3ED] min-h-[85vh]">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Navigation Breadcrumb & Privacy Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E8E0D5]">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183D32] hover:text-[#75472F] bg-white border border-[#E8E0D5] px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
            <div>
              <h1 className="font-display font-bold text-xl sm:text-2xl text-[#292720]">
                Admin Control Dashboard
              </h1>
              <span className="text-[11px] text-[#777777]">
                Private Management Route (/whoisadmin) · Hidden from public frontend navigation
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#183D32]/10 text-[#183D32] px-3 py-1.5 rounded-full text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-[#183D32]" />
            <span>Storefront: {brandConfig.companyName}</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 mb-6 border-b border-[#E8E0D5] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'brand'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Brand Identity & Name</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Orders Queue ({orders.length})</span>
          </button>
        </div>

        {/* Tab 1: Brand & Company Settings */}
        {activeTab === 'brand' && (
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 max-w-3xl">
            <div className="mb-6">
              <h2 className="font-display font-bold text-xl text-[#292720]">
                Company Name & Storefront Identity
              </h2>
              <p className="text-xs text-[#777777] mt-1">
                Default company name is <strong>Uzvi Furniture</strong>. Updating here propagates across the
                entire website, navigation logo, hero headline, and WhatsApp receipts instantly.
              </p>
            </div>

            {brandStatus && (
              <div className="p-3 mb-5 rounded-lg bg-[#183D32]/10 text-[#183D32] text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{brandStatus}</span>
              </div>
            )}

            <form onSubmit={handleSaveBrand} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                  Company Name (Default: Uzvi Furniture)
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-sm font-semibold text-[#292720] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                  Company Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={companySubtitle}
                  onChange={(e) => setCompanySubtitle(e.target.value)}
                  className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                  Hero Primary Headline
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full p-3 border border-[#E8E0D5] rounded-lg text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                    Free Delivery Threshold (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(e.target.value)}
                    className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                    Showroom Hotline
                  </label>
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                  Showroom Location Address
                </label>
                <input
                  type="text"
                  value={showroomAddress}
                  onChange={(e) => setShowroomAddress(e.target.value)}
                  className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white py-3 px-6 rounded-lg text-xs font-bold transition-colors flex-1"
                >
                  Save Brand Settings
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="cursor-pointer bg-[#F7F3ED] hover:bg-[#E8E0D5] text-[#75472F] border border-[#E8E0D5] py-3 px-5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default (Uzvi Furniture)</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Products Manager */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Add Product Form */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8">
              <h2 className="font-display font-bold text-xl text-[#292720] mb-4">
                Add New Furniture Piece to Store
              </h2>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      placeholder="e.g. Minimalist Teak Credenza"
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Category *
                    </label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as ProductCategory)}
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Price in BDT (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Original Compare Price (৳)
                    </label>
                    <input
                      type="number"
                      value={prodOldPrice}
                      onChange={(e) => setProdOldPrice(e.target.value)}
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Badge Tag
                    </label>
                    <select
                      value={prodTag}
                      onChange={(e) => setProdTag(e.target.value)}
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      <option value="New">New</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Popular">Popular</option>
                      <option value="Handcrafted">Handcrafted</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292720] mb-1">
                    Select Photographic Preset
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                    {STUDIO_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => setProdImage(preset.path)}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 p-0.5 transition-all text-left ${
                          prodImage === preset.path
                            ? 'border-[#183D32] ring-2 ring-[#183D32]/20'
                            : 'border-[#E8E0D5] hover:border-[#75472F]'
                        }`}
                      >
                        <div className="aspect-square w-full overflow-hidden rounded bg-[#F7F3ED]">
                          <img
                            src={preset.path}
                            alt={preset.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="block text-[9px] text-[#292720] truncate mt-1 text-center font-medium">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white py-2.5 px-5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Product to Store</span>
                </button>
              </form>
            </div>

            {/* Existing Products List */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8">
              <h3 className="font-display font-bold text-lg text-[#292720] mb-4">
                Active Catalog Inventory ({products.length} Items)
              </h3>
              <div className="divide-y divide-[#E8E0D5]">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-[#F7F3ED]"
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-[#292720]">
                          {p.name}
                        </h4>
                        <span className="text-[#75472F] font-medium">{p.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono-tabular font-bold text-sm text-[#183D32]">
                        ৳{p.price.toLocaleString('en-US')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p.id)}
                        className="cursor-pointer text-[#999999] hover:text-red-600 p-1.5 transition-colors"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Orders Queue */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl text-[#292720] mb-4">
              Customer Orders Queue ({orders.length})
            </h2>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-4 rounded-xl border border-[#E8E0D5] bg-[#FFFDF9] space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E0D5] pb-2">
                      <div>
                        <span className="font-bold text-sm text-[#183D32]">
                          Order #{o.id}
                        </span>
                        <span className="text-xs text-[#777777] ml-2">({o.createdAt})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            onUpdateOrderStatus(o.id, e.target.value as Order['status'])
                          }
                          className="text-xs font-semibold p-1.5 border border-[#E8E0D5] rounded bg-white text-[#183D32]"
                        >
                          <option value="Preparing Shipment">Preparing Shipment</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-[#555555] grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <strong>Customer:</strong> {o.customerName} ({o.phone})
                        <div className="text-[#777777]">{o.address}</div>
                      </div>
                      <div className="sm:text-right">
                        <strong>Payment:</strong> {o.paymentMethod}
                        <div className="font-bold text-sm text-[#183D32]">
                          Total: {formatBDT(o.total)}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-[#777777]">
                      {o.items.map((it, idx) => (
                        <span key={idx} className="mr-3">
                          {it.productName} ({it.woodFinish}) × {it.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#777777] py-6 text-center">No orders found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
