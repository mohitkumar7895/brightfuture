'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
  instituteName?: string;
}

export default function FloatingWhatsApp({
  whatsappNumber = '9450067223',
  instituteName = 'Bright Future Competition Institute',
}: FloatingWhatsAppProps) {
  // Format message for WhatsApp
  const defaultMessage = `Hello Bright Future Competition Institute Lalitpur! I am interested in admission for competitive exam batches. Please share details regarding upcoming batches, timings, and fee structure.`;
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with Counselors on WhatsApp
      </span>

      {/* WhatsApp Action Button with pulse ring */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp with Bright Future Competition Institute"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 whatsapp-pulse"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
      </a>
    </div>
  );
}

