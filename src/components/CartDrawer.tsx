import React, { useState } from 'react';
import { CheckCircle2, Copy, Check } from 'lucide-react';
import {
  BrandConfig,
  CartSummary,
  Order,
  buildWhatsAppOrderMessage,
  formatBDT,
  validateOrderInput,
} from '../data/storeLogic';

interface CartDrawerProps {
  isOpen: boolean;
  brandConfig: BrandConfig;
  cartSummary: CartSummary;
  onClose: () => void;
  onUpdateQuantity: (
    productId: string,
    woodFinish: string,
    delta: number
  ) => void;
  onPlaceOrder: (orderData: {
    customerName: string;
    phone: string;
    address: string;
    postalCode: string;
    paymentMethod: 'COD' | 'WhatsApp';
  }) => Order;
  onNotify: (msg: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  brandConfig,
  cartSummary,
  onClose,
  onUpdateQuantity,
  onPlaceOrder,
  onNotify,
}) => {
  const [mode, setMode] = useState<'bag' | 'checkout' | 'whatsapp' | 'confirmed'>(
    'bag'
  );
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('1213');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedWa, setCopiedWa] = useState(false);

  if (!isOpen) return null;

  const waMessage = buildWhatsAppOrderMessage(
    brandConfig.companyName,
    cartSummary,
    brandConfig.currencySymbol
  );
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

  const handleClose = () => {
    setMode('bag');
    setFormError(null);
    onClose();
  };

  const handleWhatsAppAction = () => {
    if (cartSummary.detailedItems.length === 0) {
      onNotify('Your bag is empty');
      return;
    }
    setMode('whatsapp');
  };

  const handleCopyWaText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(waMessage).catch(() => {});
    }
    setCopiedWa(true);
    onNotify('WhatsApp order message copied!');
    setTimeout(() => setCopiedWa(false), 2000);
  };

  const handleDirectOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateOrderInput({
      customerName,
      phone,
      address,
      postalCode,
    });
    if (!check.valid) {
      setFormError(check.error || 'Please fill all required fields.');
      return;
    }
    setFormError(null);
    const created = onPlaceOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      postalCode: postalCode.trim(),
      paymentMethod: mode === 'whatsapp' ? 'WhatsApp' : 'COD',
    });
    setConfirmedOrder(created);
    setMode('confirmed');
    setCustomerName('');
    setPhone('');
    setAddress('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
    >
      <div className="w-full sm:w-[420px] h-full bg-white p-4 sm:p-[22px] overflow-y-auto flex flex-col justify-between shadow-2xl">
        <div>
          {/* Bag Header */}
          <div className="flex justify-between items-center pb-3.5 border-b border-[#E8E0D5]">
            <h2
              id="bag-drawer-title"
              className="font-display font-bold text-xl sm:text-2xl text-[#292720] m-0"
            >
              {mode === 'confirmed' ? 'Order Confirmed' : 'Your Bag'}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close shopping bag"
              className="cursor-pointer border border-[#E8E0D5] bg-white hover:border-[#75472F] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#183D32] min-h-[36px]"
            >
              Close ✕
            </button>
          </div>

          {/* Bag Content */}
          {mode === 'confirmed' && confirmedOrder ? (
            <div className="py-5 space-y-4">
              <div className="p-4 rounded-xl bg-[#183D32] text-white space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#D4A45B] text-xs font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{brandConfig.companyName} Receipt</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold">
                  Order #{confirmedOrder.id} Confirmed
                </h3>
                <p className="text-xs text-white/80">
                  Preparing shipment to {confirmedOrder.address} ({confirmedOrder.phone}).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E0D5] bg-[#F7F3ED] text-xs space-y-2">
                {confirmedOrder.items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="flex justify-between text-[#292720]"
                  >
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <b className="tabular-nums">
                      {formatBDT(
                        item.unitPrice * item.quantity,
                        brandConfig.currencySymbol
                      )}
                    </b>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#E8E0D5] flex justify-between text-sm font-bold text-[#183D32]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">
                    {formatBDT(
                      confirmedOrder.subtotal,
                      brandConfig.currencySymbol
                    )}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer w-full bg-[#183D32] text-white rounded-[7px] py-3 px-4 font-bold text-xs min-h-[44px]"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="divide-y divide-[#E8E0D5]">
                {cartSummary.detailedItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-[#777777]">Your bag is empty.</p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-3 text-xs font-bold text-[#183D32] underline"
                    >
                      Browse collection
                    </button>
                  </div>
                ) : (
                  cartSummary.detailedItems.map(
                    ({ product, woodFinish, quantity }) => (
                      <div
                        key={`${product.id}-${woodFinish}`}
                        className="flex gap-3 py-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 sm:w-[75px] sm:h-[75px] object-cover rounded-lg bg-[#F7F3ED] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#292720] my-0.5 truncate">
                            {product.name}
                          </h4>
                          <b className="text-xs text-[#183D32] block mb-1.5 tabular-nums">
                            {formatBDT(
                              product.price,
                              brandConfig.currencySymbol
                            )}
                          </b>
                          <div className="flex items-center gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(product.id, woodFinish, -1)
                              }
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="cursor-pointer border border-[#E8E0D5] bg-[#F7F3ED] hover:border-[#75472F] rounded w-7 h-7 flex items-center justify-center font-bold"
                            >
                              −
                            </button>
                            <span className="px-1.5 font-bold tabular-nums text-xs">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(product.id, woodFinish, 1)
                              }
                              aria-label={`Increase quantity of ${product.name}`}
                              className="cursor-pointer border border-[#E8E0D5] bg-[#F7F3ED] hover:border-[#75472F] rounded w-7 h-7 flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  product.id,
                                  woodFinish,
                                  -quantity
                                )
                              }
                              className="cursor-pointer text-[#777777] hover:text-red-700 ml-auto text-[11px] font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>

              {/* WhatsApp Summary & Direct Order Form */}
              {(mode === 'whatsapp' || mode === 'checkout') &&
                cartSummary.detailedItems.length > 0 && (
                  <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#F7F3ED] border border-[#E8E0D5] space-y-3">
                    {mode === 'whatsapp' && (
                      <div className="space-y-2 pb-3 border-b border-[#E8E0D5]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#183D32]">
                            WhatsApp Order Message
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyWaText}
                            className="cursor-pointer inline-flex items-center gap-1 text-[11px] font-semibold text-[#75472F] hover:underline"
                          >
                            {copiedWa ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Message</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-[11px] bg-white p-2.5 rounded border border-[#E8E0D5] whitespace-pre-wrap text-[#292720] font-sans max-h-36 overflow-y-auto">
                          {waMessage}
                        </pre>
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center bg-[#183D32] text-white rounded-[7px] py-2.5 px-3 text-xs font-bold hover:opacity-90 min-h-[42px] flex items-center justify-center"
                        >
                          Open WhatsApp Chat ↗
                        </a>
                      </div>
                    )}

                    <form onSubmit={handleDirectOrderSubmit} className="space-y-2.5">
                      <p className="text-xs font-bold text-[#292720]">
                        Delivery Information
                      </p>
                      {formError && (
                        <p
                          role="alert"
                          className="text-xs text-red-800 bg-red-100 p-2 rounded"
                        >
                          {formError}
                        </p>
                      )}
                      <div>
                        <label
                          htmlFor="bag-fullname"
                          className="block text-[11px] font-semibold text-[#292720] mb-0.5"
                        >
                          Full Name
                        </label>
                        <input
                          id="bag-fullname"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full h-10 px-3 text-xs border border-[#E8E0D5] rounded bg-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="bag-phone"
                          className="block text-[11px] font-semibold text-[#292720] mb-0.5"
                        >
                          Phone Number
                        </label>
                        <input
                          id="bag-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+880 17..."
                          className="w-full h-10 px-3 text-xs border border-[#E8E0D5] rounded bg-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="bag-address"
                          className="block text-[11px] font-semibold text-[#292720] mb-0.5"
                        >
                          Delivery Address
                        </label>
                        <input
                          id="bag-address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House, Road, Area, City"
                          className="w-full h-10 px-3 text-xs border border-[#E8E0D5] rounded bg-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="cursor-pointer w-full bg-[#75472F] hover:bg-[#183D32] text-white rounded-[7px] py-2.5 px-4 font-bold text-xs transition-colors min-h-[42px]"
                      >
                        Confirm Order Now →
                      </button>
                    </form>
                  </div>
                )}
            </>
          )}
        </div>

        {/* Bag Footer */}
        {mode !== 'confirmed' && (
          <div className="pt-3.5 mt-3.5 border-t border-[#E8E0D5] space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#292720] m-0 tabular-nums font-mono-tabular">
              Subtotal:{' '}
              <span>
                {formatBDT(cartSummary.subtotal, brandConfig.currencySymbol)}
              </span>
            </h3>
            <p className="text-[11px] text-[#777777] m-0">
              Delivery charge will be confirmed separately.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleWhatsAppAction}
                className="cursor-pointer w-full bg-[#183D32] hover:opacity-90 text-white border-0 rounded-[7px] py-3 px-4 font-bold text-xs transition-opacity min-h-[44px] flex items-center justify-center"
              >
                Order via WhatsApp →
              </button>
              {cartSummary.detailedItems.length > 0 && mode === 'bag' && (
                <button
                  type="button"
                  onClick={() => setMode('checkout')}
                  className="cursor-pointer w-full bg-[#F7F3ED] hover:bg-[#E8E0D5] text-[#183D32] border border-[#E8E0D5] rounded-[7px] py-2.5 px-4 font-bold text-xs transition-colors min-h-[40px]"
                >
                  Direct Cash on Delivery Checkout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
