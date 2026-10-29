import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { BrandConfig, CATEGORIES_LIST } from '../data/storeLogic';

interface ContactPageProps {
  brandConfig: BrandConfig;
  onNotify: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  brandConfig,
  onNotify,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [category, setCategory] = useState('Wooden Lamp');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      onNotify('Please provide your name and phone number');
      return;
    }
    setIsSubmitted(true);
    onNotify('Your inquiry has been sent to our showroom concierge!');
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ${brandConfig.companyName}, I would like to inquire about your furniture collection and showroom viewing.`
    );
    window.open(`https://wa.me/8801711849200?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: 'Do you deliver across all 64 districts in Bangladesh?',
      a: 'Yes. We provide white-glove doorstep delivery and in-home assembly across Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, and all other districts nationwide.',
    },
    {
      q: 'Can I pay with Cash on Delivery (COD)?',
      a: 'Yes. Cash on Delivery is supported for standard catalog orders. For bespoke custom-dimension furniture, a 30% advance deposit is requested prior to carpentry fabrication.',
    },
    {
      q: 'Can I request custom timber sizes or special finishes?',
      a: 'Absolutely! Our workshop crafts bespoke dining tables, wardrobes, and beds tailored to your architectural blueprints. Contact our concierge via WhatsApp or through the form.',
    },
    {
      q: 'What is your warranty coverage?',
      a: 'Every solid timber piece carries a 10-year warranty covering wood preservation, joint integrity, and structural defects.',
    },
  ];

  return (
    <div className="py-6 sm:py-12">
      <div className="w-[min(1200px,94%)] mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center max-w-xl mx-auto">
          <div className="text-[#D4A45B] text-[10px] sm:text-[11px] font-bold tracking-[2px] sm:tracking-[3px] uppercase">
            Get in Touch
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#292720] mt-1 mb-3">
            Showroom & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#777777]">
            Visit our physical display gallery in Bangladesh or speak directly with our interior specialists.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 sm:mb-16">
          {/* Left Column: Showroom Card & Direct Concierge */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F7F3ED] border border-[#E8E0D5] rounded-2xl p-6 sm:p-7 space-y-5">
              <h2 className="font-display font-bold text-xl text-[#292720]">
                {brandConfig.companyName} Gallery
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#292720]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#75472F] font-semibold">
                      Location
                    </strong>
                    <span>{brandConfig.showroomAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#75472F] font-semibold">
                      Showroom Hours
                    </strong>
                    <span>Saturday – Thursday: 10:00 AM – 9:00 PM</span>
                    <span className="block text-[#777777] text-xs">Friday: 2:30 PM – 9:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#75472F] font-semibold">
                      Phone & Hotlines
                    </strong>
                    <span>{brandConfig.supportPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#183D32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#75472F] font-semibold">
                      Email
                    </strong>
                    <span>{brandConfig.supportEmail}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="cursor-pointer w-full bg-[#183D32] hover:bg-[#75472F] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4A45B]" />
                  <span>Chat on WhatsApp (Instant Reply)</span>
                </button>
              </div>
            </div>

            {/* Delivery Notice Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E8E0D5] text-xs text-[#777777]">
              <span className="font-bold text-[#183D32] block mb-1">
                ✦ Complimentary Interior Consultation
              </span>
              Bring your room dimensions and photographs to our showroom for complimentary 3D wood layout recommendations.
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E8E0D5] rounded-2xl p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#292720] mb-1">
              Send an Inquiry or Custom Order
            </h2>
            <p className="text-xs text-[#777777] mb-6">
              Our master craftsmen will review your request and get back to you within 2 hours.
            </p>

            {isSubmitted ? (
              <div className="p-6 bg-[#F7F3ED] rounded-xl border border-[#D4A45B]/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#183D32] mx-auto" />
                <h3 className="font-display font-bold text-lg text-[#292720]">
                  Thank you, {name}!
                </h3>
                <p className="text-xs text-[#555555] max-w-md mx-auto">
                  We have received your note regarding{' '}
                  <strong className="text-[#183D32]">{category}</strong>. Our representative
                  will reach out at <strong>{phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="cursor-pointer text-xs font-bold text-[#75472F] hover:underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 017XXXXXXXX"
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Delivery City / District
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="Other District">Other District</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#292720] mb-1">
                      Furniture Interest
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-11 px-3.5 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-[#183D32]"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="Full Apartment Interior">Full Apartment Interior</option>
                      <option value="Custom Bespoke Order">Custom Bespoke Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292720] mb-1">
                    Your Requirements & Custom Dimensions
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're looking for (wood type, room dimensions, custom finish preferences)..."
                    className="w-full p-3 border border-[#E8E0D5] rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#183D32]"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full bg-[#183D32] hover:bg-[#75472F] text-white py-3 rounded-lg font-bold text-xs sm:text-sm transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-[#F7F3ED] rounded-2xl p-6 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <h2 className="font-display font-bold text-2xl text-[#292720]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Common questions about ordering, custom carpentry, and deliveries.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="cursor-pointer w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#292720] hover:text-[#183D32] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#75472F] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#555555] leading-relaxed border-t border-[#F2ECE2]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
