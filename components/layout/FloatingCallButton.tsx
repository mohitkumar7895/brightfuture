'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';

interface FloatingCallButtonProps {
  primaryPhone?: string;
}

export default function FloatingCallButton({
  primaryPhone = '9450067223',
}: FloatingCallButtonProps) {
  return (
    <div className="fixed bottom-4 left-4 z-40 sm:hidden">
      <a
        href={`tel:${primaryPhone}`}
        aria-label="Call Bright Future Competition Institute Lalitpur"
        className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-xl active:scale-95 transition-all border-2 border-white"
      >
        <PhoneCall className="w-5 h-5 animate-bounce" />
      </a>
    </div>
  );
}

