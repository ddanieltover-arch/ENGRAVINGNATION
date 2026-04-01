'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppChat() {
  const phoneNumber = '13322566110';
  const message = 'Hi Engraving Nation! I am interested in a custom build for my vehicle. Can you help?';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-8 left-6 z-50 group bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 animate-fade-in"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
        Chat With Us
      </span>
    </a>
  );
}
