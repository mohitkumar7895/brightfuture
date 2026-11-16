'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  primaryPhone?: string;
}

export default function HeroSection({}: HeroSectionProps) {
  return (
    <section 
      className="relative w-full aspect-[2048/1066] overflow-hidden bg-slate-900 border-none p-0 m-0"
      style={{ aspectRatio: '2048 / 1066' }}
      aria-label="Bright Future Competition Institute Official Hero Banner"
    >
      {/* 100% Full Edge-to-Edge HD Banner - No Corner Borders, No Cuts */}
      <Image
        src="/images/bright-future-toppers-celebration.jpg"
        alt="Bright Future Competition Institute Lalitpur toppers and faculty felicitation ceremony"
        fill
        priority
        sizes="100vw"
        quality={100}
        unoptimized={true}
        className="w-full h-full object-cover object-center select-none"
      />
    </section>
  );
}
