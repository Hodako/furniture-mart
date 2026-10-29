import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  Send,
  MessageCircle,
  CreditCard,
  ChevronDown,
} from 'lucide-react';
import { BrandConfig, formatBDT } from '../data/storeLogic';

interface FooterProps {
  brandConfig: BrandConfig;
  isProductPage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  brandConfig,
  isProductPage = false,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 4000);
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const whatsappPhone = (brandConfig.whatsappNumber || brandConfig.supportPhone).replace(/[^0-9]/g, '');
  const cleanPhone = whatsappPhone.startsWith('88') ? whatsappPhone : `88${whatsappPhone}`;

  return (
    <footer
      className={`bg-[#0F2620] text-white border-t border-white/10 mt-auto transition-all ${
        isProductPage ? 'pb-6 md:pb-12' : 'pb-20 md:pb-12'
      }`}
    >
      {/* 1. Trust & Assurance Bar (Desktop & Mobile) */}
      <div className="border-b border-white/10 bg-[#0A1D18]">
        <div className="w-[min(1240px,94%)] mx-auto py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4A45B]/15 text-[#D4A45B] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">
                  100% Solid Timber
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#A5B5AD] mt-0.5">
                  সলিড সেগুন ও গর্জন কাঠ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4A45B]/15 text-[#D4A45B] flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">
                  Nationwide Delivery
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#A5B5AD] mt-0.5">
                  সারা বাংলাদেশে নিরাপদ ডেলিভারি
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4A45B]/15 text-[#D4A45B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">
                  Artisan Warranty
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#A5B5AD] mt-0.5">
                  টেকসই ফিনিশিং ও লং-টার্ম সাপোর্ট
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4A45B]/15 text-[#D4A45B] flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">
                  Cash on Delivery
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#A5B5AD] mt-0.5">
                  পণ্য হাতে পেয়ে মূল্য পরিশোধ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Body */}
      <div className="w-[min(1240px,94%)] mx-auto pt-8 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Showroom Information (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link
              to="/"
              className="inline-block hover:opacity-95 transition-opacity"
            >
              <div className="font-display font-black text-2xl sm:text-[28px] tracking-wide text-[#F0D7A6] uppercase">
                {brandConfig.companyName}
              </div>
              <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#D4A45B] uppercase mt-0.5">
                {brandConfig.companySubtitle || 'HOME & LIVING'}
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#B4C2BA] leading-relaxed max-w-sm">
              Qatar Elite Decor crafts thoughtfully selected solid wood furniture, bespoke lighting, and refined interior decor to bring enduring elegance and natural warmth to homes.
            </p>

            <div className="pt-1 space-y-2 text-xs text-[#C8D4CD]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A45B] shrink-0 mt-0.5" />
                <span>{brandConfig.showroomAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A45B] shrink-0" />
                <a
                  href={`tel:${brandConfig.supportPhone}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  {brandConfig.supportPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A45B] shrink-0" />
                <a
                  href={`mailto:${brandConfig.supportEmail || 'care@uzvifurniture.com'}`}
                  className="hover:text-white transition-colors"
                >
                  {brandConfig.supportEmail || 'care@uzvifurniture.com'}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-[#A5B5AD]">
                <Clock className="w-3.5 h-3.5 text-[#D4A45B] shrink-0" />
                <span>Showroom: Sat – Thu (10:00 AM – 9:00 PM)</span>
              </div>
            </div>
          </div>

          {/* Conditional Navigation for Phone on Product Page */}
          {/* Column 2: Furniture Collections (2-3 Cols) */}
          <div
            className={`md:col-span-2 space-y-3 ${
              isProductPage ? 'hidden sm:block' : ''
            }`}
          >
            <div className="flex items-center justify-between sm:block">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#D4A45B]">
                COLLECTIONS
              </h3>
              <button
                type="button"
                onClick={() => toggleSection('collections')}
                className="sm:hidden text-[#A5B5AD] p-1"
                aria-label="Toggle Collections"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSection === 'collections' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <div
              className={`flex flex-col gap-2.5 text-xs text-[#B4C2BA] ${
                openSection === 'collections' ? 'flex' : 'hidden sm:flex'
              }`}
            >
              <Link to="/shop" className="hover:text-white transition-colors">
                All Furniture
              </Link>
              <Link
                to="/shop?category=Wooden%20Lamp"
                className="hover:text-white transition-colors"
              >
                Wooden Lamps
              </Link>
              <Link
                to="/shop?category=Sofa"
                className="hover:text-white transition-colors"
              >
                Living Room Sofas
              </Link>
              <Link
                to="/shop?category=Bed"
                className="hover:text-white transition-colors"
              >
                Solid Wood Beds
              </Link>
              <Link
                to="/shop?category=Table"
                className="hover:text-white transition-colors"
              >
                Dining & Center Tables
              </Link>
              <Link
                to="/shop?category=Wardrobe"
                className="hover:text-white transition-colors"
              >
                Wardrobes & Almiras
              </Link>
              <Link
                to="/shop?category=Home%20Decor"
                className="hover:text-white transition-colors"
              >
                Home Accents & Decor
              </Link>
            </div>
          </div>

          {/* Column 3: Customer Care & Services (2-3 Cols) */}
          <div
            className={`md:col-span-3 space-y-3 ${
              isProductPage ? 'hidden sm:block' : ''
            }`}
          >
            <div className="flex items-center justify-between sm:block">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#D4A45B]">
                CUSTOMER CARE
              </h3>
              <button
                type="button"
                onClick={() => toggleSection('support')}
                className="sm:hidden text-[#A5B5AD] p-1"
                aria-label="Toggle Customer Care"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSection === 'support' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <div
              className={`flex flex-col gap-2.5 text-xs text-[#B4C2BA] ${
                openSection === 'support' ? 'flex' : 'hidden sm:flex'
              }`}
            >
              <Link to="/about" className="hover:text-white transition-colors">
                About {brandConfig.companyName} Craftsmanship
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Showroom Visit & Inquiries
              </Link>
              <Link to="/collections" className="hover:text-white transition-colors">
                Explore All Categories
              </Link>
              <Link to="/wishlist" className="hover:text-white transition-colors">
                Saved Wishlist Items
              </Link>
              <span className="text-[#8FA297] text-[11px] pt-1">
                Free Delivery on orders above {formatBDT(brandConfig.freeShippingThreshold)}
              </span>
              <span className="text-[#8FA297] text-[11px]">
                Custom Sizing & Timber Polishing available on request
              </span>
            </div>
          </div>

          {/* Column 4: Newsletter & WhatsApp Assistance (3-4 Cols) */}
          <div
            className={`md:col-span-3 space-y-4 ${
              isProductPage ? 'hidden sm:block' : ''
            }`}
          >
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#D4A45B]">
                THE ELITE CIRCLE
              </h3>
              <p className="text-xs text-[#B4C2BA] mt-1.5 leading-relaxed">
                Join our VIP circle for seasonal furniture collections, interior design guides, and exclusive offers.
              </p>
            </div>

            {/* Newsletter Input - Mobile Ergonomic */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 sm:h-11 px-4 pr-12 rounded-xl bg-white/10 border border-white/20 text-[16px] sm:text-xs text-white placeholder:text-[#A8BDB2] focus:outline-none focus:border-[#D4A45B] focus:ring-2 focus:ring-[#D4A45B]/25 focus:bg-white/15 transition-all shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-[#D4A45B] hover:bg-[#c49348] text-[#0F2620] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="text-[11px] text-[#F0D7A6] font-semibold flex items-center gap-1.5 pt-1">
                  <span>✓ Thank you for subscribing to {brandConfig.companyName}!</span>
                </div>
              )}
            </form>

            {/* Quick WhatsApp Support Trigger */}
            <div className="pt-1">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${brandConfig.companyName}! I'm visiting your website and have an inquiry about your furniture collection.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat with Design Specialist</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Payment Row (Clean & Professional, Zero color codes) */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA297]">
          <div className="text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} {brandConfig.companyName}. Handcrafted in Bangladesh. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#A5B5AD] flex-wrap justify-center">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>bKash / Nagad</span>
            <span>•</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
