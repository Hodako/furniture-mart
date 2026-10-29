import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck } from 'lucide-react';
import { BrandConfig } from '../data/storeLogic';

interface WhatsAppChatPopupProps {
  brandConfig: BrandConfig;
}

const QUICK_INQUIRIES = [
  '🛋️ Inquire about Teak wood finish',
  '📏 Need custom furniture sizing',
  '🚚 Delivery timeline to my city',
  '📦 Inquire about cash on delivery',
];

export const WhatsAppChatPopup: React.FC<WhatsAppChatPopupProps> = ({
  brandConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  if (brandConfig.whatsappWidgetEnabled === false) {
    return null;
  }

  const phoneRaw = (brandConfig.whatsappNumber || brandConfig.supportPhone || '+8801711849200').replace(/[^0-9]/g, '');
  const cleanPhone = phoneRaw.startsWith('88') ? phoneRaw : `88${phoneRaw}`;

  const handleSendMessage = (textToSend?: string) => {
    const finalMsg = (textToSend || message).trim();
    if (!finalMsg) return;

    const encoded = encodeURIComponent(
      `Hello ${brandConfig.companyName}!\n\n${finalMsg}\n\n(Sent via website live concierge)`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 select-none">
      {/* Expanded Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-[min(340px,calc(100vw-32px))] bg-white rounded-2xl shadow-2xl border border-[#E8E0D5] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm text-white">
                  🛋️
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#128C7E] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white leading-tight">
                  {brandConfig.companyName} Concierge
                </h4>
                <span className="text-[10px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Online · Fast WhatsApp Reply
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-3.5 bg-[#EFEAE2] min-h-[190px] max-h-[300px] overflow-y-auto space-y-3 text-xs">
            {/* Timestamp Badge */}
            <div className="text-center">
              <span className="bg-white/80 text-[#667781] text-[10px] px-2 py-0.5 rounded-md font-medium shadow-2xs">
                Today
              </span>
            </div>

            {/* Greeting Message from Store */}
            <div className="flex items-start gap-2">
              <div className="bg-white text-[#111B21] p-3 rounded-2xl rounded-tl-xs shadow-xs max-w-[88%] space-y-1">
                <p className="leading-relaxed">
                  {brandConfig.whatsappGreeting ||
                    `Hello! 👋 Welcome to ${brandConfig.companyName}. Looking for custom furniture dimensions, wood polish advice, or order inquiries?`}
                </p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-[#667781] pt-0.5">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                </div>
              </div>
            </div>

            {/* Quick Inquiry Options */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-[#54656F] uppercase tracking-wider block">
                Quick Inquiries:
              </span>
              <div className="flex flex-col gap-1.5">
                {QUICK_INQUIRIES.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(opt)}
                    className="text-left bg-white/90 hover:bg-white text-[#111B21] border border-[#D1D7DB] px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all shadow-2xs hover:border-[#128C7E]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-[#E8E0D5] flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message on WhatsApp..."
              className="flex-1 h-9 px-3 rounded-full bg-[#F0F2F5] text-xs text-[#111B21] placeholder:text-[#667781] focus:outline-none focus:ring-1 focus:ring-[#128C7E]"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-9 h-9 rounded-full bg-[#128C7E] disabled:opacity-40 hover:bg-[#0E7165] text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
              aria-label="Send via WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group cursor-pointer flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-6 h-6 shrink-0 fill-current" />
        <span className="hidden sm:inline-block font-bold text-xs tracking-wide">
          WhatsApp Support
        </span>
      </button>
    </div>
  );
};
