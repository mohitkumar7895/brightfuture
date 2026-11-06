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
  // Realistic, authentic coaching slides - 100% in clear professional English
  const slides = [
    {
      id: 1,
      image: '/images/hero-classroom.jpg',
      alt: 'Bright Future Competition Institute smart classroom in Lalitpur',
      badge: 'Target Batch 2026 • Admissions Open',
      title: 'Smart Classroom & Live',
      titleHighlight: 'Interactive Batches',
      subtitle: 'Daily concept lectures, speed calculation shortcuts, printed study modules, and weekly Sunday OMR mock tests.',
      tag: 'Target Batches 2026',
    },
    {
      id: 2,
      image: '/images/police-exam-prep.jpg',
      alt: 'UP Police Constable and SI exam preparation in Lalitpur',
      badge: 'UP Police Constable & SI Special',
      title: 'Police & SSC Target Preparation •',
      titleHighlight: 'Mission 2026',
      subtitle: 'UP Police, SI & SSC Drills with speed tests, printed notes, and General Hindi grammar mastery.',
      tag: 'Police Special',
    },
    {
      id: 3,
      image: '/images/student-toppers.jpg',
      alt: 'Selected toppers and alumni of Bright Future Institute',
      badge: '1,200+ Officers Selected',
      title: 'Selections & Toppers of',
      titleHighlight: 'Bright Future Institute',
      subtitle: 'Lalitpur’s top selection record with classroom batches at Station Road and Ghantaghar branches.',
      tag: '1,200+ Selections',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden text-white min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-[620px] flex items-center"
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30 md:to-transparent z-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-15 pointer-events-none" />
      </div>

      {/* Main Hero Card Container - Visible on ALL screen sizes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-8 sm:py-10 lg:py-14">
        <div className="max-w-xl bg-slate-900/90 md:bg-slate-900/85 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-2xl space-y-3.5 sm:space-y-5 text-left">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm max-w-full">
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
          <div className="pt-0.5 flex flex-wrap gap-2 text-[11px] sm:text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>2 Days Free Demo</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sunday OMR Mock Tests</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>2 Branches in Lalitpur</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <Link
              href="/admission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/25 hover:scale-102 active:scale-98 transition-all uppercase tracking-wider text-center min-h-[44px]"
            >
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-4 h-4 text-slate-950 shrink-0" />
            </Link>

            <a
              href={`tel:${primaryPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md transition-all shadow-md text-center min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Call: +91 {primaryPhone}</span>
            </a>
          </div>

          {/* Quick Info & Slide Indicators */}
          <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9/5 Rating (1,500+ Aspirants)</span>
            </div>

            {/* Slide Selector Indicators */}
            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    current === idx
                      ? 'w-7 bg-amber-400'
                      : 'w-2.5 bg-white/40 hover:bg-white/70'
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
        className="flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/30 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/30 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </section>
  );
}
