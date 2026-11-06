'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  primaryPhone?: string;
}

export default function HeroSection({
  primaryPhone = '9450067223',
}: HeroSectionProps) {
  // Realistic, authentic coaching slides with clear local focus & natural language
  const slides = [
    {
      id: 1,
      image: '/images/hero-classroom.jpg',
      alt: 'Bright Future Competition Institute smart classroom in Lalitpur',
      badge: '🎯 नया टारगेट बैच 2026 • प्रवेश प्रारंभ',
      title: 'UP Police, SSC & Railway की सर्वश्रेष्ठ तैयारी,',
      titleHighlight: 'ललितपुर में',
      subtitle: 'अनुभवी शिक्षकों द्वारा प्रतिदिन 3 घंटे क्लास, शॉर्टकट मैथ्स ट्रिक्स और प्रत्येक रविवार ऑफलाइन OMR टेस्ट सीरीज़।',
      tag: 'Target Batches 2026',
    },
    {
      id: 2,
      image: '/images/police-exam-prep.jpg',
      alt: 'UP Police Constable and SI exam preparation in Lalitpur',
      badge: '👮 UP Police Constable & SI Special',
      title: 'उत्तर प्रदेश पुलिस भर्ती परीक्षा हेतु समर्पित',
      titleHighlight: 'मिशन वर्दी 2026',
      subtitle: 'सामान्य ज्ञान (UP स्पेशल), हिंदी व्याकरण, गणित ट्रिक्स और रीजनिंग की संपूर्ण चैप्टर-वाइज़ तैयारी।',
      tag: 'Police Special',
    },
    {
      id: 3,
      image: '/images/student-toppers.jpg',
      alt: 'Selected toppers and alumni of Bright Future Institute',
      badge: '🏆 1,250+ सरकारी सेवा में चयनित',
      title: '12+ वर्षों का अटूट विश्वास और ललितपुर में',
      titleHighlight: 'सर्वाधिक सिलेक्शन्स',
      subtitle: 'स्टेशन रोड (कृष्णा सिनेमा के पीछे) एवं घंटाघर (रिछारिया मार्केट) स्थित शाखाओं में 2 दिन की निःशुल्क डेमो क्लास।',
      tag: '1,250+ Selections',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play slideshow every 5 seconds (pauses on user hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeSlide = slides[current];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden text-white min-h-[520px] sm:min-h-[560px] lg:min-h-[600px] flex items-center"
      aria-label="Hero Banner Carousel"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Natural gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent z-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-15 pointer-events-none" />
      </div>

      {/* Main Hero Card Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-20 w-full py-6 sm:py-10 lg:py-14">
        <div className="max-w-xl bg-slate-900/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-2xl space-y-3.5 sm:space-y-5 text-left">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm max-w-full truncate">
            <span className="truncate">{activeSlide.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug drop-shadow-sm">
            {activeSlide.title}{' '}
            <span className="text-amber-400">
              {activeSlide.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            {activeSlide.subtitle}
          </p>

          {/* Quick verification points */}
          <div className="pt-0.5 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>2 दिन की फ्री क्लास</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>प्रत्येक रविवार OMR टेस्ट</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>ललितपुर में 2 शाखाएं</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <Link
              href="/admission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/25 hover:scale-102 active:scale-98 transition-all uppercase tracking-wider text-center min-h-[44px]"
            >
              <span>फ्री डेमो क्लास बुक करें</span>
              <ArrowRight className="w-4 h-4 text-slate-950 shrink-0" />
            </Link>

            <a
              href={`tel:${primaryPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md transition-all shadow-md text-center min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 text-amber-300 shrink-0" />
              <span>कॉल: +91 {primaryPhone}</span>
            </a>
          </div>

          {/* Quick Info & Slide Indicators */}
          <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9/5 रेटिंग (1,500+ छात्र)</span>
            </div>

            {/* Slide Selector Indicators */}
            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    current === idx
                      ? 'w-7 bg-amber-400 rounded-md'
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/30 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/30 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
