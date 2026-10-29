import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Edit3,
  Search,
  ExternalLink,
  MessageCircle,
  Phone,
  MapPin,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Eye,
  Download,
  Upload,
  Database,
  X,
  Printer,
  Send,
  MessageSquare,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  UserCheck,
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
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onImportData: (data: {
    brandConfig?: BrandConfig;
    products?: Product[];
    orders?: Order[];
  }) => void;
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
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onUpdateOrderStatus,
  onDeleteOrder,
  onImportData,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'whatsapp' | 'brand' | 'backup'
  >('overview');

  // Brand Form State
  const [companyName, setCompanyName] = useState(brandConfig.companyName);
  const [companySubtitle, setCompanySubtitle] = useState(brandConfig.companySubtitle);
  const [heroTitle, setHeroTitle] = useState(brandConfig.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(brandConfig.heroSubtitle);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    String(brandConfig.freeShippingThreshold)
  );
  const [supportPhone, setSupportPhone] = useState(brandConfig.supportPhone);
  const [showroomAddress, setShowroomAddress] = useState(brandConfig.showroomAddress);
  const [supportEmail, setSupportEmail] = useState(
    brandConfig.supportEmail || 'care@uzvifurniture.com'
  );
  const [whatsappNumber, setWhatsappNumber] = useState(
    brandConfig.whatsappNumber || brandConfig.supportPhone
  );
  const [whatsappWidgetEnabled, setWhatsappWidgetEnabled] = useState(
    brandConfig.whatsappWidgetEnabled !== false
  );
  const [whatsappGreeting, setWhatsappGreeting] = useState(
    brandConfig.whatsappGreeting ||
      'Hello! Welcome to Qatar Elite Decor. How may our concierge assist your luxury interior or bespoke furniture selection today?'
  );
  const [brandStatus, setBrandStatus] = useState<string | null>(null);

  // Products Search & Filters
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<
    'All' | ProductCategory
  >('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  // Add Product Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Wooden Lamp');
  const [prodPrice, setProdPrice] = useState('6500');
  const [prodOldPrice, setProdOldPrice] = useState('7800');
  const [prodTag, setProdTag] = useState('New');
  const [prodImage, setProdImage] = useState(STUDIO_IMAGE_PRESETS[0].path);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [prodMaterial, setProdMaterial] = useState('Solid Seasoned Teak & Rosewood');
  const [prodDimensions, setProdDimensions] = useState('L 48" x W 24" x H 30"');
  const [prodLeadTime, setProdLeadTime] = useState('3-5 Business Days');
  const [prodDescription, setProdDescription] = useState('');

  // Edit Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Orders Filter & Search
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | Order['status']>('All');

  // Printable Invoice State
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // WhatsApp Studio / Messenger State
  const [waRecipientPhone, setWaRecipientPhone] = useState('');
  const [waRecipientName, setWaRecipientName] = useState('');
  const [waCustomMessage, setWaCustomMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'dispatch' | 'confirm' | 'customQuote' | 'paymentReminder' | 'freeform'>('dispatch');

  // Backup file ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCompanyName(brandConfig.companyName);
    setCompanySubtitle(brandConfig.companySubtitle);
    setHeroTitle(brandConfig.heroTitle);
    setHeroSubtitle(brandConfig.heroSubtitle);
    setFreeShippingThreshold(String(brandConfig.freeShippingThreshold));
    setSupportPhone(brandConfig.supportPhone);
    setShowroomAddress(brandConfig.showroomAddress);
    setSupportEmail(brandConfig.supportEmail || 'care@qatarelitedecor.com');
    setWhatsappNumber(brandConfig.whatsappNumber || brandConfig.supportPhone);
    setWhatsappWidgetEnabled(brandConfig.whatsappWidgetEnabled !== false);
    setWhatsappGreeting(
      brandConfig.whatsappGreeting ||
        'Hello! Welcome to Qatar Elite Decor. How may our concierge assist your luxury interior or bespoke furniture selection today?'
    );
  }, [brandConfig]);

  // Metrics Calculation
  const metrics = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== 'Cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const avgOrder = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
    const inStockCount = products.filter((p) => p.inStock).length;
    const outOfStockCount = products.length - inStockCount;
    const preparingCount = orders.filter((o) => o.status === 'Preparing Shipment').length;
    const inTransitCount = orders.filter((o) => o.status === 'In Transit').length;
    const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

    return {
      totalRevenue,
      avgOrder,
      totalOrders: orders.length,
      inStockCount,
      outOfStockCount,
      preparingCount,
      inTransitCount,
      deliveredCount,
    };
  }, [orders, products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.material.toLowerCase().includes(productSearch.toLowerCase());
      const matchCategory =
        productCategoryFilter === 'All' || p.category === productCategoryFilter;
      const matchStock =
        stockFilter === 'all' ||
        (stockFilter === 'inStock' && p.inStock) ||
        (stockFilter === 'outOfStock' && !p.inStock);
      return matchSearch && matchCategory && matchStock;
    });
  }, [products, productSearch, productCategoryFilter, stockFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = orderSearch.toLowerCase();
      const matchSearch =
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q);
      const matchStatus =
        orderStatusFilter === 'All' || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Save Brand
  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BrandConfig = {
      ...brandConfig,
      companyName: companyName.trim() || 'Qatar Elite Decor',
      companySubtitle: companySubtitle.trim() || 'LUXURY LIVING & BESPOKE INTERIORS',
      heroTitle: heroTitle.trim() || 'Make Your Space Extraordinary',
      heroSubtitle:
        heroSubtitle.trim() ||
        'Thoughtfully curated luxury furniture and timeless details for a home that embodies prestige.',
      freeShippingThreshold: Math.max(0, parseInt(freeShippingThreshold, 10) || 50000),
      supportPhone: supportPhone.trim() || '+880 1711-849200',
      showroomAddress: showroomAddress.trim() || 'Doha, Qatar',
      supportEmail: supportEmail.trim() || 'care@qatarelitedecor.com',
      whatsappNumber: whatsappNumber.trim() || supportPhone.trim(),
      whatsappWidgetEnabled,
      whatsappGreeting: whatsappGreeting.trim(),
    };

    const val = validateBrandConfig(updated);
    if (!val.valid) {
      setBrandStatus(val.error || 'Invalid configuration');
      return;
    }

    onSaveBrandConfig(updated);
    setBrandStatus('Settings saved successfully!');
    onNotify(`Brand updated: ${updated.companyName}`);
    setTimeout(() => setBrandStatus(null), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset brand settings back to Qatar Elite Decor original defaults?')) {
      onSaveBrandConfig(DEFAULT_BRAND_CONFIG);
      setCompanyName(DEFAULT_BRAND_CONFIG.companyName);
      setCompanySubtitle(DEFAULT_BRAND_CONFIG.companySubtitle);
      setHeroTitle(DEFAULT_BRAND_CONFIG.heroTitle);
      setHeroSubtitle(DEFAULT_BRAND_CONFIG.heroSubtitle);
      setFreeShippingThreshold(String(DEFAULT_BRAND_CONFIG.freeShippingThreshold));
      setSupportPhone(DEFAULT_BRAND_CONFIG.supportPhone);
      setShowroomAddress(DEFAULT_BRAND_CONFIG.showroomAddress);
      setSupportEmail(DEFAULT_BRAND_CONFIG.supportEmail);
      setWhatsappNumber(DEFAULT_BRAND_CONFIG.whatsappNumber || DEFAULT_BRAND_CONFIG.supportPhone);
      setWhatsappWidgetEnabled(true);
      setWhatsappGreeting(DEFAULT_BRAND_CONFIG.whatsappGreeting || '');
      setBrandStatus('Reset to default brand identity');
      onNotify('Brand reset to default Qatar Elite Decor');
      setTimeout(() => setBrandStatus(null), 3000);
    }
  };

  // Create Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      onNotify('Product name is required');
      return;
    }

    const priceNum = parseInt(prodPrice, 10) || 1000;
    const oldPriceNum = prodOldPrice ? parseInt(prodOldPrice, 10) : priceNum;
    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : prodImage;

    const newProd: Product = {
      id: `p-${Date.now()}`,
      name: prodName.trim(),
      maker: `${brandConfig.companyName} Studio`,
      category: prodCategory,
      price: priceNum,
      oldPrice: oldPriceNum,
      rating: 5.0,
      material: prodMaterial.trim() || 'Solid Seasoned Timber',
      dimensions: prodDimensions.trim() || 'Custom Studio Dimensions',
      leadTime: prodLeadTime.trim() || '3-5 Business Days',
      inStock: true,
      featuredTag: prodTag || 'New',
      image: finalImage,
      description:
        prodDescription.trim() ||
        `${prodName.trim()} handcrafted with precision by ${brandConfig.companyName} artisans.`,
      woodFinishes: ['Natural Walnut', 'Burma Teak Finish', 'Matte Black Wood'],
    };

    onAddProduct(newProd);
    setProdName('');
    setProdDescription('');
    setCustomImageUrl('');
    setShowAddProductModal(false);
    onNotify(`Published "${newProd.name}" to store!`);
  };

  // Save Edited Product
  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
    onNotify(`Saved "${editingProduct.name}"`);
  };

  // Quick Stock Toggle
  const handleToggleStock = (p: Product) => {
    const updated = { ...p, inStock: !p.inStock };
    onUpdateProduct(updated);
    onNotify(`"${p.name}" marked as ${updated.inStock ? 'In Stock' : 'Out of Stock'}`);
  };

  // Quick Price Update directly from table row
  const handleQuickPriceChange = (p: Product, newPriceStr: string) => {
    const priceNum = parseInt(newPriceStr, 10);
    if (!isNaN(priceNum) && priceNum > 0) {
      onUpdateProduct({ ...p, price: priceNum });
      onNotify(`Updated price for "${p.name}" to ${formatBDT(priceNum)}`);
    }
  };

  // WhatsApp Individual Order message
  const handleWhatsAppCustomer = (o: Order) => {
    const cleanPhone = o.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;
    const text = encodeURIComponent(
      `Hello ${o.customerName}! Greetings from ${brandConfig.companyName}.\n\n` +
      `📦 Regarding your Order #${o.id} (Total: ${formatBDT(o.total)}):\n` +
      `Current Status: ${o.status}\n\n` +
      `Items:\n${o.items.map((i) => `• ${i.productName} (${i.woodFinish}) × ${i.quantity}`).join('\n')}\n\n` +
      `Delivery Address: ${o.address}\n\n` +
      `Thank you for choosing ${brandConfig.companyName}!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
  };

  // Populate WhatsApp Studio from Order
  const handlePopulateWhatsAppFromOrder = (o: Order) => {
    setWaRecipientName(o.customerName);
    setWaRecipientPhone(o.phone);
    setWaCustomMessage(
      `Hello ${o.customerName}! Greetings from ${brandConfig.companyName}.\n\n` +
      `Your furniture Order #${o.id} is currently: ${o.status}.\n\n` +
      `Delivery Address: ${o.address}\n` +
      `Total Payable: ${formatBDT(o.total)} (${o.paymentMethod === 'COD' ? 'Cash on Delivery' : 'WhatsApp Verified'})\n\n` +
      `Our delivery team will contact you prior to arrival.`
    );
    setActiveTab('whatsapp');
  };

  // Send WhatsApp from Studio
  const handleSendWhatsAppStudioMessage = () => {
    if (!waRecipientPhone.trim()) {
      onNotify('Recipient phone number is required');
      return;
    }
    const clean = waRecipientPhone.replace(/[^0-9]/g, '');
    const phone = clean.startsWith('88') ? clean : `88${clean}`;
    const text = encodeURIComponent(waCustomMessage.trim());
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    onNotify('Opening WhatsApp chat...');
  };

  // Export Store Backup JSON
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      store: brandConfig.companyName,
      brandConfig,
      products,
      orders,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uzvi-store-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotify('Backup JSON downloaded successfully!');
  };

  // Import Backup JSON
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON structure');
        }
        if (window.confirm('Restore this backup? Existing store data will be updated.')) {
          onImportData({
            brandConfig: parsed.brandConfig,
            products: parsed.products,
            orders: parsed.orders,
          });
        }
      } catch (err) {
        alert('Failed to parse backup file: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="py-5 sm:py-8 bg-[#F7F3ED] min-h-[92vh]">
      <div className="w-[min(1240px,94%)] mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E8E0D5]">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183D32] hover:text-[#75472F] bg-white border border-[#E8E0D5] px-3 py-2 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-[#292720]">
                  Admin Control Dashboard
                </h1>
                <span className="bg-[#183D32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Admin Live
                </span>
              </div>
              <span className="text-[11px] text-[#777777] block mt-0.5">
                Route: <code className="bg-[#EFE9DF] px-1 py-0.5 rounded text-[#183D32] font-semibold">/whoisadmin</code> · Store: {brandConfig.companyName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setShowAddProductModal(true);
                setActiveTab('products');
              }}
              className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className="cursor-pointer bg-[#25D366] hover:bg-[#20BA5A] text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Studio</span>
            </button>

            <Link
              to="/shop"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#75472F] bg-white border border-[#E8E0D5] px-3 py-2 rounded-lg hover:bg-[#F2ECE2] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Shop</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-6 border-b border-[#E8E0D5] pb-2 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
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
            className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
            {metrics.preparingCount > 0 && (
              <span className="bg-[#D4A45B] text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono-tabular">
                {metrics.preparingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'whatsapp'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Messenger</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'brand'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Brand & Chat Widget</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'backup'
                ? 'bg-[#183D32] text-white shadow-xs'
                : 'bg-white text-[#292720] hover:bg-[#F2ECE2]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Backup & Export</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E0D5] shadow-xs">
                <div className="flex items-center justify-between text-[#777777] mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
                  <DollarSign className="w-4 h-4 text-[#183D32]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-[#183D32]">
                  {formatBDT(metrics.totalRevenue)}
                </div>
                <span className="text-[11px] text-[#777777] mt-1 block">
                  Across {orders.length} orders
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E0D5] shadow-xs">
                <div className="flex items-center justify-between text-[#777777] mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Orders Queue</span>
                  <ClipboardList className="w-4 h-4 text-[#75472F]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#292720]">
                  {orders.length}
                </div>
                <div className="flex gap-2 text-[10px] font-semibold mt-1">
                  <span className="text-amber-700">{metrics.preparingCount} prep</span>
                  <span>•</span>
                  <span className="text-blue-700">{metrics.inTransitCount} transit</span>
                  <span>•</span>
                  <span className="text-emerald-700">{metrics.deliveredCount} done</span>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E0D5] shadow-xs">
                <div className="flex items-center justify-between text-[#777777] mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Catalog Inventory</span>
                  <Package className="w-4 h-4 text-[#183D32]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#292720]">
                  {products.length} Items
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                  {metrics.inStockCount} in stock ({metrics.outOfStockCount} out of stock)
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E0D5] shadow-xs">
                <div className="flex items-center justify-between text-[#777777] mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Avg Order Value</span>
                  <TrendingUp className="w-4 h-4 text-[#D4A45B]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-[#292720]">
                  {formatBDT(metrics.avgOrder)}
                </div>
                <span className="text-[11px] text-[#777777] mt-1 block">
                  Free delivery over {formatBDT(brandConfig.freeShippingThreshold)}
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 sm:p-6 space-y-4">
                <h3 className="font-display font-bold text-base text-[#292720] border-b border-[#E8E0D5] pb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProductModal(true);
                      setActiveTab('products');
                    }}
                    className="w-full text-left p-3 rounded-xl bg-[#F7F3ED] hover:bg-[#EFE9DF] transition-colors flex items-center justify-between text-xs font-bold text-[#183D32]"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Furniture Piece
                    </span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('whatsapp')}
                    className="w-full text-left p-3 rounded-xl bg-[#F7F3ED] hover:bg-[#EFE9DF] transition-colors flex items-center justify-between text-xs font-bold text-[#25D366]"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Send WhatsApp Dispatch Notice
                    </span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="w-full text-left p-3 rounded-xl bg-[#F7F3ED] hover:bg-[#EFE9DF] transition-colors flex items-center justify-between text-xs font-bold text-[#75472F]"
                  >
                    <span className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4" />
                      Manage Customer Orders ({orders.length})
                    </span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('brand')}
                    className="w-full text-left p-3 rounded-xl bg-[#F7F3ED] hover:bg-[#EFE9DF] transition-colors flex items-center justify-between text-xs font-bold text-[#292720]"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Brand & Floating Chat Widget
                    </span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E0D5] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
                  <h3 className="font-display font-bold text-base text-[#292720]">
                    Recent Orders ({orders.slice(0, 4).length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#183D32] hover:text-[#75472F]"
                  >
                    View All Orders →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-[#777777] py-6 text-center">No orders placed yet.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 4).map((o) => (
                      <div
                        key={o.id}
                        className="p-3.5 rounded-xl border border-[#E8E0D5] bg-[#FFFDF9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#183D32]">#{o.id}</span>
                            <span className="text-[#777777]">({o.createdAt})</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                o.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : o.status === 'In Transit'
                                  ? 'bg-blue-100 text-blue-800'
                                  : o.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {o.status}
                            </span>
                          </div>
                          <div className="text-[#292720] font-medium mt-1">
                            {o.customerName} · {o.phone}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono-tabular font-bold text-sm text-[#183D32] mr-2">
                            {formatBDT(o.total)}
                          </span>

                          <button
                            type="button"
                            onClick={() => setActiveInvoiceOrder(o)}
                            className="p-2 rounded-lg bg-[#F7F3ED] text-[#75472F] hover:bg-[#EFE9DF] transition-colors"
                            title="Print Invoice"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleWhatsAppCustomer(o)}
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Message on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-4 sm:p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-[#999999] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by furniture title, category, or material..."
                    className="w-full h-10 pl-9 pr-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                  />
                  {productSearch && (
                    <button
                      type="button"
                      onClick={() => setProductSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#999999] hover:text-[#292720]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as any)}
                    className="h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs bg-white text-[#292720] font-medium focus:outline-none focus:border-[#183D32]"
                  >
                    <option value="all">All Stock Status</option>
                    <option value="inStock">In Stock Only</option>
                    <option value="outOfStock">Out of Stock Only</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(true)}
                    className="cursor-pointer h-10 bg-[#183D32] hover:bg-[#75472F] text-white px-4 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset catalog back to initial 20 furniture items? Any custom products will be replaced.')) {
                        onResetProducts();
                      }
                    }}
                    className="cursor-pointer h-10 bg-[#F7F3ED] hover:bg-[#E8E0D5] text-[#75472F] border border-[#E8E0D5] px-3 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                <button
                  type="button"
                  onClick={() => setProductCategoryFilter('All')}
                  className={`px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 ${
                    productCategoryFilter === 'All'
                      ? 'bg-[#183D32] text-white'
                      : 'bg-[#F7F3ED] text-[#292720] hover:bg-[#EFE9DF]'
                  }`}
                >
                  All ({products.length})
                </button>
                {CATEGORIES_LIST.map((c) => {
                  const count = products.filter((p) => p.category === c.name).length;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setProductCategoryFilter(c.name)}
                      className={`px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 ${
                        productCategoryFilter === c.name
                          ? 'bg-[#183D32] text-white'
                          : 'bg-[#F7F3ED] text-[#292720] hover:bg-[#EFE9DF]'
                      }`}
                    >
                      {c.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-[#E8E0D5] flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#292720]">
                  Catalog Inventory ({filteredProducts.length} items)
                </h3>
                <span className="text-xs text-[#777777]">
                  Instant stock toggling & live edit capabilities
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#777777]">
                  No products matched your search or filters.
                </div>
              ) : (
                <div className="divide-y divide-[#E8E0D5]">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 sm:p-4 hover:bg-[#FFFDF9] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover bg-[#F7F3ED] border border-[#E8E0D5] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-[#292720] truncate">
                              {p.name}
                            </h4>
                            {p.featuredTag && (
                              <span className="bg-[#183D32]/10 text-[#183D32] text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {p.featuredTag}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#75472F] font-semibold mt-0.5">
                            {p.category} · {p.material}
                          </div>
                          <div className="text-[11px] text-[#888888] truncate mt-0.5">
                            {p.dimensions}
                          </div>
                        </div>
                      </div>

                      {/* Price, Stock Toggle & Action Buttons */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E0D5]">
                        <div className="text-left sm:text-right">
                          <div className="font-mono-tabular font-bold text-sm text-[#183D32]">
                            ৳{p.price.toLocaleString('en-US')}
                          </div>
                          {p.oldPrice > p.price && (
                            <div className="text-[10px] text-[#999999] line-through font-mono-tabular">
                              ৳{p.oldPrice.toLocaleString('en-US')}
                            </div>
                          )}
                        </div>

                        {/* In Stock Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleStock(p)}
                          className={`cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                          title="Click to toggle stock status"
                        >
                          {p.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                        </button>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/product/${p.id}`}
                            target="_blank"
                            className="p-2 text-[#777777] hover:text-[#183D32] rounded-lg hover:bg-[#F2ECE2] transition-colors"
                            title="View on store"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setEditingProduct(p)}
                            className="p-2 text-[#75472F] hover:text-[#183D32] rounded-lg hover:bg-[#F2ECE2] transition-colors"
                            title="Edit product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete "${p.name}" from catalog?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-2 text-[#999999] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS QUEUE */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-4 sm:p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-[#999999] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by Order ID, customer name, phone, or delivery address..."
                    className="w-full h-10 pl-9 pr-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                  />
                  {orderSearch && (
                    <button
                      type="button"
                      onClick={() => setOrderSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#999999] hover:text-[#292720]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#777777] font-semibold">Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                    className="h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs bg-white text-[#292720] font-semibold focus:outline-none focus:border-[#183D32]"
                  >
                    <option value="All">All Orders ({orders.length})</option>
                    <option value="Preparing Shipment">Preparing Shipment</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
                <h3 className="font-display font-bold text-base text-[#292720]">
                  Customer Orders ({filteredOrders.length})
                </h3>
                <span className="text-xs text-[#777777]">
                  Instant WhatsApp notification, status updating, and invoice printing
                </span>
              </div>

              {filteredOrders.length === 0 ? (
                <p className="text-xs text-[#777777] py-10 text-center">
                  No orders match your filter criteria.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((o) => (
                    <div
                      key={o.id}
                      className="p-4 sm:p-5 rounded-2xl border border-[#E8E0D5] bg-[#FFFDF9] space-y-3.5 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E0D5] pb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-[#183D32] bg-[#183D32]/10 px-2.5 py-1 rounded-md">
                            Order #{o.id}
                          </span>
                          <span className="text-xs text-[#777777]">
                            Placed: {o.createdAt}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EFE9DF] text-[#75472F]">
                            {o.paymentMethod === 'COD' ? 'Cash On Delivery' : 'WhatsApp Verified'}
                          </span>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span className="text-xs text-[#777777] font-semibold">Status:</span>
                          <select
                            value={o.status}
                            onChange={(e) =>
                              onUpdateOrderStatus(o.id, e.target.value as Order['status'])
                            }
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                              o.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : o.status === 'In Transit'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : o.status === 'Cancelled'
                                ? 'bg-red-50 text-red-800 border-red-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Preparing Shipment">🟡 Preparing Shipment</option>
                            <option value="In Transit">🔵 In Transit</option>
                            <option value="Delivered">🟢 Delivered</option>
                            <option value="Cancelled">🔴 Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Details & Actions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#555555]">
                        <div className="space-y-1">
                          <div className="font-semibold text-sm text-[#292720]">
                            {o.customerName}
                          </div>
                          <div className="flex items-center gap-1.5 text-[#183D32] font-semibold">
                            <Phone className="w-3.5 h-3.5" />
                            <a href={`tel:${o.phone}`} className="hover:underline">
                              {o.phone}
                            </a>
                          </div>
                          <div className="flex items-start gap-1.5 text-[#777777]">
                            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>
                              {o.address} {o.postalCode ? `(Postal: ${o.postalCode})` : ''}
                            </span>
                          </div>
                        </div>

                        <div className="md:text-right space-y-1">
                          <div className="text-xs text-[#777777]">
                            Subtotal: {formatBDT(o.subtotal || o.total)} · Shipping: {formatBDT(o.shippingFee || 0)}
                          </div>
                          <div className="text-base font-bold font-mono-tabular text-[#183D32]">
                            Total Amount: {formatBDT(o.total)}
                          </div>

                          <div className="pt-2 flex items-center md:justify-end gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => setActiveInvoiceOrder(o)}
                              className="cursor-pointer bg-white border border-[#E8E0D5] hover:bg-[#F2ECE2] text-[#75472F] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Print Invoice</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handlePopulateWhatsAppFromOrder(o)}
                              className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete Order #${o.id}?`)) {
                                  onDeleteOrder(o.id);
                                }
                              }}
                              className="cursor-pointer text-[#999999] hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Items Purchased List */}
                      <div className="pt-2 border-t border-[#E8E0D5]/70">
                        <span className="text-[11px] font-bold text-[#75472F] uppercase tracking-wider block mb-1.5">
                          Order Items ({o.items.length}):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {o.items.map((it, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-white border border-[#E8E0D5] flex items-center justify-between text-xs"
                            >
                              <div>
                                <span className="font-semibold text-[#292720] block truncate">
                                  {it.productName}
                                </span>
                                <span className="text-[10px] text-[#75472F]">
                                  {it.woodFinish}
                                </span>
                              </div>
                              <span className="font-mono-tabular font-bold text-[#183D32] shrink-0 ml-2">
                                ×{it.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: WHATSAPP MESSENGER & BROADCAST STUDIO */}
        {activeTab === 'whatsapp' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 space-y-5">
              <div className="border-b border-[#E8E0D5] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-[#292720]">
                    WhatsApp Direct Messenger Studio
                  </h2>
                </div>
                <p className="text-xs text-[#777777] mt-1">
                  Dispatch instant order notifications, custom timber quotations, and delivery updates directly to customers.
                </p>
              </div>

              {/* Quick Template Selector */}
              <div>
                <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-2">
                  Choose Ready-to-Send Template:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTemplate('dispatch');
                      setWaCustomMessage(
                        `Hello ${waRecipientName || 'Customer'}! 🚚\n\nYour furniture order from ${brandConfig.companyName} has been DISPATCHED today.\n\nOur delivery and assembly team will contact you prior to arrival at your address.\n\nSupport Hotline: ${brandConfig.supportPhone}`
                      );
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedTemplate === 'dispatch'
                        ? 'border-[#183D32] bg-[#183D32]/5 font-bold text-[#183D32]'
                        : 'border-[#E8E0D5] hover:bg-[#F7F3ED]'
                    }`}
                  >
                    🚚 Dispatch Notice
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTemplate('confirm');
                      setWaCustomMessage(
                        `Hello ${waRecipientName || 'Customer'}! 👋\n\nThank you for choosing ${brandConfig.companyName}. Your solid timber furniture order has been CONFIRMED.\n\nOur master carpenters are inspecting your piece before packaging.\n\nWarm regards,\n${brandConfig.companyName}`
                      );
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedTemplate === 'confirm'
                        ? 'border-[#183D32] bg-[#183D32]/5 font-bold text-[#183D32]'
                        : 'border-[#E8E0D5] hover:bg-[#F7F3ED]'
                    }`}
                  >
                    ✓ Order Confirmed
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTemplate('customQuote');
                      setWaCustomMessage(
                        `Hello ${waRecipientName || 'Customer'}!\n\nRegarding your custom furniture dimensions & finish request:\n\n• Timber: Seasoned Burma Teak / Chittagong Teak\n• Finish: Natural Hand-Rubbed Matte Wax\n• Production Lead Time: 5-7 business days\n\nWould you like us to proceed with crafting your piece?`
                      );
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedTemplate === 'customQuote'
                        ? 'border-[#183D32] bg-[#183D32]/5 font-bold text-[#183D32]'
                        : 'border-[#E8E0D5] hover:bg-[#F7F3ED]'
                    }`}
                  >
                    🛋️ Bespoke Quote
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTemplate('freeform');
                      setWaCustomMessage('');
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedTemplate === 'freeform'
                        ? 'border-[#183D32] bg-[#183D32]/5 font-bold text-[#183D32]'
                        : 'border-[#E8E0D5] hover:bg-[#F7F3ED]'
                    }`}
                  >
                    ✍️ Custom Message
                  </button>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#292720] mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={waRecipientName}
                    onChange={(e) => setWaRecipientName(e.target.value)}
                    placeholder="e.g. Mahfuz Rahman"
                    className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292720] mb-1">
                    Customer WhatsApp Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={waRecipientPhone}
                    onChange={(e) => setWaRecipientPhone(e.target.value)}
                    placeholder="e.g. 01711849200 or +8801711849200"
                    className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                  />
                </div>
              </div>

              {/* Message Composer Area */}
              <div>
                <label className="block text-xs font-bold text-[#292720] mb-1">
                  Message Content
                </label>
                <textarea
                  rows={6}
                  value={waCustomMessage}
                  onChange={(e) => setWaCustomMessage(e.target.value)}
                  placeholder="Type your WhatsApp message text..."
                  className="w-full p-3 border border-[#E8E0D5] rounded-lg text-xs leading-relaxed focus:outline-none focus:border-[#183D32]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#777777]">
                  Opens official WhatsApp Web on desktop or the WhatsApp App on mobile.
                </span>

                <button
                  type="button"
                  onClick={handleSendWhatsAppStudioMessage}
                  className="cursor-pointer bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Quick Customer Order Picker */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 sm:p-6 space-y-4">
              <h3 className="font-display font-bold text-base text-[#292720] border-b border-[#E8E0D5] pb-3 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#183D32]" />
                <span>Select Order Recipient</span>
              </h3>

              <p className="text-xs text-[#777777]">
                Click any customer below to auto-fill their phone and order info:
              </p>

              {orders.length === 0 ? (
                <p className="text-xs text-[#999999] py-4 text-center">No orders found.</p>
              ) : (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {orders.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => handlePopulateWhatsAppFromOrder(o)}
                      className="cursor-pointer w-full text-left p-2.5 rounded-xl border border-[#E8E0D5] bg-[#FFFDF9] hover:bg-[#F2ECE2] transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#183D32]">
                        <span>#{o.id} · {o.customerName}</span>
                        <span className="text-[10px] text-[#777777]">{o.status}</span>
                      </div>
                      <div className="text-[11px] text-[#555555] mt-0.5 truncate">
                        {o.phone} · {formatBDT(o.total)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: BRAND & CHAT WIDGET */}
        {activeTab === 'brand' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="font-display font-bold text-xl text-[#292720]">
                  Company Name, Contact & Floating Chat
                </h2>
                <p className="text-xs text-[#777777] mt-1">
                  Default company name is <strong>Qatar Elite Decor</strong>. Changes sync instantly across the website header, footer, hero section, and floating WhatsApp concierge.
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
                    Company Name (Default: Qatar Elite Decor)
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full h-12 sm:h-11 px-4 border border-[#D8CEBE] rounded-xl text-[16px] sm:text-sm font-semibold text-[#292720] shadow-xs focus:outline-none focus:border-[#183D32] focus:ring-2 focus:ring-[#183D32]/15 transition-all"
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
                    className="w-full h-12 sm:h-11 px-4 border border-[#D8CEBE] rounded-xl text-[16px] sm:text-sm text-[#292720] shadow-xs focus:outline-none focus:border-[#183D32] focus:ring-2 focus:ring-[#183D32]/15 transition-all"
                  />
                </div>

                {/* Floating WhatsApp Widget Settings */}
                <div className="p-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <h4 className="font-bold text-xs text-[#183D32]">
                        Floating WhatsApp Concierge Chat Widget
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => setWhatsappWidgetEnabled(!whatsappWidgetEnabled)}
                      className="cursor-pointer text-[#25D366]"
                    >
                      {whatsappWidgetEnabled ? (
                        <ToggleRight className="w-6 h-6 text-[#25D366]" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-[#999999]" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#292720] mb-1">
                        WhatsApp Support Number
                      </label>
                      <input
                        type="text"
                        inputMode="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+880 1711-849200"
                        className="w-full h-12 sm:h-10 px-4 border border-[#D8CEBE] rounded-xl bg-white text-[16px] sm:text-xs text-[#292720] shadow-xs focus:outline-none focus:border-[#183D32] focus:ring-2 focus:ring-[#183D32]/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#292720] mb-1">
                        Welcome Greeting in Chat
                      </label>
                      <input
                        type="text"
                        value={whatsappGreeting}
                        onChange={(e) => setWhatsappGreeting(e.target.value)}
                        placeholder="Hello! Welcome to Qatar Elite Decor..."
                        className="w-full h-12 sm:h-10 px-4 border border-[#D8CEBE] rounded-xl bg-white text-[16px] sm:text-xs text-[#292720] shadow-xs focus:outline-none focus:border-[#183D32] focus:ring-2 focus:ring-[#183D32]/15 transition-all"
                      />
                    </div>
                  </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-xs font-bold text-[#75472F] uppercase tracking-wider mb-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-sm text-[#292720] focus:outline-none focus:border-[#183D32]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white py-3 px-6 rounded-lg text-xs font-bold transition-colors flex-1 shadow-xs"
                  >
                    Save Brand Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="cursor-pointer bg-[#F7F3ED] hover:bg-[#E8E0D5] text-[#75472F] border border-[#E8E0D5] py-3 px-5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default (Qatar Elite Decor)</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Storefront Identity Preview */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 sm:p-6 space-y-4 shadow-xs">
                <h3 className="font-display font-bold text-base text-[#292720] border-b border-[#E8E0D5] pb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#183D32]" />
                  <span>Live Preview: Store Header</span>
                </h3>

                <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E8E0D5] flex items-center justify-between">
                  <div>
                    <div className="font-display font-black text-lg text-[#183D32] tracking-wider uppercase">
                      {companyName || 'QATAR ELITE DECOR'}
                    </div>
                    <div className="text-[9px] font-bold tracking-[0.2em] text-[#75472F] uppercase">
                      {companySubtitle || 'LUXURY LIVING & BESPOKE INTERIORS'}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#777777] bg-white px-2 py-1 rounded border border-[#E8E0D5]">
                    Desktop & Mobile Logo
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-[#292720] border-b border-[#E8E0D5] pb-3 pt-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#183D32]" />
                  <span>Live Preview: Hero Banner</span>
                </h3>

                <div className="p-4 rounded-xl bg-[#183D32] text-white space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4A45B] font-bold">
                    PREMIUM SOLID TIMBER
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg leading-tight">
                    {heroTitle || 'Make Your Space Extraordinary'}
                  </h4>
                  <p className="text-[11px] text-[#E8E0D5] line-clamp-2">
                    {heroSubtitle || 'Thoughtfully curated luxury furniture for modern living.'}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-[#777777]">
                  All changes immediately sync to the live store without delay.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BACKUP & DATA */}
        {activeTab === 'backup' && (
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 max-w-3xl space-y-6">
            <div>
              <h2 className="font-display font-bold text-xl text-[#292720]">
                Store Backup & Data Management
              </h2>
              <p className="text-xs text-[#777777] mt-1">
                Export and import your entire catalog, customer orders, and brand configurations to JSON.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-[#E8E0D5] bg-[#FFFDF9] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#183D32]/10 text-[#183D32] flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#292720]">
                  Export Full Backup
                </h3>
                <p className="text-xs text-[#777777]">
                  Download a complete JSON snapshot containing {products.length} products, {orders.length} orders, and brand settings.
                </p>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="cursor-pointer w-full bg-[#183D32] hover:bg-[#75472F] text-white py-2.5 px-4 rounded-lg text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .json Backup</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-[#E8E0D5] bg-[#FFFDF9] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#75472F]/10 text-[#75472F] flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#292720]">
                  Restore from File
                </h3>
                <p className="text-xs text-[#777777]">
                  Upload a previously saved JSON backup to restore products, categories, or order records.
                </p>
                <label className="cursor-pointer w-full bg-white hover:bg-[#F2ECE2] text-[#75472F] border border-[#E8E0D5] py-2.5 px-4 rounded-lg text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Select JSON File</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E0D5] space-y-3">
              <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Danger Zone</span>
              </h3>
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-xs text-red-900">
                    Factory Reset Catalog
                  </div>
                  <div className="text-[11px] text-red-700 mt-0.5">
                    Restores the catalog back to Qatar Elite Decor's original 20 products and resets brand config.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to restore default products? All custom products will be removed.')) {
                      onResetProducts();
                      onSaveBrandConfig(DEFAULT_BRAND_CONFIG);
                      onNotify('Store factory reset complete');
                    }
                  }}
                  className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors shrink-0"
                >
                  Factory Reset Store
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD PRODUCT */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
                <h3 className="font-display font-bold text-lg text-[#292720] flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#183D32]" />
                  <span>Add New Furniture Piece</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="p-1 rounded-lg text-[#999999] hover:text-[#292720] hover:bg-[#F2ECE2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#292720] mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      placeholder="e.g. Minimalist Teak Sideboard"
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Category *
                    </label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as ProductCategory)}
                      className="w-full h-10 px-2.5 border border-[#E8E0D5] rounded-lg text-xs bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Selling Price (৳ BDT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Compare Original Price (৳)
                    </label>
                    <input
                      type="number"
                      value={prodOldPrice}
                      onChange={(e) => setProdOldPrice(e.target.value)}
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Badge Tag
                    </label>
                    <select
                      value={prodTag}
                      onChange={(e) => setProdTag(e.target.value)}
                      className="w-full h-10 px-2.5 border border-[#E8E0D5] rounded-lg text-xs bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      <option value="New">New</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Popular">Popular</option>
                      <option value="Handcrafted">Handcrafted</option>
                      <option value="Sale">Sale</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Material
                    </label>
                    <input
                      type="text"
                      value={prodMaterial}
                      onChange={(e) => setProdMaterial(e.target.value)}
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={prodDimensions}
                      onChange={(e) => setProdDimensions(e.target.value)}
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#292720] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    placeholder="Short description highlighting wood craft, durability, and finishing..."
                    className="w-full p-2.5 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#292720] mb-1">
                    Product Image (Pick Studio Photo or Paste URL)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 mb-2">
                    {STUDIO_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => {
                          setProdImage(preset.path);
                          setCustomImageUrl('');
                        }}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 p-0.5 transition-all text-left ${
                          prodImage === preset.path && !customImageUrl
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
                        <span className="block text-[8px] text-[#292720] truncate mt-0.5 text-center font-medium">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Or paste external image URL: https://example.com/photo.jpg"
                    className="w-full h-9 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-[#E8E0D5]">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold text-[#777777] hover:bg-[#F2ECE2]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Product</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT PRODUCT */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
                <h3 className="font-display font-bold text-lg text-[#292720] flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#75472F]" />
                  <span>Edit Furniture Piece</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-1 rounded-lg text-[#999999] hover:text-[#292720] hover:bg-[#F2ECE2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEditedProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#292720] mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Category *
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value as ProductCategory,
                        })
                      }
                      className="w-full h-10 px-2.5 border border-[#E8E0D5] rounded-lg text-xs bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Selling Price (৳ BDT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Original Compare Price (৳)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.oldPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          oldPrice: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Stock Status
                    </label>
                    <select
                      value={editingProduct.inStock ? 'in' : 'out'}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          inStock: e.target.value === 'in',
                        })
                      }
                      className="w-full h-10 px-2.5 border border-[#E8E0D5] rounded-lg text-xs bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      <option value="in">In Stock (Available)</option>
                      <option value="out">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Material
                    </label>
                    <input
                      type="text"
                      value={editingProduct.material}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, material: e.target.value })
                      }
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#292720] mb-1">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={editingProduct.dimensions}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, dimensions: e.target.value })
                      }
                      className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#292720] mb-1">
                    Badge Tag
                  </label>
                  <select
                    value={editingProduct.featuredTag}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, featuredTag: e.target.value })
                    }
                    className="w-full h-10 px-2.5 border border-[#E8E0D5] rounded-lg text-xs bg-white focus:outline-none focus:border-[#183D32]"
                  >
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Popular">Popular</option>
                    <option value="Handcrafted">Handcrafted</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#292720] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    className="w-full p-2.5 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#292720] mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, image: e.target.value })
                    }
                    className="w-full h-10 px-3 border border-[#E8E0D5] rounded-lg text-xs focus:outline-none focus:border-[#183D32]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-[#E8E0D5]">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold text-[#777777] hover:bg-[#F2ECE2]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: PRINTABLE ORDER INVOICE */}
        {activeInvoiceOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
                <span className="text-xs font-bold text-[#777777] uppercase tracking-wider">
                  Official Store Invoice
                </span>
                <button
                  type="button"
                  onClick={() => setActiveInvoiceOrder(null)}
                  className="p-1 rounded-lg text-[#999999] hover:text-[#292720]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Invoice Sheet */}
              <div id="invoice-sheet" className="space-y-4 text-xs text-[#292720]">
                {/* Brand Header */}
                <div className="flex items-start justify-between border-b border-[#E8E0D5] pb-4">
                  <div>
                    <h2 className="font-display font-black text-xl text-[#183D32] uppercase">
                      {brandConfig.companyName}
                    </h2>
                    <span className="text-[10px] font-bold text-[#75472F] tracking-widest uppercase block">
                      {brandConfig.companySubtitle}
                    </span>
                    <p className="text-[11px] text-[#777777] mt-1">
                      {brandConfig.showroomAddress} · Tel: {brandConfig.supportPhone}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-base text-[#183D32]">
                      INVOICE
                    </span>
                    <div className="font-mono-tabular text-xs text-[#555555] mt-0.5">
                      #{activeInvoiceOrder.id}
                    </div>
                    <div className="text-[11px] text-[#777777]">
                      Date: {activeInvoiceOrder.createdAt}
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="p-3 rounded-xl bg-[#F7F3ED] grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <strong className="block text-[#75472F] text-[10px] uppercase tracking-wider mb-1">
                      Billed To:
                    </strong>
                    <div className="font-bold text-sm text-[#292720]">
                      {activeInvoiceOrder.customerName}
                    </div>
                    <div className="text-[#555555] mt-0.5">
                      Phone: {activeInvoiceOrder.phone}
                    </div>
                    <div className="text-[#777777] mt-0.5">
                      {activeInvoiceOrder.address}
                    </div>
                  </div>

                  <div className="text-right">
                    <strong className="block text-[#75472F] text-[10px] uppercase tracking-wider mb-1">
                      Payment & Delivery:
                    </strong>
                    <div className="font-semibold text-[#183D32]">
                      Method: {activeInvoiceOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'WhatsApp'}
                    </div>
                    <div className="mt-1">
                      <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold border border-[#E8E0D5]">
                        Status: {activeInvoiceOrder.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="border border-[#E8E0D5] rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#EFE9DF] text-[#75472F] font-bold">
                      <tr>
                        <th className="p-2.5">Item Description</th>
                        <th className="p-2.5">Finish</th>
                        <th className="p-2.5 text-center">Qty</th>
                        <th className="p-2.5 text-right">Price</th>
                        <th className="p-2.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E0D5]">
                      {activeInvoiceOrder.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#FFFDF9]">
                          <td className="p-2.5 font-semibold text-[#292720]">
                            {item.productName}
                          </td>
                          <td className="p-2.5 text-[#777777]">
                            {item.woodFinish}
                          </td>
                          <td className="p-2.5 text-center font-mono-tabular">
                            {item.quantity}
                          </td>
                          <td className="p-2.5 text-right font-mono-tabular">
                            ৳{item.unitPrice.toLocaleString('en-US')}
                          </td>
                          <td className="p-2.5 text-right font-mono-tabular font-bold text-[#183D32]">
                            ৳{(item.unitPrice * item.quantity).toLocaleString('en-US')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end pt-2">
                  <div className="w-48 space-y-1.5 text-xs text-right">
                    <div className="flex justify-between text-[#777777]">
                      <span>Subtotal:</span>
                      <span className="font-mono-tabular">
                        {formatBDT(activeInvoiceOrder.subtotal || activeInvoiceOrder.total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#777777]">
                      <span>Shipping Fee:</span>
                      <span className="font-mono-tabular">
                        {activeInvoiceOrder.shippingFee === 0 ? 'FREE' : formatBDT(activeInvoiceOrder.shippingFee || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#183D32] border-t border-[#E8E0D5] pt-1.5">
                      <span>Grand Total:</span>
                      <span className="font-mono-tabular">
                        {formatBDT(activeInvoiceOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 text-center text-[10px] text-[#777777] border-t border-[#E8E0D5]">
                  Thank you for placing your trust in {brandConfig.companyName}. Handcrafted in Bangladesh.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-2 border-t border-[#E8E0D5]">
                <button
                  type="button"
                  onClick={() => setActiveInvoiceOrder(null)}
                  className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold text-[#777777] hover:bg-[#F2ECE2]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="cursor-pointer bg-[#183D32] hover:bg-[#75472F] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
