/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  BrandConfig,
  CartItem,
  DEFAULT_BRAND_CONFIG,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  Order,
  Product,
  calculateCartTotals,
  updateCartItemQuantity,
} from './data/storeLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';

// Multi-Page Routes
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPage } from './pages/AdminPage';

const STORAGE_KEYS = {
  BRAND: 'uzvi_brand_config_v3',
  PRODUCTS: 'uzvi_products_v3',
  CART: 'uzvi_cart_v3',
  WISHLIST: 'uzvi_wishlist_v3',
  ORDERS: 'uzvi_orders_v3',
};

function AppShell({
  children,
}: {
  children: (isProductPage: boolean) => React.ReactNode;
}) {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');
  return <>{children(isProductPage)}</>;
}

export default function App() {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
      return saved ? JSON.parse(saved) : DEFAULT_BRAND_CONFIG;
    } catch {
      return DEFAULT_BRAND_CONFIG;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brandConfig));
    } catch {}
    document.title = `${brandConfig.companyName} — ${brandConfig.companySubtitle}`;
  }, [brandConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const cartSummary = useMemo(
    () =>
      calculateCartTotals(
        cartItems,
        products,
        brandConfig.freeShippingThreshold
      ),
    [cartItems, products, brandConfig.freeShippingThreshold]
  );

  const activeProduct = useMemo(
    () => products.find((p) => p.id === activeProductId) || null,
    [products, activeProductId]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast('Added to wishlist');
        return [...prev, product.id];
      }
    });
  };

  const handleAddToCart = (
    product: Product,
    woodFinish: string = product.woodFinishes[0] || 'Natural Walnut',
    quantity: number = 1
  ) => {
    setCartItems((prev) =>
      updateCartItemQuantity(prev, product.id, woodFinish, quantity)
    );
    showToast('Added to your bag');
  };

  const handleUpdateCartQuantity = (
    productId: string,
    woodFinish: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      updateCartItemQuantity(prev, productId, woodFinish, delta)
    );
  };

  const handlePlaceOrder = (orderInput: {
    customerName: string;
    phone: string;
    address: string;
    postalCode: string;
    paymentMethod: 'COD' | 'WhatsApp';
  }): Order => {
    const newOrder: Order = {
      id: `UZ-${1050 + orders.length}`,
      customerName: orderInput.customerName,
      phone: orderInput.phone,
      address: orderInput.address,
      postalCode: orderInput.postalCode,
      paymentMethod: orderInput.paymentMethod,
      items: cartSummary.detailedItems.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        woodFinish: i.woodFinish,
        quantity: i.quantity,
        unitPrice: i.product.price,
      })),
      subtotal: cartSummary.subtotal,
      shippingFee: cartSummary.shippingFee,
      total: cartSummary.total,
      status: 'Preparing Shipment',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`Order #${newOrder.id} Confirmed!`);
    return newOrder;
  };

  const handleSaveBrandConfig = (newConfig: BrandConfig) => {
    setBrandConfig(newConfig);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog');
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    status: Order['status']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} marked as ${status}`);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell>
        {(isProductPage) => (
          <div
            className={`min-h-screen bg-[#FFFDF9] text-[#292720] flex flex-col font-body ${
              isProductPage ? 'pb-0' : 'pb-16 md:pb-0'
            }`}
          >
            {/* Clean Sticky Header (No top banner, no frontend admin link) */}
            <Navbar
              brandConfig={brandConfig}
              totalCartItems={cartSummary.totalItems}
              totalWishlistItems={wishlistIds.length}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* Multi-Page Route Content */}
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      brandConfig={brandConfig}
                      products={products}
                      wishlistIds={wishlistIds}
                      onToggleWishlist={handleToggleWishlist}
                      onQuickAdd={(p) => handleAddToCart(p)}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <ShopPage
                      brandConfig={brandConfig}
                      products={products}
                      wishlistIds={wishlistIds}
                      onToggleWishlist={handleToggleWishlist}
                      onQuickAdd={(p) => handleAddToCart(p)}
                    />
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <ProductDetailPage
                      brandConfig={brandConfig}
                      products={products}
                      wishlistIds={wishlistIds}
                      onToggleWishlist={handleToggleWishlist}
                      onAddToCart={(p, finish, qty) => handleAddToCart(p, finish, qty)}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/collections"
                  element={<CollectionsPage products={products} />}
                />
                <Route
                  path="/about"
                  element={<AboutPage brandConfig={brandConfig} />}
                />
                <Route
                  path="/contact"
                  element={
                    <ContactPage brandConfig={brandConfig} onNotify={showToast} />
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <WishlistPage
                      products={products}
                      wishlistIds={wishlistIds}
                      onRemoveFromWishlist={handleToggleWishlist}
                      onAddToCart={(p) => handleAddToCart(p)}
                    />
                  }
                />
                {/* Private Admin Route (Isolated from frontend navigation at /whoisadmin) */}
                <Route
                  path="/whoisadmin"
                  element={
                    <AdminPage
                      brandConfig={brandConfig}
                      products={products}
                      orders={orders}
                      onSaveBrandConfig={handleSaveBrandConfig}
                      onAddProduct={handleAddProduct}
                      onDeleteProduct={handleDeleteProduct}
                      onUpdateOrderStatus={handleUpdateOrderStatus}
                      onNotify={showToast}
                    />
                  }
                />
                {/* Redirect /admin to /whoisadmin */}
                <Route path="/admin" element={<Navigate to="/whoisadmin" replace />} />
                {/* Fallback to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Footer (with isProductPage to hide footer menus on mobile) */}
            <Footer brandConfig={brandConfig} isProductPage={isProductPage} />

            {/* Phone-Optimized Bottom Navigation Dock (Home, Shop, Collections, Wishlist, Bag) - Hidden on product page */}
            {!isProductPage && (
              <MobileNav
                totalCartItems={cartSummary.totalItems}
                totalWishlistItems={wishlistIds.length}
                onOpenCart={() => setIsCartOpen(true)}
              />
            )}

            {/* Floating Toast Notification */}
            {toastMessage && (
              <div
                role="status"
                aria-live="polite"
                className={`fixed left-1/2 -translate-x-1/2 bg-[#183D32] text-white py-2.5 px-4 rounded-lg z-50 text-xs font-semibold shadow-xl border border-[#D4A45B]/40 whitespace-nowrap ${
                  isProductPage ? 'bottom-5' : 'bottom-20 md:bottom-5'
                }`}
              >
                {toastMessage}
              </div>
            )}

            {/* Global Product Detail Bottom-Sheet / Modal */}
            <ProductDetailModal
              product={activeProduct}
              brandConfig={brandConfig}
              onClose={() => setActiveProductId(null)}
              onAddToCart={handleAddToCart}
            />

            {/* Global Slide-Over Shopping Bag Drawer */}
            <CartDrawer
              isOpen={isCartOpen}
              brandConfig={brandConfig}
              cartSummary={cartSummary}
              onClose={() => setIsCartOpen(false)}
              onUpdateQuantity={handleUpdateCartQuantity}
              onPlaceOrder={handlePlaceOrder}
              onNotify={showToast}
            />
          </div>
        )}
      </AppShell>
    </BrowserRouter>
  );
}
